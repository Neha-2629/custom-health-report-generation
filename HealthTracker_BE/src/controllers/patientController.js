const db = require("../config/db");

const puppeteer = require('puppeteer');
const sendgrid = require('@sendgrid/mail');
//sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

exports.getPatientDataById = async (req, res, next) => {
    const { id } = req.params;
    console.log(id);
    console.log(req.params);
    //date, heart_rate, blood_pressure, respiration_rate, oxygen_saturation, body_temperature, physician_note
    try {
      const healthQuery = `
        SELECT *
        FROM patient_health
        WHERE patient_id = $1
        `;
      const patientVitals = await db.query(healthQuery, [id.toUpperCase()]);
      const formattedVitals = patientVitals.rows.map((row) => ({
        ...row,
        date: new Date(row.date).toISOString().split('T')[0], // Converts to YYYY-MM-DD
      }));

    res.json(formattedVitals);
    } catch (error) {
      console.error('Error fetching patient data:', error);
      res.status(500).send('Error fetching patient data');
    }
}

exports.getPatients = async (req, res, next) => {
    try {
        const patientData = await db.query(
        "SELECT patient_id, patient_name, email, age, sex, height_cm FROM patient_info;",
        );
        res.json(patientData.rows);
    } catch (error) {
        res.status(500).json({ message: "Error fetching patient data" });
    }
};
