import React, { useState } from 'react';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import { useHistory } from 'react-router-dom';
import '../styles/Login.css';
import { auth } from "../fb";
import googleIcon from '../images/google.png';
import deskImg from '../images/desk.jpg';
import companyLogo from '../images/company-logo.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleSignIn = () => {
    const authInstance = getAuth();

    signInWithEmailAndPassword(authInstance, email, password)
      .then((userCredential) => {
        console.log('User signed in:', userCredential.user.uid);
        history.push('/');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="company-logo-container">
          <img src={companyLogo} alt="Company Logo" className="company-logo" />
        </div>
        <h3>Login</h3>
        <div className="input-container">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-container">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="forgot-password">
          <a href="/">Forgot Password?</a>
        </div>
        <button className="sign-in-btn" onClick={handleSignIn}>Sign In</button>
        <div className="or-divider">
          <span>or</span>
        </div>
        <button className="google-sign-in-btn">
          <img
            src={googleIcon}
            alt="Google Icon"
            className="google-icon"
          />
          Sign In with Google
        </button>
        <div className="signup-link">
          <p>Don't have an account? <a href="/signup">Sign up</a></p>
        </div>
      </div>
      <div className="login-image">
        <img
          src={deskImg}
          alt="Google Icon"
          className='login-img'
        />
      </div>
    </div>
  );
};

export default Login;
