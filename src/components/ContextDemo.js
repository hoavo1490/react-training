import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

const ThemedButton = () => {
  const theme = useContext(ThemeContext);
  return (
    <button style={{ background: theme.background, color: theme.text }}>
      Themed Button
    </button>
  );
};

const ContextDemo = () => {
  const [theme, setTheme] = useState({
    background: 'black',
    text: 'white'
  });

  const toggleTheme = () => {
    setTheme(theme.background === 'black'
      ? { background: 'white', text: 'black' }
      : { background: 'black', text: 'white' }
    );
  };

  return (
    <div>
      <h2>Context API Demo</h2>
      <ThemeContext.Provider value={theme}>
        <ThemedButton />
        <button onClick={toggleTheme}>Toggle Theme</button>
      </ThemeContext.Provider>
    </div>
  );
};

export default ContextDemo;
