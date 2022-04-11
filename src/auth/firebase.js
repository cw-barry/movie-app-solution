import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
};
// const firebaseConfig = {
//   apiKey: "AIzaSyCg1fCEO8i7MQnM3SiMJPiVcADp_NI9XTw",
//   authDomain: "movie-app-1-6ec44.firebaseapp.com",
//   projectId: "movie-app-1-6ec44",
//   storageBucket: "movie-app-1-6ec44.appspot.com",
//   messagingSenderId: "950886341278",
//   appId: "1:950886341278:web:f4feb188157227da55398f",
// };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const createUser = async (email, password, displayName) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);

    await updateProfile(auth.currentUser, { displayName: displayName });
    console.log(auth.currentUser);
  } catch (err) {
    alert(err.message);
  }
};

export const signIn = async (email, password) => {
  try {
    let userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log(userCredential);
    // localStorage.setItem("token", userCredential.user.accessToken);
  } catch (err) {
    alert(err.message);
  }
};

export const logOut = () => {
  signOut(auth);
};

export const userObserver = (setCurrentUser) => {
  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      setCurrentUser(currentUser);
    } else {
      // User is signed out
      setCurrentUser(false);
    }
  });
};

export const signUpProvider = () => {
  const googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({ prompt: "select_account" });
  signInWithPopup(auth, googleProvider)
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error.message);
    });
};

export const forgotPassword = (email) => {
  sendPasswordResetEmail(auth, email)
    .then(() => {
      // Password reset email sent!
      alert("Please check your mail box!");
    })
    .catch((err) => {
      alert(err.message);
      // ..
    });
};
