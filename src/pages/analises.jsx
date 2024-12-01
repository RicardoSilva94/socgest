import React from 'react';
import AppHeader from '../components/header/header';
import Sidebar from '../components/sidebar/sidebar';
import { Container } from 'react-bootstrap';
import './analises.css';
import AnalisesComponent from '../components/analises/analises';

const Analises = () => {
  return (
    <div className="analises">
      <AppHeader />
      <div>
        <Sidebar />
        <div className="main-content">
          <Container fluid>
            <AnalisesComponent />
          </Container>
        </div>
      </div>
    </div>
  );
};

export default Analises;