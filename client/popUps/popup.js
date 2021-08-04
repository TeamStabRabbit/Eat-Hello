import { PromiseProvider } from 'mongoose';
import React, { Component, Fragment, useEffect } from 'react';
import goblinShark from '../Images/goboshark.png';

const Popup = ({
  popupState,
  loggedIn,
  displayLoginForm,
  loginDisplayToggler,
  credUsernameUpdate,
  credPasswordUpdate,
  resetCredentials,
  submitSignUp,
  toggleSignupForm,
  displaySignupForm,
  submitLogIn
}) => {
  const signUpLogInButton = ()=>{
    if(displaySignupForm){
      return(
        <button className="submit" onClick={submitSignUp}>
          Sign up
        </button>
      );
    }

    if(displayLoginForm){
      return(
        <button className="submit" onClick={submitLogIn}>
          Sign In
        </button>
      );
    }
    return null;
  };
    
  const logInContent = () => {
    //is user logged in
    if (loggedIn) {
      return (
        <Fragment>
          <h2>Welcome Back</h2>
          <img src='https://media1.tenor.com/images/7c5b845782fc709ae23b0cb5e4941990/tenor.gif?itemid=5430037' />
        </Fragment>
      );
    } //else not logged in

    if (displayLoginForm || displaySignupForm) {
      return (
        <Fragment>
          <h2>Credentials</h2>
          <div className="credContainer">
            {/* <label className="input"> */}
            <input
              id="username-input"
              className="input__field"
              type="text"
              placeholder="Username"
              onChange={credUsernameUpdate}
            />
            {/* <span className="input__label">User Name</span>
            </label>
            <label className="input"> */}
            <input
              id = "pw-input"
              className="input__field"
              type="password"
              placeholder="Password"
              onChange={credPasswordUpdate}
            />
            

            <div className="button-group">
              
              {signUpLogInButton()/**content for sign up or login
              using same form but different button */}
              
              <button 
                type="reset" 
                className="submit"
                onClick={resetCredentials}>
                Reset
              </button>
            </div>
          </div>
        </Fragment>
      );
    }

    return (
      <div className="logInButtonContainer">
        <button className="signUpButton" onClick={() => toggleSignupForm()}>
          Sign up
        </button>
        <button className="logInButton" onClick={() => loginDisplayToggler()}>Log In</button>
      </div>
    );
  };

  const catContent = () => {
    return (
      <Fragment>
        <img src={goblinShark} alt="goblin-shark" />
      </Fragment>
    );
  };

  const authorContent = () => {
    return (
      <ul className="authors">
        <li>Adda Kridler</li>
        <li>Annie Pan</li>
        <li>Emeric David</li>
        <li>Hazel Na</li>
        <li>Matilda Wang</li>
      </ul>
    );
  };

  const content = () => {
    //these could be done without strings to controll content state
    if (popupState === 'signIn') return logInContent();
    if (popupState === 'cat') return catContent();
    if (popupState === 'author') return authorContent();
    //else
    return <h1> {popupState} </h1>;
  };
  return (
    <div className="popUp">
      <div className="popUpBody">{content()}</div>
    </div>
  );
};

export default Popup;
