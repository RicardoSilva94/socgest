import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import './header.css';

export default function RegisterModal({ show, handleClose }) {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Registar</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="custom-form">
          <Form.Group controlId="formName">
            <Form.Label>Nome</Form.Label>
            <Form.Control type="text" placeholder="Introduza o seu nome ou da Entidade" />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Introduza o seu e-mail" />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Introduza a Password" />
          </Form.Group>

          <Form.Group controlId="formConfirmPassword">
            <Form.Label>Confirmar Password</Form.Label>
            <Form.Control type="password" placeholder="Confirme a Password" />
          </Form.Group>

          <Button variant="primary" type="submit" className="mt-3 custom-button">
            Registar
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

RegisterModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
