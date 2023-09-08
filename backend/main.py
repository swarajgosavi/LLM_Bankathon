import os
from typing import Annotated

import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.params import Form

from chat_handler import ChatCompletionHandler
from cv_handler import CVHandler
from email_handler import EmailHandler
from task_prompts import PromptBuilder
from task_prompts import Tasks

app = FastAPI( title="llm-inference-server" )

origins = [
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# To test whether the endpoints are functioning
@app.post( "/test" )
async def echo( name: Annotated[ str , Form() ] ):
    return { "Hello {}!".format( name ) }

# Endpoint for enhancing the job description
# with readability, gender-bias and sentence formation
@app.post("/score-enhance-job-desc" )
async def score_enhance_job_desc(
        job_title: Annotated[ str , Form() ] ,
        job_description: Annotated[ str , Form() ] ,
        skills_must: Annotated[ str , Form() ] ,
        skills_good: Annotated[ str , Form() ] ,
        min_qualification: Annotated[ str , Form() ]
):
    task = Tasks.JOB_DESCRIPTION_SCORE_ENHANCE
    prompt = PromptBuilder.build(task, job_title, job_description, skills_must, skills_good, min_qualification)
    response = ChatCompletionHandler.get_response(prompt)
    return PromptBuilder.parse_output(task, response)

# Endpoint for generating screening questions 
@app.post("/screening-questions" )
async def screening_questions(
        job_title: Annotated[ str , Form() ] ,
        job_description: Annotated[ str , Form() ] ,
        skills_must: Annotated[ str , Form() ] ,
        skills_good: Annotated[ str , Form() ] 
):
    task = Tasks.SCREENING_QUESTIONS
    prompt = PromptBuilder.build(task, job_title, job_description, skills_must, skills_good)
    response = ChatCompletionHandler.get_response(prompt)
    return PromptBuilder.parse_output(task, response)

# Endpoint for evaluating the questions based
# of candidate responses
@app.post( "/evaluate-questions" )
async def evaluate(
        questions: Annotated[ str , Form() ] ,
        answers: Annotated[ str , Form() ]
):
    task = Tasks.EVALUATION_OF_QUESTIONS
    questions = questions.split( ";" )
    answers = answers.split( ";" )
    prompt = PromptBuilder.build( task , *questions , *answers )
    response = ChatCompletionHandler.get_response(prompt)
    return PromptBuilder.parse_output(task, response)

# Endpoint for sending emails to 
# shortlisted candidates
@app.post( "/send-email" )
async def send_email(
        email_recipients: Annotated[ str , Form() ] ,
        hr_id: Annotated[ str , Form() ] ,
        job_description_id: Annotated[ str , Form() ]
):
    recipients = email_recipients.split( "," )
    EmailHandler.send_recipients( recipients , hr_id , job_description_id )
    return { "response" : "ok" }

# Endpoint for scoring CVs given the job description
@app.post("/score-cv" )
async def score_cv(
        hr_id: Annotated[ str , Form() ] ,
        job_description_id: Annotated[ str , Form() ] ,
        job_description: Annotated[ str , Form() ] ):
    ids = CVHandler.score_cvs( hr_id , job_description_id , job_description )
    return ids


if __name__ == "__main__":
    uvicorn.run( app , host="0.0.0.0" , port=int(os.getenv( "PORT" , default=8000 )) )
