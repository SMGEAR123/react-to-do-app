import React from 'react';
import logo from './logo.svg';
import './App.css';

interface ToDoListAppState {
  toDoItems: any[],
}

interface ToDoInputState {
  value: string;
} // Defining type to avoid TypeScript errors when accessing State in component render functions. Explanation: https://stackoverflow.com/questions/47561848/property-value-does-not-exist-on-type-readonly

interface ToDoAreaState {
  value: string
};

const Title = () => {
  return (
    <h1>To Do List Application</h1>
  );
}

class ToDoInput extends React.Component <{}, ToDoInputState> {
  constructor(props: any) {
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

class ToDoArea extends React.Component <{}, ToDoAreaState> {
  constructor(props: any) {
    super(props);
    this.state = {
      value: 'Enter a description of the To Do Item here.'
    };
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
    console.log("Submitting Value From TextArea:", submitValue);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Description:
          <textarea value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  } 
}

const List = (props: any) => {
  console.log("list props", props);
  return (
    <ul>
      {props.items.map((item: any, index: number) => {
        return <li key={item.id}>{item.name}</li>
      })}
    </ul>
  );
}

class ToDoListApp extends React.Component <{}, ToDoListAppState> {
  constructor(props: any) {
    super(props);

    this.state = {
      toDoItems: [
        {
          name: 'To Do Item Name',
          description: 'The first to do Item',
          id: "1a"
        },
        {
          name: 'To Do Item Name',
          description: 'The second to do Item',
          id: "1b"
        },
        {
          name: 'To Do Item Name',
          description: 'The third to do Item',
          id: "1c"
        }
      ]
    }
  }

  render() {
    return (
      <main>
      <Title />
      <ToDoInput />
      <ToDoArea />
      <List items={this.state.toDoItems} />
      </main>
    );
  }
}



function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <ToDoListApp />

    </div>
  );
}

export default App;
