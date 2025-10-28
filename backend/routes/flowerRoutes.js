// routes/flowerRoutes.js
const express = require('express');
const router = express.Router();
const { addFlower, getAllFlowers } = require('../controllers/flowerController');
const { upload } = require('../config/cloudinary');

router.post('/', upload.single('image'), addFlower);
router.get('/', getAllFlowers);

module.exports = router;
