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
              {/* Incorporar o vídeo do YouTube */}
              <div className="video-container">
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/HbMK0pu3O9k?si=rKedj4KjGmk9m0Xc"
                  title="Tutorial sobre o website"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
