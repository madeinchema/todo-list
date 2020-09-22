import React, {useState, useEffect} from 'react';
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

export default function App() {
  const [todos, setTodos] = useState([]);
  const [inputTitle, setInputTitle] = useState('');
  const [lastTitle, setLastTitle] = useState('');

  // Set todos state if there are todos saved in localStorage
  useEffect(() => {
    if (JSON.parse(localStorage.getItem('todos')) !== null) {
      setTodos(JSON.parse(localStorage.getItem('todos')));
    }
  }, [])

  // Update localStorage todos to match the current state
  useEffect(() => {
    setLocal('todos', todos);
  }, [todos])

  // Sets the value for the localStorage key passed
  const setLocal = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  }

  // Task title input value handler for controlled component
  const handleTitle = (event) => {
    setInputTitle(event.target.value);
  }

  // Adds a new to-do object to the "todos" state
  const addTodo = (todo) => {
    setTodos((prevState) => [...prevState, todo]);
    setInputTitle('')
  }

  const editTodo = (event, id, lastTitle) => {
    const currentChange = lastTitle ? lastTitle : event.target.value;

    setTodos(prevState => {
      return prevState.map(
        todo => todo.id === id
          ? { ...todo, title: currentChange }
          : todo
      )
    })
  }

  const removeTodo = (id) => {
    setTodos(prevState => prevState.filter(todo => todo.id !== id));
  }

  // Updates the state of a to-do's checkbox
  const handleChange = (id) => {
    setTodos(prevState => (
      prevState.map(todo => todo.id === id
        ? { ...todo, checked: !todo.checked }
        : todo
    )))
  }

  return (
    <ThemeProvider>
      <ColorModeProvider>
        <TurnOnColorMode>
          <CSSReset />
          <Navbar />
          <TodoInput
            title={inputTitle}
            addTodo={addTodo}
            handleTitle={handleTitle}
          />
          <TodoList
            todos={todos}
            handleChange={handleChange}
            editTodo={editTodo}
            removeTodo={removeTodo}
          />
        </TurnOnColorMode>
      </ColorModeProvider>
    </ThemeProvider>
  );
};

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
