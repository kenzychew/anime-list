import { createContext, useState, useContext } from 'react';
// Creates React Context for theme-related data
const ThemeContext = createContext();
// ThemeProvider component maintains the state of the theme using useState and provides a function toggleTheme, App.jsx wraps children in ThemeProvider
export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false); // False = Light Mode

  const toggleTheme = () => {
    setDarkMode(!darkMode); // Flips the state
    document.documentElement.classList.toggle('dark-mode'); // Toggles the dark-mode class on the document element
  };
  // Provides the theme state and toggle function to the children
  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
// Custom hook to use the theme context
export const useTheme = () => useContext(ThemeContext); 