import React from 'react';
import './dashboard.css';
import Sidebar from '../components/sidebar/sidebar';
import { Container } from 'react-bootstrap';
import AppHeader from '../components/header/header';

const Dashboard = () => {
  return (
    <>
      <AppHeader />
      <div className="dashboard">
        <Sidebar />
        <div className="main-content">
          <Container fluid>
            <div className="content">
              <h2>Welcome to the Dashboard</h2>
              {/* Aqui quero ter o nome da Associação, número total de sócios, o valor que está por receber em quotas, o valor recebido em quotas.*/}
            </div>
          </Container>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
 