import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from  '../src/pages/home'
import Dashboard from '../src/pages/dashboard'
import GestaoSocios from '../src/pages/gestaoSocios';
import GestaoQuotas from './pages/gestaoQuotas';
import Perfil from './pages/perfil';
import GestaoEntidade from './pages/gestaoEntidade';


function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/socios" component={GestaoSocios} />
          <Route path="/quotas" component={GestaoQuotas} />
          <Route path="/entidade" component={GestaoEntidade} />
          <Route path="/perfil" component={Perfil} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
