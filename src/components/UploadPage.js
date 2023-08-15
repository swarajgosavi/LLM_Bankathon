import React, { useState } from 'react';
import '../styles/UploadPage.css';
import { storage, db } from '../fb';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, doc, getDoc, addDoc, setDoc } from 'firebase/firestore';
import { useEffect } from 'react';
import { loggedInUser } from '../App';
import { Link } from 'react-router-dom';
import useFetch from "../useFetch";

function GenerateCV(desc) {
  var formdata = new FormData();
  formdata.append("hr_id", loggedInUser.uid);
  formdata.append("job_description_id", "Bank Manager");
  formdata.append("job_description", desc);

  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow'
  };  

  const { data, isPending, error } = useFetch('http://localhost:8000/score-cv', requestOptions)

  return (
    <div>
      { error && <div>{ error }</div>}
      { isPending && <div>Loading...</div> }
      { data && <p>{JSON.stringify(data)}</p>}
    </div>
  )

}

const UploadPage = () => {

  const dbInstances = doc(db, 'users', loggedInUser.uid, 'Job Decsription/Bank Manager')

  const [desc, setDesc] = useState(null);
  const [show, setShow] = useState(false)

  useEffect(() => {
    async function fetchdata() {
      const docSnap = await getDoc(dbInstances);
      console.log(docSnap.data())
      setDesc(docSnap.data().description.enhanced)
      setShow(true)
    }
    fetchdata()
    return () => {}
  }, [])
  

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploadDone, setUploadDone] = useState(false);
  const [cvScoring, setCvScoring] = useState(false);



  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    setUploadedFiles(files);
    setUploadDone(false)
  };


  function uploadFiles() {
    uploadedFiles.map((file, index) => {

      const fileRef = collection(db, 'users', loggedInUser.uid, 'Job Decsription/Bank Manager/Candidate');
      addDoc(fileRef, {
        file_name: file.name
      })
      .then((docRef) => {
        const cvRef = ref(storage, 'cv/' + loggedInUser.uid + '/' + docRef.id + '.pdf');
        const uploadTask = uploadBytesResumable(cvRef, file)

        uploadTask.on('state_changed', 
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        }, 
        (error) => {
          alert(error.message)
        }, 
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            setDoc(docRef, {
              cv_url: downloadURL
            },
            { merge: true })
          });
          setUploadDone(true)
        }
        );
      })
      .catch((error) => {
        console.error('Error storing user data:', error);
      });
      }
    )
  }

  function scoreCV() {
    setCvScoring(true)
  }

  return (
    <div className="upload-container">
      <div className="left-column">
        <h2>Detailed Description</h2>
        <p>
          {show && desc}
        </p>
      </div>
      <div className="right-column">
        <h2>Upload CV</h2>
        <input type="file" accept=".pdf,.doc,.docx" multiple onChange={handleFileUpload} />
        <button type='submit' onClick={uploadFiles}>Upload Files</button>

        <h3>Uploaded Files</h3>

        <table className="file-table">
          <thead>
            <tr>
              <th>File Name</th>
              <th>File Type</th>
            </tr>
          </thead>
          <tbody>
          {uploadDone && uploadedFiles.map((file, index) => {
              return ( 
                <tr key={index}>
                  <td>{file.name}</td>
                  <td>{file.type}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
        {uploadDone && <button type='submit' onClick={scoreCV}>Continue</button>}
        <hr/>
        {cvScoring && <GenerateCV desc={desc.enhanced}/>}
      </div>
    </div>
  );
};

export default UploadPage;
