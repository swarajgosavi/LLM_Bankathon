import React, { useState } from 'react';
import '../styles/UploadPage.css';

const UploadPage = () => {
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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vehicula mi sit amet fermentum convallis. In tincidunt ligula vitae dolor scelerisque, vel semper nunc volutpat.

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
            {uploadedFiles.map((file, index) => (
              <tr key={index}>
                <td>{file.name}</td>
                <td>{file.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UploadPage;
