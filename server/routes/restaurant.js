const express = require('express');
const router = express.Router();
const mapController = require('../controllers/mapController');

router.post('/', mapController.sendRestaurant, (req, res) => {
  res.status(200).json(res.locals.restaurantInfo);
});

module.exports = router;
