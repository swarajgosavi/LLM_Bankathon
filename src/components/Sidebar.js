import React from 'react';
import { FaChartBar, FaUsers, FaSignOutAlt, FaTimes } from 'react-icons/fa';
import pfp from '../images/pfp.png';
import '../styles/Sidebar.css'; 

const Sidebar = ({ isOpen, onClose }) => {


    return (
        <div className={`sliding-sidebar ${isOpen ? 'open' : ''}`}>

            <img src={pfp} alt="Admin Profile" className="profile-pic" />

            <div className="admin-name">John Doe</div>
 
            <div className="sidebar-item">
                <FaChartBar className="icon" />
                <span className="tab-name">Overview</span>
            </div>

            <div className="sidebar-item">
                <FaUsers className="icon" />
                <span className="tab-name">Candidates</span>
            </div>

            <div className="sidebar-item">
                <FaSignOutAlt className="icon" />
                <span className="tab-name">Logout</span>
            </div>


            <div className="close-btn" onClick={onClose}>
                <FaTimes className="icon" />
            </div>
        </div>
    );
};

export default Sidebar;
