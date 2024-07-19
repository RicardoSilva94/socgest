import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const RecoverPasswordModal = ({ show, handleClose, handleRecoverPassword }) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const validateEmail = () => {
    if (!email) {
      setEmailError('O e-mail é obrigatório');
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('O e-mail não é válido');
      return false;
    } else {
      setEmailError('');
      return true;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateEmail()) {
      handleRecoverPassword(email);
      handleClose();
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Recuperar Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit} noValidate>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Escreva o seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              isInvalid={!!emailError}
            />
            <Form.Control.Feedback type="invalid">
              {emailError}
            </Form.Control.Feedback>
          </Form.Group>
          <Button type="submit" className='mt-4' style={{ backgroundColor: '#1f4d84', color: 'white' }}>
            Enviar
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RecoverPasswordModal;

