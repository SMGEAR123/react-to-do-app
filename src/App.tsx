import React from 'react';
import logo from './logo.svg';
import './App.css';

interface ToDoState {
  value: string;
} // Defining type to avoid TypeScript errors when accessing State in component render functions. Explanation: https://stackoverflow.com/questions/47561848/property-value-does-not-exist-on-type-readonly

const Title = () => {
  return (
    <h1>To Do List Application</h1>
  );
}

class ToDoForm extends React.Component <{}, ToDoState> {
  

  constructor(props: any, state:ToDoState) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event: any) {
    const changeValue = event.target.value;
    this.setState({value: changeValue});
  }

  handleSubmit(event: any) {
    event.preventDefault();
    const submitValue = this.state.value;
    console.log("Submitting Value:", submitValue);
  }

  render() {
    const stateValue: string = this.state.value;
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          To Do Item:
          <input type="text" value={stateValue} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <Title />
      <ToDoForm />
    </div>
  );
}

export default App;
