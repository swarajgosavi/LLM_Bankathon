import React, { useState } from 'react';
import '../styles/TestInterface.css'; // You can create this stylesheet

var formdata = new FormData();
var formdata = new FormData();
formdata.append("job_title", "Bank Manager");
formdata.append("job_description", "Vodafone Idea Limited is an Aditya Birla Group and Vodafone Group partnership. It is India’s leading telecom service provider. The Company provides pan India Voice and Data services across 2G, 3G and 4G platform. With the large spectrum portfolio to support the growing demand for data and voice, the company is committed to deliver delightful customer experiences and contribute towards creating a truly ‘Digital India’ by enabling millions of citizens to connect and build a better tomorrow. The Company is developing infrastructure to introduce newer and smarter technologies, making both retail and enterprise customers future ready with innovative offerings, conveniently accessible through an ecosystem of digital channels as well as extensive on-ground presence. The Company is listed on National Stock Exchange (NSE) and Bombay Stock Exchange (BSE) in India.");
formdata.append("skills_must", "good communication, accounting");
formdata.append("skills_good", "proficiency in MS Excel, Tally");

var requestOptions = {
  method: 'POST',
  body: formdata,
  redirect: 'follow'
};

const { data, isPending, error } = useFetch('http://localhost:8000/job-desc-readability', requestOptions)

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
  
  questions = data

const TestInterface = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(''));

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Handle submission
      console.log('Answers:', JSON.stringify(answers));
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
