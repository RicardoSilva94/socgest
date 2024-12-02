import React from 'react';
import AppHeader from '../components/header/header';
import Sidebar from '../components/sidebar/sidebar';
import { Container } from 'react-bootstrap';
import './notificacoes.css';
import HistoricoNotificacoes from '../components/gestaoNotificacoes/historicoNotificacoes';

const HistoricoNotificacoesPage = () => {

    return (
        <div className="historico-notificacoes">
          <AppHeader />
          <div className="historico-notificacoes-content">
            <Sidebar />
            <div className="main-content">
              <Container fluid>
                <HistoricoNotificacoes />
              </Container>
            </div>
          </div>
        </div>
      );
    }

export default HistoricoNotificacoesPage;