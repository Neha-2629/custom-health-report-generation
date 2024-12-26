const express = require('express');
const { getPatientData, generateReport, sendReportEmail } = require('../controllers/patientController');
const router = express.Router();

router.post('/send-email', sendReportEmail);

module.exports = router;