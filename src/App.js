import React from 'react';
import {
  ThemeProvider,
  ColorModeProvider,
  CSSReset,
  useColorMode,
  Box
} from '@chakra-ui/core';
import Navbar from './components/Navbar';
import TodoList from './components/TodoList';
import TodoInput from './components/TodoInput';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputTitle: '',
      lastTitle: '',
      todos: [],
    }
  }

  // Set todos state if there are todos saved in localStorage
  componentDidMount() {
    if (JSON.parse(localStorage.getItem('todos')) !== null) {
      this.setState({ todos: JSON.parse(localStorage.getItem('todos')) });
    }
  }

  // Update localStorage todos to match the current state
  componentDidUpdate(prevProps, prevState, snapshot) {
    this.setLocal('todos', this.state.todos);
  }

  // Sets the value for the localStorage key passed
  setLocal = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  }

  // Task title input value handler for controlled component
  handleTitle = (event) => {
    this.setState({ inputTitle: event.target.value })
  }

  // Adds a new to-do object to the "todos" state
  addTodo = (todo) => {
    this.setState((prevState) => ({ todos: [...prevState.todos, todo] }));
    this.setState({ inputTitle: '' });
  }

  editTodo = (event, id, lastTitle) => {
    const currentChange = lastTitle ? lastTitle : event.target.value;
    this.setState(prevState => ({
      todos: prevState.todos.map(
        todo => todo.id === id
          ? { ...todo, title: currentChange }
          : todo
      )
    }));
  }

  removeTodo = (id) => {
    this.setState(prevState => {
      const todos = prevState.todos.filter(todo => todo.id !== id);
      return { todos }
    })
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
          <TurnOnColorMode>
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
              editTodo={this.editTodo}
              removeTodo={this.removeTodo}
            />
          </TurnOnColorMode>
        </ColorModeProvider>
      </ThemeProvider>
    );
  }
}

// ColorMode for the App's background
function TurnOnColorMode({ children }) {
  const bgColor = { light: 'gray.200', dark: 'gray.900' }
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box bg={bgColor[colorMode]}>
      {children}
    </Box>
  );
}
