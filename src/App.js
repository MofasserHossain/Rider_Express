import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import { createContext, useState } from 'react';
import Home from './components/Home/Home';
export const UserContext = createContext();
function App() {
  const [user, setUser] = useState([]);
  return (
    <UserContext.Provider value={[user, setUser]}>
      <Router>
        <Header></Header>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/destination">{/* <PublicPage /> */}</Route>
          <Route path="/login">{/* <LoginPage /> */}</Route>
          {/* <PrivateRoute path="/protected"> */}
          {/* <ProtectedPage /> */}
          {/* </PrivateRoute> */}
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
