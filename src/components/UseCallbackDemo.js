import React, { useState, useCallback, memo, useEffect } from 'react';

// Regular button component
const Button = memo(({ onClick, children }) => {
  console.log(`${children} rendered`);
  return (
    <button onClick={onClick} className="demo-button">
      {children}
    </button>
  );
});

// Component without useCallback
const CounterWithoutCallback = () => {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  // These functions are recreated on every render
  const incrementCount1 = () => {
    setCount1(c => c + 1);
  };

  const incrementCount2 = () => {
    setCount2(c => c + 1);
  };

  return (
    <div className="without-hook">
      <h3>Without useCallback</h3>
      <p>Count 1: {count1}</p>
      <p>Count 2: {count2}</p>
      <Button onClick={incrementCount1}>Increment Count 1</Button>
      <Button onClick={incrementCount2}>Increment Count 2</Button>
      <p className="note">Notice: Both buttons re-render when either is clicked</p>
    </div>
  );
};

// Component with useCallback
const CounterWithCallback = () => {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  // These functions are memoized and only recreated when needed
  const incrementCount1 = useCallback(() => {
    setCount1(c => c + 1);
  }, []);

  const incrementCount2 = useCallback(() => {
    setCount2(c => c + 1);
  }, []);

  return (
    <div className="with-hook">
      <h3>With useCallback</h3>
      <p>Count 1: {count1}</p>
      <p>Count 2: {count2}</p>
      <Button onClick={incrementCount1}>Increment Count 1</Button>
      <Button onClick={incrementCount2}>Increment Count 2</Button>
      <p className="note">Notice: Only the clicked button re-renders</p>
    </div>
  );
};

