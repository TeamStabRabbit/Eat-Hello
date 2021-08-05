import { PromiseProvider } from 'mongoose';
import React, { Component, Fragment, useEffect } from 'react';
import axios from 'axios';

const HistoryPopup = ({ menu, username }) => {
  // fetch request to database to get user history using username
  const foodHistory = async (username) => {
   
    const historyArray = await axios.get('/api/foodHistory', username)
      .then(data => data.payload.history)
      .catch(console.log('ERROR in history Popup on get req.'));

    return historyArray;
  };

  return (
    <div className='history_popUp'>
      <div className='history_popUpBody'>{foodHistory}</div>
    </div>
  );
};


export default HistoryPopup;
