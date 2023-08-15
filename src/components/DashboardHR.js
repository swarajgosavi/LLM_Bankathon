import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import '../styles/DashboardHR.css'; 
import { db } from '../fb';
import { collection, getDocs } from 'firebase/firestore';
import { loggedInUser } from '../App';
import { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

export let jobDescriptionId = null

const DashboardHR = () => {
  const dbInstances = collection(db, 'users', loggedInUser.uid, 'Job Decsription')

  const history = useHistory();


  const [array, setArray] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  const handleJobClick = (job) => {
    jobDescriptionId = job
    history.push('/candidates');
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
              onClick={() => handleJobClick(item.id)}
            >
              {item.title}
            </div>
          ))}
          <Link to="/desc">
          <div className="job-card add-job-card">
            <FaPlus className="plus-icon" />
          </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardHR;
