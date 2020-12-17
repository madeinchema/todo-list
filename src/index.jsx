import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ChakraProvider, useColorMode, Box } from '@chakra-ui/react';
import Header from './components/Header/Header';
import TasksList from './pages/TasksList/TasksList';
import { TasksContextProvider } from './contexts/TasksContext';
import Settings from './pages/Settings/Settings';
import './index.scss';

const App = () => {
  return (
    <Router>
      <ChakraProvider>
        <TurnOnColorMode>
          <TasksContextProvider>
            <Header />

            <Switch>
              <Route exact path="/">
                <TasksList columnId="to-do" />
              </Route>

              <Route path="/settings">
                <Settings />
              </Route>
            </Switch>
          </TasksContextProvider>
        </TurnOnColorMode>
      </ChakraProvider>
    </Router>
  );
};

// ColorMode for the App's background
function TurnOnColorMode({ children }) {
  const bgColor = { light: 'gray.100', dark: 'gray.900' };
  const { colorMode } = useColorMode();

  return <Box bg={bgColor[colorMode]}>{children}</Box>;
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
