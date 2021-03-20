import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import { createContext, useState } from 'react';
import Home from './components/Home/Home';
import PickDestination from './components/PickDestination/PickDestination';
import Login from './components/Login/Login';
export const UserContext = createContext();
function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <PrivateRoute path="/destination/:serviceName">
            <PickDestination />
          </PrivateRoute>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="*">{/* <LoginPage /> */}</Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
