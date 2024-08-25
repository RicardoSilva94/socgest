import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { FaUser, FaIdCard, FaPhone, FaEnvelope, FaMapMarkerAlt, FaStickyNote, FaUniversalAccess } from 'react-icons/fa';
import { validarNIF } from '../../utils/validacoes';

const EditSocioModal = ({ show, handleClose, handleEditSocio, socio, entidadeId }) => {
  const [nome, setNome] = useState('');
  const [nif, setNif] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [morada, setMorada] = useState('');
  const [notas, setNotas] = useState('');
  const [estado, setEstado] = useState('');
  const [nifError, setNifError] = useState('');

  const verificarNIF = (nif) => {
    if (validarNIF(nif)) {
      setNifError(''); // Limpar a mensagem de erro se o NIF for válido
      return true;
    } else {
      setNifError('NIF inválido. O NIF deve começar com um dígito de 1 a 9 e ser seguido por 8 dígitos.');
      return false;
    }
  };

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
                  onChange={(e) => {
                    const valorNif = e.target.value;
                    verificarNIF(valorNif); // Validar o NIF ao mudar o valor
                    setNif(valorNif);
                  }}
                  isInvalid={!!nifError} // Definir a classe de erro se houver uma mensagem de erro
                />
                <Form.Control.Feedback type="invalid">
                  {nifError} {/* Mostrar a mensagem de erro */}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formEstado" className='mb-3'>
                <Form.Label><FaUniversalAccess/> Estado</Form.Label>
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
          if (!verificarNIF(nif)) {
            return; // Impedir a submissão se o NIF for inválido
          }
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
