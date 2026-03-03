import React, { useState } from 'react';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    name: "User Name",
    phone: "9876543210",
    location: "Odisha, India",
    address: "123 Street, Bhubaneswar",
    profilePic: "https://via.placeholder.com/150" 
  });

  const [tempPhone, setTempPhone] = useState(user.phone);

  const handlePhotoUpdate = () => {
    const newUrl = prompt("Enter new Profile Image URL:");
    if (newUrl) setUser({ ...user, profilePic: newUrl });
  };

  const handleSave = () => {
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(tempPhone)) {
      alert("Please enter a valid 10-digit phone number!");
      return;
    }
    setUser({ ...user, phone: tempPhone });
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
            <div className="bg-primary py-5 text-center text-white">
              <img src={user.profilePic} alt="Profile" className="rounded-circle border border-4 border-white shadow" style={{ width: '140px', height: '140px', objectFit: 'cover' }} />
              <h2 className="mt-3 fw-bold">{user.name}</h2>
              {isEditing ? (
                <input type="text" className="form-control w-50 mx-auto text-center" value={user.location} onChange={(e) => setUser({...user, location: e.target.value})} />
              ) : (
                <p className="mb-0 opacity-75">{user.location}</p>
              )}
            </div>
            <div className="card-body p-4 p-lg-5">
              <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-2">
                <h5 className="fw-bold text-dark m-0">User Information</h5>
                <button className={`btn btn-sm ${isEditing ? 'btn-success' : 'btn-outline-primary'} rounded-pill px-4`} onClick={isEditing ? handleSave : () => setIsEditing(true)}>
                  {isEditing ? "Save Changes" : "Edit Profile"}
                </button>
              </div>
              <div className="row g-4">
                <div className="col-sm-6">
                  <label className="text-muted small d-block text-uppercase fw-bold">Phone Number</label>
                  {isEditing ? (
                    <input type="tel" className="form-control" value={tempPhone} maxLength="10" onChange={(e) => setTempPhone(e.target.value.replace(/\D/g, ''))} />
                  ) : (
                    <span className="fs-5">+91 {user.phone}</span>
                  )}
                </div>
                <div className="col-sm-6">
                  <label className="text-muted small d-block text-uppercase fw-bold">Current Location</label>
                  <span className="fs-5 d-block mt-1">{user.location}</span>
                </div>
                <div className="col-12">
                  <label className="text-muted small d-block text-uppercase fw-bold">Delivery Address</label>
                  {isEditing ? (
                    <textarea className="form-control" rows="2" value={user.address} onChange={(e) => setUser({...user, address: e.target.value})} />
                  ) : (
                    <span className="fs-5">{user.address}</span>
                  )}
                </div>
              </div>
              <button onClick={handlePhotoUpdate} className="btn btn-primary mt-4 px-4 py-2 rounded-3 shadow-sm">Update Photo</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;