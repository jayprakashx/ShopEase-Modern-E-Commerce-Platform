const User = require('../models/User'); 
const bcrypt = require('bcryptjs'); // Recommended for password security

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }
    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(201).json({ message: "Account created successfully" });
  } catch (err) {
    res.status(500).send("Server Error"); //
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" }); //
    }
    // Return user data and a success message
    res.status(200).json({ message: "Login successful", user: { id: user._id, email: user.email, isAdmin: user.isAdmin } });
  } catch (err) {
    res.status(500).send("Server Error");
  }
};