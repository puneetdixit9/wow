import React, { createContext, useContext } from 'react';
import { initializeApp } from 'firebase/app';

// Initialize your Firebase app
const firebaseConfig = {
    apiKey: "AIzaSyAA1qAUvMrxnXJ-Tu0MG_O6Tc7DPVcXiEM",
    authDomain: "wow-pizza-21db7.firebaseapp.com",
    databaseURL: "https://wow-pizza-21db7-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: 'wow-pizza-21db7',
    storageBucket: "wow-pizza-21db7.appspot.com",
    messagingSenderId: "1093606437364",
    appId: "1:1093606437364:web:89c149dd8dd6da7dca09a1",
    measurementId: "G-6P485FLY30"
  };

const app = initializeApp(firebaseConfig);

// Create a Firebase context
const FirebaseContext = createContext(null);

// Create a Firebase provider component
export const FirebaseProvider = ({ children }) => {
  return (
    <FirebaseContext.Provider value={app}>
      {children}
    </FirebaseContext.Provider>
  );
};

// Custom hook to access the Firebase app instance
export const useFirebase = () => {
  return useContext(FirebaseContext);
};
