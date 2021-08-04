import React, { Component, useEffect, useState } from 'react';
import Header from '../components/header';
import FoodGenerator from '../components/foodGenerator';
import FoodPicker from '../components/foodpicker';
import Footer from '../components/footer';
import axios from 'axios';

const MainContainer = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [menu, setMenu] = useState('');
  const [zipcode, setZipcode] = useState(0);
  // const [username, setusername] = useState('');
  const [stateCredObj, setCredObj ] = useState({username:'',password:'',});
  const [displayLoginForm, toggleDisplayLoginForm] = useState(false);
  const [displaySignupForm, setDisplaySignupForm] = useState(false);

  const toggleSignupForm = ()=>{
    setDisplaySignupForm((prev)=>!prev);
  };

  //sent menu url to the server
  const repeatUserNameWarning = async()=>{
    const element = document.getElementById('username-input');

    element.classList.add('wrong-input');
    setTimeout(()=>element.classList.remove('wrong-input'), 1100);
  };

  const repeatPasswordWarning = async()=>{
    const element = document.getElementById('pw-input');

    element.classList.add('wrong-input');
    setTimeout(()=>element.classList.remove('wrong-input'), 1100);
  };

  const submitSignUp = ()=>{
    //take the cred object
    let resSuccess;
    const {username,password} = stateCredObj;
    // make a post request to the back end 
    axios.post('/api/signup', {
      username: username,
      password: password,
    })
      .then(data=> {
        resSuccess = data.data;
        if(resSuccess === true){
          setLoggedIn(()=>true);
          //play them the goodjob gif 
          //well have to change the popup display state
        } else repeatUserNameWarning();
      })
      .catch(()=>repeatUserNameWarning());
  };

  const submitLogIn = () => {
    let loginSuccess;
    const {username, password} = stateCredObj;
    axios.post('/api/login', {
      username: username,
      password: password,
    })
      .then(data => {
        loginSuccess = data.data.payload.passwordsMatch;
        if (loginSuccess === true) {
          setLoggedIn(()=> true);
        } else repeatPasswordWarning();
      })
      .catch(()=>repeatPasswordWarning());
  };

  const credPasswordUpdate = (e)=>{
    const newPassword = e.target.value;
    setCredObj((stateCredObj)=> {
      stateCredObj.password = newPassword;
      return stateCredObj;
    });
  };
  
  const credUsernameUpdate = (e)=>{
    const newUsername = e.target.value;
    setCredObj((stateCredObj) => {
      stateCredObj.username = newUsername;
      return stateCredObj;
    });
  };

  const resetCredentials = () => {
    setCredObj((stateCredObj) => {
      stateCredObj.username = '';
      stateCredObj.password = '';
      document.getElementById('pw-input').value = '';
      document.getElementById('username-input').value = '';
      return stateCredObj;
    });
  };

  const loginDisplayToggler = ()=>{
    toggleDisplayLoginForm(()=>!displayLoginForm);
  };
  return (
    <div className='main_container'>
      <Header
        loggedIn={loggedIn}
        displayLoginForm={displayLoginForm}
        loginDisplayToggler={loginDisplayToggler}
        menu={menu}
        credPasswordUpdate={credPasswordUpdate}
        credUsernameUpdate={credUsernameUpdate}
        resetCredentials={resetCredentials}
        submitSignUp={submitSignUp}
        toggleSignupForm={toggleSignupForm}
        displaySignupForm={displaySignupForm}
        submitLogIn={submitLogIn}
      />
      <div className='main'>
        <FoodGenerator menu={menu} />
        <FoodPicker
          setMenu={setMenu}
          menu={menu}
          setZipcode={setZipcode}
          zipcode={zipcode}
        />
        <Footer />
      </div>
    </div>
  );
};

export default MainContainer;
