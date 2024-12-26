const db = require("../config/db");

exports.getVitalsThreshold = async (req, res, next) => {
    //heart_rate, blood_pressure, respiration_rate, oxygen_saturation, body_temperature, physician_note
    try {
      const healthQuery = `
        SELECT vital_name, low_threshold, high_threshold, unit 
        FROM vitals_threshold
        `;
      const vitalsThreshold = await db.query(healthQuery);
        console.log(vitalsThreshold);
        res.json(vitalsThreshold.rows);
    } catch (error) {
      console.error('Error fetching vitalsThreshold data:', error);
      res.status(500).send('Error fetching vitalsThreshold data');
    }
}