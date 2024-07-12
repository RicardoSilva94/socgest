import React, { useState, useEffect } from 'react';
import AppHeader from '../components/header/header';
import Sidebar from '../components/sidebar/sidebar';
import { Container } from 'react-bootstrap';
import './gestaoQuotas.css';
import Quotas from '../components/quotas/quotas';

const GestaoQuotas = () => {

    return (
        <div className="gestao-quotas">
          <AppHeader />
          <div className="gestao-quotas-content">
            <Sidebar />
            <div className="main-content">
              <Container fluid>
                <Quotas />
              </Container>
            </div>
          </div>
        </div>
      );
    };

export default GestaoQuotas;