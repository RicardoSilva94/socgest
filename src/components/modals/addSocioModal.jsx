import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { FaUser, FaIdCard, FaPhone, FaEnvelope, FaMapMarkerAlt, FaStickyNote } from 'react-icons/fa';

const AddSocioModal = ({ show, handleClose, handleAddSocio }) => {
  const [nome, setNome] = useState('');
  const [numSocio, setNumSocio] = useState('');
  const [nif, setNif] = useState('');
  const [telemovel, setTelemovel] = useState('');
  const [email, setEmail] = useState('');
  const [morada, setMorada] = useState('');
  const [notas, setNotas] = useState('');

  const resetForm = () => {
    setNome('');
    setNumSocio('');
    setNif('');
    setTelemovel('');
    setEmail('');
    setMorada('');
    setNotas('');
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Adicionar Novo Sócio</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formNome" className='mb-3'>
            <Form.Label><FaUser className="icon" /> Nome</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nome do sócio"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </Form.Group>
          <Row>
            <Col>
              <Form.Group controlId="formNumSocio" className='mb-3'>
                <Form.Label><FaIdCard className="icon" /> Nº de Sócio</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nº de sócio"
                  value={numSocio}
                  onChange={(e) => setNumSocio(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formNif">
                <Form.Label><FaIdCard className="icon" /> NIF</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="NIF"
                  value={nif}
                  onChange={(e) => setNif(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="formTelemovel" className='mb-3'>
                <Form.Label><FaPhone className="icon" /> Telemóvel</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Telemóvel"
                  value={telemovel}
                  onChange={(e) => setTelemovel(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formEmail">
                <Form.Label><FaEnvelope className="icon" /> Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group controlId="formMorada" className='mb-3'>
            <Form.Label><FaMapMarkerAlt className="icon" /> Morada</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              placeholder="Morada"
              value={morada}
              onChange={(e) => setMorada(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formNotas">
            <Form.Label><FaStickyNote className="icon" /> Notas</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Notas"
              value={notas}
              onChange={(e) => setNotas(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => {
          handleClose();
          resetForm();
        }}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={() => {
          handleAddSocio({
            nome,
            numSocio,
            nif,
            telemovel,
            email,
            morada,
            notas
          });
          handleClose();
          resetForm();
        }}>
          Salvar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddSocioModal;
