import React, { useContext, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import './Login.css';
import { useForm } from 'react-hook-form';

const Login = () => {
  // . location
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: '/' } };
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app();
  }
  const [user, setUser] = useState({
    isSigned: false,
    name: '',
    email: '',
    photo: '',
    password: '',
    error: '',
  });
  const handleGoogleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then((res) => {
        const { displayName, photoURL, email } = res.user;
        setUser({
          isSigned: true,
          name: displayName,
          email: email,
          photo: photoURL,
        });
        setLoggedInUser(res.user);
        history.replace(from);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage, errorCode);
      });
  };

  const handleFbSignIn = () => {
    var FbProvider = new firebase.auth.FacebookAuthProvider();
    firebase
      .auth()
      .signInWithPopup(FbProvider)
      .then((result) => {
        var user = result.user;
        console.log(user);
        const { displayName, photoURL, email } = result.user;
        setUser({
          isSigned: true,
          name: displayName,
          email: email,
          photo: photoURL,
        });
        setLoggedInUser(user);
        history.replace(from);
      })
      .catch((error) => {
        var errorMessage = error.message;
        console.log(errorMessage);
      });
  };
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <div className="formDiv">
      <div className="custom__form ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            name="name"
            placeholder="Enter Your Name"
            ref={register({ required: true })}
          />
          {errors.name && (
            <span style={{ color: 'red' }}>Please Enter Your Name</span>
          )}
          <input
            name="email"
            placeholder="Enter Your Email"
            ref={register({ required: true, pattern: /\S+@\S+\.\S+/ })}
          />
          {errors.name && (
            <span style={{ color: 'red' }}>Please Enter Your Name</span>
          )}
          <input
            name="password"
            type="password"
            placeholder="Enter Your Password"
            ref={register({
              pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
              required: true,
            })}
          />
          {errors.password && (
            <span style={{ color: 'red' }}>
              Password must contain at least 1 number, 1 uppercase, 1 lowercase
              letter and at least 8 or more characters
            </span>
          )}
          <input
            name="password"
            type="password"
            placeholder="Confirm Your Password"
            ref={register({
              pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
              required: true,
            })}
          />
          {errors.password && (
            <span style={{ color: 'red' }}>
              Password must contain at least 1 number, 1 uppercase, 1 lowercase
              letter and at least 8 or more characters
            </span>
          )}
          <input className="btn btn-primary" type="submit" />
        </form>
      </div>

      <button onClick={handleGoogleSignIn}>Sign In With Google</button>
      <br />
      <br />
      <button onClick={handleFbSignIn}>Sign In With Facebook</button>
    </div>
  );
};

export default Login;
