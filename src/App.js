import { createContext, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Course from './components/Course/Course';
import Home from './components/Home/Home';
import Learn from './components/Learn/Learn';
import Navbar from './components/Navbar/Navbar';
import CreateAccount from './components/UserAuthentication/CreateAccount/CreateAccount';
import LogIn from './components/UserAuthentication/LogIn/LogIn';

export const userAuthContext = createContext();

function App() {
  const [currentUser, setCurrentUser] = useState({});

  return (
    <userAuthContext.Provider value={[currentUser, setCurrentUser]}>
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/learn">
            <Learn />
          </Route>
          <Route path="/course/:courseId">
            <Course />
          </Route>
          <Route path="/login">
            <LogIn />
          </Route>
          <Route path="/signup">
            <CreateAccount />
          </Route>
        </Switch>
      </Router>
    </div>
    </userAuthContext.Provider>
  );
}

export default App;
