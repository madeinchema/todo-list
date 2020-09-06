import React from 'react';
import {
  ThemeProvider,
  ColorModeProvider,
  CSSReset,
} from "@chakra-ui/core";
import Navbar from './components/Navbar';

function App() {
  return (
    <ThemeProvider>
      <ColorModeProvider>
        <CSSReset />
        <Navbar />
        Hello world
      </ColorModeProvider>
    </ThemeProvider>
  );
}

export default App;