// Complex example with dependencies
const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState('all');

  // Memoized add todo function
  const addTodo = useCallback(() => {
    if (newTodo.trim()) {
      setTodos(currentTodos => [
        ...currentTodos,
        { id: Date.now(), text: newTodo, completed: false }
      ]);
      setNewTodo('');
    }
  }, [newTodo]);

  // Memoized toggle todo function
  const toggleTodo = useCallback((id) => {
    setTodos(currentTodos =>
      currentTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  // Memoized filtered todos
  const filteredTodos = useCallback(() => {
    switch (filter) {
      case 'completed':
        return todos.filter(todo => todo.completed);
      case 'active':
        return todos.filter(todo => !todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  return (
    <div className="demo-section">
      <h3>Todo List Example</h3>
      <div>
        <input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add todo"
        />
        <Button onClick={addTodo}>Add Todo</Button>
        <div>
          <Button onClick={() => setFilter('all')}>All</Button>
          <Button onClick={() => setFilter('active')}>Active</Button>
          <Button onClick={() => setFilter('completed')}>Completed</Button>
        </div>
        <ul>
          {filteredTodos().map(todo => (
            <li
              key={todo.id}
              onClick={() => toggleTodo(todo.id)}
              style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
            >
              {todo.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

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

// A memoized child component that displays a row
const TableRow = memo(({ item, onEdit, onDelete }) => {
  console.log(`🔄 Row ${item.id} is re-rendering`);
  return (
    <tr className="table-row">
      <td>{item.id}</td>
      <td>{item.name}</td>
      <td>${item.price}</td>
      <td>{item.category}</td>
      <td>
        <button onClick={() => onEdit(item)} className="demo-button">Edit</button>
        <button onClick={() => onDelete(item.id)} className="demo-button delete">Delete</button>
      </td>
    </tr>
  );
});

// Table without useCallback - child components re-render unnecessarily
const TableWithoutCallback = ({ data }) => {
  const [items, setItems] = useState(data);
  const [selectedId, setSelectedId] = useState(null);

  // These functions are recreated on every render
  const handleEdit = (item) => {
    console.log('Editing:', item.name);
    setSelectedId(item.id);
  };

  const handleDelete = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className="demo-section without-callback">
      <h3>Without useCallback</h3>
      <div className="explanation-box">
        <h4>What's Happening Here?</h4>
        <p>
          When you select a row:
        </p>
        <ul>
          <li>The parent component re-renders</li>
          <li>handleEdit and handleDelete are recreated</li>
          <li>All rows re-render because they receive new function references</li>
          <li>Check console to see unnecessary row re-renders!</li>
        </ul>
      </div>

      <div className="selected-info">
        Selected ID: {selectedId || 'None'}
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <TableRow
              key={item.id}
              item={item}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Table with useCallback - child components only re-render when necessary
const TableWithCallback = ({ data }) => {
  const [items, setItems] = useState(data);
  const [selectedId, setSelectedId] = useState(null);

  // Memoized callbacks maintain the same reference
  const handleEdit = useCallback((item) => {
    console.log('Editing:', item.name);
    setSelectedId(item.id);
  }, []); // Empty dependency array because we don't use any external values

  const handleDelete = useCallback((id) => {
    setItems(prev => prev.filter(item => item.id !== id));
  }, []); // Using functional update to avoid dependencies

  return (
    <div className="demo-section with-callback">
      <h3>With useCallback</h3>
      <div className="explanation-box">
        <h4>What's Happening Here?</h4>
        <p>
          When you select a row:
        </p>
        <ul>
          <li>The parent component re-renders</li>
          <li>handleEdit and handleDelete maintain their references</li>
          <li>Only the selected row re-renders</li>
          <li>Other rows skip rendering because their props haven't changed!</li>
        </ul>
      </div>

      <div className="selected-info">
        Selected ID: {selectedId || 'None'}
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <TableRow
              key={item.id}
              item={item}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const UseCallbackDemo = () => {
  const [data] = useState(() => generateData(10));

  return (
    <div className="use-callback-demo">
      <h2>useCallback Hook Demo</h2>

      <div className="theory-section">
        <h3>Understanding useCallback</h3>
        <div className="theory-content">
          <h4>The Problem: Re-rendering Child Components</h4>
          <p>
            In React, when a parent component re-renders, it creates new instances of all functions
            defined within it. When these functions are passed as props to memoized child components
            (using React.memo), the children will re-render unnecessarily because the function
            references change, even though the actual function logic remains the same.
          </p>

          <div className="code-block">
            <pre>
              {`// Without useCallback
const ParentComponent = () => {
  const [count, setCount] = useState(0);

  // This function is recreated every render
  const handleClick = () => {
    console.log('clicked');
  };

  return <ChildComponent onClick={handleClick} />;
};

// With useCallback
const ParentComponent = () => {
  const [count, setCount] = useState(0);

  // This function maintains the same reference
  const handleClick = useCallback(() => {
    console.log('clicked');
  }, []); // Empty deps = stable reference

  return <ChildComponent onClick={handleClick} />;
};`}
            </pre>
          </div>

          <div className="warning-box">
            <h4>⚠️ Important Notes</h4>
            <ul>
              <li>useCallback only helps if the child component is memoized (React.memo)</li>
              <li>Without React.memo, the child will re-render regardless of useCallback</li>
              <li>useCallback has its own performance cost, so use it judiciously</li>
              <li>Most effective when passing callbacks to expensive components</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="comparison">
        <TableWithoutCallback data={data} />
        <TableWithCallback data={data} />
      </div>

      <div className="explanation-box">
        <h4>useCallback vs useMemo in this Example:</h4>
        <ul>
          <li>useCallback memoizes functions, while useMemo memoizes values</li>
          <li>useCallback prevents recreation of event handlers (sort, filter, update)</li>
          <li>useMemo would be used for the computed data itself</li>
          <li>Both help prevent unnecessary re-renders but in different ways</li>
        </ul>

        <h4>useCallback Cases in this Example:</h4>
        <ul>
          <li>Memoized row update handlers</li>
          <li>Stable sort and filter functions</li>
          <li>Event handlers passed to child components</li>
          <li>Callbacks used in useEffect dependencies</li>
          <li>Functions that trigger expensive operations</li>
        </ul>

        <h4>Key Benefits Demonstrated:</h4>
        <ul>
          <li>Prevents unnecessary re-renders of child components</li>
          <li>Maintains consistent function references</li>
          <li>Optimizes performance for callback-heavy components</li>
          <li>Better memory management for event handlers</li>
        </ul>

        <h4>When to Use Which:</h4>
        <ul>
          <li>useCallback: For function stability and child component optimization</li>
          <li>useMemo: For expensive calculations and derived data</li>
          <li>useCallback: When the function is used in useEffect dependencies</li>
          <li>useMemo: When you need to cache computed values</li>
        </ul>
      </div>
    </div>
  );
};

export default UseCallbackDemo;
