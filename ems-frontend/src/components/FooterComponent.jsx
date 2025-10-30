import React from "react";
import { Link } from "react-router-dom";

const FooterComponent = () => {
  return (
    <footer className="bg-dark text-white mt-5">
      <div className="container py-4">
        <div className="row text-center text-md-start">
          
          {/* Quick Links Section */}
          <div className="col-md-4 mb-3">
            <h5 className="text-uppercase mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/employees" className="text-white text-decoration-none">Employees</Link></li>
              <li><Link to="/departments" className="text-white text-decoration-none">Departments</Link></li>
            </ul>
          </div>

          {/* Company Info Section */}
          <div className="col-md-4 mb-3">
            <h5 className="text-uppercase mb-3">About</h5>
            <p className="small">
              We build innovative software solutions with passion and precision.
              Our goal is to simplify employee and department management through modern technology.
            </p>
          </div>

          {/* Social Links Section */}
          <div className="col-md-4 mb-3">
            <h5 className="text-uppercase mb-3">Connect</h5>
            <ul className="list-unstyled">
              <li><a href="https://www.linkedin.com" className="text-white text-decoration-none" target="_blank" rel="noreferrer">LinkedIn</a></li>
              <li><a href="https://github.com" className="text-white text-decoration-none" target="_blank" rel="noreferrer">GitHub</a></li>
            </ul>
          </div>

        </div>
      </div>

      {/* Footer Bottom */}
      <div className="bg-secondary text-center py-2">
        <small>© {new Date().getFullYear()} All Rights Reserved | EMS System</small>
      </div>
    </footer>
  );
};

export default FooterComponent;
