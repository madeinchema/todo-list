import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {
  ThemeProvider,
  ColorModeProvider,
  CSSReset,
  useColorMode,
  Box,
} from '@chakra-ui/core';
import Header from './components/Header/Header';
import TasksList from './pages/TasksList/TasksList';
import { TasksContextProvider } from './contexts/TasksContext';
import Settings from './pages/Settings';

export default function App() {
  return (
    <Router>
      <ThemeProvider>
        <ColorModeProvider>
          <TurnOnColorMode>
            <CSSReset />
            <TasksContextProvider>

              <Header />

              <Switch>
                <Route exact path='/'>
                  <TasksList columnId='to-do'/>
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
