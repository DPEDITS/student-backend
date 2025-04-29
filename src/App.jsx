import { useState } from 'react';
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import './App.css';
import colorSharp from './assets/img/color-sharp.png';
import colorSharp1 from './assets/img/color-sharp2.png';
import { Helmet } from "react-helmet";

function App() {
  const theme = useTheme();
  const [darkMode, setDarkMode] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const studentName = formData.get('studentName');
    const email = formData.get('email');
    const rollNumber = formData.get('rollNumber');

    try {
      const response = await fetch('http://localhost:5000/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ studentName, email, rollNumber }),
      });

      const result = await response.json();
      if (response.ok) {
        alert(result.message || 'Student details submitted successfully!');
      } else {
        alert(result.message || 'Failed to submit student details.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const backgroundColor = darkMode ? '#0e0e10' : '#f5f5f7';
  const cardColor = darkMode ? '#1a1a1d' : '#ffffff';
  const textColor = darkMode ? '#e4e6eb' : '#111111';
  const accentColor = darkMode ? '#0a84ff' : '#0071e3';

  const cardShadow = darkMode
    ? '0 8px 32px rgba(0, 0, 0, 0.7), 0 8px 20px rgb(255, 10, 10)'
    : '0 8px 20px rgba(0, 0, 0, 0.1), 0 8px 20px rgb(0, 113, 227)';

  const toggleMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className="App"
      style={{
        backgroundColor,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        padding: '20px',
        position: 'relative',
        overflow: 'hidden',
        flexDirection: 'column', // Ensure footer stays at the bottom
      }}
    >
      <div
        style={{
          backgroundColor: cardColor,
          padding: '40px 30px',
          borderRadius: '20px',
          boxShadow: cardShadow,
          width: '100%',
          maxWidth: '420px',
          color: textColor,
          fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          zIndex: 2,
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '12px', fontWeight: '700', fontSize: '28px' }}>
          Student Database
        </h2>
        <p style={{ textAlign: 'center', marginBottom: '30px', fontSize: '15px', color: darkMode ? '#a0a0a0' : '#555555' }}>
          Welcome Students, please fill in your details
        </p>

        <form onSubmit={handleSubmit}>
          {['studentName', 'email', 'rollNumber'].map((field, index) => (
            <div style={{ marginBottom: '20px' }} key={index}>
              <input
                name={field}
                type={field === 'email' ? 'email' : 'text'}
                placeholder={field === 'studentName' ? 'Student Name *' : field === 'email' ? 'Email *' : 'SIC *'}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '10px',
                  border: `1px solid ${darkMode ? '#333' : '#ccc'}`,
                  backgroundColor: darkMode ? '#2c2c2e' : '#fafafa',
                  color: textColor,
                  outline: 'none',
                  fontSize: '15px',
                  transition: 'all 0.3s ease',
                }}
                onFocus={(e) => (e.target.style.borderColor = accentColor)}
                onBlur={(e) => (e.target.style.borderColor = darkMode ? '#333' : '#ccc')}
              />
            </div>
          ))}

          <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', fontSize: '14px', color: darkMode ? '#aaa' : '#555' }}>
            <input
              type="checkbox"
              id="rememberMe"
              style={{ marginRight: '8px', cursor: 'pointer' }}
            />
            <label htmlFor="rememberMe">Remember Me</label>
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              backgroundColor: accentColor,
              color: 'white',
              fontWeight: '600',
              padding: '12px',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              fontSize: '16px',
            }}
          >
            Submit Details
          </button>
        </form>
      </div>

      <img
        className="background-image-left"
        src={colorSharp}
        alt="Background Left"
        style={{
          position: 'absolute',
          left: 0,
          bottom: 0,
          height: '100%',
          opacity: 0.5,
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />
      <img
        className="background-image-right"
        src={colorSharp1}
        alt="Background Right"
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          height: '100%',
          opacity: 0.5,
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}

export default App;
