import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../src/pages/home';
import Dashboard from '../src/pages/dashboard';
import GestaoSocios from '../src/pages/gestaoSocios';
import GestaoQuotas from './pages/gestaoQuotas';
import Perfil from './pages/perfil';
import GestaoEntidade from './pages/gestaoEntidade';
import Notificacoes from './pages/notificacoes';
import { UserProvider } from './context/UserContext';
import ResetPasswordForm from './components/header/resetPasswordForm';
import ProtectedRoute from '../src/protectedRoute';

function App() {
  return (
    <Router>
      <UserProvider>
        <div className="App">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/dashboard" component={Dashboard} />
            <ProtectedRoute path="/socios" component={GestaoSocios} />
            <ProtectedRoute path="/quotas" component={GestaoQuotas} />
            <ProtectedRoute path="/entidade" component={GestaoEntidade} />
            <ProtectedRoute path="/perfil" component={Perfil} />
            <ProtectedRoute path="/notificacoes" component={Notificacoes} />
            <Route path="/reset-password/:token" component={ResetPasswordForm} />
          </Switch>
        </div>
      </UserProvider>
    </Router>
  );
}

export default App;
