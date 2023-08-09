import React, { useState } from 'react';
import '../styles/TestInterface.css'; // You can create this stylesheet

const questions = [
    '1. Can you describe your experience and background in the banking industry?',
    '2. What strategies have you implemented to increase customer satisfaction and retention in your previous roles?',
    '3. How do you handle challenging customer situations, such as complaints or disputes?',
    '4. Can you provide an example of a successful cross-selling or upselling initiative you\'ve led in your previous role?',
    '5. How do you ensure that your team complies with regulatory and compliance requirements?',
    '6. Describe a time when you had to manage a difficult team member. How did you handle the situation?',
    '7. In the face of increasing digital banking trends, how do you ensure that the branch maintains a strong customer base?',
    '8. How do you monitor and manage financial performance, including targets and budgeting, for your branch?',
    '9. What steps do you take to foster a positive and collaborative work environment among your team?',
    '10. How do you stay updated with industry trends and advancements to ensure your branch\'s offerings remain competitive?',
  ];
  

const TestInterface = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(''));

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Handle submission
      console.log('Answers:', answers);
    }
  };

  const handleAnswerChange = (event) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = event.target.value;
    setAnswers(newAnswers);
  };

  return (
    <div className="test-interface-container">
      <div className="question-window">
        <h5>{questions[currentQuestionIndex]}</h5>
        <textarea
          value={answers[currentQuestionIndex]}
          onChange={handleAnswerChange}
          placeholder="Your answer..."
        />
        <div className="navigation-buttons">
          {currentQuestionIndex < questions.length - 1 && (
            <button onClick={handleNextQuestion}>Next</button>
          )}
          {currentQuestionIndex === questions.length - 1 && (
            <button onClick={handleNextQuestion}>Submit</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestInterface;
