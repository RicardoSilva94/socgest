import React from 'react';
import AppHeader from '../components/header/header';
import Sidebar from '../components/sidebar/sidebar';
import { Container } from 'react-bootstrap';
import './perfil.css';
import PerfilUser from '../components/perfilUser/perfilUser';

const Perfil = () => {

    return (
        <div className="perfil">
          <AppHeader />
          <div className="perfil-content">
            <Sidebar />
            <div className="main-content">
              <Container fluid>
                <PerfilUser />
              </Container>
            </div>
          </div>
        </div>
      );
    }

export default Perfil;