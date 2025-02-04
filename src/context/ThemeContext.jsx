import { createContext, useState, useContext } from 'react';
// Creates React Context for theme-related data
const ThemeContext = createContext(); //? Think of this like a global "container" that holds data (state of the theme) accessible throughout app
// ThemeProvider component
export const ThemeProvider = ({ children }) => {
  // State lifted to provider level
  const [darkMode, setDarkMode] = useState(false); //? False = Light Mode
  // Theme toggle function is also lifted
  const toggleTheme = () => {
    setDarkMode(!darkMode); // Flips the state
    document.documentElement.classList.toggle('dark-mode'); // Toggles the dark-mode class on the document element
  };
  // Provides the theme state and toggle function to the children
  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children} {/* This represents all components wrapped by ThemeProvider */}
    </ThemeContext.Provider>
  );
};
// Custom hook to use the theme context
export const useTheme = () => useContext(ThemeContext);

// The children prop allows ThemeProvider to:
// 1. Wrap any components
// 2. Make theme data available to them
// 3. Render them inside the Provider
// 4. Avoid prop drilling through intermediate components

//? https://medium.com/@riteshbhagat/implementing-theme-in-react-using-context-api-196149967c9d