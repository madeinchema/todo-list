import React from 'react'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import customTheme from './theme'

import Header from './components/Header/Header'
import TasksList from './pages/TasksList/TasksList'
import Settings from './pages/Settings/Settings'
import store from './redux/store'
import './index.scss'

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <ChakraProvider theme={customTheme}>
          <Header />

          <Switch>
            <Route exact path="/">
              <TasksList columnId="to-do" />
            </Route>

            <Route path="/settings">
              <Settings />
            </Route>
          </Switch>
        </ChakraProvider>
      </Router>
    </Provider>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
