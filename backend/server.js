const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000; // you can choose any port
const mysql = require('mysql2');
app.use(cors());
app.use(express.json()); // to parse JSON bodies



// Create a connection pool
const db = mysql.createPool({
  host: 'localhost', // or your database host
  user: 'root', // replace with your MariaDB username
  password: '', // replace with your MariaDB password
  database: 'studdb', // your database name
});

// Simple route to receive form data
app.post('/submit', (req, res) => {
    const { studentName, email, rollNumber } = req.body;
  
    const sql = "INSERT INTO STUDENTS (studentName, email, rollNumber) VALUES (?, ?, ?)";
  
    db.query(sql, [studentName, email, rollNumber], (err, result) => {
      if (err) {
        console.error('Error inserting data:', err);
        return res.status(500).json({ message: 'Database error' });
      }
  
      console.log('Student data inserted:', result);
      res.status(200).json({ message: 'Student details saved successfully' });
    });
  });
  

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
