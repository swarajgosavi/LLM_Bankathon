import firebase_admin
import pyrebase
from firebase_admin import credentials
from firebase_admin import firestore

firebase_config = {
  "apiKey"              : "<credential>",
  "authDomain"          : "<credential>",
  "projectId"           : "<credential>",
  "storageBucket"       : "<credential>",
  "messagingSenderId"   : "<credential>",
  "appId"               : "<credential>",
  "measurementId"       : "<credential>",
  "serviceAccount"      : "<credential>",
  "databaseURL"         : "<credential>"
}


cred = credentials.Certificate( "credentials/<config>.json" )
firebase_admin.initialize_app(cred)

firestore_client = firestore.client()
firebase = pyrebase.initialize_app( firebase_config )