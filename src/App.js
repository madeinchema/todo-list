import React from 'react';
import {
  ThemeProvider,
  ColorModeProvider,
  CSSReset,
  useColorMode,
  Box,
  Flex,
} from '@chakra-ui/core';
import Navbar from './components/Navbar';
import TaskList from './components/TaskList';
import NewTask from './components/NewTask';
import { TasksContextProvider } from './contexts/TasksContext';
import Settings from './components/Settings';

export default function App() {
  return (
    <ThemeProvider>
      <ColorModeProvider>
        <TurnOnColorMode>
          <CSSReset />
          <TasksContextProvider>
            <Navbar />
            <Flex
              direction='column'
              maxW='680px'
              mx='auto'
              h="calc(100vh - 4.5rem)"
            >
              <NewTask />
              <Settings/>
              <TaskList columnId='to-do'/>
            </Flex>
          </TasksContextProvider>
        </TurnOnColorMode>
      </ColorModeProvider>
    </ThemeProvider>
  );
};

// ColorMode for the App's background
function TurnOnColorMode({ children }) {
  const bgColor = { light: 'gray.200', dark: 'gray.900' }
  const { colorMode } = useColorMode();

  return (
    <Box bg={bgColor[colorMode]}>
      {children}
    </Box>
  );
}
