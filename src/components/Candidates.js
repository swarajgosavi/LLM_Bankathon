import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import '../styles/Candidates.css';

const Candidates = () => {
  const history = useHistory();
  const { jobTitle } = useParams();
  const [selectedOption, setSelectedOption] = useState('shortlisted');

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const shortlistedCards = [
    { name: 'John Doe', skills: 'Frontend Development' },
    { name: 'Jane Smith', skills: 'UI/UX Design' },
    { name: 'John Doe', skills: 'Frontend Development' },
    { name: 'Jane Smith', skills: 'UI/UX Design' },

  ];

  const disqualifiedCards = [
    { name: 'Michael Johnson', skills: 'Data Analysis' },
    { name: 'Emily Brown', skills: 'Project Management' },
    { name: 'Michael Johnson', skills: 'Data Analysis' },
    { name: 'Emily Brown', skills: 'Project Management' },
    { name: 'Michael Johnson', skills: 'Data Analysis' },
    { name: 'Emily Brown', skills: 'Project Management' },
    { name: 'Michael Johnson', skills: 'Data Analysis' },
    { name: 'Emily Brown', skills: 'Project Management' },

  ];

  const cards = selectedOption === 'shortlisted' ? shortlistedCards : disqualifiedCards;

  const handleApprove = () => {
    console.log(`Approved ${selectedOption} candidates`);
  };

  return (
    <div className="card-details-container">
      <h1>{jobTitle}</h1>
      <div className="option-boxes">
        <div
          className={`option-box ${selectedOption === 'shortlisted' ? 'active' : ''}`}
          onClick={() => handleOptionChange('shortlisted')}
        >
          Shortlisted
        </div>
        <div
          className={`option-box ${selectedOption === 'disqualified' ? 'active' : ''}`}
          onClick={() => handleOptionChange('disqualified')}
        >
          Disqualified
        </div>
      </div>
      <div className="card-list">
        {cards.map((card, index) => (
          <div className="card" key={index}>
            <h3>{card.name}</h3>
            <p>{`Skills: ${card.skills}`}</p>
            <a href="/path-to-cv.pdf" target="_blank" rel="noopener noreferrer" className="view-cv-link">
              View CV
            </a>
          </div>
        ))}
      </div>
      <button className="approve-button" onClick={handleApprove}>
        Approve
      </button>
    </div>
  );
};

export default Candidates;
