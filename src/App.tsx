import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';

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
  }

  handleChange(event: any) {
    const changeValue = event.target.value;
    this.setState({value: changeValue});
  }

  render() {
    const stateValue: string = this.state.value;
    return (
      <Form.Group controlId="toDoForm.ControlInput1">
        <Form.Label>To Do Item</Form.Label>
        <Form.Control 
          type="text" 
          value={stateValue} 
          onChange={this.handleChange} 
          placeholder={this.placeholder} 
        />
      </Form.Group>
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
  }

  handleChange(event: any) {
    const changeValue = event.target.value;
    this.setState({value: changeValue});
  }

  render() {
    return (
      <Form.Group controlId="toDoForm.ControlTextArea1">
        <Form.Label>Description:</Form.Label>
        <Form.Control as="textarea" 
          rows={3} 
          value={this.state.value} 
          onChange={this.handleChange} 
          placeholder={this.placeholder}
        />
      </Form.Group>
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
      <Form onSubmit={this.handleSubmit}> 
        <ToDoInput />
        <ToDoArea />
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    );
  }
}

const List = (props: any) => {
  console.log("list props", props);
  return (
    <ListGroup className="mt-2">
      {props.items.map((item: any, index: number) => {
        return <ListGroup.Item key={item.id} onClick={props.clickMethod}>{item.name}</ListGroup.Item>
      })}
    </ListGroup>
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

    const toDoItem = {...toDoValues, id: uuidv4() }// Creates toDoItem with a unique ID that will be used as it's key.
    items.push(toDoItem);

    this.setState({
      toDoItems: items
    });// Update state with new items
  }

  handleItemClick(val: any) {
    console.log("This from click event:", val.target.innerHTML);
  }
  

  render() {
    console.log("render state", this.state);
    return (
      <main>
      <ToDoForm submitToDo={this.addToDoItem.bind(this)} />
      <List items={this.state.toDoItems} clickMethod={this.handleItemClick} />
      </main>
    );
  }
}

function App() {
  return (
    <div className="App container">
      <Title />
      <ToDoListApp />
    </div>
  );
}

export default App;
