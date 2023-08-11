import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import '../styles/Candidates.css';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../fb';
import { sendEmailVerification } from 'firebase/auth';

function SendEmail() {
  var formdata = new FormData();
  formdata.append("name", "Shubham");

var requestOptions = {
  method: 'POST',
  body: formdata,
  redirect: 'follow'
};

fetch("http://localhost:8000/test", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

  return (
    <div>
      {alert("Email sent")}
    </div>
  )
}

const Candidates = () => {

  const dbInstances = collection(db, '/users/JkDgBJKaFpdohDbE7IupoCl4pfT2/Job Decsription/xeItrAGr5zYF1k1dcnRp/Candidate')


  const history = useHistory();
  const { jobTitle } = useParams();
  const [array, setArray] = useState([]);
  const [selectedOption, setSelectedOption] = useState('shortlisted');

  const handleOptionChange = () => {
  //   getDocs(collection(db, "/users/JkDgBJKaFpdohDbE7IupoCl4pfT2/Job Decsription/xeItrAGr5zYF1k1dcnRp/Candidate"))
  // .then(response => {
  //   console.log(
  //     response.docs.map((item) => {
  //       shortlistedCards.push(item.data())
  //       return {...item.data(), id : item.id}
  //     })
  //   )
  // })
  };

  async function getData() {
    const data = await getDocs(dbInstances);
    setArray(data.docs.map(function(item) {
      return { ...item.data(), id: item.id }
    }))
  }

  useEffect(() => {
    getData();
  }, [])

  let [ emailbool, setEmail ] = useState(false)

  function sendEmail() {
    console.log(emailbool)
    setEmail(true)
    console.log(emailbool)
     
  }

  // shortlistedCards = [
  //   { name: 'John Doe', skills: 'Frontend Development' },
  //   { name: 'Jane Smith', skills: 'UI/UX Design' },
  //   { name: 'John Doe', skills: 'Frontend Development' },
  //   { name: 'Jane Smith', skills: 'UI/UX Design' },
  // ];

  // const disqualifiedCards = [
  //   { name: 'Michael Johnson', skills: 'Data Analysis' },
  //   { name: 'Emily Brown', skills: 'Project Management' },
  //   { name: 'Michael Johnson', skills: 'Data Analysis' },
  //   { name: 'Emily Brown', skills: 'Project Management' },
  //   { name: 'Michael Johnson', skills: 'Data Analysis' },
  //   { name: 'Emily Brown', skills: 'Project Management' },
  //   { name: 'Michael Johnson', skills: 'Data Analysis' },
  //   { name: 'Emily Brown', skills: 'Project Management' },
  // ];

  // const cards = selectedOption === 'shortlisted' ? shortlistedCards : disqualifiedCards;

  // const handleApprove = () => {
  //   console.log(`Approved ${selectedOption} candidates`);
  // };

  return (
    <div className="card-details-container">
      <h1>{jobTitle}</h1>
      <div className="option-boxes">
        <div
          className={`option-box ${selectedOption === 'shortlisted' ? 'active' : ''}`}
          onClick={getData}
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
        {array.map(function(item) {
        return (
          
            <div className="card">
            <h3>{item.name}</h3>
            <p>{`Email: ${item.email}`}</p>
            <a href={item.CV} target="_blank" rel="noopener noreferrer" className="view-cv-link">
              View CV
            </a>
          </div>
         
        )
      })}
      </div>
      <button className="approve-button" onClick={sendEmail}>
        Approve
      </button>
      { emailbool && <SendEmail />}
    </div>
  );
};

export default Candidates;
