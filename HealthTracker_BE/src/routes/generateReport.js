const express = require('express');
const { getPatientData, generateReport, sendReportEmail } = require('../controllers/patientController');
const router = express.Router();

router.post('/generate', generateReport);

module.exports = router;