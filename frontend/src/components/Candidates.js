import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/Candidates.css';
import { getDocs, collection, deleteDoc, doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { db } from '../fb';
import { loggedInUser } from '../App';
import useFetch from '../useFetch';
import { jobDescriptionId } from './DashboardHR';

function ScreeningQue({ desc, shortlistedCards }) {

    console.log(desc)

    var formdata = new FormData();
    formdata.append("job_title", desc.title);
    formdata.append("job_description", desc.description.enhanced);
    formdata.append("skills_must", desc.mustHaveSkills);
    formdata.append("skills_good", desc.goodToHaveSkills);

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };

    const { data, isPending, error } = useFetch('http://localhost:8000/screening-questions', requestOptions)

  return (
    <div>
      { error && <div>{ error }</div>}
      { isPending && <div>Loading...</div> }
      { data && 
      <div>
        {shortlistedCards.map((item, index) => {
          let canRef = doc(db, 'users', loggedInUser.uid, 'Job Decsription', jobDescriptionId, 'Candidate', item.id)
          setDoc(canRef, 
            {questions: data.questions},
          {merge: true})
        })}
        <center><button>Continue</button></center>
      </div>
      }
    </div>
  )
}


function SendEmail({ email_recipients, disqualifiedCards, shortlistedCards }) {

  disqualifiedCards.map((item) => {
    const docRef = doc(db, 'users', loggedInUser.uid, 'Job Decsription', jobDescriptionId, 'Candidate', item.id)

    deleteDoc(
      docRef
    )
  })

  const JobRef = doc(db, 'users', loggedInUser.uid, 'Job Decsription', jobDescriptionId)

  const [desc, setDesc] = useState(null);
  const [show, setShow] = useState(false)

  useEffect(() => {
    async function fetchdata() {
      const docSnap = await getDoc(JobRef);
      console.log(docSnap.data())
      setDesc(docSnap.data())
      setShow(true)
    }
    fetchdata()
    return () => {}
  }, [])

  email_recipients = email_recipients.slice(0,-2)

  console.log(email_recipients)

  var formdata = new FormData();
  formdata.append("email_recipients", email_recipients);
  formdata.append("hr_id", loggedInUser.uid);
  formdata.append("job_description_id", "Bank Manager");

  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow'
  };

  const { data, isPending, error } = useFetch('http://localhost:8000/send-email', requestOptions)

  return (
    <div>
      { error && <div>{ error }</div> }
      { isPending && <div>Sending Emails...</div> }
      { data && show && 
      <div>
        <h1>Emails sent !</h1>
        <ScreeningQue desc={desc} shortlistedCards={shortlistedCards} />
      </div> }
    </div>
  )
}


const Candidates = () => {
  const dbInstances = collection(db, 'users', loggedInUser.uid, 'Job Decsription', jobDescriptionId, 'Candidate')


  const { jobTitle } = useParams();
  const [array, setArray] = useState([]);
  const [selectedOption, setSelectedOption] = useState('shortlisted');

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  useEffect(() => {
    async function getData() {
      const data = await getDocs(dbInstances);
      setArray(data.docs.map(function(item) { 
        return { ...item.data(), id: item.id }
      }))
    }
    getData()
  }, [])

  let [ emailbool, setEmail ] = useState(false)

  function sendEmail() {
    console.log(emailbool)
    setEmail(true)
    console.log(emailbool)
  }

  const shortlistedCards = []
  const disqualifiedCards = []

  const cards = selectedOption === 'shortlisted' ? shortlistedCards : disqualifiedCards;

  let email_recipients = ""

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
        {array.map(function(item, index) {
          if(item.cv_score > 7) {shortlistedCards.push(item)}
          else {disqualifiedCards.push(item)}
        })}
        {selectedOption === 'shortlisted' ? 
        shortlistedCards.map(function(item, index) {
          email_recipients += item.email_id + ", "
        return (
            <div className="card" key={index}>
              <h3>{item.name}</h3>
              <p>{`Email: ${item.email_id}`}</p>
              <a href={item.cv_url} target="_blank" rel="noopener noreferrer" className="view-cv-link">
                View CV
              </a>
            </div>
        )
      }) : 
      disqualifiedCards.map(function(item, index) {
        return (
            <div className="card" key={index}>
              <h3>{item.name}</h3>
              <p>{`Email: ${item.email_id}`}</p>
              <a href={item.cv_url} target="_blank" rel="noopener noreferrer" className="view-cv-link">
                View CV
              </a>
            </div>
        )
      })
      }
      </div>
      <button className="approve-button" onClick={sendEmail}>
        Approve
      </button>
      { emailbool && <SendEmail email_recipients={email_recipients} disqualifiedCards={disqualifiedCards} shortlistedCards={shortlistedCards} /> }
    </div>
  );
};

export default Candidates;
