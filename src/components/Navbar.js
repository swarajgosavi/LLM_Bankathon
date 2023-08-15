// Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import companyLogo from '../images/company-logo.png';
import menu from '../images/menu.png';
import '../styles/Navbar.css';
import '../styles/Sidebar.css';
import { FaHome, FaFileAlt, FaSignOutAlt, FaTimes } from 'react-icons/fa';
import { loggedInUser } from '../App';


const Navbar = () => {  

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
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={companyLogo} alt="Company Logo" />
        </Link>
        <Link className = "menu" onClick = {toggleSidebar}>       

          <img src = {menu}/>

        </Link>



        <div className={`sidebar ${isSidebarOpen ? 'open' : ''} ${sidebarAnimation}`}>
          <div className="sidebar-header">

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
              <Link className="nav-link" to="/upload">
                Upload
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/candidates">
              Candidates
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/test">
              Test
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/instructions">
              Instructions
              </Link>
            </li>
            {loggedInUser ? (
              <li className="nav-item">
                <Link className="nav-link" to="/profile">
                  <i className="fas fa-user"></i> {loggedInUser.displayName}
                </Link>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
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
