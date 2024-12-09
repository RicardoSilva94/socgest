import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import './header.css';
import axios from '../../api/axios';
import Alert from 'react-bootstrap/Alert';

export default function RegisterModal({ show, handleClose, handleShowLogin }) { 
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(''); // Estado para a mensagem de sucesso ou erro
  const [messageType, setMessageType] = useState(''); // Estado para o tipo de mensagem (sucesso ou erro)

  const validateForm = () => {
    const newErrors = {};

    if (!name) {
      newErrors.name = 'O nome é obrigatório';
    }

    if (!email) {
      newErrors.email = 'O e-mail é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'O e-mail não é válido';
    }

    if (!password) {
      newErrors.password = 'A password é obrigatória';
    } else if (password.length < 8) {
      newErrors.password = 'A password deve ter pelo menos 8 caracteres';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'A confirmação da password é obrigatória';
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = 'As passwords não coincidem';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setLoading(true);
      setMessage(''); // Resetar a mensagem antes de fazer a requisição
      setMessageType('');

      try {
        await axios.post('/register', {
          name,
          email,
          password,
          password_confirmation: confirmPassword, // Campo para confirmar a senha
        });

        setMessage('Utilizador registado com sucesso!'); // Mensagem de sucesso
        setMessageType('success');
        
        // Espera alguns segundos antes de redirecionar para o login
        setTimeout(() => {
          handleClose();
          handleShowLogin(); // Exibir o modal de login após o registo bem-sucedido
        }, 2000); // 2 segundos de espera

      } catch (error) {
        if (error.response && error.response.data) {
          setErrors(error.response.data);
          setMessage('Não foi possível fazer o seu registo!'); // Mensagem de erro
          setMessageType('danger');
        } else {
          console.error('Erro desconhecido:', error);
          setMessage('Erro desconhecido. Tente novamente mais tarde.'); // Mensagem de erro desconhecido
          setMessageType('danger');
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Registar</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {message && (
          <Alert variant={messageType}>
            {message}
          </Alert>
        )}
        <Form className="custom-form" onSubmit={handleSubmit} noValidate>
          <Form.Group controlId="formName">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              placeholder="Introduza o seu nome ou da Entidade"
              value={name}
              onChange={(e) => setName(e.target.value)}
              isInvalid={!!errors.name}
            />
            <Form.Control.Feedback type="invalid">
              {errors.name}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Introduza o seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Introduza a Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formConfirmPassword">
            <Form.Label>Confirmar Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirme a Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              isInvalid={!!errors.confirmPassword}
            />
            <Form.Control.Feedback type="invalid">
              {errors.confirmPassword}
            </Form.Control.Feedback>
          </Form.Group>

          <Button variant="primary" type="submit" className="mt-3 custom-button w-100" disabled={loading}> 
              {loading ? <span>Aguarde... <div className="spinner-border spinner-border-sm"></div></span> : 'Registar'}
            </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

RegisterModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleShowLogin: PropTypes.func.isRequired, 
};