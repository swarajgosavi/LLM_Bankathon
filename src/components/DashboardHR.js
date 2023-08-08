import React, { useState } from 'react';
import { FaUser, FaChartBar, FaUsers, FaSignOutAlt, FaTimes } from 'react-icons/fa';
import pfp from '../images/pfp.png';
import '../styles/DashboardHR.css'; 

const cardsData = [
    { jobRole: 'Software Developer', applied: 50, shortlisted: 20 },
    { jobRole: 'UI/UX Designer', applied: 30, shortlisted: 10 },
    { jobRole: 'Data Analyst', applied: 40, shortlisted: 15 },
  ];

const DashboardHR = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('shortlisted');


  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };


  const handleSwitchToggle = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="dashboard-container">
      {/* Hamburger Menu */}
      <div className="menu-btn" onClick={toggleSidebar}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>

      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>

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


        <div className="close-btn" onClick={toggleSidebar}>
          <FaTimes className="icon" />
        </div>
      </div>

      <div className="overview-page">
        <h1>Overview</h1>
        <div className="card-container">
          {cardsData.map((card, index) => (
            <div className="card" key={index}>
              <div className="card-title">{card.jobRole}</div>
              <div className="card-info">
                <div>Applied: {card.applied}</div>
                <div>Shortlisted: {card.shortlisted}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="card-details-container">
          <h1>{selectedOption === 'shortlisted' ? 'Shortlisted' : 'Disqualified'}</h1>

          <div className="switch-selector" onClick={() => handleSwitchToggle(selectedOption === 'shortlisted' ? 'disqualified' : 'shortlisted')}>
            <div className={`selector ${selectedOption === 'shortlisted' ? 'shortlisted' : 'disqualified'}`}></div>
            <div className={`option ${selectedOption === 'shortlisted' ? 'active' : ''}`}>Shortlisted</div>
            <div className={`option ${selectedOption === 'disqualified' ? 'active' : ''}`}>Disqualified</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHR;
