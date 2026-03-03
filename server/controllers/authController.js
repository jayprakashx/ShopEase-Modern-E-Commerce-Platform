const User = require('../models/User'); 
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken'); 

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "Email already exists" });

    // Securely hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "Account created successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server Error during registration" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    // 1. Check if user exists
    if (!user) return res.status(401).json({ message: "Invalid email or password" });

    // 2. Use BCRYPT to compare the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid email or password" });

    // 3. Generate token for frontend
    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, "your_secret_key", { expiresIn: '1d' });

    res.status(200).json({ 
      token, 
      user: { id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin } 
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error during login" });
  }
};