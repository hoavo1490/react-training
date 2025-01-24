import React from 'react';

const Theory = () => {
  return (
    <div className="theory-section">
      <h1>React Hooks Tutorial</h1>

      <section>
        <h2>useState</h2>
        <div className="hook-explanation">
          <p><strong>Purpose:</strong> Manages state in functional components</p>
          <p><strong>Use when:</strong> You need to handle changing data in your component</p>
          <p><strong>Key points:</strong></p>
          <ul>
            <li>Returns an array with current state and setter function</li>
            <li>State updates trigger re-renders</li>
            <li>Can use multiple useState hooks in one component</li>
          </ul>
        </div>
      </section>

      <section>
        <h2>useEffect</h2>
        <div className="hook-explanation">
          <p><strong>Purpose:</strong> Handles side effects in functional components</p>
          <p><strong>Use when:</strong> You need to:</p>
          <ul>
            <li>Fetch data</li>
            <li>Subscribe to services</li>
            <li>Manually change DOM</li>
            <li>Handle component lifecycle events</li>
          </ul>
        </div>
      </section>

      <section>
        <h2>useMemo</h2>
        <div className="hook-explanation">
          <p><strong>Purpose:</strong> Memoizes computed values</p>
          <p><strong>Use when:</strong></p>
          <ul>
            <li>You have expensive calculations</li>
            <li>You want to prevent unnecessary re-computations</li>
            <li>You need to maintain reference equality</li>
          </ul>
        </div>
      </section>

      <section>
        <h2>useCallback</h2>
        <div className="hook-explanation">
          <p><strong>Purpose:</strong> Memoizes functions</p>
          <p><strong>Use when:</strong></p>
          <ul>
            <li>Passing callbacks to optimized child components</li>
            <li>Preventing unnecessary re-renders</li>
            <li>Maintaining function reference equality</li>
          </ul>
        </div>
      </section>

      <section>
        <h2>React.memo</h2>
        <div className="hook-explanation">
          <p><strong>Purpose:</strong> Higher-order component for component optimization</p>
          <p><strong>Use when:</strong></p>
          <ul>
            <li>Component renders often with same props</li>
            <li>Component has expensive render calculations</li>
            <li>You want to prevent unnecessary re-renders</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Theory;
