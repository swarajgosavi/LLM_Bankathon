import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import companyLogo from '../images/company-logo.png';
import { FaUser, FaFileAlt, FaHome, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
import '../styles/Navbar.css';
import '../styles/Sidebar.css';

const Navbar = ({ loggedInUser }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sidebarAnimation, setSidebarAnimation] = useState('');

  const toggleSidebar = () => {
    if (isSidebarOpen) {
      setSidebarAnimation('slide-out');
      setTimeout(() => {
        setIsSidebarOpen(false);
        setSidebarAnimation('');
      }, 300); // Wait for the animation to finish
    } else {
      setIsSidebarOpen(true);
      setSidebarAnimation('slide-in');
    }
  };


  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={companyLogo} alt="Company Logo" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleSidebar}
        >
          <FaBars className="navbar-toggler-icon" />
        </button>
        <div className={`sidebar ${isSidebarOpen ? 'open' : ''} ${sidebarAnimation}`}>
          <div className="sidebar-header">
            {/* User profile picture and name */}
            {loggedInUser && (
              <div className="user-profile">
                <img src={loggedInUser.profilePic} alt="Profile" className="profile-pic" />
                <span className="user-name">{loggedInUser.name}</span>
              </div>
            )}
            <button className="close-btn" onClick={toggleSidebar}>
              <FaTimes />
            </button>
          </div>
          <ul className="sidebar-menu">
            <li>
              <FaHome className="menu-icon" />
              <span className="menu-text">Home</span>
            </li>
            <li>
              <FaFileAlt className="menu-icon" />
              <span className="menu-text">Job Description</span>
            </li>
            <li>
              <FaFileAlt className="menu-icon" />
              <span className="menu-text">Upload CVs</span>
            </li>
            <li>
              <FaSignOutAlt className="menu-icon" />
              <span className="menu-text">Logout</span>
            </li>
          </ul>
        </div>
        {/* Original content of the navbar */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                Contact
              </Link>
            </li>
            {loggedInUser ? (
              <li className="nav-item">
                <Link className="nav-link" to="/profile">
                  <FaUser className="fas fa-user" /> {loggedInUser.name}
                </Link>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    <a href="/login">Login</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
