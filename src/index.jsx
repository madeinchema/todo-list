import React from 'react'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Box } from '@chakra-ui/layout'
import { useColorMode } from '@chakra-ui/color-mode'
import { ChakraProvider } from '@chakra-ui/react'

import Header from './components/Header/Header'
import TasksList from './pages/TasksList/TasksList'
import Settings from './pages/Settings/Settings'
import store from './redux/store'
import './index.scss'

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <ChakraProvider>
          <TurnOnColorMode>
            <Header />

            <Switch>
              <Route exact path="/">
                <TasksList columnId="to-do" />
              </Route>

              <Route path="/settings">
                <Settings />
              </Route>
            </Switch>
          </TurnOnColorMode>
        </ChakraProvider>
      </Router>
    </Provider>
  )
}

// ColorMode for the App's background
function TurnOnColorMode({ children }) {
  const bgColor = { light: 'gray.100', dark: 'gray.900' }
  const { colorMode } = useColorMode()

  return <Box bg={bgColor[colorMode]}>{children}</Box>
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
