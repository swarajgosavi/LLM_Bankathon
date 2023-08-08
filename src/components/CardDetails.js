import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import '../styles/CardDetails.css';

const CardDetails = () => {
  const history = useHistory();
  const { jobTitle } = useParams();
  const [selectedOption, setSelectedOption] = useState('shortlisted');

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="card-details-container">
      <h1>{jobTitle}</h1>
      <div className="switch-selector">
        <div
          className={`option ${selectedOption === 'shortlisted' ? 'active' : ''}`}
          onClick={() => handleOptionChange('shortlisted')}
        >
          Shortlisted
        </div>
        <div
          className={`option ${selectedOption === 'disqualified' ? 'active' : ''}`}
          onClick={() => handleOptionChange('disqualified')}
        >
          Disqualified
        </div>
        <div className={`selector ${selectedOption}`} />
      </div>
      <button onClick={() => history.goBack()}>Go Back</button>
    </div>
  );
};

export default CardDetails;
