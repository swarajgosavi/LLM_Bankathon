import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Instructions.css';

const Instructions = () => {
  return (
    <div className="instructions-container">
      <h1 className="instructions-heading">Candidate Interview Screening Test</h1>
      <div className="instructions-content">
        <div className="instructions-section">
          <h2>Test Overview</h2>
          <ul className="bullet-list">
            <li>This test aims to evaluate your suitability for the position.</li>
            <li>You will be presented with a series of questions to answer.</li>
          </ul>
        </div>
        <div className="instructions-section">
          <h2>Question Format</h2>
          <p>Each question will be displayed one at a time. Type your response in the provided text box below the question.</p>
        </div>
        <div className="instructions-section">
          <h2>Answer Thoughtfully</h2>
          <p>Take your time to understand each question and provide thoughtful and accurate responses.</p>
        </div>
        <div className="instructions-section">
          <h2>Answer Progression</h2>
          <p>You can only proceed to the next question after submitting your response for the current question.</p>
        </div>
        <div className="instructions-section">
          <h2>Time Limit</h2>
          <p>You have 45 minutes for the entire test. Manage your time to attempt all questions.</p>
        </div>
        <div className="instructions-section">
          <h2>Backtracking</h2>
          <p>You cannot revisit or modify responses once you move to the next question. Double-check before proceeding.</p>
        </div>
        <div className="instructions-section">
          <h2>Technical Requirements</h2>
          <p>Ensure stable internet connection and a device with a keyboard for typing answers.</p>
        </div>
        <div className="instructions-section">
          <h2>Honesty and Originality</h2>
          <p>Plagiarism or external sources for answers are not allowed and may result in disqualification.</p>
        </div>
        <div className="instructions-section">
          <h2>Instructions Display</h2>
          <p>Click "Instructions" during the test to review these instructions.</p>
        </div>
        <div className="instructions-section">
          <h2>Test Completion</h2>
          <p>After answering all questions, click "Submit". Your test will be complete, and changes cannot be made.</p>
        </div>
        <div className="instructions-section">
          <h2>Feedback and Further Steps</h2>
          <p>Further communication will be sent via email regarding the next steps in the interview process.</p>
        </div>
      </div>
      <div className="start-button-container">
        <Link to="/test" className="start-button">Start Test</Link>
      </div>
    </div>
  );
};

export default Instructions;
