import React, { Component, useEffect } from 'react';
import GoogleMap from './googleMap';
import { Wrapper, Status } from '@googlemaps/react-wrapper';

const GoogleMapArea = ({ menu, zipcode, setClick, lat, lng }) => {
  return (
    <div className='google'>
      <div className='google_map_area'>
        {/* // <Wrapper apiKey = 'AIzaSyCaSo1pxwCY44jihxAMHhJjVJ3mHbFLsPw' > */}
        <GoogleMap menu={menu} zipcode={zipcode} lat={lat} lng={lng} />
        {/* // </Wrapper> */}
        <div className='map-side-info'>
          <h2>Restaurant Name Goes Here</h2>
          <p>Rating: </p>
          <img className='map-side-img' src='https://d1e3z2jco40k3v.cloudfront.net/-/media/mccormick-us/recipes/mccormick/q/800/quick_and_easy_french_toast_new_800x800.jpg'/>
        </div>
      </div>
      <button className='map_btn' onClick={setClick}>
        Close
      </button>
    </div>
  );
};

export default GoogleMapArea;
