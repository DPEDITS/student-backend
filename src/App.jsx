import { useState } from 'react';
import * as React from 'react';
import { AppProvider } from '@toolpad/core/AppProvider';
import { useTheme } from '@mui/material/styles';
import './App.css';
import colorSharp from './assets/img/color-sharp.png';
import colorSharp1 from './assets/img/color-sharp2.png';

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
  
      if (response.ok) {
        alert('Student details submitted successfully!');
      } else {
        alert('Failed to submit student details.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };
  

  const backgroundColor = darkMode ? '#121212' : '#f5f5f7';
  const cardColor = darkMode ? '#1c1c1e' : '#ffffff';
  const textColor = darkMode ? '#f5f5f7' : '#000000';

  return (
    <AppProvider theme={theme}>
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
          transition: 'background-color 0.3s ease',
        }}
      >
        <div
          style={{
            backgroundColor: cardColor,
            padding: '40px',
            borderRadius: '20px',
            boxShadow: darkMode
              ? '0 4px 30px rgba(0, 0, 0, 0.5)'
              : '0 4px 15px rgba(0, 0, 0, 0.1)',
            width: '100%',
            maxWidth: '400px',
            color: textColor,
            transition: 'background-color 0.3s ease, color 0.3s ease',
            fontFamily:
              'SF Pro Display, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
            zIndex: 2,
          }}
        >
          <h2
            style={{
              textAlign: 'center',
              marginBottom: '10px',
              fontWeight: '600',
              fontSize: '28px',
            }}
          >
            Student Database
          </h2>
          <p
            style={{
              textAlign: 'center',
              marginBottom: '30px',
              color: darkMode ? '#aaa' : '#555',
              fontSize: '16px',
            }}
          >
            Welcome Students, please fill in the details
          </p>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '20px' }}>
              <input
                name="studentName"
                type="text"
                placeholder="Student Name *"
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '12px',
                  border: darkMode ? '1px solid #333' : '1px solid #ccc',
                  backgroundColor: darkMode ? '#2c2c2e' : '#fafafa',
                  color: textColor,
                  outline: 'none',
                  fontSize: '15px',
                }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <input
                name="email"
                type="email"
                placeholder="Email *"
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '12px',
                  border: darkMode ? '1px solid #333' : '1px solid #ccc',
                  backgroundColor: darkMode ? '#2c2c2e' : '#fafafa',
                  color: textColor,
                  outline: 'none',
                  fontSize: '15px',
                }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <input
                name="rollNumber"
                type="text"
                placeholder="SIC *"
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '12px',
                  border: darkMode ? '1px solid #333' : '1px solid #ccc',
                  backgroundColor: darkMode ? '#2c2c2e' : '#fafafa',
                  color: textColor,
                  outline: 'none',
                  fontSize: '15px',
                }}
              />
            </div>

            <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
              <input
                type="checkbox"
                id="rememberMe"
                style={{ marginRight: '8px' }}
              />
              <label
                htmlFor="rememberMe"
                style={{
                  fontSize: '14px',
                  color: darkMode ? '#aaa' : '#555',
                }}
              >
                Remember Me
              </label>
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                backgroundColor: darkMode ? '#0a84ff' : '#0071e3',
                color: 'white',
                fontWeight: '600',
                padding: '12px',
                border: 'none',
                borderRadius: '12px',
                cursor: 'pointer',
                fontSize: '16px',
                transition: 'background-color 0.3s ease',
              }}
            >
              Submit Details
            </button>
          </form>

          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <button
              onClick={() => setDarkMode(!darkMode)}
              style={{
                background: 'transparent',
                border: 'none',
                color: darkMode ? '#0a84ff' : '#0071e3',
                cursor: 'pointer',
                fontSize: '14px',
                marginTop: '10px',
                textDecoration: 'underline',
              }}
            >
              Toggle {darkMode ? 'Light' : 'Dark'} Mode
            </button>
          </div>
        </div>

        {/* Background Images */}
        <img
          className="background-image-left"
          src={colorSharp}
          alt="Background Left"
          style={{
            position: 'absolute',
            left: '0',
            bottom: '0',
            height: '100%',
            opacity: '1',
            zIndex: 1,
          }}
        />
        <img
          className="background-image-right"
          src={colorSharp1}
          alt="Background Right"
          style={{
            position: 'absolute',
            right: '0',
            top: '0',
            height: '100%',
            opacity: '1',
            zIndex: 1,
          }}
        />
      </div>
    </AppProvider>
  );
}

export default App;
