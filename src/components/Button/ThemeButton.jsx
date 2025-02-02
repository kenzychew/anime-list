import { useTheme } from '../../context/ThemeContext';
import '../../styles/ThemeButton.css';

// Custom button component that toggles the theme
const ThemeButton = () => {
  const { darkMode, toggleTheme } = useTheme(); // Use useTheme hook to access context values
  // Render a button that calls toggleTheme when clicked
  return (
    <button onClick={toggleTheme} className="theme-toggle">
      {darkMode ? '☀️' : '🌙'}
    </button>
  );
};

export default ThemeButton;