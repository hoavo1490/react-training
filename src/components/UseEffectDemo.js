import React, { useState, useEffect } from 'react';

const generateData = (count) => {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    name: `Product ${index + 1}`,
    price: Math.floor(Math.random() * 1000) + 1,
    quantity: Math.floor(Math.random() * 50) + 1,
    category: ['Electronics', 'Clothing', 'Books', 'Food'][Math.floor(Math.random() * 4)],
    lastUpdated: new Date().toISOString()
  }));
};

const UseEffectDemo = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);

  // Effect 1: Initial data loading simulation
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        const data = generateData(5);
        setItems(data);
        setFilteredItems(data);
        setError(null);
      } catch (err) {
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    loadData();

    // Cleanup function
    return () => {
      console.log('Component unmounting, cleaning up...');
    };
  }, []); // Empty deps array = run once on mount

  // Effect 2: Search/Filter functionality
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const filtered = items.filter(item =>
        Object.values(item).some(value =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setFilteredItems(filtered);
    }, 300); // Debounce search

    return () => clearTimeout(timeoutId); // Cleanup timeout
  }, [searchTerm, items]);

  // Effect 3: Auto-save functionality
  useEffect(() => {
    if (!autoSaveEnabled || !unsavedChanges) return;

    const autoSaveTimeout = setTimeout(() => {
      console.log('Auto-saving changes...');
      // Simulate saving to server
      setLastSaved(new Date().toLocaleTimeString());
      setUnsavedChanges(false);
    }, 2000);

    return () => clearTimeout(autoSaveTimeout);
  }, [unsavedChanges, autoSaveEnabled]);

  // Effect 4: Window event listener for unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (unsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [unsavedChanges]);

  // Effect 5: Selected item subscription simulation
  useEffect(() => {
    if (!selectedId) return;

    console.log(`Subscribing to updates for item ${selectedId}`);
    const intervalId = setInterval(() => {
      setItems(prevItems =>
        prevItems.map(item =>
          item.id === selectedId
            ? { ...item, lastUpdated: new Date().toISOString() }
            : item
        )
      );
    }, 5000);

    return () => {
      console.log(`Unsubscribing from updates for item ${selectedId}`);
      clearInterval(intervalId);
    };
  }, [selectedId]);

  const handleUpdateItem = (id, field, value) => {
    setItems(prev => prev.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    ));
    setUnsavedChanges(true);
  };

  return (
    <div className="demo-section">
      <div className="theory-section">
        <h3>Understanding useEffect</h3>
        <div className="theory-content">
          <h4>What is useEffect?</h4>
          <p>
            useEffect lets you perform side effects in function components. It runs
            after every render and can clean up after itself using a cleanup function.
          </p>

          <div className="code-block">
            <pre>
              {`useEffect(() => {
  // Side effect code
  return () => {
    // Cleanup code
  };
}, [/* dependencies */]);`}
            </pre>
          </div>

          <div className="warning-box">
            <h4>⚠️ Key Points</h4>
            <ul>
              <li>Effects run after render</li>
              <li>Cleanup runs before next effect and unmount</li>
              <li>Dependencies control when effect runs</li>
              <li>Empty deps array = run once on mount</li>
              <li>No deps array = run on every render</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="table-section">
        <h3>Data Table with useEffect</h3>

        <div className="table-controls">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search items..."
            className="search-input"
          />
          <label className="auto-save-toggle">
            <input
              type="checkbox"
              checked={autoSaveEnabled}
              onChange={(e) => setAutoSaveEnabled(e.target.checked)}
            />
            Auto-save enabled
          </label>
          {lastSaved && <span className="last-saved">Last saved: {lastSaved}</span>}
          {unsavedChanges && <span className="unsaved-changes">Unsaved changes</span>}
        </div>

        {loading ? (
          <div className="loading">Loading data...</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Category</th>
                <th>Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map(item => (
                <tr
                  key={item.id}
                  className={selectedId === item.id ? 'selected' : ''}
                  onClick={() => setSelectedId(item.id)}
                >
                  <td>{item.id}</td>
                  <td>
                    <input
                      value={item.name}
                      onChange={(e) => handleUpdateItem(item.id, 'name', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={item.price}
                      onChange={(e) => handleUpdateItem(item.id, 'price', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleUpdateItem(item.id, 'quantity', e.target.value)}
                    />
                  </td>
                  <td>
                    <select
                      value={item.category}
                      onChange={(e) => handleUpdateItem(item.id, 'category', e.target.value)}
                    >
                      <option>Electronics</option>
                      <option>Clothing</option>
                      <option>Books</option>
                      <option>Food</option>
                    </select>
                  </td>
                  <td>{new Date(item.lastUpdated).toLocaleTimeString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div className="explanation-box">
          <h4>useEffect Cases in this Example:</h4>
          <ul>
            <li>Data fetching with loading & error states</li>
            <li>Debounced search/filtering</li>
            <li>Auto-save with cleanup</li>
            <li>Window event listeners</li>
            <li>Subscriptions to selected item updates</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UseEffectDemo;
