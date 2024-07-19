import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import './header.css';
import RecoverPasswordModal from './recoverPasswordModal';

export default function LoginModal({ show, handleClose, handleShowRegister }) {
  const [showRecoverPasswordModal, setShowRecoverPasswordModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleCloseRecoverPasswordModal = () => setShowRecoverPasswordModal(false);
  const handleShowRecoverPasswordModal = () => {
    handleClose();  // Fechar o modal de login
    setShowRecoverPasswordModal(true);
  };

  const handleRecoverPassword = (email) => {
    // Implementar a lógica de recuperação de password aqui
    console.log('Recuperar senha para o email:', email);
  };

  const validateForm = () => {
    let valid = true;

    if (!email) {
      setEmailError('O e-mail é obrigatório');
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('O e-mail não é válido');
      valid = false;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('A password é obrigatória');
      valid = false;
    } else if (password.length < 6) {
      setPasswordError('A password deve ter pelo menos 6 caracteres');
      valid = false;
    } else {
      setPasswordError('');
    }

    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log('Formulário válido. Submeter dados de login.');
      // Lógica de login aqui
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="custom-form" onSubmit={handleSubmit} noValidate>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Introduza o seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                isInvalid={!!emailError}
              />
              <Form.Control.Feedback type="invalid">
                {emailError}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Introduza a Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                isInvalid={!!passwordError}
              />
              <Form.Control.Feedback type="invalid">
                {passwordError}
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3 custom-button">
              Login
            </Button>
            <p className="mt-3">
              Não tem uma conta? <span onClick={handleShowRegister} style={{ color: '#1f4d84', cursor: 'pointer' }}>Registar</span>
            </p>
            <p className="mt-3">
              Esqueceu-se da password? <span onClick={handleShowRecoverPasswordModal} style={{ color: '#1f4d84', cursor: 'pointer' }}>Recuperar</span>
            </p>
          </Form>
        </Modal.Body>
      </Modal>
      <RecoverPasswordModal
        show={showRecoverPasswordModal}
        handleClose={handleCloseRecoverPasswordModal}
        handleRecoverPassword={handleRecoverPassword}
      />
    </>
  );
}

LoginModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleShowRegister: PropTypes.func.isRequired,
};
