import React from 'react';
import {
  ThemeProvider,
  ColorModeProvider,
  CSSReset,
} from '@chakra-ui/core';
import Navbar from './components/Navbar';
import TodoList from './components/TodoList';
import TodoInput from './components/TodoInput';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputTitle: '',
      todos: [],
    }
  }

  componentDidMount() {
    if (JSON.parse(localStorage.getItem('todos')) !== null) {
      this.setState({ todos: JSON.parse(localStorage.getItem('todos')) });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.setLocal('todos', this.state.todos);
  }

  setLocal = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  }

  handleTitle = (event) => {
    this.setState({ inputTitle: event.target.value })
  }

  // Adds a new to-do object to the "todos" state
  addTodo = (todo) => {
    this.setState((prevState) => ({ todos: [...prevState.todos, todo] }));
    this.setState({ inputTitle: '' });
  }

  // Updates the state of a to-do's checkbox
  handleChange = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.map(
        todo => todo.id === id ? { ...todo, checked: !todo.checked } : todo
      )
    }));
  }

  render() {
    return (
      <ThemeProvider>
        <ColorModeProvider>
          <CSSReset />
          <Navbar />
          <TodoInput
            title={this.state.inputTitle}
            addTodo={this.addTodo}
            handleTitle={this.handleTitle}
          />
          <TodoList
            todos={this.state.todos}
            handleChange={this.handleChange}
          />
        </ColorModeProvider>
      </ThemeProvider>
    );
  }
}

export default App;
