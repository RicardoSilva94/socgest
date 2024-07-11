import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from  '../src/pages/home'
import Dashboard from '../src/pages/dashboard'
import GestaoSocios from '../src/pages/gestaoSocios';


function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/socios" component={GestaoSocios} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
