import React, { useState } from 'react';
import { FaChartBar, FaUsers, FaSignOutAlt, FaPlus } from 'react-icons/fa';
import pfp from '../images/pfp.png';
import '../styles/DashboardHR.css'; 
import { db } from '../fb';
import { collection, getDocs } from 'firebase/firestore';
import { loggedInUser } from '../App';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const jobTitles = [
  'Software Developer',
  'UI/UX Designer',
  'Data Analyst',
];

const DashboardHR = () => {
  const dbInstances = collection(db, 'users', loggedInUser.uid, 'Job Decsription')

  const [array, setArray] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  const handleJobClick = (job) => {
    setSelectedJob(job);
  };

  useEffect(() => {
    async function getData() {
      const data = await getDocs(dbInstances);
      setArray(data.docs.map(function(item) { 
        return { ...item.data(), id: item.id }
      }))
    }
    getData()
  }, [])

  return (
    <div className="dashboard-container">
      <div className="dashboard-page">
        <h1>Dashboard</h1>
        <div className="job-card-container">
          {array.map((item, index) => (
            <div
              className={`job-card ${selectedJob === item.title ? 'selected-card' : ''}`}
              key={index}
              onClick={() => handleJobClick(item.title)}
            >
              {item.title}
            </div>
          ))}
          <div className="job-card add-job-card">
            <Link to="/desc"><FaPlus className="plus-icon" /></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHR;
