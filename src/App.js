import React from 'react';
import {
  ThemeProvider,
  ColorModeProvider,
  CSSReset,
} from "@chakra-ui/core";

function App() {
  return (
    <ThemeProvider>
      <ColorModeProvider>
        <CSSReset />
        Hello world
      </ColorModeProvider>
    </ThemeProvider>
  );
}

export default App;
