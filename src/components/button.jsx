import React, { useEffect, useState } from "react";
import {db} from "../fb";
import { setDoc, doc } from "firebase/firestore";


function Button({ data, jobdesc }) {

  const handleUpload = async (senddata) => {
    console.log(jobdesc)
    try {
      const docRef = await setDoc(
        doc(db, "/users/JkDgBJKaFpdohDbE7IupoCl4pfT2/Job Decsription", jobdesc.job_title),
        {
          title: jobdesc.job_title,
          description: senddata,
          mustHaveSkills: jobdesc.skills_must,
          goodToHaveSkills: jobdesc.skills_good,
          requirements: jobdesc.min_qualification,
        }
      );
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }

    return (
      <div className="next">
        <button className="continue" onClick={() => handleUpload(data)}>Continue</button>
        <button className="original" onClick={() => handleUpload(jobdesc.job_description)}>Keep Original</button>
      </div>
    );
}

export default Button