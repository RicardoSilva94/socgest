import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React, { useState } from 'react';
import './header.css';
import LoginModal from './loginModal';
import RegisterModal from './registerModal';
import { Link, useHistory } from 'react-router-dom';

// Função para fazer scroll suave até o topo da página
export const handleScrollToTop = (event) => {
  event.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
};


export default function AppHeader() {
  const history = useHistory();

  const handleNavigateHome = (event) => {
    history.push('/');
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };
  // Estado para controlar a exibição do modal de login
  const [showLoginModal, setShowLoginModal] = useState(false);
  // Estado para controlar a exibição do modal de registo
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  // Função para fechar o modal de login
  const handleCloseLogin = () => setShowLoginModal(false);
  // Função para abrir o modal de login
  const handleShowLogin = () => setShowLoginModal(true);

  // Função para fechar o modal de registoo
  const handleCloseRegister = () => setShowRegisterModal(false);
  // Função para abrir o modal de registoo e fechar o modal de login, se aberto
  const handleShowRegister = () => {
    setShowLoginModal(false);
    setShowRegisterModal(true);
  };

  // Função para fazer scroll suave até uma seção específica da página
  const handleScrollToSection = (event, sectionId) => {
    event.preventDefault();
    const yOffset = -70; // Offset para ajustar a posição do scroll
    const element = document.getElementById(sectionId);
    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  // Retorno do JSX que renderiza o cabeçalho da aplicação
  return (
    <>
      {/* Navbar fixada no topo da página */}
      <Navbar expand="lg" className="bg-body-tertiary py-3" style={{ position: 'fixed', top: 0, width: '100%', zIndex: 1000 }}>
        <Container>

          {/* Link para a home com função para scroll suave ao topo */}
           <Link to="/" className="navbar-brand" onClick={handleNavigateHome}>
            <img
              src={'images/logo.png'} 
              alt="Logo"
              width="120"
              height="45"
              className="d-inline-block align-top"
            />
            </Link>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
            <Nav.Item>
                <Link to="/" className="nav-link" onClick={handleNavigateHome}>Home</Link>
              </Nav.Item> 
              <Nav.Link href="/socios">Sócios</Nav.Link> 
              <Nav.Link href="/quotas">Quotas</Nav.Link> 
              <Nav.Link href="#about" onClick={(e) => handleScrollToSection(e, 'about')}>Quem Somos</Nav.Link> 
              <Nav.Link href="#contactos" onClick={(e) => handleScrollToSection(e, 'contactos')}>Contactos</Nav.Link>
              <Nav.Link onClick={handleShowLogin} style={{ borderRadius: '5px', color: 'white', backgroundColor: '#1f4d84', cursor: 'pointer' }}>Entrar</Nav.Link> 
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Modal de Login */}
      <LoginModal show={showLoginModal} handleClose={handleCloseLogin} handleShowRegister={handleShowRegister} />
      {/* Modal de Registo */}
      <RegisterModal show={showRegisterModal} handleClose={handleCloseRegister} />
    </>
  );
}

    


