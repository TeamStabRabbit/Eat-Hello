const axios = require('axios');
const dotenv = require('dotenv').config();
const fetch = require('node-fetch');

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

const geoAPI = process.env.GEOCODING;
const placeAPI = process.env.PLACES;

mapController.getGeoCode = async (req, res, next) => {
  try {
    const zipCode = req.body.zipCode;
    console.log(zipCode);
    const zipUrl = `https://maps.googleapis.com/maps/api/geocode/json?components=postal_code:${zipCode}&key=AIzaSyAWZT1oyUbY7x-g5-qo59d97tggGD2n54w`;
    const response = await axios.get(zipUrl);
    //  console.log('this is my geo func', response.data);
    //  console.log(response.data.results[0].geometry);
    console.log(response.data);
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
//https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=40.6802228,-73.9634407&radius=2000&type=restaurant&keyword=cruise&key=${process.env.PLACES}
//https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=Aap_uEDYdfACznJe3rO4mq1cAE0uCyOq5TSq0k3AlRMQdWVnrOS8uQjaORPC4uZpudrzu2mAUQddbyPNC488zlLA75IVU3nOeLs42_xbYV1bIAuTJGG7jiqn_2eWrZgEuTlS2M0AF_oCuIl91g45T1MVdy4cmqYd1aZbdaVrkaBZ0Ouji7dv&key=${process.env.PLACES}
mapController.sendRestaurant = async (req, res, next) => {
  // console.log('WE ARE INSIDE RESTAURANT CONTROLLER NOW');
  try {
    // const menu = await res.body.menu;
    // const lat = await res.body.lat;
    // const lng = await res.body.lng;

    const { menu, lat, lng } = await req.body;
    console.log('menu:', menu, 'lat:', lat, 'lng:', lng);
    //  let restaurantUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${menu}}&type=restaurant&location=${lat},${lng}&radius=2000&key=${placeAPI}`;
    const restaurantUrl  = await `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=2000&type=restaurant&keyword=${menu}&key=${placeAPI}`;
    const response = await axios.get(restaurantUrl);
    // console.log("this is alllllllllll", response.data);
    //picture url path response.data.results[0].photos[0].photo_reference
    // restaurant name path is response.data.results[0].name
    // raiting path is response.data.results[0].rating
    const pictureRef = await response.data.results[0].photos[0].photo_reference;
    console.log(response.data.results[0]);
    const pic = await `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${pictureRef}&key=${placeAPI}`;
    res.locals.restaurantInfo = {location:response.data.results[0].geometry.location,  name:response.data.results[0].name, rating: response.data.results[0].rating, pic:pic };
    // console.log('got here');
    // res.locals.info = "hhhhhhhh";
    return next();
  } catch (err) {
    console.log('map controller err in Send Restaurant', err);
    return next();
  }};
//  fetch(restaurantUrl)
//  .then(response => response.json())
// .then(response =>{ res.locals.name = response.results[0].name });
//  };

/*

{
    "menu": "pizza
    "lat": "41.6507919",
    "lng": "-73.784939"
}

*/

module.exports = mapController;
