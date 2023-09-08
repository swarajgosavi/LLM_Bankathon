import os
from typing import Dict
from typing import List

from PyPDF2 import PdfReader

from chat_handler import ChatCompletionHandler
from firebase_config import firebase, firestore_client
from response_parsers import parse_json_as_dict
from task_prompts import PromptBuilder
from task_prompts import Tasks
from utils import list_user_cvs

# Represents a downloaded CV present 
# in the local storage
class DownloadedCV:

    def __init__( self ,
                  cv_id: str ,
                  local_filepath: str ,
                  name: str = None,
                  email_id: str = None,
                  ):
        self.email_id = email_id
        self.name = name
        self.cv_id = cv_id
        self.local_filepath = local_filepath
        self.score = 0


class CVHandler:

    # Download all CVs under hr_id/job_description_id
    # Parse text from them
    # Send them to the ChatGPT API for scoring
    # return scores as response
    @staticmethod
    def score_cvs(hr_id: str, job_description_id: str, job_description: str) -> Dict[ DownloadedCV , int]:
        local_user_dir_path = "cv/{}".format(hr_id)
        if not os.path.exists(local_user_dir_path):
            os.makedirs(local_user_dir_path)
        cvs_list = CVHandler.download_cvs(hr_id)
        cvs_list = [CVHandler.score_cv_with_job_desc( cv , job_description) for cv in cvs_list]
        scores = [ cv.score for cv in cvs_list ]
        for cv in cvs_list:
            CVHandler.update_to_db( hr_id , job_description_id , cv.cv_id , cv.name , cv.email_id , cv.score , "" )
        cvs = dict(zip( [ cv.cv_id for cv in cvs_list ] , scores ))
        return cvs
    
    # Score the CV against the job description
    @staticmethod
    def score_cv_with_job_desc( cv: DownloadedCV , job_description: str ) -> DownloadedCV:
        cv_content = CVHandler.parse_cv_content( cv.local_filepath )
        prompt = PromptBuilder.build(Tasks.SCORE_JOB_DESC_WITH_CV, cv_content, job_description)
        response = ChatCompletionHandler.get_response( prompt )
        response = parse_json_as_dict( response )
        cv.name = response[ "name" ]
        cv.email_id = response[ "email" ]
        cv.score = int(response[ "score" ])
        return cv
    
    # Download CVs from Firebase Storage
    @staticmethod
    def download_cvs( user_id: str ) -> List[DownloadedCV]:
        pdfs_list = list_user_cvs(firebase, user_id)
        print( pdfs_list )
        cvs_list = []
        for file in pdfs_list:
            firebase.storage().download( path=file , filename=file )
            cvs_list.append( DownloadedCV( os.path.split(file)[1].split( "." )[0] , file ) )
        return cvs_list
    
    # Parse text from the CV
    @staticmethod
    def parse_cv_content( cv_pdf_path: str ) -> str:
        reader = PdfReader( cv_pdf_path )
        text = reader.pages[0].extract_text()
        return text
    
    # Update candidate's email and name as extracted from the CV
    @staticmethod
    def update_to_db( hr_id: str,
                      job_description_id: str,
                      cv_id: str ,
                      name: str ,
                      email_id: str ,
                      score: int ,
                      summary: str ):
        doc = firestore_client \
            .collection( "users" ) \
            .document( hr_id ) \
            .collection( "Job Decsription" ) \
            .document( job_description_id ) \
            .collection( "Candidate" ) \
            .document( cv_id )
        doc.update( { "name" : name , "email_id" : email_id , "summary": summary , "cv_score": score } )


