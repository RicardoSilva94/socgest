import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from '../../api/axios'; 
import { Alert, Button, Container, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom'; // Importa useHistory

function ResetPasswordForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [token, setToken] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const { token: routeToken } = useParams();
  const location = useLocation();
  const history = useHistory(); // Usa useHistory para redirecionamento

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const emailParam = queryParams.get('email');
    
    if (emailParam) setEmail(emailParam);
    if (routeToken) setToken(routeToken);

    // Validar o token com o backend
    axios.get(`/reset-password/${routeToken}`, {
      params: { email: emailParam }
    })
      .then(response => {
        // Token válido, você pode usar a resposta se necessário
      })
      .catch(error => {
        // Lidar com token inválido
        setError('Token inválido ou expirado.');
      });
  }, [routeToken, location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/reset-password', {
        token,
        email,
        password,
        password_confirmation: passwordConfirmation
      });
      setMessage('Senha redefinida com sucesso!');
      setTimeout(() => {
        history.push('/'); 
      }, 2000); // Aguarda 2 segundos para mostrar a mensagem
    } catch (error) {
      console.error('Erro ao redefinir a senha:', error);
      setError('Erro ao redefinir a senha. Verifique os detalhes e tente novamente.');
    }
  };

  return (
    <Container className="mt-5">
      <h2>Redefinir Senha</h2>
      <Form onSubmit={handleSubmit}>
        {message && <Alert variant="success">{message}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}
        
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            readOnly
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Nova Senha</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Nova senha"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Confirme a Nova Senha</Form.Label>
          <Form.Control
            type="password"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            placeholder="Confirme a nova senha"
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Redefinir Senha
        </Button>
      </Form>
    </Container>
  );
}

export default ResetPasswordForm;