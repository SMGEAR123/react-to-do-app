import React from 'react';
import logo from './logo.svg';
import './App.css';

const Hello = () => {
  return (
    <h2>Hello World!</h2>
  );
}

const Title = () => {
  return (
    <h1>To Do List Application</h1>
  );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <Title />
      <Hello />
    </div>
  );
}

export default App;
