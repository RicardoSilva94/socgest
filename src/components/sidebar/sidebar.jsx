import React, { useState } from 'react';
import './sidebar.css';
import Nav from 'react-bootstrap/Nav';
import { FaUsers, FaCoins, FaBars, FaUser } from 'react-icons/fa';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button className="toggle-button" onClick={toggleSidebar}>
        ☰
      </button>
      <div className={`sidebar ${isOpen ? 'show' : 'hidden'}`}>
        <Nav defaultActiveKey="/dashboard" className="flex-column">
          <div className="nav-title">Barra de Navegação</div>
          <Nav.Link href="/gestao-socios">
            <FaUsers className="nav-icon" /> Gestão de Sócios
          </Nav.Link>
          <Nav.Link href="/gestao-quotas">
            <FaCoins className="nav-icon" /> Gestão de Quotas
          </Nav.Link>
        </Nav>
        <Nav className="flex-column profile-section">
          <Nav.Link href="/gerir-perfil">
            <FaUser className="nav-icon" /> Gerir Perfil
          </Nav.Link>
        </Nav>
      </div>
    </>
  );
};

export default Sidebar;

