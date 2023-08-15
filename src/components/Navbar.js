// Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import companyLogo from '../images/company-logo.png';
import menu from '../images/menu.png';
import '../styles/Navbar.css';
import '../styles/Sidebar.css';
import { FaHome, FaFileAlt, FaSignOutAlt, FaTimes } from 'react-icons/fa';
import { loggedInUser } from '../App';
import { auth } from '../fb';
import { signOut } from 'firebase/auth';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


const Navbar = () => {  
  const history = useHistory()

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

  function handleLogout() {
    signOut(auth).then(() => {
      history.push('/login')
    }).catch((error) => {
      console.log("Unable to sign out")    
    });
  }

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
              <span className="menu-text" onClick={handleLogout}>Logout</span>
            </li>
          </ul>
        </div>
        {/* Original content of the navbar */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">
                Dashboard
              </Link>
            </li>
            {loggedInUser ? (
              <li className="nav-item">
                <Link className="nav-link" to="/#">
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
