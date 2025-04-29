const mongoose = require('mongoose');
require('dotenv').config(); // Ensure you have Mongo URI in the environment variables

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Define the schema for student details
const studentSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  rollNumber: { type: String, required: true },
});

// Create the model
const Student = mongoose.model('Student', studentSchema);

exports.handler = async (event, context) => {
  // Ensure it's a POST request
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }

  // Parse request body
  const { studentName, email, rollNumber } = JSON.parse(event.body);

  // Ensure all fields are provided
  if (!studentName || !email || !rollNumber) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Missing fields' }),
    };
  }

  try {
    // Save to MongoDB
    const newStudent = new Student({ studentName, email, rollNumber });
    await newStudent.save();

    // Return success response
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Student details submitted successfully!' }),
    };
  } catch (error) {
    // Handle error during MongoDB operation
    console.error('Error saving student:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to submit student details.', error: error.message }),
    };
  }
};
