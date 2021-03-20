import React, { useContext, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import './Login.css';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faGoogle } from '@fortawesome/free-brands-svg-icons';

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
  const [toggleUser, setToggleUser] = useState(false);
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
  const onSubmit = (data) => {
    const { name, email, password } = data;

    console.log(data);
  };
  return (
    <div className="formDiv">
      <div className="custom__form ">
        <form onSubmit={handleSubmit(onSubmit)}>
          {toggleUser && (
            <>
              <input
                name="name"
                placeholder="Enter Your Name"
                ref={register({ required: true })}
              />
              {errors.name && (
                <span style={{ color: 'red' }}>Please Enter Your Name</span>
              )}
            </>
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
            id="password"
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
          {toggleUser && (
            <>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm Your Password"
                ref={register({
                  pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
                  required: true,
                })}
              />
              {errors.confirmPassword && (
                <span style={{ color: 'red' }}>
                  Password must contain at least 1 number, 1 uppercase, 1
                  lowercase letter and at least 8 or more characters
                </span>
              )}
            </>
          )}
          {toggleUser || (
            <div className="d-flex justify-content-between">
              <span>
                <input type="checkbox" id="check" />
                <label htmlFor="check">Remember Me</label>
              </span>
              <span className="color cursor-pointer">Forgot Password?</span>
            </div>
          )}
          <input
            className="btn btn-submit"
            type="Submit"
            value={toggleUser ? 'Submit' : 'Log In'}
          />
        </form>

        <p className="text-center">
          {toggleUser ? 'Already Have an Account?' : 'Don,t Have an Account? '}{' '}
          <span
            className="color cursor-pointer"
            onClick={() => setToggleUser(!toggleUser)}
          >
            {toggleUser ? 'Log In' : 'Create Account'}
          </span>
        </p>
      </div>
      <div className="otherSignIn text-center">
        <p className="my-2">Or</p>
        <button onClick={handleGoogleSignIn}>
          <span className="google">
            <FontAwesomeIcon icon={faGoogle} />
          </span>
          Sign In With Google
        </button>
        <br />
        <button onClick={handleFbSignIn}>
          <span className="fb">
            <FontAwesomeIcon icon={faFacebookF} />
          </span>
          Sign In With Facebook
        </button>
      </div>
    </div>
  );
};

export default Login;
