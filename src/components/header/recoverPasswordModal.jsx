import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import axios from '../../api/axios'; 

const RecoverPasswordModal = ({ show, handleClose }) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateEmail()) {
      setLoading(true);
      setMessage('');
      setError('');
      try {
        const response = await axios.post('/forgot-password', { email });
        console.log('Resposta da API:', response.data); // Log da resposta da API
        setMessage('Se o e-mail estiver registado, você receberá um link para redefinir a sua password.');
      } catch (error) {
        console.error('Erro ao enviar solicitação de recuperação de senha:', error.response || error.message);
        setError('Ocorreu um erro ao enviar a solicitação. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Recuperar Senha</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit} noValidate>
          {message && <Alert variant="success">{message}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}
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
          <Button type="submit" className='mt-4' style={{ backgroundColor: '#1f4d84', color: 'white' }} disabled={loading}>
          {loading ? <span>Aguarde... <div className="spinner-border spinner-border-sm"></div></span> : 'Enviar'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RecoverPasswordModal;



