const express = require('express');
const { getVitalsThreshold } = require('../controllers/vitalsThresholdController');
const router = express.Router();

router.get('/', getVitalsThreshold);

module.exports = router;