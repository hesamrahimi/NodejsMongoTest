const express = require('express');
const router = express.Router();

//middleware
const {validateViewNumber} = require('../middelware/viewNumberMiddleware.js')

//Controller
const viewNumberController = require('../controllers/viewNumberController');
router.get('/viewNumber' , validateViewNumber , viewNumberController.getAllViewNumber);
router.get('/viewUniqueNumber' , validateViewNumber , viewNumberController.getUniqueViewNumber);

module.exports = router;