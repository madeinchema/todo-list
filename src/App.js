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
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos])

  // Task title input value handler for controlled component
  const handleTitle = (event) => {
    setInputTitle(event.target.value);
  }

  // Adds a new to-do object to the "todos" state
  const addTodo = (todo) => {
    setTodos((prevState) => [...prevState, todo]);
    setInputTitle('')
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
            setTodos={setTodos}
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
