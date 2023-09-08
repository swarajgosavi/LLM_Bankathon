from firebase_config import firebase
from utils import list_user_cvs

print( list_user_cvs( firebase , "1234" ) )
firebase.storage().download(path="cv/1234/resume_01.pdf", filename="cv/1234/resume_01.pdf")
firebase.storage().download(path="cv/1234/resume_02.pdf", filename="cv/1234/resume_02.pdf")