import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React from 'react';



export default function AppHeader() {
    return(
            <Navbar expand="lg" className="bg-body-tertiary py-3">
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
                    <Nav.Link href="#link">Entrar</Nav.Link>
                    <Nav.Link href="#link">Quem Somos</Nav.Link>
                    <Nav.Link href="#link">Sócios</Nav.Link>
                    <Nav.Link href="#link">Quotas</Nav.Link>
                    <Nav.Link href="#link">Contactos</Nav.Link>
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
          );
        }
        
    
    


