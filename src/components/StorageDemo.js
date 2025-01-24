import React, { useState, useEffect, createContext, useContext } from 'react';
import '../styles/StorageDemo.css';

// Create a context for demo
const DemoContext = createContext();

// Context Provider Component
const DemoProvider = ({ children }) => {
  const [contextValue, setContextValue] = useState('Initial Context Value');

  return (
    <DemoContext.Provider value={{ contextValue, setContextValue }}>
      {children}
    </DemoContext.Provider>
  );
};

// Component to demonstrate different storage methods
const StorageDemo = () => {
  // Local State
  const [localState, setLocalState] = useState('Initial State');

  // Context
  const { contextValue, setContextValue } = useContext(DemoContext);

  // Local Storage
  const [localStorageValue, setLocalStorageValue] = useState(() => {
    return localStorage.getItem('demoValue') || 'Initial localStorage Value';
  });

  // Session Storage
  const [sessionStorageValue, setSessionStorageValue] = useState(() => {
    return sessionStorage.getItem('demoValue') || 'Initial sessionStorage Value';
  });

  // Update localStorage when value changes
  useEffect(() => {
    localStorage.setItem('demoValue', localStorageValue);
  }, [localStorageValue]);

  // Update sessionStorage when value changes
  useEffect(() => {
    sessionStorage.setItem('demoValue', sessionStorageValue);
  }, [sessionStorageValue]);

  return (
    <div className="storage-demo">
      <h2>Storage Methods Demo</h2>

      <div className="storage-grid">
        {/* Local State Demo */}
        <div className="storage-case">
          <h3>Local State (useState)</h3>
          <p>Current Value: {localState}</p>
          <input
            type="text"
            value={localState}
            onChange={(e) => setLocalState(e.target.value)}
            placeholder="Update local state"
          />
          <p className="note">
            ℹ️ Resets on page refresh
          </p>
        </div>

        {/* Context Demo */}
        <div className="storage-case">
          <h3>Context</h3>
          <p>Current Value: {contextValue}</p>
          <input
            type="text"
            value={contextValue}
            onChange={(e) => setContextValue(e.target.value)}
            placeholder="Update context value"
          />
          <p className="note">
            ℹ️ Shared between components, resets on refresh
          </p>
        </div>

        {/* Local Storage Demo */}
        <div className="storage-case">
          <h3>Local Storage</h3>
          <p>Current Value: {localStorageValue}</p>
          <input
            type="text"
            value={localStorageValue}
            onChange={(e) => setLocalStorageValue(e.target.value)}
            placeholder="Update localStorage value"
          />
          <p className="note">
            ℹ️ Persists after refresh & browser close
          </p>
        </div>

        {/* Session Storage Demo */}
        <div className="storage-case">
          <h3>Session Storage</h3>
          <p>Current Value: {sessionStorageValue}</p>
          <input
            type="text"
            value={sessionStorageValue}
            onChange={(e) => setSessionStorageValue(e.target.value)}
            placeholder="Update sessionStorage value"
          />
          <p className="note">
            ℹ️ Persists on refresh, clears on browser close
          </p>
        </div>
      </div>

      <div className="storage-comparison">
        <h3>Storage Methods Comparison</h3>
        <table>
          <thead>
            <tr>
              <th>Storage Type</th>
              <th>Persistence</th>
              <th>Scope</th>
              <th>Use Case</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Local State</td>
              <td>Component lifetime</td>
              <td>Component only</td>
              <td>Component-specific UI state</td>
            </tr>
            <tr>
              <td>Context</td>
              <td>App runtime</td>
              <td>Component tree</td>
              <td>Shared state without prop drilling</td>
            </tr>
            <tr>
              <td>Local Storage</td>
              <td>Permanent</td>
              <td>Browser domain</td>
              <td>User preferences, tokens</td>
            </tr>
            <tr>
              <td>Session Storage</td>
              <td>Browser session</td>
              <td>Browser tab</td>
              <td>Temporary session data</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Wrap the component with the context provider
const StorageDemoWrapper = () => {
  return (
    <DemoProvider>
      <StorageDemo />
    </DemoProvider>
  );
};

export default StorageDemoWrapper;
