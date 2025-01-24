import React from 'react';
import PropTypes from 'prop-types';

const ChildComponent = ({ name, age, onButtonClick }) => (
  <div>
    <h3>Hello, {name}!</h3>
    <p>Age: {age}</p>
    <button onClick={onButtonClick}>Click me</button>
  </div>
);

ChildComponent.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
  onButtonClick: PropTypes.func.isRequired,
};

const PropsDemo = () => {
  const handleClick = () => alert('Button clicked!');

  return (
    <div>
      <h2>Props & PropTypes Demo</h2>
      <ChildComponent
        name="John"
        age={25}
        onButtonClick={handleClick}
      />
    </div>
  );
};

export default PropsDemo;
