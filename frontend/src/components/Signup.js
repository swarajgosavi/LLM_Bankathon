import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import googleIcon from '../images/google.png';
import deskImg from '../images/desk.jpg';
import { 
  getAuth, 
  createUserWithEmailAndPassword,
  signInWithPopup, 
  GoogleAuthProvider
 } from 'firebase/auth';
import { db } from '../fb';
import { doc, setDoc } from 'firebase/firestore';
import '../styles/Signup.css';


const Signup = () => {
  const history = useHistory();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handleSignUp = () => {
    if (password === confirmPassword) {
      const authInstance = getAuth();
      createUserWithEmailAndPassword(authInstance, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          const userRef = doc(db, 'users', user.uid);
          setDoc(userRef, {
            name: name,
            email: email,
            companyName: companyName,
          })
          .then(() => {
            history.push('/');
          })
          .catch((error) => {
            console.error('Error storing user data:', error);
          });
        })
        .catch((error) => {
          const errorMessage = error.message;
          console.log(errorMessage);
        });
    } else {
      setPasswordsMatch(false);
    }
  };

  const handleSignUpGoogle = () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log(token, user)
          const userRef = doc(db, 'users', user.uid);
          setDoc(userRef, {
            name: user.displayName,
            email: user.email,
          })
          .then(() => {
            history.push('/');
          })
          .catch((error) => {
            console.error('Error storing user data:', error);
          });
      })
      .catch((error) => {
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorMessage, email, credential)
      });
  }

  return (
    <div className="login-container">
      <div className="login-content">
        <h3>Signup</h3>
        <div className="input-container">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="input-container">
          <input
            type="text"
            placeholder="Company Name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>
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
            placeholder="Set Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="input-container">
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        {!passwordsMatch && <p className="password-mismatch">Passwords do not match</p>}
        <button className="sign-in-btn" onClick={handleSignUp}>
          Sign Up
        </button>
        <div className="or-divider">
          <span>or</span>
        </div>
        <button className="google-sign-in-btn" onClick={handleSignUpGoogle}>
          <img src={googleIcon} alt="Google Icon" className="google-icon" />
          Sign Up with Google
        </button>
        <div className="signup-link">
          <p>
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
      </div>
      <div className="login-image">
        <img src={deskImg} alt="Google Icon" className="login-img" />
      </div>
    </div>
  );
};

export default Signup;
