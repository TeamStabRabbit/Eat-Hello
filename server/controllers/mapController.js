const axios = require('axios');
const dotenv = require('dotenv').config();

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
    const response = await axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+toronto+canada&key=${process.env.GOOGLE_API}`);
    //console.log(response.data.results);
    res.locals = { data : response.data.results };
    //console.log('res.locals.data: ', res.locals.data);
    // console.log('this is working. end of await');
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
    const restaurantUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${menu}}&type=restaurant&location=${lat},${lng}&radius=2000&key=AIzaSyCaSo1pxwCY44jihxAMHhJjVJ3mHbFLsPw`;
    const response = await axios.get(restaurantUrl);
    res.locals = { restaurants: response.data.results };
    return next();
    // console.log('here here here', res.locals.restaurants);
  } catch (err) {
    console.log('map controller err in Send Restraunt', err);
  }
};

module.exports = mapController;
