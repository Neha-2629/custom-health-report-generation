# Custom Report Generation System

## Overview
The **Custom Report Generation System** is designed to provide a complete solution for generating downloadable reports summarizing patient health metrics, including vitals and physician notes. Patient's vitals data can be stored in the databse and through the web-app interface we can get an overview of patients metrices and health trends over time.

---

## Features
- **Patient Health Metrics:** View, filter, and analyze patient vitals (heart rate, blood pressure, oxygen saturation, etc.).
- **Report Generation:** Export patient health data as a PDF for specific date ranges.
- **Physician Notes:** Capture and display physician notes for each patient visit.
- **Threshold Monitoring:** Highlight vitals based on predefined threshold values.
- **Responsive Frontend:** Intuitive UI built with React and TailwindCSS.
- **Secure API:** Robust backend with Express.js and PostgreSQL for data storage and retrieval.

---

## Tech Stack Documentation
- **Node.js** with **Express.js**: RESTful API implementation.
- **PostgreSQL**: Relational database for storing patient data.
- **jspdf and html2canvas libraries**: For generating PDF reports.
- **React.js**: Component-based UI development.
- **TypeScript**: Strongly-typed JavaScript for reliable code.
- **Recharts**: Data visualization library for creating charts.
- **TailwindCSS**: Utility-first CSS framework for styling.

---

## Backend 
### Setup instructions 

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-repo/custom-report-system.git
   cd custom-report-system/backend

2. **Environment Setup:**
- Install dependencies:
	```bash
     npm install
     ```
	 - Create a `.env` file:
     ```env
	 API_HOST=localhost
	 API_PORT=3001
	 DB_HOST=127.0.0.1
	 DB_PORT=5432
	 DB_NAME=patient_reports
	 DB_USER=username
	 DB_PASSWORD=password
     ```
   - Start the backend:
     ```bash
     npm start
     ```
---

## Database Schema
 - Create the database:
     ```sql
     CREATE DATABASE health_monitor;
	 ```

### Tables
1. **Patients_Info**
	```sql
	 CREATE TABLE patient_info (
		patient_id VARCHAR(10) PRIMARY KEY,
		age INT,
		sex VARCHAR(10),
		contact VARCHAR(15),
		email VARCHAR(50),
		address TEXT,
		height_cm INT
	);
	```

2. **Patient_health**
	```sql
	  CREATE TABLE patient_health (
		id SERIAL PRIMARY KEY,
		patient_id VARCHAR(10),
		date DATE,
		heart_rate INT,
		systolic_bp INT,
		diastolic_bp INT,
		respiration_rate INT,
		pulse_rate INT,
		oxygen_saturation INT,
		body_temperature FLOAT,
		cholesterol_level INT,
		weight FLOAT,
		steps_count INT,
		calories_burned INT,
		sleep_duration FLOAT,
		physician_note TEXT
	);
	```sql

3. **Vitals_Threshold**
	```sql
	   CREATE TABLE vitals_threshold (
		vital_name VARCHAR(100),
		low_threshold INT,
		high_threshold INT,
		unit VARCHAR(50)
	);
	```sql

---

## Frontend
### Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```
   
3. Start the application:
   ```bash
   npm run dev
   ```