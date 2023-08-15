import React, { useEffect, useState } from "react";
import {db } from "../fb";
import { setDoc, doc } from "firebase/firestore";
import { Link } from "react-router-dom";
import { loggedInUser } from '../App';


function Button({ data, jobdesc }) {

  const handleUpload = async (senddata) => {
    console.log(jobdesc)
    try {
      const docRef = await setDoc(
        doc(db, "users", loggedInUser.uid, "Job Decsription", jobdesc.job_title),
        {
          title: jobdesc.job_title,
          description: senddata,
          mustHaveSkills: jobdesc.skills_must,
          goodToHaveSkills: jobdesc.skills_good,
          requirements: jobdesc.min_qualification,
        }
      );
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }

    return (
      <div className="next">
        <Link to="/upload"><button className="continue" onClick={() => handleUpload(data)}>Continue</button></Link>
        <Link to="/upload"><button className="original" onClick={() => handleUpload(jobdesc.job_description)}>Keep Original</button></Link>
      </div>
    );
}

export default Button