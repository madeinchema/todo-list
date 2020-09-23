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

  return (
    <ThemeProvider>
      <ColorModeProvider>
        <TurnOnColorMode>
          <CSSReset />
          <Navbar />
          <TodoInput
            todos={todos}
            setTodos={setTodos}
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
