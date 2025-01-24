import React, { useState } from 'react';

const ChildComponent = React.memo(({ count }) => {
  console.log('Child component rendered');
  return <div>Child Count: {count}</div>;
});

const UnrelatedComponent = () => {
  console.log('Unrelated component rendered');
  return <div>I should not re-render when parent state changes!</div>;
};

const MemoizedUnrelatedComponent = React.memo(UnrelatedComponent);

const RerenderingDemo = () => {
  const [count, setCount] = useState(0);
  const [unrelatedState, setUnrelatedState] = useState(0);

  console.log('Parent component rendered');

  return (
    <div>
      <h2>Re-rendering Behavior Demo</h2>
      <div className="demo-section">
        <h3>Parent Component</h3>
        <button onClick={() => setCount(c => c + 1)}>
          Increment Count: {count}
        </button>
        <button onClick={() => setUnrelatedState(s => s + 1)}>
          Change Unrelated State: {unrelatedState}
        </button>
      </div>

      <div className="demo-section">
        <h3>Regular vs Memoized Components</h3>
        <div className="component-comparison">
          <div>
            <h4>Without Memo:</h4>
            <UnrelatedComponent />
          </div>
          <div>
            <h4>With Memo:</h4>
            <MemoizedUnrelatedComponent />
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h3>Memoized Child with Props</h3>
        <ChildComponent count={count} />
      </div>

      <div className="instructions">
        <p>Open the console to see re-rendering patterns:</p>
        <ul>
          <li>Regular components re-render on any parent state change</li>
          <li>Memoized components only re-render when their props change</li>
          <li>Parent state changes don't affect memoized components without prop changes</li>
        </ul>
      </div>
    </div>
  );
};

export default RerenderingDemo;
