import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React, { useState } from 'react';
import './header.css';
import LoginModal from './loginModal';
import RegisterModal from './registerModal';

export const handleScrollToTop = (event) => {
  event.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

export default function AppHeader() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const handleCloseLogin = () => setShowLoginModal(false);
  const handleShowLogin = () => setShowLoginModal(true);

  const handleCloseRegister = () => setShowRegisterModal(false);
  const handleShowRegister = () => {
    setShowLoginModal(false);
    setShowRegisterModal(true);
  };

  const handleScrollToSection = (event, sectionId) => {
    event.preventDefault();
    const yOffset = -70;
    const element = document.getElementById(sectionId);
    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({ top: y, behavior: 'smooth' });
  };


  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary py-3" style={{ position: 'fixed', top: 0, width: '100%', zIndex: 1000 }}>
        <Container>
          <Navbar.Brand href="#home" onClick={handleScrollToTop}>
            <img
              src={'images/logo.png'}
              alt="Logo"
              width="120"
              height="45"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#home" onClick={handleScrollToTop}>Home</Nav.Link>
              <Nav.Link href="#socios">Sócios</Nav.Link>
              <Nav.Link href="#quotas">Quotas</Nav.Link>
              <Nav.Link href="#about" onClick={(e) => handleScrollToSection(e, 'about')}>Quem Somos</Nav.Link>
              <Nav.Link href="#contactos" onClick={(e) => handleScrollToSection(e, 'contactos')}>Contactos</Nav.Link>
              <Nav.Link onClick={handleShowLogin} style={{ borderRadius: '5px', color: 'white', backgroundColor: '#1f4d84', cursor: 'pointer' }}>Entrar</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <LoginModal show={showLoginModal} handleClose={handleCloseLogin} handleShowRegister={handleShowRegister} />
      <RegisterModal show={showRegisterModal} handleClose={handleCloseRegister} />
    </>
  );
}

    


