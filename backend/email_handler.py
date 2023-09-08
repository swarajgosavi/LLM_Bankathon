import random
import smtplib
import ssl
import string
from email.message import EmailMessage
from typing import List, Dict, Tuple

from firebase_config import firestore_client


class EmailHandler:

    __email_sender = '<email-id>'
    __email_password = '<password>'

    @staticmethod
    def send_recipients( sender_list: List[str] , hr_id: str , job_description_id: str ):
        subject = open( "templates/TEMPLATE_email_subject.txt" , "r" ).read()
        body = open( "templates/TEMPLATE_email_content.txt" , "r" ).read()
        email_uid = {}
        sender_list = [ email.strip() for email in sender_list ]
        # Replace fields in email template with UID and password
        for sender in sender_list:
            random_uid = EmailHandler.__get_random_string( 6 )
            random_password = EmailHandler.__get_random_string( 6 )
            body = body.replace( "$UID" , random_uid )
            body = body.replace( "$PASSWORD" , random_password )
            email = EmailMessage()
            email['From'] = EmailHandler.__email_sender
            email['To'] = EmailHandler.__email_sender
            email['Bcc'] = ", ".join( [ sender ] )
            email['Subject'] = subject
            email.set_content(body)
            context = ssl.create_default_context()
            with smtplib.SMTP_SSL('smtp.gmail.com', 465, context=context) as smtp:
                smtp.login( EmailHandler.__email_sender , EmailHandler.__email_password )
                smtp.sendmail( EmailHandler.__email_sender , [ sender ] , email.as_string() )
            email_uid[ sender ] = ( random_uid , random_password )
        EmailHandler.__update_in_db( email_uid , hr_id , job_description_id )


    # Add UID and password in Cloud FireStore
    @staticmethod
    def __update_in_db( email_uid: Dict[str,Tuple[str,str]] , hr_id: str , job_description_id: str ):
        candidates = firestore_client \
            .collection( "users" ) \
            .document( hr_id ) \
            .collection( "Job Decsription" ) \
            .document( job_description_id ) \
            .collection( "Candidate" )
        for doc in candidates.stream():
            print( dir( doc ) )
            email = doc.get( "email" )
            print( email )
            uid , password = email_uid[ email ]
            doc.reference.update( { "exam_uid": uid , "exam_password": password } )

    # Generates a random string for UID and password
    @staticmethod
    def __get_random_string( length: int ) -> str:
        return ''.join( random.choices(string.ascii_uppercase + string.digits, k=length) )
