const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config(); // Load MongoDB URI from environment variables

const app = express();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json()); // Parse incoming JSON requests

// Connect to MongoDB Atlas using the connection string from environment variables
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Define a schema for student details
const studentSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  rollNumber: { type: String, required: true },
});

// Create a model based on the schema
const Student = mongoose.model('Student', studentSchema);

// Route to handle form submission
app.post('/submit', async (req, res) => {
  const { studentName, email, rollNumber } = req.body;

  try {
    const newStudent = new Student({ studentName, email, rollNumber });
    await newStudent.save();

    res.status(200).json({ message: 'Student details submitted successfully!' });
  } catch (error) {
    console.error('Error saving student:', error);
    res.status(500).json({ message: 'Failed to submit student details.', error: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
