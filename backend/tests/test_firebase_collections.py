import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

cred = credentials.Certificate( "credentials/bankathon-df037-firebase-adminsdk-hwk1v-98b700ebc1.json" )
firebase_admin.initialize_app(cred)

client = firestore.client()

print( client.collection( "users" ).document( "JkDgBJKaFpdohDbE7IupoCl4pfT2" ).get().to_dict() )