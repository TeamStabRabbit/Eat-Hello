const axios = require('axios');
const keyApi = require('dotenv').config();
const mapController = {};

// mapController.testing = async (res, req, next) => {

//   try {
//     const response = await axios.get('https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+toronto+canada&key=AIzaSyCaSo1pxwCY44jihxAMHhJjVJ3mHbFLsPw');
//     //console.log(response.data.results);
//     res.locals = { data : response.data.results };
//     // console.log('this is working. end of await');
//     return next();
//   } catch (err) {
//     console.log('mapController.testing error: ', err);
//     return next();
//   }

// };

mapController.getGeoCode = async (res, req, next) => {
  try {
    const zipCode = res.body.zipCode;
    console.log(zipCode);
    const zipUrl = `https://maps.googleapis.com/maps/api/geocode/json?components=postal_code:${zipCode}&key=AIzaSyAWZT1oyUbY7x-g5-qo59d97tggGD2n54w`;
    const response = await axios.get(zipUrl);
    console.log(response.data.results[0].geometry);
    res.locals = {
      lat: response.data.results[0].geometry.location.lat,
      lng: response.data.results[0].geometry.location.lng,
    };
    return next();
  } catch (err) {
    console.log('mapController.geoCode error: ', err);
    return next();
  }
};

mapController.sendRestaurant = async (res, req, next) => {
  // console.log('WE ARE INSIDE RESTAURANT CONTROLLER NOW');
  try {
    const menu = res.body.menu;
    const lat = res.body.lat;
    const lng = res.body.lng;
    // console.log(`menu:`, menu, `lat:`, lat, `lng:`, lng);
    const restaurantUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${menu}}&type=restaurant&location=${lat},${lng}&radius=2000&key=AIzaSyAFWhaCXVDofPkFpzFqwOYLQIjXAoJez9Q`;
    const response = await axios.get(restaurantUrl);
    res.locals = { restaurants: response.data.results };
    return next();
    // console.log('here here here', res.locals.restaurants);
  } catch (err) {
    console.log('map controller err in Send Restraunt', err);
  }
};

module.exports = mapController;
