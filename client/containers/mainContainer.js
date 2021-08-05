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
  const [stateCredObj, setCredObj] = useState({username:'',password:'',});
  const [displayLoginForm, toggleDisplayLoginForm] = useState(false);
  const [displaySignupForm, setDisplaySignupForm] = useState(false);
  const [optionArr, setOptionArr] = useState([]);

  const getHistory = () => {
    //make the get request
    console.log('the user creds are ', stateCredObj);
    axios.get('/api/foodhistory/', {params:{username:stateCredObj.username}})
      .then(data => {
        console.log('the history is', data.payload.history);
        setOptionArr(data.payload.history);        
      })
      .catch(err => console.log('Error in getHistory in mainContainer'));
    //add it to state
  };

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
        console.log('username, password pair is,', username, password);
        loginSuccess = data.data.payload.passwordsMatch;
        if (loginSuccess === true) {
          setLoggedIn(()=> true);
          getHistory();
          //ON SUCCESSFUL LOG IN ADD A GET REQUEST TO HISTORY
        } else repeatPasswordWarning();
      })
      .catch(()=>{
        console.log('username, password pair is,', username, password);
        repeatPasswordWarning();
      });
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
        <FoodGenerator 
          menu={menu}
          
        />
        <FoodPicker
          setMenu={setMenu}
          menu={menu}
          setZipcode={setZipcode}
          zipcode={zipcode}
          loggedIn={loggedIn}
          userName={stateCredObj.username}
          optionArr={optionArr}
          setOptionArr={setOptionArr}
        />
        <Footer />
      </div>
    </div>
  );
};

export default MainContainer;
