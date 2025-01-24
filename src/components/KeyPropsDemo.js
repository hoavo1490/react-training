import React, { useState } from 'react';

const ListItem = ({ text }) => {
  const [inputValue, setInputValue] = useState('');

  return (
    <div className="list-item">
      <span>{text}</span>
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Type something..."
      />
    </div>
  );
};

const KeyPropsDemo = () => {
  const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3']);

  const handleReverse = () => {
    setItems([...items].reverse());
  };

  return (
    <div>
      <h2>Key Props Demo</h2>

      <div className="demo-section">
        <h3>Without Keys (Problematic)</h3>
        <div className="list">
          {items.map((item) => (
            <ListItem text={item} />
          ))}
        </div>
      </div>

      <div className="demo-section">
        <h3>With Proper Keys</h3>
        <div className="list">
          {items.map((item) => (
            <ListItem key={item} text={item} />
          ))}
        </div>
      </div>

      <button onClick={handleReverse}>Reverse List</button>

      <div className="instructions">
        <p>Instructions:</p>
        <ol>
          <li>Type something in the input fields</li>
          <li>Click "Reverse List"</li>
          <li>Notice how inputs without keys maintain their values in the wrong positions</li>
          <li>While inputs with proper keys maintain correct state association</li>
        </ol>
      </div>
    </div>
  );
};

export default KeyPropsDemo;
