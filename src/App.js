import React from 'react';
import {
  ThemeProvider,
  ColorModeProvider,
  CSSReset,
} from "@chakra-ui/core";
import Navbar from './components/Navbar';
import Todo from './components/Todo';

function App() {
  return (
    <ThemeProvider>
      <ColorModeProvider>
        <CSSReset />
        <Navbar />
        Hello world
        <Todo />
      </ColorModeProvider>
    </ThemeProvider>
  );
}

export default App;
