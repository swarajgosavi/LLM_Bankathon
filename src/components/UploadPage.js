import React, { useState } from 'react';
import '../styles/UploadPage.css';
import { storage, db } from '../fb';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, doc, getDocs } from 'firebase/firestore';
import { useEffect } from 'react';



const UploadPage = () => {
  const dbInstances = collection(db, '/users/JkDgBJKaFpdohDbE7IupoCl4pfT2/Job Decsription')


  const [array, setArray] = useState([]);
  
  async function getDoc() {  
    const docSnap = await getDocs(dbInstances);
    setArray(docSnap.docs.map(function(item) {
      return { ...item.data(), id: item.id }
    }))
    
  }

  useEffect(() => {
    getDoc();
  }, [])
  

  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    setUploadedFiles(files);
  };

  return (
    <div className="upload-container">
      <div className="left-column col-lg-6">
        <h2>Detailed Description</h2>
        <p>
          {array.map(function(item) {
        return (
          
            <div>
            {item.desc}
          </div>
         
        )
      })}
        </p>
      </div>
      <div className="right-column col-lg-6">
        <h2>Upload CV</h2>
        <input type="file" accept=".pdf,.doc,.docx" multiple onChange={handleFileUpload} />
        <h3>Uploaded Files</h3>
        <table className="file-table">
          <thead>
            <tr>
              <th>File Name</th>
              <th>File Type</th>
            </tr>
          </thead>
          <tbody>
            {uploadedFiles.map((file, index) => {

              const cvRef = ref(storage, 'cvs/' + file.name);
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
                });
              }
              );


      return ( <tr key={index}>
                <td>{file.name}</td>
                <td>{file.type}</td>
              </tr>
            )}
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UploadPage;
