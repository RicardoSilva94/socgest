import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const RecoverPasswordModal = ({ show, handleClose, handleRecoverPassword }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRecoverPassword(email);
    handleClose();
  };

return (
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Recuperar Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Escreva o seu email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
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
