import {
    Auth,
    AuthError,
    signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword,
    UserCredential,
  } from 'firebase/auth';
  import { useCallback, useState } from 'react';
  import { EmailAndPasswordActionHook } from './types';