import { useState, useEffect } from 'react';
import '../../styles/Footer.css';

const Footer = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check if user has a theme preference saved
    const savedTheme = localStorage.getItem('theme');
    setDarkMode(savedTheme === 'dark');
    
    // Apply the theme
    document.documentElement.classList.toggle('dark-mode', savedTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = !darkMode;
    setDarkMode(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark-mode', newTheme);
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <button onClick={toggleTheme} className="theme-toggle">
          {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>
    </footer>
  );
};

export default Footer; 