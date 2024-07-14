import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Modal } from 'react-bootstrap';
import { FaSave, FaTrash } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './perfilUser.css';

const PerfilUser = () => {
  const [username, setUsername] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleCurrentPasswordChange = (e) => {
    setCurrentPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleDeleteAccount = () => {
    setShowDeleteModal(false);
    // TODO: Implement account deletion logic
  };

  const handleSubmitUsername = (e) => {
    e.preventDefault();
    // TODO: Implement username update logic
  };

  const handleSubmitPassword = (e) => {
    e.preventDefault();
    // TODO: Implement password update logic
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
