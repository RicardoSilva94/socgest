import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React from 'react';
import './header.css';

export default function AppHeader() {
  const handleContactClick = (event) => {
    event.preventDefault();
    const contactSection = document.getElementById('contactos');
    contactSection.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary py-3" style={{ position: 'fixed', top: 0, width: '100%', zIndex: 1000 }}>
      <Container>
        <Navbar.Brand href="#home">
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
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#socios">Sócios</Nav.Link>
            <Nav.Link href="#quotas">Quotas</Nav.Link>
            <Nav.Link href="#about">Quem Somos</Nav.Link>
            <Nav.Link href="#contactos" onClick={handleContactClick}>Contactos</Nav.Link>
            <Nav.Link href="#link" style={{ borderRadius: '5px', color: 'white', backgroundColor: '#1f4d84' }}>Entrar</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

        
    
    


