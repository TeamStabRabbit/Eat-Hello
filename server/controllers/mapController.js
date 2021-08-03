const axios = require('axios');
const dotenv = require('dotenv').config();

const mapController = {};

mapController.testing = async (res, req, next) => {
  
  try {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+toronto+canada&key=${process.env.GOOGLE_API}`);
    //console.log(response.data.results);
    res.locals = { data : response.data.results };
    //console.log('res.locals.data: ', res.locals.data);
    // console.log('this is working. end of await');
    return next();
  } catch (err) {
    console.log('mapController.testing error: ', err);
    return next();
  }

};

module.exports = mapController;
