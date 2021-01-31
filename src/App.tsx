import React from 'react';
import logo from './logo.svg';
import './App.css';

import { v4 as uuidv4 } from 'uuid';

interface ToDoInputState {
  value: string;
} // Defining type to avoid TypeScript errors when accessing State in component render functions. Explanation: https://stackoverflow.com/questions/47561848/property-value-does-not-exist-on-type-readonly

interface ToDoAreaState {
  value: string
};

interface ToDoFormState {
  item: {
    name: string,
    description: string,
  }
}

interface ToDoListAppState {
  toDoItems: any[],
}

const Title = () => {
  return (
    <h1>To Do List Application</h1>
  );
}

class ToDoInput extends React.Component <{}, ToDoInputState> {
  placeholder: string = "Enter a name"
  constructor(props: any) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event: any) {
    const changeValue = event.target.value;
    this.setState({value: changeValue});
  }

  // handleSubmit(event: any) {
  //   event.preventDefault();
  //   const submitValue = this.state.value;
  //   console.log("Submitting Value:", submitValue);
  // }

  render() {
    const stateValue: string = this.state.value;
    return (
        <label>
          To Do Item:
          <input type="text" value={stateValue} onChange={this.handleChange} placeholder={this.placeholder} />
        </label>
    );
  }
}

class ToDoArea extends React.Component <{}, ToDoAreaState> {
  placeholder: string = 'Enter a description';
  constructor(props: any) {
    super(props);
    this.state = {
      value: ''
    };
    this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event: any) {
    const changeValue = event.target.value;
    this.setState({value: changeValue});
  }

  // handleSubmit(event: any) {
  //   event.preventDefault();
  //   const submitValue = this.state.value;
  //   console.log("Submitting Value From TextArea:", submitValue);
  // }

  render() {
    return (
        <label>
          Description:
          <textarea value={this.state.value} onChange={this.handleChange} placeholder={this.placeholder}/>
        </label>
    );
  } 
}

class ToDoForm extends React.Component <any, ToDoFormState> {
  constructor(props: any) {
    super(props);
      this.state = {
          item: {
            name: '',
            description: ''
          }
      }

      this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event: any) {
    const inputValue = event.target[0].value;
    const areaValue = event.target[1].value;
    this.setState({
        item: {
          name: inputValue,
          description: areaValue
        }
    }, () => {
      console.log("Form state after event", this.state);
      const toDoItem = this.state.item
      this.props.submitToDo(toDoItem);
    });
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}> 
        <ToDoInput />
        <ToDoArea />
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
        return <li key={item.id} onClick={props.clickMethod}>{item.name}</li>
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
          name: 'First To Do Item Name',
          description: 'The first to do Item',
          id: "1a"
        },
        {
          name: 'Second To Do Item Name',
          description: 'The second to do Item',
          id: "1b"
        },
        {
          name: 'Third To Do Item Name',
          description: 'The third to do Item',
          id: "1c"
        }
      ]
    }
  }

  addToDoItem(toDoValues: any) {
    /* Had to bind this method since state was showing as undefined. Issue was due to the scope of the call 
    Reference: https://stackoverflow.com/questions/45998744/react-this-state-is-undefined 
    */
    const items = this.state.toDoItems.slice();
    console.log("Items in state", items);
    console.log("Submitted To Do Item:", toDoValues);

    const toDoItem = {...toDoValues, id: uuidv4() }
    items.push(toDoItem);
    console.log("toDoItem", toDoItem);
    console.log("after push", items);
  }

  handleItemClick(val: any) {
    console.log("This from click event:", val.target.innerHTML);
  }
  

  render() {
    console.log("render state", this.state);
    return (
      <main>
      <Title />
      <ToDoForm submitToDo={this.addToDoItem.bind(this)} />
      <List items={this.state.toDoItems} clickMethod={this.handleItemClick} />
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
