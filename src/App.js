import {Route, Switch} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import CreateAnAccount from './components/CreateAnAccount'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/" component={LoginForm} />
    <Route exact path="/create-account" component={CreateAnAccount} />
  </Switch>
)

export default App
