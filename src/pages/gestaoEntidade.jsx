import React from 'react';
import AppHeader from '../components/header/header';
import Sidebar from '../components/sidebar/sidebar';
import { Container } from 'react-bootstrap';
import './gestaoEntidade.css';
import Entidade from '../components/entidade/entidade';

const GestaoEntidade = () => {
  return (
    <div className="gestao-entidade">
      <AppHeader />
      <div className="gestao-entidade-content">
        <Sidebar />
        <div className="main-content">
          <Container fluid>
            <Entidade />
          </Container>
        </div>
      </div>
    </div>
  );
};

export default GestaoEntidade;