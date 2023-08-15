import React, { useState } from 'react';
import '../styles/TestInterface.css'; // You can create this stylesheet
import { canRef } from './TestLogin';
import { setDoc } from 'firebase/firestore';
import useFetch from '../useFetch';

function Submited({ ans, que }) {
  var formdata = new FormData();
  formdata.append("questions", que);
  formdata.append("answers", ans);

  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow'
  };

  const { data, isPending, error } = useFetch('http://localhost:8000/evaluate-questions', requestOptions)
  return (
    <div>
      { error && <div>{ error }</div> }
      { isPending && <div>Loading...</div> }
      { data && <p>{JSON.stringify(data)}</p>}
    </div>
  )
}

const TestInterface = () => {
  
  const questions = canRef.data().questions

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(''));
  const [submitted, setSubmitted] = useState(false);

  let ansString = ""
  let queString = ""

  const [que, setQue] = useState("")
  const [ans, setAns] = useState("")

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      answers.map((ans) => {
        ansString += ans + ';'
      })
      ansString = ansString.slice(0,-1)
      questions.map((que) => {
        queString += que.question + ';'
      })
      queString = queString.slice(0,-1)
      console.log(ansString, queString)
      setAns(ansString)
      setQue(queString)
      // let canDocRef = canRef.ref
      // setDoc(canDocRef, {
      //   answers: answers
      // },
      // {merge: true})
      console.log('Answers:', JSON.stringify(answers));
      setSubmitted(true); 
    }
  };

  const handleAnswerChange = (event) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = event.target.value;
    setAnswers(newAnswers);
  };

  return (
    <div className="test-interface-container">
      {submitted ? (
            <div className='submission-msg'>
              {submitted && 
              <div>
                <p>Your test has been submitted! You will be further notified through mail.</p>
                <Submited ans={ans} que={que} />
              </div>
              }
            </div>
        ) : (
      <div className="question-window">
        <h5>{currentQuestionIndex+1}. {questions[currentQuestionIndex].question}</h5>
        <textarea className='text-answer' placeholder="Your answer..."
          value={answers[currentQuestionIndex]}
          onChange={handleAnswerChange}
          />
        <div className="navigation-buttons" >
          {currentQuestionIndex < questions.length - 1 && (
            <button className='test-btn' onClick={handleNextQuestion}>Next</button>
          )}
          {currentQuestionIndex === questions.length - 1 && (
            <button className='test-btn' onClick={handleNextQuestion}>Submit</button>
          )}
        </div>
      </div>
        )}
    </div>
  );
};

export default TestInterface;
