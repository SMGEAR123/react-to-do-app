import React, { useEffect, useState } from 'react';
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
    <h1>To Do List App</h1>
  );
}

class ToDoInput extends React.Component <any, ToDoInputState> {
  placeholder: string = "Enter a name"
  constructor(props: any) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      value: this.props.value
    }
  }

  handleChange(event: any) {
    const changeValue = event.target.value;
    this.setState({value: changeValue});
    this.props._handleChange(changeValue);
  }

  render() {   
    return (
      <Form.Group controlId="toDoForm.ControlInput1">
        <Form.Label>To Do Item</Form.Label>
        <Form.Control 
          type="text" 
          value={this.props.value}
          onChange={this.handleChange}
          placeholder={this.placeholder} 
          required
        />
      </Form.Group>
    );
  }
}

class ToDoArea extends React.Component <any, ToDoAreaState> {
  placeholder: string = 'Enter a description';
  constructor(props: any) {
    super(props);
    this.state = {
      value: this.props.value
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event: any) {
    const changeValue = event.target.value;
    this.setState({
      value: changeValue
    });
    this.props._handleChange(changeValue);
  }

  render() {
    return (
      <Form.Group controlId="toDoForm.ControlTextArea1">
        <Form.Label>Description:</Form.Label>
        <Form.Control as="textarea" 
          rows={3} 
          value={this.props.value} 
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
      this.handleSubmit = this.handleSubmit.bind(this); // Binds the handleSubmit method to this instance of the form.
  }

  handleSubmit(event: any) {
    const inputValue = event.target[0].value;
    const areaValue = event.target[1].value;
    const toDoItem = {
        name: inputValue,
        description: areaValue
      }// Taking values from form input and textArea to create toDoItem 
    this.props.submitToDo(toDoItem);

    this.setState({
      item: {
        name: '',
        description: ''
      }
    });
    event.preventDefault(); // Prevents form from resetting
  }
  
  handleInputChange(val: any) {
    this.setState({
      item: {
        name: val,
        description: this.state.item.description
      }
    }); // Sets the name of the item in state while keeping the description unchanged.
  }

  handleAreaChange(val: any) {
    this.setState({
      item: {
        name: this.state.item.name,
        description: val
      }
    }); // Sets the description of the item in state while keeping the name unchanged.
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}> 
        <ToDoInput 
        value={this.state.item.name}
        _handleChange={this.handleInputChange.bind(this)}
        />
        <ToDoArea 
        value={this.state.item.description}
        _handleChange={this.handleAreaChange.bind(this)}
        />
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    );
  }
}

const ItemForm = (props: any) => {
  // Variables below set and manage state. See docs: https://reactjs.org/docs/hooks-state.html
  const [name, setName] = useState(props.name);
  const [description, setDescription] = useState(props.description);
  const currentId = props._currentId;

  useEffect(() => {
    // Using Effect hook to listen in on changes to these properties in state.
    console.log("updated Name", name);
    console.log("updated Description", description);
  });

  return (
    <Form onSubmit={(e: any) => {
      props._handleEdit(currentId, name, description);
      e.preventDefault();
    }} >
              <ToDoInput 
                _handleChange={(val: any) => setName(val)}
                value={name}
              />
              
              <ToDoArea 
                _handleChange={(val: any) => setDescription(val)}
                value={description}
              />
              
              <Button variant="primary" type="submit">
                Save
              </Button>
              <Button variant="warning"
                onClick={props._toggleEdit.bind(this)}
              >
                Cancel
              </Button>
        </Form>
  );
}

const List = (props: any) => {
    return (
      <ListGroup className="mt-2">
        {props.items.map((item: any, index: number) => {
          if(item.edit) {
          return (
          <ListGroup.Item key={item.id}>
            <ItemForm 
              _currentId={item.id}
              _toggleEdit={props._toggleEdit.bind(this, item.id)} 
              _handleEdit={props._handleEdit}
              name={item.name}
              description={item.description}
              />
          </ListGroup.Item>
          );
        }
        else {
          return (
          <ListGroup.Item key={item.id}>
              <div className="flex-container">
                <div className="list-text">
                  <p className="item-name">{item.name}</p>
                  <p>{item.description}</p>
                </div>
                <div className="button-container">
                  <Button 
                  variant="danger" 
                  onClick={props.handleDelete.bind(this, item.id)}
                  >
                    X
                  </Button>
                  <Button 
                  variant="warning" 
                  onClick={props._toggleEdit.bind(this, item.id)}
                  >
                    Edit
                  </Button>
                </div>
              </div>
          </ListGroup.Item>
          );
        }
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
          id: "1a",
          edit: false
        },
        {
          name: 'Second To Do Item Name',
          description: 'The second to do Item',
          id: "1b",
          edit: false
        },
        {
          name: 'Third To Do Item Name',
          description: 'The third to do Item',
          id: "1c",
          edit: false
        }
      ]
    }
  }

  addToDoItem(toDoValues: any) {
    /* Had to bind this method since state was showing as undefined. Issue was due to the scope of the call 
    Reference: https://stackoverflow.com/questions/45998744/react-this-state-is-undefined 
    */
    const items = this.state.toDoItems.slice();

    const toDoItem = {...toDoValues, id: uuidv4(), edit: false }// Creates toDoItem with a unique ID that will be used as it's key.
    items.push(toDoItem);

    this.setState({
      toDoItems: items
    });// Update state with new items
  }

  deleteItem(id: any) {
    this.setState({
      toDoItems: this.state.toDoItems.slice().filter(item => item.id !== id)
    });
  }

  toggleEdit(id: any) {
    const editableItems = this.state.toDoItems.slice();
    
    editableItems.map(item => {
      if(item.id === id) {
        item.edit = !item.edit;
      }
      return editableItems
    });

    this.setState({
      toDoItems: editableItems
    });// Sets state of toDoItems with toggled boolean
  }

  handleEdit(id: string, updatedName: string, updatedDescription: string) {
    const newItemText = {
      name: updatedName,
      description: updatedDescription
    };

    // Finds the item from what's in the copied version of state and updates the value
    const toDoItemsCopy = this.state.toDoItems.slice();

    toDoItemsCopy.map((item) => {
      if(item.id === id) {
       item.name = newItemText.name;
       item.description = newItemText.description
       return item;
      } else {
        return toDoItemsCopy;
      }
    });

    this.toggleEdit(id);
  }

  render() {
    const toDoItems = this.state.toDoItems.slice();
    return (
      <main>
      <ToDoForm submitToDo={this.addToDoItem.bind(this)} />
      <List 
        items={toDoItems}
        handleDelete={this.deleteItem.bind(this)}
        _toggleEdit={this.toggleEdit.bind(this)}
        _handleEdit={this.handleEdit.bind(this)}
      />
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
