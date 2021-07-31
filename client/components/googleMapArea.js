import React, { Component, useEffect } from 'react';
import GoogleMap from './googleMap';
import { Wrapper, Status } from "@googlemaps/react-wrapper";



const GoogleMapArea = ({menu}) => {

  return (
    // <Wrapper apiKey = 'AIzaSyCaSo1pxwCY44jihxAMHhJjVJ3mHbFLsPw' >
    <div id='map'>
      <GoogleMap menu={menu}/>
    </div>
    // </Wrapper>
  );
};

export default GoogleMapArea;
