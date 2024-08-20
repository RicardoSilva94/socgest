import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Modal, Alert } from 'react-bootstrap';
import { FaSave, FaTrash } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './perfilUser.css';
import axios from '../../api/axios';
import { useUser } from '../../context/UserContext';

const PerfilUser = () => {
  const { user, setUser, logout } = useUser();  
  const [username, setUsername] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [successMessage, setSuccessMessage] = useState('');  
  const [errorMessage, setErrorMessage] = useState('');     
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleCurrentPasswordChange = (e) => {
    setCurrentPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const validatePassword = () => {
    if (newPassword.length < 6) {
      return 'A password deve ter pelo menos 6 caracteres';
    }
    if (newPassword !== confirmPassword) {
      return 'As passwords não coincidem';
    }
    return '';
  };

  const handleSubmitUsername = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/change-name', { name: username });
      setSuccessMessage('Nome de utilizador alterado com sucesso!');  
      setErrorMessage('');
      setUser((prevUser) => ({ ...prevUser, name: username }));  // Atualiza o nome do user no contexto
    } catch (error) {
      setErrorMessage('Erro ao alterar o nome de utilizador.');
      setSuccessMessage('');
    }
  };

  const handleSubmitPassword = async (e) => {
    e.preventDefault();
    const error = validatePassword();
    if (error) {
      setPasswordError(error);
      return;
    }

    try {
      const response = await axios.post('/change-password', {
        current_password: currentPassword,
        new_password: newPassword,
        new_password_confirmation: confirmPassword,
      });
      setSuccessMessage('Password alterada com sucesso!');
      setErrorMessage('');
      setPasswordError('');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      setErrorMessage('Erro ao alterar a password.');
      setSuccessMessage('');
    }
  };

  const handleDeleteAccount = async () => {
    setShowDeleteModal(false);
    try {
      await axios.delete('/users');
      logout();  // Logout do user
      setSuccessMessage('Conta eliminada com sucesso.');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Erro ao eliminar a conta.');
      setSuccessMessage('');
    }
  };

  return (
    <Container className="perfil-container">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card>
            <Card.Header>
              <h3 className="text-center">Gerir Perfil</h3>
            </Card.Header>
            <Card.Body>
              {successMessage && <Alert variant="success">{successMessage}</Alert>}
              {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
              <Form onSubmit={handleSubmitUsername}>
                <Form.Group controlId="formUsername">
                  <Form.Label><strong>Alterar Nome de Utilizador</strong></Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Introduza o novo nome de Utilizador"
                    value={username}
                    onChange={handleUsernameChange}
                  />
                </Form.Group>
                <div className="text-center">
                  <Button variant="primary" type="submit" className="mt-3">
                    <FaSave className="mr-2" /> Atualizar Nome de Utilizador
                  </Button>
                </div>
              </Form>
              <hr />
              <Form onSubmit={handleSubmitPassword}>
                <Form.Group controlId="formCurrentPassword">
                  <Form.Label><strong>Alterar Password</strong></Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Introduza a sua password atual"
                    value={currentPassword}
                    onChange={handleCurrentPasswordChange}
                  />
                </Form.Group>

                <Form.Group controlId="formNewPassword">
                  <Form.Label><strong>Nova Password</strong></Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Introduza a sua nova password"
                    value={newPassword}
                    onChange={handleNewPasswordChange}
                  />
                </Form.Group>

                <Form.Group controlId="formConfirmPassword">
                  <Form.Label><strong>Confirmar Nova Password</strong></Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirme a sua nova password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                  />
                </Form.Group>
                
                {passwordError && <p className="text-danger">{passwordError}</p>}

                <div className="text-center">
                  <Button variant="primary" type="submit" className="mt-3">
                    <FaSave className="mr-2" /> Atualizar Password
                  </Button>
                </div>
              </Form>
            </Card.Body>
            <Card.Footer className="text-center">
              <Button variant="danger" onClick={() => setShowDeleteModal(true)}>
                <FaTrash className="mr-2" /> Eliminar Conta
              </Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar Conta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Tem a certeza que deseja eliminar a sua conta?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDeleteAccount}>
            Eliminar Conta
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default PerfilUser;
