import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React, { useState } from 'react';
import './header.css';
import LoginModal from './loginModal';
import RegisterModal from './registerModal';
import { Link, useHistory } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import Button from 'react-bootstrap/Button';
import { PersonCircle } from 'react-bootstrap-icons';

// Função para fazer scroll suave até o topo da página
export const handleScrollToTop = (event) => {
  event.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

export default function AppHeader() {
  const history = useHistory();
  const { user, setUser, logout } = useUser();


  const handleNavigateHome = (event) => {
    history.push('/');
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };
  
  const handleScrollToSection = (event, sectionId) => {
    event.preventDefault();
    
    // Verifica se o user está na home page
    if (window.location.pathname !== '/') {
      history.push('/'); // Redireciona para a home page
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          const yOffset = -70;
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        const yOffset = -70;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  };
  

  // Estado para controlar a exibição do modal de login
  const [showLoginModal, setShowLoginModal] = useState(false);
  // Estado para controlar a exibição do modal de registo
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  // Função para fechar o modal de login
  const handleCloseLogin = () => setShowLoginModal(false);
  // Função para abrir o modal de login
  const handleShowLogin = () => setShowLoginModal(true);

  // Função para fechar o modal de registro
  const handleCloseRegister = () => setShowRegisterModal(false);
  // Função para abrir o modal de registro e fechar o modal de login, se aberto
  const handleShowRegister = () => {
    setShowLoginModal(false);
    setShowRegisterModal(true);
  };
  //Função para lidar com o login do utilizador
  const handleLogin = (userData) => {
    setUser(userData); 
    handleCloseLogin(); // Fecha o modal de login após o login bem-sucedido
  };


  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary py-3" style={{ position: 'fixed', top: 0, width: '100%', zIndex: 1000 }}>
        <Container>
          <Link to="/" className="navbar-brand" onClick={handleNavigateHome}>
            <img
              src={'images/logo.png'} 
              alt="Logo"
              width="120"
              height="45"
              className="d-none d-md-inline-block align-top"
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
              {user ? (
                <>
                  <div className="d-flex align-items-center me-3">
                    <PersonCircle size={24} className="me-2" />
                    <span className="fw-bold">Bem-vindo, {user.name}!</span>
                  </div>
                  <Button 
                    onClick={logout} 
                  >
                    Sair
                  </Button>
                </>
              ) : (
                <Button 
                  onClick={handleShowLogin} 
                >
                  Entrar
                </Button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <LoginModal show={showLoginModal} handleClose={handleCloseLogin} handleShowRegister={handleShowRegister} handleLogin={handleLogin} />
      <RegisterModal show={showRegisterModal} handleClose={handleCloseRegister} handleShowLogin={handleShowLogin} />
    </>
  );
}


    


