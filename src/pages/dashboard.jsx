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
              <h2>Bem Vindo ao Dashboard de Gestão da sua Associação</h2>
              <div className="info-section">
                <p>Veja o video abaixo para aprender como utilizar o SocGest da melhor forma. </p>
              </div>
              <div className="video-container">
                <iframe width="800" height="455" src="https://www.youtube.com/embed/WD3DrXHOIe4?si=crdP7GeJq_c3blGR" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
