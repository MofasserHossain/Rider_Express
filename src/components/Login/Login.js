import React, { useContext, useState, useRef } from 'react';
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
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState({
    isSigned: false,
    name: '',
    email: '',
    photo: '',
    password: '',
    error: '',
    success: false,
    updateUser: false,
  });
  const handleGoogleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then((res) => {
        const newUser = { ...user };
        newUser.error = '';
        newUser.success = true;
        setUser(newUser);
        setLoggedInUser(res.user);
        history.replace(from);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage, errorCode);
        setUser({
          error: errorMessage,
        });
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
        setLoggedInUser(user);
        history.replace(from);
      })
      .catch((error) => {
        var errorMessage = error.message;
        console.log(errorMessage);
        setUser({
          error: errorMessage,
        });
      });
  };
  const { register, handleSubmit, errors, watch } = useForm();
  const password = useRef({});
  password.current = watch('password', '');
  const updateUser = (name) => {
    const user = firebase.auth().currentUser;
    user
      .updateProfile({
        displayName: name,
      })
      .then(function () {
        console.log('user Information Updated');
        setLoggedInUser(user);
        history.replace(from);
      })
      .catch(function (error) {
        console.log(error);
        var errorMessage = error.message;
        setUser({
          error: errorMessage,
        });
      });
  };
  const onSubmit = (data) => {
    const { email, password, name } = data;
    console.log('clicked');
    if (isSignedIn) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((res) => {
          const newUser = { ...user };
          newUser.error = '';
          newUser.success = true;
          setUser(newUser);
          updateUser(name);
          history.replace(from);
        })
        .catch((error) => {
          var errorMessage = error.message;
          setUser({
            error: errorMessage,
          });
          console.log(errorMessage);
        });
    } else {
      console.log('sign in button clicked');
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((res) => {
          const newUser = { ...user };
          newUser.error = '';
          newUser.success = true;
          setUser(newUser);
          setLoggedInUser(res.user);
          history.replace(from);
        })
        .catch((error) => {
          var errorMessage = error.message;
          console.log(errorMessage);
        });
    }
  };

  return (
    <div className="formDiv text-center">
      {user.error && <p style={{ color: 'red' }}>{user.error}</p>}
      {user.success && (
        <p style={{ color: 'green' }}>
          User {isSignedIn ? 'Created' : 'Logged In'} Successfully
        </p>
      )}
      <div className="custom__form ">
        <form onSubmit={handleSubmit(onSubmit)}>
          {isSignedIn && (
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
          {errors.email && (
            <span style={{ color: 'red' }}>Please Enter Your Email</span>
          )}
          <input
            name="password"
            type="password"
            placeholder="Enter Your Password"
            ref={register({
              pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
            })}
          />
          {errors.password && <p>{errors.password.message}</p>}
          {errors.password && (
            <p style={{ color: 'red' }}>
              password must contain at least 1 number, 1 uppercase, 1 lowercase
              letter and at least 8 or more characters
            </p>
          )}
          {isSignedIn && (
            <>
              <input
                name="confirmPassword"
                type="password"
                placeholder="Confirm Your Password"
                ref={register({
                  pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
                  validate: (value) =>
                    value === password.current || 'The passwords do not match',
                })}
              />
              {errors.password && <p>{errors.password.message}</p>}
              {errors.confirmPassword && (
                <p style={{ color: 'red' }}>
                  {errors.confirmPassword?.message}
                </p>
              )}
            </>
          )}
          {!isSignedIn && (
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
            type="submit"
            value={isSignedIn ? 'Submit' : 'Log In'}
          />
        </form>

        <p className="text-center">
          {isSignedIn ? 'Already Have an Account?' : 'Don,t Have an Account? '}{' '}
          <span
            className="color cursor-pointer"
            onClick={() => setIsSignedIn(!isSignedIn)}
          >
            {isSignedIn ? 'Log In' : 'Create Account'}
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
