import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import './header.css';

export default function LoginModal({ show, handleClose, handleShowRegister }) {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="custom-form">
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Introduza o seu e-mail" />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Introduza a Password" />
          </Form.Group>

          <Button variant="primary" type="submit" className="mt-3 custom-button">
            Login
          </Button>
          <p className="mt-3">
            Não tem uma conta? <span onClick={handleShowRegister} style={{ color: '#1f4d84', cursor: 'pointer' }}>Registar</span>
          </p>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

LoginModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleShowRegister: PropTypes.func.isRequired,
};
