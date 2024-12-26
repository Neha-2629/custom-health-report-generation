const express = require('express');
const { getPatientDataById, getPatients} = require('../controllers/patientController');
const router = express.Router();

router.get('/:id', getPatientDataById);
router.get('/', getPatients);

module.exports = router;