// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  //Could not get this to work in Docker
  // apiKey: process.env.FIREBASE_APIKEY,
  // authDomain: process.env.FIREBASE_AUTHDOMAIN,
  // projectId: process.env.FIREBASE_PROJECTID,
  // storageBucket: process.env.FIREBASE_STORAGEBUCKET,
  // messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID,
  // appId: process.env.FIREBASE_APPID,

  apiKey: 'AIzaSyAa5ucD3bm5xaGvadx4Qly5_zPhlSslaUY',
  authDomain: 'testauth-a8d61.firebaseapp.com',
  projectId: 'testauth-a8d61',
  storageBucket: 'testauth-a8d61.appspot.com',
  messagingSenderId: '744795681690',
  appId: '1:744795681690:web:fe30a41447d49512424023',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export { auth };
