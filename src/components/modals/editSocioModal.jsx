import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { FaUser, FaIdCard, FaPhone, FaEnvelope, FaMapMarkerAlt, FaStickyNote } from 'react-icons/fa';

const EditSocioModal = ({ show, handleClose, handleEditSocio, socio }) => {
  const [nome, setNome] = useState('');
  const [nif, setNif] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [morada, setMorada] = useState('');
  const [notas, setNotas] = useState('');
  const [estado, setEstado] = useState('');

  useEffect(() => {
    if (socio) {
      setNome(socio.nome);
      setNif(socio.nif);
      setTelefone(socio.telefone);
      setEmail(socio.email);
      setMorada(socio.morada);
      setNotas(socio.notas);
      setEstado(socio.estado);
    }
  }, [socio]);

  const resetForm = () => {
    setNome('');
    setNif('');
    setTelefone('');
    setEmail('');
    setMorada('');
    setNotas('');
    setEstado('');
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
              <Form.Group controlId="formNif" className='mb-3'>
                <Form.Label><FaIdCard className="icon" /> NIF</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="NIF"
                  value={nif}
                  onChange={(e) => setNif(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formEstado" className='mb-3'>
                <Form.Label>Estado</Form.Label>
                <Form.Control
                  as="select"
                  value={estado}
                  onChange={(e) => setEstado(e.target.value)}
                >
                  <option value="">Selecione o estado</option>
                  <option value="Activo">Activo</option>
                  <option value="Desistiu">Desistiu</option>
                  <option value="Faleceu">Faleceu</option>
                  <option value="Expulso">Expulso</option>
                  <option value="Suspenso">Suspenso</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="formTelefone" className='mb-3'>
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
              <Form.Group controlId="formEmail" className='mb-3'>
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
          <Form.Group controlId="formNotas" className='mb-3'>
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
            nif,
            telefone,
            email,
            morada,
            notas,
            estado
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
