import React from 'react';
import AppHeader from '../components/header/header';
import Sidebar from '../components/sidebar/sidebar';
import { Container } from 'react-bootstrap';
import './notificacoes.css';
import GestaoNotificacoes from '../components/gestaoNotificacoes/gestaoNotificacoes';

const Notificacoes = () => {

    return (
        <div className="gestao-notificacoes">
          <AppHeader />
          <div className="gestao-notificacoes-content">
            <Sidebar />
            <div className="main-content">
              <Container fluid>
                <GestaoNotificacoes />
              </Container>
            </div>
          </div>
        </div>
      );
    }

export default Notificacoes;