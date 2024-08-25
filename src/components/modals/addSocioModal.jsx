import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { FaUser, FaIdCard, FaPhone, FaEnvelope, FaMapMarkerAlt, FaStickyNote, FaUniversalAccess } from 'react-icons/fa';
import { MdArrowDropDown } from 'react-icons/md'; 
import { validarNIF } from '../../utils/validacoes';

const AddSocioModal = ({ show, handleClose, handleAddSocio, entidadeId }) => {
  const [nome, setNome] = useState('');
  const [nif, setNif] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [morada, setMorada] = useState('');
  const [notas, setNotas] = useState('');
  const [estado, setEstado] = useState('Activo'); // Estado padrão é "Activo"
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

  const estados = ['Activo', 'Desistiu', 'Faleceu', 'Expulso', 'Suspenso'];

  const resetForm = () => {
    setNome('');
    setNif('');
    setTelefone('');
    setEmail('');
    setMorada('');
    setNotas('');
    setEstado('Activo'); // Resetar o estado para "Activo"
    console.log('Formulário resetado'); // Log para confirmar o reset do formulário
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
              onChange={(e) => {
                setNome(e.target.value);
                console.log('Nome:', e.target.value); // Log para verificar o valor do nome
              }}
            />
          </Form.Group>
          <Row>
            <Col>
              <Form.Group controlId="formEstado" className='mb-3'>
                <Form.Label><FaUniversalAccess className="icon" /> Estado</Form.Label>
                <div className="position-relative">
                  <Form.Control
                    as="select"
                    value={estado}
                    onChange={(e) => {
                      setEstado(e.target.value);
                      console.log('Estado selecionado:', e.target.value); // Log para verificar o estado selecionado
                    }}
                  >
                    {estados.map((opcao) => (
                      <option key={opcao} value={opcao}>{opcao}</option>
                    ))}
                  </Form.Control>
                  <MdArrowDropDown className="position-absolute top-50 end-0 translate-middle-y" style={{ right: '10px', fontSize: '1.5em' }} />
                </div>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formNif">
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
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="formtelefone" className='mb-3'>
                <Form.Label><FaPhone className="icon" /> Telemóvel</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Telemóvel"
                  value={telefone}
                  onChange={(e) => {
                    setTelefone(e.target.value);
                    console.log('Telemóvel:', e.target.value); // Log para verificar o telemóvel
                  }}
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
                  onChange={(e) => {
                    setEmail(e.target.value);
                    console.log('Email:', e.target.value); // Log para verificar o e-mail
                  }}
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
              onChange={(e) => {
                setMorada(e.target.value);
                console.log('Morada:', e.target.value); // Log para verificar a morada
              }}
            />
          </Form.Group>
          <Form.Group controlId="formNotas">
            <Form.Label><FaStickyNote className="icon" /> Notas</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Notas"
              value={notas}
              onChange={(e) => {
                setNotas(e.target.value);
                console.log('Notas:', e.target.value); // Log para verificar as notas
              }}
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
          const socioData = {
            nome,
            nif,
            telefone,
            email,
            morada,
            notas,
            estado
          };
          handleAddSocio(socioData);
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

