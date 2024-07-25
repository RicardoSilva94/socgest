import React from 'react';
import AppHeader from '../components/header/header';
import Sidebar from '../components/sidebar/sidebar';
import Socios from '../components/socios/socios';
import { Container } from 'react-bootstrap';
import './gestaoSocios.css';

const GestaoSocios = () => {
  return (
    <div className="gestao-socios">
      <AppHeader />
      <div className="gestao-socios-content">
        <Sidebar />
        <div className="main-content">
          <Container fluid>
            <Socios />
          </Container>
        </div>
      </div>
    </div>
  );
};

export default GestaoSocios;
