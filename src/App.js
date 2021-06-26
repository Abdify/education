import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Course from './components/Course/Course';
import Home from './components/Home/Home';
import Learn from './components/Learn/Learn';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
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
        </Switch>
      </Router>
    </div>
  );
}

export default App;
