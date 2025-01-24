import React, { useState } from 'react';

const generateData = (count) => {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    name: `Product ${index + 1}`,
    price: Math.floor(Math.random() * 1000) + 1,
    quantity: Math.floor(Math.random() * 50) + 1,
    category: ['Electronics', 'Clothing', 'Books', 'Food'][Math.floor(Math.random() * 4)]
  }));
};

function customUseState() {
  const state = {};
  const setState = (newState) => {
    Object.assign(state, newState);
  }

  return [state, setState];
}

const [state, setState] = customUseState();

const UseStateDemo = () => {

  // Multiple state management
  const [items, setItems] = useState(generateData(5));
  const [selectedId, setSelectedId] = useState(null);
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [editingItem, setEditingItem] = useState(null);
  const [newItem, setNewItem] = useState({
    name: '',
    price: '',
    quantity: '',
    category: 'Electronics'
  });
  console.log("🚀 ~ UseStateDemo ~ newItem:", newItem)

  // Handler functions
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }

    setItems(prev => [...prev].sort((a, b) => {
      if (sortDirection === 'asc') {
        return a[field] > b[field] ? 1 : -1;
      }
      return a[field] < b[field] ? 1 : -1;
    }));
  };

  const handleSelect = (id) => {
    setSelectedId(id);
    setEditingItem(null);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setSelectedId(item.id);
  };

  const handleDelete = (id) => {
    setItems(prev => prev.filter(item => item.id !== id));
    if (selectedId === id) setSelectedId(null);
    if (editingItem?.id === id) setEditingItem(null);
  };

  const handleAddNew = () => {
    const id = Math.max(...items.map(item => item.id)) + 1;
    const newItemWithId = { ...newItem, id };
    setItems(prev => [...prev, newItemWithId]);
    setNewItem({
      name: '',
      price: '',
      quantity: '',
      category: 'Electronics'
    });
  };

  const handleUpdateItem = () => {
    setItems(prev => prev.map(item =>
      item.id === editingItem.id ? editingItem : item
    ));
    setEditingItem(null);
  };

  return (
    <div className="demo-section">
      <div className="theory-section">
        <h3>Understanding useState</h3>
        <div className="theory-content">
          <h4>What is useState?</h4>
          <p>
            useState is a React Hook that lets you add state variables to functional components.
            It returns an array with two elements: the current state value and a function to update it.
          </p>

          <div className="code-block">
            <pre>
              {`const [state, setState] = useState(initialValue);

// Multiple state variables
const [selectedId, setSelectedId] = useState(null);
const [items, setItems] = useState([]);
const [sortField, setSortField] = useState(null);`}
            </pre>
          </div>

          <div className="warning-box">
            <h4>⚠️ Key Points</h4>
            <ul>
              <li>State updates are asynchronous</li>
              <li>Each state variable should represent a single concern</li>
              <li>Use functional updates when new state depends on old state</li>
              <li>State updates trigger re-renders</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="table-section">
        <h3>Data Table with useState</h3>

        {/* Add New Item Form */}
        <div className="form-section">
          <h4>Add New Item</h4>
          <input
            value={newItem.name}
            onChange={e => setNewItem(prev => ({ ...prev, name: e.target.value }))}
            placeholder="Name"
          />
          <input
            type="number"
            value={newItem.price}
            onChange={e => setNewItem(prev => ({ ...prev, price: e.target.value }))}
            placeholder="Price"
          />
          <input
            type="number"
            value={newItem.quantity}
            onChange={e => setNewItem(prev => ({ ...prev, quantity: e.target.value }))}
            placeholder="Quantity"
          />
          <select
            value={newItem.category}
            onChange={e => setNewItem(prev => ({ ...prev, category: e.target.value }))}
          >
            <option>Electronics</option>
            <option>Clothing</option>
            <option>Books</option>
            <option>Food</option>
          </select>
          <button onClick={handleAddNew} className="demo-button">Add Item</button>
        </div>

        {/* Edit Item Form */}
        {editingItem && (
          <div className="form-section">
            <h4>Edit Item</h4>
            <input
              value={editingItem.name}
              onChange={e => setEditingItem(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Name"
            />
            <input
              type="number"
              value={editingItem.price}
              onChange={e => setEditingItem(prev => ({ ...prev, price: e.target.value }))}
              placeholder="Price"
            />
            <input
              type="number"
              value={editingItem.quantity}
              onChange={e => setEditingItem(prev => ({ ...prev, quantity: e.target.value }))}
              placeholder="Quantity"
            />
            <select
              value={editingItem.category}
              onChange={e => setEditingItem(prev => ({ ...prev, category: e.target.value }))}
            >
              <option>Electronics</option>
              <option>Clothing</option>
              <option>Books</option>
              <option>Food</option>
            </select>
            <button onClick={handleUpdateItem} className="demo-button">Update Item</button>
          </div>
        )}

        {/* Data Table */}
        <table className="data-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('id')}>
                ID {sortField === 'id' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('name')}>
                Name {sortField === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('price')}>
                Price {sortField === 'price' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('quantity')}>
                Quantity {sortField === 'quantity' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('category')}>
                Category {sortField === 'category' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr
                key={item.id}
                className={selectedId === item.id ? 'selected' : ''}
                onClick={() => handleSelect(item.id)}
              >
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>${item.price}</td>
                <td>{item.quantity}</td>
                <td>{item.category}</td>
                <td>
                  <button onClick={() => handleEdit(item)} className="demo-button">Edit</button>
                  <button onClick={() => handleDelete(item.id)} className="demo-button delete">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="explanation-box">
          <h4>State Management in this Example:</h4>
          <ul>
            <li>items: Main data array</li>
            <li>selectedId: Currently selected row</li>
            <li>sortField & sortDirection: Sorting state</li>
            <li>editingItem: Item being edited</li>
            <li>newItem: Form state for new items</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UseStateDemo;
