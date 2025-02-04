import { useTheme } from '../../context/ThemeContext';
import '../../styles/ThemeButton.css';

// Custom button component that toggles the theme
const ThemeButton = () => {
  const { darkMode, toggleTheme } = useTheme(); // Use useTheme hook to access context values
  // 
  return (
    <button onClick={toggleTheme} className="theme-toggle">
      {darkMode ? '☀️' : '🌙'}
    </button>
  );
};

export default ThemeButton;