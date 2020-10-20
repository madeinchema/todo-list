import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
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
    <Router>
      <ThemeProvider>
        <ColorModeProvider>
          <TurnOnColorMode>
            <CSSReset />
            <TasksContextProvider>

              <Navbar />

              <Switch>
                <Route exact path='/'>
                  <Flex
                    direction='column'
                    maxW='680px'
                    mx='auto'
                    h="calc(100vh - 4.5rem)"
                  >
                    <NewTask />
                    <TaskList columnId='to-do'/>
                  </Flex>
                </Route>

                <Route path='/settings'>
                  <Settings/>
                </Route>
              </Switch>

            </TasksContextProvider>
          </TurnOnColorMode>
        </ColorModeProvider>
      </ThemeProvider>
    </Router>
  );
};

// ColorMode for the App's background
function TurnOnColorMode({ children }) {
  const bgColor = { light: 'gray.100', dark: 'gray.900' };
  const { colorMode } = useColorMode();

  return (
    <Box bg={bgColor[colorMode]}>
      {children}
    </Box>
  );
}
