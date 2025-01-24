import React, { useState, memo } from 'react';
import '../styles/ReactMemoDemo.css';

// Regular component that shows date/time on every render
const RegularChild = () => {
  const renderTime = new Date().toLocaleTimeString();
  console.log("Regular Child rendered at:", renderTime);

  return (
    <div className="child-component">
      <h3>Regular Component</h3>
      <p>Last render time: {renderTime}</p>
    </div>
  );
};

// Memoized component without props
const MemoizedChild = memo(() => {
  const renderTime = new Date().toLocaleTimeString();
  console.log("Memoized Child rendered at:", renderTime);

  return (
    <div className="child-component">
      <h3>Memoized (No Props)</h3>
      <p>Last render time: {renderTime}</p>
    </div>
  );
});

// Memoized component with props
const MemoizedChildWithProps = memo(({ count }) => {
  const renderTime = new Date().toLocaleTimeString();
  console.log("Memoized Child with Props rendered at:", renderTime);

  return (
    <div className="child-component">
      <h3>Memoized (With Props)</h3>
      <p>Count from props: {count}</p>
      <p>Last render time: {renderTime}</p>
    </div>
  );
});

const ReactMemoDemo = () => {
  const [count, setCount] = useState(0);
  const [, setForceUpdate] = useState(0);

  const handleForceUpdate = () => {
    setForceUpdate(prev => prev + 1);
  };

  const handleCountUpdate = () => {
    setCount(prev => prev + 1);
  };

  return (
    <div className="react-memo-demo">
      <h2>React.memo Demo</h2>

      <div className="controls">
        <button
          className="demo-button"
          onClick={handleForceUpdate}
        >
          Force Parent Re-render
        </button>
        <button
          className="demo-button"
          onClick={handleCountUpdate}
        >
          Update Count: {count}
        </button>
      </div>

      <div className="comparison">
        <div className="demo-case">
          <RegularChild />
          <p className="note">
            ⚠️ Re-renders on every parent update
          </p>
        </div>

        <div className="demo-case">
          <MemoizedChild />
          <p className="note">
            ✅ Never re-renders (no props)
          </p>
        </div>

        <div className="demo-case">
          <MemoizedChildWithProps count={count} />
          <p className="note">
            ✅ Only re-renders when count changes
          </p>
        </div>
      </div>

      <div className="explanation">
        <p>Try both buttons:</p>
        <ul>
          <li>"Force Parent Re-render" - only the regular component updates</li>
          <li>"Update Count" - regular and memoized with props update</li>
          <li>Memoized without props never updates</li>
        </ul>
      </div>
    </div>
  );
};

export default ReactMemoDemo;
