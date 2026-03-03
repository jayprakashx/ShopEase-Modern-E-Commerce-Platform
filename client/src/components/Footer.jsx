import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-5 pb-4 mt-5">
      <div className="container text-center text-md-start">
        <div className="row text-center text-md-start">
          {/* Company Info */}
          <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold text-warning">ShopEase</h5>
            <p>Your premium destination for the latest electronics. Built with passion and precision.</p>
          </div>

          {/* Useful Links */}
          <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold text-warning">Quick Links</h5>
            <p><a href="/" className="text-white text-decoration-none">Home</a></p>
            <p><a href="/profile" className="text-white text-decoration-none">My Account</a></p>
            <p><a href="/admin" className="text-white text-decoration-none">Admin Panel</a></p>
          </div>

          {/* Contact Details */}
          <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold text-warning">Contact Developer</h5>
            <p><i className="bi bi-person-fill me-2"></i> Jayprakash Bahalia</p>
            <p><i className="bi bi-envelope-fill me-2"></i> Jayprakashbahalia@gmail.com</p>
            <p><i className="bi bi-telephone-fill me-2"></i> +91 8457844495</p>
          </div>
        </div>

        <hr className="mb-4" />

        {/* Copyright and Credits */}
        <div className="row align-items-center">
          <div className="col-md-7 col-lg-8 text-center text-md-start">
            <p>© 2026 Copyright: <strong className="text-warning">ShopEase</strong></p>
          </div>
          <div className="col-md-5 col-lg-4 text-center text-md-end">
            <p>Designed & Developed by <span className="text-warning fw-bold">Jayprakash Bahalia</span></p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;