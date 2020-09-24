import 'semantic-ui-css/semantic.min.css'

import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import { ApolloProvider } from '@apollo/react-hooks'
import client from './apollo'
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { UserProvider } from './contexts/UserContext'
import { ModalProvider } from './contexts/ModalContext'

import Layout from './components/Layout'
import App from './pages/App'
import Upload from './pages/Upload'
import File from './pages/File'

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <UserProvider>
        <ModalProvider>
          <Router>
            <Layout>
              <Route exact path='/'>
                <App />
              </Route>
              <Route exact path='/upload'>
                <Upload />
              </Route>
              <Route path='/:id([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})'>
                <File />
              </Route>
            </Layout>
          </Router>
        </ModalProvider>
      </UserProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
