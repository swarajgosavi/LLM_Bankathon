import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/TestLogin.css';
import googleIcon from '../images/google.png';
import deskImg from '../images/desk.jpg';
import companyLogo from '../images/company-logo.png';
import { collectionGroup, query, where, getDocs } from "firebase/firestore";
import { db } from '../fb';

export let canRef = null

const TestLogin = () => {
  const [examid, setExamID] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleSignIn = async () => {

    const eid = query(collectionGroup(db, 'Candidate'), where('exam_uid', '==', examid));
    const querySnapshot = await getDocs(eid);
    querySnapshot.forEach((doc) => {
      console.log(doc.documentId, doc.id, ' => ', doc.data());
      if(doc.data().exam_password === password) {
        canRef = doc
        history.push('/instructions')
      }
    });
    

  };

  return (
    <div className="login-container-t">
      <div className="login-content-t">
        <div className="company-logo-container">
          <img src={companyLogo} alt="Company Logo" className="company-logo" />
        </div>
        <h3>Login</h3>
        <div className="input-container-t">
          <input
            type="text"
            placeholder="Exam ID"
            value={examid}
            onChange={(e) => setExamID(e.target.value)}
          />
        </div>
        <div className="input-container-t">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="sign-in-btn-t" onClick={handleSignIn}>Sign In</button>

      </div>

    </div>
  );
};

export default TestLogin;
