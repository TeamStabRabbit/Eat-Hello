import React, { Component, useEffect, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { render } from 'react-dom';
const { FontAwesomeIcon } = require('@fortawesome/react-fontawesome');
const { faUtensils } = require('@fortawesome/free-solid-svg-icons');
import forkSvg from '../Images/utensils-solid.svg';
// let geocoder = require('geocoder');
import axios from 'axios';
import GoogleService from '../service/googleService';
/* Options for how the map should initially render. */

const GoogleMap = ({ menu, zipcode, lat, lng }) => {
  const [restaurant, setRestaurant] = useState('');
  const [restaurantLat, setRestaurantLat] = useState(40.7285229);
  const [restaurantLng, setRestaurantLng] = useState(-73.9880155);
  const [address, setAddress] = useState('');
  const [imgLink, setimgLink] = useState('');
  const [rate, setRate] = useState('');
  useEffect(async () => {
    const result = await GoogleService.postRestaurant(
      'http://localhost:3000/restaurant',
      { menu: menu, lat: lat, lng: lng }
    );
    console.log('this is results', result);
    
    // let item = inputContainer[Math.floor(Math.random()*inputContainer.length)];
    // const chosenRestaurant = result[Math.floor(Math.random() * result.length)];
    console.log('this is chosen restaurant', result);
    setRestaurantLat(result.location.lat);
    setRestaurantLng(result.location.lng);
    setRestaurant(result.name);
    setimgLink(result.pic);
    setRate(result.rating);
  }, [lng]);

  const loader = new Loader({
    apiKey: `${process.env.GEOCODING}`,
    libraries: ['places'],
  });

  const mapOptions = {
    center: {
      lat: restaurantLat,
      lng: restaurantLng,
    },
    zoom: 16,
  };

  // // Callback

  loader
    .load()
    .then((google) => {
      const Gmap = new google.maps.Map(
        document.getElementById('map'),
        mapOptions
      );
      const infowindow = new google.maps.InfoWindow({
        content: `<strong>Come eat here!! @ </strong> ${restaurant},   <strong> Address: </strong> ${address} `,
      });
      const marker = new google.maps.Marker({
        //myLatlng,
        position: {
          lat: restaurantLat,
          lng: restaurantLng,
        },
        Gmap,
        icon: forkSvg,
      });
      marker.addListener('click', () => {
        infowindow.open({
          anchor: marker,
          map,
          shouldFocus: false,
        });
      });
      marker.setMap(Gmap);
    })
    .catch((e) => {
      console.log('THIS DONT WORKKK', e);
    });
  return (
    <div className="map_wrapper">
      <div className='google_map'>
        <div id='map'></div>
      </div>
      <div className='map-side-info'>
        <h2>{restaurant}</h2>
        <p> Rating: {rate}</p>
        <img className='map-side-img' src={imgLink}/>
      </div>
    </div>
  );
};
export default GoogleMap;
