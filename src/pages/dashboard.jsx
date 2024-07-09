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
              {/* Add your dashboard content here */}
            </div>
          </Container>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
