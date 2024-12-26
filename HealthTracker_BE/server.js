const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const reportRoute = require('./src/routes/reportRoute');
const patientRoutes = require('./src/routes/patientRoutes');
const vitalsThresholdRoute = require('./src/routes/vitalsThreshold');
const db = require("./src/config/db");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// API Endpoints
//app.use('/api', db.router);
//app.use('/api', reportRoute);

// app.use('/', () => {

// });

app.use('/api/patients', patientRoutes);
app.use('/api/vitalsthreshold', vitalsThresholdRoute);
const PORT = process.env.API_PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));