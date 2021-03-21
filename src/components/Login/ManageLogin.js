import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './firebase.config';

export const initializeFirebaseFramework = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app();
  }
};

export const handleGoogleSignIn = async () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  return firebase
    .auth()
    .signInWithPopup(googleProvider)
    .then((res) => {
      const { displayName, photoURL, email } = res.user;
      const signedInUser = {
        isSigned: true,
        displayName: displayName,
        email: email,
        photo: photoURL,
        success: true,
      };
      console.log(res);
      return signedInUser;
    })
    .catch((error) => {
      var errorMessage = error.message;
      return errorMessage;
    });
};

export const handleFbSignIn = async () => {
  const fbProvider = new firebase.auth.FacebookAuthProvider();
  return firebase
    .auth()
    .signInWithPopup(fbProvider)
    .then((res) => {
      const { displayName, photoURL, email } = res.user;
      const signedInUser = {
        isSigned: true,
        displayName: displayName,
        email: email,
        photo: photoURL,
        success: true,
      };
      console.log(res);
      return signedInUser;
    })
    .catch((error) => {
      console.log(error);
    });
};
