from enum import Enum
from typing import Callable
from typing import Dict
from typing import List

from response_parsers import parse_json_as_dict
from response_parsers import parse_score
from response_parsers import parse_yes_no


class PromptTemplate:

    def __init__( self ,
                  template_path: str ,
                  arg_flags: List[str] ,
                  response_map_func: Callable[ [str], Dict[ str , str] ]
                  ):
        self.template_path = template_path
        self.num_args = len( arg_flags )
        self.arg_flags = arg_flags
        self.prompt = None
        self.response_map_func = response_map_func

    def create( self , args: List[str] ) -> str:
        assert len( args ) == len( self.arg_flags )
        template_content = open( self.template_path , "r" ).read()
        for i in range( len( args ) ):
            template_content = template_content.replace( "$" + self.arg_flags[i] , args[i] )
        self.prompt = template_content
        return self.prompt

    def parse_response( self , response ) -> Dict[str,str]:
        return self.response_map_func( response )


class Tasks( Enum ):

    SCORE_JOB_DESC_WITH_CV = \
        PromptTemplate(
            "templates/TEMPLATE_score_job_desc_with_cv.txt" ,
            [ "CV_CONTENT" , "JOB_DESCRIPTION" ] ,
            parse_score
        )

    # ------------------------------- v2 -----------------------------------------------

    JOB_DESCRIPTION_SCORE_ENHANCE = \
        PromptTemplate(
            "templates/TEMPLATEv2_score_enhance_job_description.txt",
            ["JOB_TITLE" , "JOB_DESCRIPTION" , "SKILLS_MUST" , "SKILLS_GOOD", "MIN_QUALIFICATION" ],
            parse_json_as_dict
        )

    SCREENING_QUESTIONS = \
        PromptTemplate(
            "templates/TEMPLATEv2_screening_questions.txt",
            [ "JOB_TITLE" , "JOB_DESCRIPTION" , "SKILLS_MUST" , "SKILLS_GOOD" ],
            parse_json_as_dict
        )

    EVALUATION_OF_QUESTIONS = \
        PromptTemplate(
            "templates/TEMPLATEv2_evaluation_of_questions.txt" ,
            [ "Q_1" , "Q_2" , "Q_3" , "Q_4" , "Q_5" , "Q_6" , "Q_7" , "Q_8" , "Q_9" , "Q_10" ,
              "A_1" , "A_2" , "A_3" , "A_4" , "A_5" , "A_6" , "A_7" , "A_8" , "A_9" , "A_10" ] ,
            parse_yes_no
        )

    EVALUATION_OF_QUESTIONS_X = \
        PromptTemplate(
            "templates/TEMPLATEv222_evaluation_of_questions.txt",
            ["Q_1", "Q_2",
             "A_1", "A_2"],
            parse_yes_no
        )


class PromptBuilder:

    @staticmethod
    def build( task: Tasks , *args: str ) -> str:
        return task.value.create( list(args) )

    @staticmethod
    def parse_output( task: Tasks , response: str ) -> Dict[str,str]:
        return task.value.parse_response( response )



