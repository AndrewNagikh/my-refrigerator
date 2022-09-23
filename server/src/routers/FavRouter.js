const express = require('express');

const {
  checkFav, toggleFav,
} = require('../controllers/FavController');

const router = express.Router();

router.route('/isFav/:id')
  .get(checkFav);

router.route('/changeFav/:id')
  .get(toggleFav);

module.exports = router;
