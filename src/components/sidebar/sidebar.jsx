import React, { useState} from 'react';
import './sidebar.css';
import Nav from 'react-bootstrap/Nav';
import { FaUsers, FaCoins, FaUser, FaBell, FaBuilding, FaSignOutAlt } from 'react-icons/fa';
import { useUser} from '../../context/UserContext';
import { useHistory } from 'react-router-dom';
import { FaMagnifyingGlass } from 'react-icons/fa6';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useUser();
  const history = useHistory();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout();
    history.push('/');
  };

  return (
    <>
      <button className="toggle-button" onClick={toggleSidebar}>
        ☰
      </button>
      <div className={`sidebar ${isOpen ? 'show' : 'hidden'}`}>
        <Nav defaultActiveKey="/dashboard" className="flex-column">
          <div className="nav-title">Barra de Navegação</div>
          <Nav.Link href="/socios">
            <FaUsers className="nav-icon" /> Gestão de Sócios
          </Nav.Link>
          <Nav.Link href="/quotas">
            <FaCoins className="nav-icon" /> Gestão de Quotas
          </Nav.Link>
          <Nav.Link href="/notificacoes">
            <FaBell className="nav-icon" /> Notificações
          </Nav.Link>
          <Nav.Link href="/entidade">
            <FaBuilding className="nav-icon" /> Gestão da Entidade
          </Nav.Link>
          <Nav.Link href="/analises">
            <FaMagnifyingGlass className="nav-icon" /> Análises
          </Nav.Link>
        </Nav>
        <Nav className="flex-column profile-section">
          <Nav.Link href="/perfil">
            <FaUser className="nav-icon" /> Gerir Perfil
          </Nav.Link>
          <Nav.Link onClick={handleLogout}>
            <FaSignOutAlt className="nav-icon" /> Terminar Sessão
          </Nav.Link>
        </Nav>
      </div>
    </>
  );
};

export default Sidebar;

