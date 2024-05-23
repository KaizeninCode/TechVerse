import React, { useContext, useState,useEffect } from 'react'

const ThemeContext = React.createContext(); // Create a theme context
const UpdateThemeContext = React.createContext(); // Create a context for the toggle function

export function UseTheme() { // Custom hook for theme
    return useContext(ThemeContext);
}

export function UpdateTheme() { // Custom hook for toggle function
    return useContext(UpdateThemeContext);
}

function ThemeProvider({ children }) {
    const [darkTheme, setDarkTheme] = useState(true); // State for the theme
    useEffect(() => {
        // Retrieve theme from local storage when the component mounts
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme) {
          setDarkTheme(storedTheme === 'dark');
        }
      }, []);
      const toggleColor = () => {
        setDarkTheme((prevTheme) => {
          const newTheme = !prevTheme;
          // Store the theme in local storage
          localStorage.setItem('theme', newTheme ? 'dark' : 'light');
          return newTheme;
          
        });
      };

    return (
        <div>
            {/* Theme provider */}
            <ThemeContext.Provider value={darkTheme}>
                {/* Toggle function provider */}
                <UpdateThemeContext.Provider value={toggleColor}>
                    {children}
                </UpdateThemeContext.Provider>
            </ThemeContext.Provider>
        </div>
    );
}

export default ThemeProvider;
