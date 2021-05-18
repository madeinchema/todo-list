import React from 'react'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Flex } from '@chakra-ui/layout'
import { ChakraProvider } from '@chakra-ui/react'
import customTheme from './theme'

import NewTask from './pages/TasksList/components/NewTask/NewTask'
import Settings from './pages/Settings/Settings'
import TasksList from './pages/TasksList/TasksList'
import Layout from './components/Layout'
import store from './redux/store'
import './index.scss'

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <ChakraProvider theme={customTheme}>
          <Layout>
            <Switch>
              <Route exact path="/">
                <Flex direction="column" height="100%">
                  <NewTask />
                  <TasksList columnId="to-do" />
                </Flex>
              </Route>

              <Route path="/settings">
                <Settings />
              </Route>
            </Switch>
          </Layout>
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
