import React, { useState, useMemo } from 'react';

// Sample data generation
const generateData = (count) => {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    name: `Product ${index + 1}`,
    price: Math.floor(Math.random() * 1000) + 1,
    quantity: Math.floor(Math.random() * 50) + 1,
    category: ['Electronics', 'Clothing', 'Books', 'Food'][Math.floor(Math.random() * 4)]
  }));
};

// Expensive column calculation function
const calculateColumnStats = (data, columnKey) => {
  console.log(`🧮 Calculating stats for ${columnKey}...`);

  // Artificial delay to simulate expensive calculation
  const startTime = Date.now();
  while (Date.now() - startTime < 100) {
    // Delay
  }

  const numericValues = data.map(item => item[columnKey]).filter(val => !isNaN(val));

  return {
    min: Math.min(...numericValues),
    max: Math.max(...numericValues),
    avg: numericValues.reduce((sum, val) => sum + val, 0) / numericValues.length,
    total: numericValues.reduce((sum, val) => sum + val, 0)
  };
};

// Table without useMemo
const TableWithoutMemo = ({ data }) => {
  const [sortKey, setSortKey] = useState('id');
  const [filterText, setFilterText] = useState('');

  // These calculations run on every render
  const priceStats = calculateColumnStats(data, 'price');
  const quantityStats = calculateColumnStats(data, 'quantity');

  const filteredData = data.filter(item =>
    item.name.toLowerCase().includes(filterText.toLowerCase()) ||
    item.category.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="demo-section without-memo">
      <h3>Without useMemo</h3>
      <div className="table-controls">
        <input
          type="text"
          placeholder="Filter items..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="filter-input"
        />
        <div className="stats-display">
          <div className="stat-box">
            <h4>Price Stats</h4>
            <p>Min: ${priceStats.min}</p>
            <p>Max: ${priceStats.max}</p>
            <p>Avg: ${priceStats.avg.toFixed(2)}</p>
          </div>
          <div className="stat-box">
            <h4>Quantity Stats</h4>
            <p>Min: {quantityStats.min}</p>
            <p>Max: {quantityStats.max}</p>
            <p>Total: {quantityStats.total}</p>
          </div>
        </div>
      </div>
      <table className="data-table">
        <thead>
          <tr>
            {['ID', 'Name', 'Price', 'Quantity', 'Category'].map(header => (
              <th
                key={header}
                onClick={() => setSortKey(header.toLowerCase())}
                className={sortKey === header.toLowerCase() ? 'active' : ''}
              >
                {header} {sortKey === header.toLowerCase() ? '↓' : ''}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>${item.price}</td>
              <td>{item.quantity}</td>
              <td>{item.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="note">
        Notice: Stats recalculate on EVERY render, even when just filtering or sorting!
      </p>
    </div>
  );
};

// Table with useMemo
const TableWithMemo = ({ data }) => {
  const [sortKey, setSortKey] = useState('id');
  const [filterText, setFilterText] = useState('');

  // Memoized calculations
  const priceStats = useMemo(() => calculateColumnStats(data, 'price'), [data]);
  const quantityStats = useMemo(() => calculateColumnStats(data, 'quantity'), [data]);

  const filteredData = useMemo(() =>
    data.filter(item =>
      item.name.toLowerCase().includes(filterText.toLowerCase()) ||
      item.category.toLowerCase().includes(filterText.toLowerCase())
    ),
    [data, filterText]
  );

  const prepareDataBeforeRender = useMemo(() => {
    data.forEach(item => {
      console.log('prepareDataBeforeRender');
      console.log('item', item);
     })
  }, [data, filterText]);

  return (
    <div className="demo-section with-memo">
      <h3>With useMemo</h3>
      <div className="table-controls">
        <input
          type="text"
          placeholder="Filter items..."
          value={filterText}
          onChange={(e) => { setFilterText(e.target.value);
            prepareDataBeforeRender();
          }}
          className="filter-input"
        />
        <div className="stats-display">
          <div className="stat-box">
            <h4>Price Stats</h4>
            <p>Min: ${priceStats.min}</p>
            <p>Max: ${priceStats.max}</p>
            <p>Avg: ${priceStats.avg.toFixed(2)}</p>
          </div>
          <div className="stat-box">
            <h4>Quantity Stats</h4>
            <p>Min: {quantityStats.min}</p>
            <p>Max: {quantityStats.max}</p>
            <p>Total: {quantityStats.total}</p>
          </div>
        </div>
      </div>
      <table className="data-table">
        <thead>
          <tr>
            {['ID', 'Name', 'Price', 'Quantity', 'Category'].map(header => (
              <th
                key={header}
                onClick={() => setSortKey(header.toLowerCase())}
                className={sortKey === header.toLowerCase() ? 'active' : ''}
              >
                {header} {sortKey === header.toLowerCase() ? '↓' : ''}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>${item.price}</td>
              <td>{item.quantity}</td>
              <td>{item.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="note">
        Notice: Stats only recalculate when the data changes!
      </p>
    </div>
  );
};

const UseMemoDemo = () => {
  const [data] = useState(() => generateData(100));

  return (
    <div className="use-memo-demo">
      <h2>useMemo Hook Demo</h2>

      <div className="theory-section">
        <h3>Understanding useMemo</h3>
        <div className="theory-content">
          <h4>What is useMemo?</h4>
          <p>
            useMemo is a React Hook that lets you cache the result of a calculation between re-renders.
            It's particularly useful for expensive computations or when you want to prevent unnecessary re-calculations.
          </p>

          <h4>Syntax</h4>
          <div className="code-block">
            <pre>
              {`const memoizedValue = useMemo(
  () => computeExpensiveValue(a, b),
  [a, b]
);`}
            </pre>
          </div>

          <div className="warning-box">
            <h4>⚠️ Important Notes</h4>
            <ul>
              <li>Don't overuse useMemo - it comes with its own overhead</li>
              <li>Only memoize values when there's a clear performance benefit</li>
              <li>Make sure your dependency array is properly configured</li>
              <li>useMemo is for values, useCallback is for functions</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="comparison">
        <TableWithoutMemo data={data} />
        <TableWithMemo data={data} />
      </div>

      <div className="explanation-box">
        <h4>useMemo Cases in this Example:</h4>
        <ul>
          <li>Expensive statistics calculations (min, max, avg, total)</li>
          <li>Filtered data computation based on search term</li>
          <li>Performance comparison between memoized and non-memoized versions</li>
          <li>Preventing unnecessary recalculations during renders</li>
          <li>Optimizing data processing in a data table context</li>
        </ul>

        <h4>Key Benefits Demonstrated:</h4>
        <ul>
          <li>Improved performance for expensive calculations</li>
          <li>Stable references for derived data</li>
          <li>Reduced unnecessary processing on re-renders</li>
          <li>Better user experience with responsive UI</li>
        </ul>
      </div>
    </div>
  );
};

export default UseMemoDemo;
