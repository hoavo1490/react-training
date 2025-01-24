import React, { useState } from 'react';
import './App.css';
import UseStateDemo from './components/UseStateDemo';
import UseEffectDemo from './components/UseEffectDemo';
import UseMemoDemo from './components/UseMemoDemo';
import UseCallbackDemo from './components/UseCallbackDemo';
import ReactMemoDemo from './components/ReactMemoDemo';
import Theory from './components/Theory';
import StorageDemo from './components/StorageDemo';

function App() {
  const [activeSection, setActiveSection] = useState('theory');

  const renderContent = () => {
    switch (activeSection) {
      case 'theory':
        return <Theory />;
      case 'useState':
        return <UseStateDemo />;
      case 'useEffect':
        return <UseEffectDemo />;
      case 'useMemo':
        return <UseMemoDemo />;
      case 'useCallback':
        return <UseCallbackDemo />;
      case 'reactMemo':
        return <ReactMemoDemo />;
      case 'storageDemo':
        return <StorageDemo />;
      default:
        return <Theory />;
    }
  };

  return (
    <div className="App">
      <nav className="nav-menu">
        <button
          className={activeSection === 'theory' ? 'active' : ''}
          onClick={() => setActiveSection('theory')}
        >
          Theory
        </button>
        <button
          className={activeSection === 'useState' ? 'active' : ''}
          onClick={() => setActiveSection('useState')}
        >
          useState
        </button>
        <button
          className={activeSection === 'useEffect' ? 'active' : ''}
          onClick={() => setActiveSection('useEffect')}
        >
          useEffect
        </button>
        <button
          className={activeSection === 'useMemo' ? 'active' : ''}
          onClick={() => setActiveSection('useMemo')}
        >
          useMemo
        </button>
        <button
          className={activeSection === 'useCallback' ? 'active' : ''}
          onClick={() => setActiveSection('useCallback')}
        >
          useCallback
        </button>
        <button
          className={activeSection === 'reactMemo' ? 'active' : ''}
          onClick={() => setActiveSection('reactMemo')}
        >
          React.memo
        </button>
        <button
          className={activeSection === 'storageDemo' ? 'active' : ''}
          onClick={() => setActiveSection('storageDemo')}
        >
          Storage Demo
        </button>
      </nav>
      <main className="content">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
