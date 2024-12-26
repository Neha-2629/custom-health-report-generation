const express = require('express');
const { getPatientData} = require('../controllers/patientController');
const router = express.Router();

// router.get('/patients', getPatientData);

// router.get('/patient/:id', getPatientById);

module.exports = router;