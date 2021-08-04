import React, { Component, useEffect } from 'react';
import { useState } from 'react/cjs/react.development';
import FoodOption from './foodOption';
import axios from 'axios';

const foodOptions = [
  'Pizza',
  'Dimsum',
  'Burgers',
  'Pasta',
  'BBQ',
  'Sushi',
  'Mexican',
  'Seafood',
  'Thai',
];

const FoodListMaker = (foodOptions) => {
  return foodOptions.map((food, idx) => {
    return <FoodOption key={idx} id={idx} name={food} />;
  });
};

const FoodOptionLists = ({ setMenu, cancelPopup }) => {
  const [clickAdd, setClickAdd] = useState('');
  const [optionArr, setOptionArr] = useState([]);
  const input = document.querySelector('.add_menu');

  console.log(clickAdd);
  const addMenuBtn = () => {
    if (clickAdd !== '') {
      axios.post('api/foodHistory', {
        username: 'alex',
        foodItem: input.value
      })
        .then(function (response) {
          console.log(response);
          console.log( response.data);
          setOptionArr(response.data);
        })
        .then(() => {
          setClickAdd('');
          input.value = '';
          input.focus();
        })
        .catch(function (error) {
          console.log(error);
        });
      // const copyArr = [...optionArr];
      // copyArr.push(clickAdd);
      
     
    }
  };

  const showMenu = () => {
    const copyArr = [...optionArr];
    const getMenu = Math.floor(Math.random() * copyArr.length);
    const ourMenu = copyArr[getMenu];
    setMenu(ourMenu);
    cancelPopup();
  };

  const cancelMenu = () => {
    setMenu('');
    cancelPopup();
  };

  return (
    <div className='food_option_box'>
      <ul className='food_option_lists'>{FoodListMaker(optionArr)}</ul>
      <div className='food_input_btns'>
        <input
          className='add_menu'
          type='text'
          placeholder='add options'
          onChange={(e) => setClickAdd(e.target.value)}
        />
        <button className='add_menuBtn' onClick={() => addMenuBtn()}>
          Add Option
        </button>
        <button className='show_menuBtn' onClick={() => showMenu()}>
          Show me the menu!!
        </button>
        <button className='cancel_menuBtn' onClick={() => cancelMenu()}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default FoodOptionLists;
