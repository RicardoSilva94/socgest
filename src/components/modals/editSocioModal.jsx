// components/modals/EditSocioModal.jsx

import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { FaUser, FaIdCard, FaPhone, FaEnvelope, FaMapMarkerAlt, FaStickyNote } from 'react-icons/fa';

const EditSocioModal = ({ show, handleClose, handleEditSocio, socio }) => {
  const [nome, setNome] = useState('');
  const [num_socio, setnum_socio] = useState('');
  const [nif, setNif] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [morada, setMorada] = useState('');
  const [notas, setNotas] = useState('');

  useEffect(() => {
    if (socio) {
      setNome(socio.nome);
      setnum_socio(socio.num_socio);
      setNif(socio.nif);
      setTelefone(socio.telefone);
      setEmail(socio.email);
      setMorada(socio.morada);
      setNotas(socio.notas);
    }
  }, [socio]);

  const resetForm = () => {
    setNome('');
    setnum_socio('');
    setNif('');
    setTelefone('');
    setEmail('');
    setMorada('');
    setNotas('');
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Sócio</Modal.Title>
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
              <Form.Group controlId="formnum_socio" className='mb-3'>
                <Form.Label><FaIdCard className="icon" /> Nº de Sócio</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nº de sócio"
                  value={num_socio}
                  onChange={(e) => setnum_socio(e.target.value)}
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
              <Form.Group controlId="formtelefone" className='mb-3'>
                <Form.Label><FaPhone className="icon" /> Telemóvel</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Telemóvel"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
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
          handleEditSocio({
            id: socio.id,
            nome,
            num_socio,
            nif,
            telefone,
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

export default EditSocioModal;
