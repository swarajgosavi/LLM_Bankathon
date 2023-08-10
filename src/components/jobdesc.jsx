import React, { useState } from "react";
import BarGraph from "./generate";
import job from '../images/job-description.png'
import useFetch from "../useFetch";

function GenerateBox({ content, jobdesc }) {

  var formdata = new FormData();

  let populationArr = Object.entries(jobdesc);
  for (var pair of populationArr) {
    formdata.append(pair[0], pair[1])
  }
  
  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow'
  };  

  const { data, isPending, error } = useFetch('http://localhost:8000/score-enhance-job-desc', requestOptions)

  return (
    <>
    <div className="home">
          { error && <div>{ error }</div>}
          { isPending && <div>Loading...</div> }
          { data && 
          <div className="right">
            <textarea
              placeholder="Generated"
              cols="40"
              rows="5"
              value={data.enhanced}
              readOnly
            ></textarea>
            <div className="bg">
              <BarGraph data={data}></BarGraph>
            </div>
          </div>
          }
      </div>
    
    </>
  );
}

function JobDesc() {
  const [desc, setDesc] = useState("");
  const [generatedContents, setGeneratedContents] = useState([]);

  const [data, setData] = useState({
    job_title: '',
    job_description: '',
    skills_must: '',
    skills_good: '',
    min_qualification: ''
  })



  function handleInput(event) {
    let input = {[event.target.name] : event.target.value}

    setData({ ...data, ...input })
  }

  const handleGenerate = () => {
    
    const generatedContent = `Generated content: ${desc}`;
    // console.log("Generated:", generatedContent);
    setGeneratedContents([...generatedContents, generatedContent]);
    // console.log("Generated Contents:", generatedContents);
    setDesc("");
  };

  return (
    <div className="left">
      
      <div className="heading">Job Description</div>
      
      <div className="title">
        <input type="text" placeholder="Job Title" name="job_title" onChange={event => handleInput(event)}/>
      </div>
      <div className="desc">
        <textarea placeholder="Job Description" cols="40" rows="5" name="job_description" onChange={event => handleInput(event)}></textarea>
      </div>
      <div className="skills">
        <textarea
          id="must-have-skills"
          placeholder="Must Have Skills"
          cols="40"
          rows="5"
          name="skills_must"
          onChange={event => handleInput(event)}
        ></textarea>
        <textarea
          id="good-have-skills"
          placeholder="Good to Have Skills"
          cols="40"
          rows="5"
          name="skills_good"
          onChange={event => handleInput(event)}
        ></textarea>
      </div>
      <div className="min">
        <textarea
          id="min"
          placeholder="Minimum Requirements Qualifications"
          cols="40"
          rows="5"
          name="min_qualification"
          onChange={event => handleInput(event)}
        ></textarea>
      </div>
      <div>
        <button onClick={handleGenerate}>Generate</button>
      </div>
      {/* <div className="right">
        <div className="image">
          <img
            src={job}
            alt="Job Description"
          />
        </div>
      </div> */}
      
      {generatedContents.map((content) => (
        <GenerateBox content={content} jobdesc={data}/>
      ))}
    </div>
  );
}

export default JobDesc;
