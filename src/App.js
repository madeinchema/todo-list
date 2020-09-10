import React from 'react';
import {
  ThemeProvider,
  ColorModeProvider,
  CSSReset,
} from "@chakra-ui/core";
import Navbar from './components/Navbar';
import NewTask from './components/NewTask';
import Todo from './components/Todo';

function App() {
  return (
    <ThemeProvider>
      <ColorModeProvider>
        <CSSReset />
        <Navbar />
        <NewTask />
        <Todo />
      </ColorModeProvider>
    </ThemeProvider>
  );
}

export default App;
