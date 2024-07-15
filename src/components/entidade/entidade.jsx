import React, { useState } from 'react';
import { Container, Row, Col, Button, Form, Card, Modal, Image } from 'react-bootstrap';
import { FaIdCard, FaEnvelope, FaPhone, FaMapMarkerAlt, FaMoneyBillWave, FaImage, FaPlus, FaBuilding, FaList, FaEye, FaEdit } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './entidade.css';

const Entidade = () => {
  const [entidadeData, setEntidadeData] = useState({
    nome: '',
    nif: '',
    email: '',
    telefone: '',
    morada: '',
    tipoQuota: 'Anual',
    valorQuota: '',
    imagem: null
  });

  const [isEditable, setIsEditable] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'imagem') {
      setEntidadeData(prevState => ({ ...prevState, [name]: files[0] }));
    } else {
      setEntidadeData(prevState => ({ ...prevState, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Entidade editada:', entidadeData);
    setIsEditable(false); // Após submeter, desativa o modo de edição
  };

  const renderField = (label, icon, value, name, type = "text") => (
    <Form.Group className="mb-3 d-flex align-items-center" controlId={`form${name}`}>
      <Form.Label className="me-2 mb-0" style={{ whiteSpace: 'nowrap' }}>
        {icon} {label}:
      </Form.Label>
      {isEditable ? (
        <Form.Control 
          type={type} 
          placeholder={`Introduza o ${label.toLowerCase()}`} 
          name={name} 
          value={value} 
          onChange={handleChange} 
          style={{ flex: 1 }}
        />
      ) : (
        <Form.Control 
          type={type} 
          readOnly 
          plaintext 
          value={value || "N/A"} 
          style={{ flex: 1 }}
        />
      )}
    </Form.Group>
  );

  const renderImagePreview = () => (
    <div className="text-center mb-3">
      {entidadeData.imagem ? (
        <Image src={URL.createObjectURL(entidadeData.imagem)} fluid style={{ maxWidth: '100px' }} />
      ) : (
        <div className="border rounded p-2" style={{ width: '100px', height: '100px' }}>
          <FaImage size={50} />
          <p className="mt-2">Logotipo</p>
        </div>
      )}
    </div>
  );

  return (
    <Container className="gerir-entidade-container my-6">
      <Row className="justify-content-center">
        <Col md={10}>
          <Card>
            <Card.Header as="h4" className="text-center text-white">
              Criar Entidade / Associação
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3 d-flex align-items-center" controlId="formNome">
                  <Form.Label className="me-2 mb-0" style={{ whiteSpace: 'nowrap' }}>
                    <FaBuilding className="me-1" /> Nome:
                  </Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="Introduza o nome da entidade / associação" 
                    name="nome" 
                    value={entidadeData.nome} 
                    onChange={handleChange} 
                    style={{ flex: 1 }}
                    readOnly={!isEditable}
                  />
                </Form.Group>

                <Row className="mb-3">
                  <Col sm={6}>
                    <Form.Group className="d-flex align-items-center" controlId="formNif">
                      <Form.Label className="me-2 mb-0" style={{ whiteSpace: 'nowrap' }}>
                        <FaIdCard className="me-1" /> NIF:
                      </Form.Label>
                      <Form.Control 
                        type="text" 
                        placeholder="Introduza o NIF" 
                        name="nif" 
                        value={entidadeData.nif} 
                        onChange={handleChange} 
                        style={{ flex: 1 }}
                        readOnly={!isEditable}
                      />
                    </Form.Group>
                  </Col>
                  <Col sm={6}>
                    <Form.Group className="d-flex align-items-center" controlId="formImagem">
                      <Form.Label className="me-2 mb-0" style={{ whiteSpace: 'nowrap' }}>
                        <FaImage className="me-1" /> Imagem:
                      </Form.Label>
                      <Form.Control 
                        type="file" 
                        name="imagem" 
                        onChange={handleChange} 
                        style={{ flex: 1 }}
                        readOnly={!isEditable}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col sm={6}>
                    <Form.Group className="d-flex align-items-center" controlId="formEmail">
                      <Form.Label className="me-2 mb-0" style={{ whiteSpace: 'nowrap' }}>
                        <FaEnvelope className="me-1" /> Email:
                      </Form.Label>
                      <Form.Control 
                        type="email" 
                        placeholder="Introduza o email" 
                        name="email" 
                        value={entidadeData.email} 
                        onChange={handleChange} 
                        style={{ flex: 1 }}
                        readOnly={!isEditable}
                      />
                    </Form.Group>
                  </Col>
                  <Col sm={6}>
                    <Form.Group className="d-flex align-items-center" controlId="formTelefone">
                      <Form.Label className="me-2 mb-0" style={{ whiteSpace: 'nowrap' }}>
                        <FaPhone className="me-1" /> Telefone:
                      </Form.Label>
                      <Form.Control 
                        type="text" 
                        placeholder="Introduza o telefone" 
                        name="telefone" 
                        value={entidadeData.telefone} 
                        onChange={handleChange} 
                        style={{ flex: 1 }}
                        readOnly={!isEditable}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3 d-flex align-items-center" controlId="formMorada">
                  <Form.Label className="me-2 mb-0" style={{ whiteSpace: 'nowrap' }}>
                    <FaMapMarkerAlt className="me-1" /> Morada:
                  </Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="Introduza a morada" 
                    name="morada" 
                    value={entidadeData.morada} 
                    onChange={handleChange} 
                    style={{ flex: 1 }}
                    readOnly={!isEditable}
                  />
                </Form.Group>

                <Row className="mb-3">
                  <Col sm={6}>
                    <Form.Group className="d-flex align-items-center" controlId="formTipoQuota">
                      <Form.Label className="me-2 mb-0" style={{ whiteSpace: 'nowrap' }}>
                        <FaList className="me-1" /> Tipo:
                      </Form.Label>
                      <Form.Control 
                        as="select" 
                        name="tipoQuota" 
                        value={entidadeData.tipoQuota} 
                        onChange={handleChange}
                        style={{ flex: 1 }}
                        readOnly={!isEditable}
                      >
                        <option value="Anual">Anual</option>
                        <option value="Mensal">Mensal</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col sm={6}>
                    <Form.Group className="d-flex align-items-center" controlId="formValorQuota">
                      <Form.Label className="me-2 mb-0" style={{ whiteSpace: 'nowrap' }}>
                        <FaMoneyBillWave className="me-1" /> Valor:
                      </Form.Label>
                      <Form.Control 
                        type="text" 
                        placeholder="Introduza o valor" 
                        name="valorQuota" 
                        value={entidadeData.valorQuota} 
                        onChange={handleChange} 
                        style={{ flex: 1 }}
                        readOnly={!isEditable}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <div className="text-center mt-4">
                  <Button variant="primary" type="submit">
                    <FaPlus /> Criar Entidade
                  </Button>
                  <Button variant="success" className="ms-2" onClick={() => setShowModal(true)}>
                    <FaEye />  Ver mais
                    </Button>
                  {!isEditable && (
                    <Button variant="info" className="ms-2" onClick={() => setIsEditable(true)}>
                      <FaEdit /> Editar
                    </Button>
                  )}
                  {isEditable && (
                    <Button variant="secondary" className="ms-2" type="submit">
                      Guardar Informações
                    </Button>
                  )}
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

     {/* Modal para exibir informações */}
     <Modal centered show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Informações da Entidade</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3 d-flex align-items-center">
            <FaBuilding className="me-1" style={{ fontSize: '1.5em' }} />
            <span> {entidadeData.nome}</span>
          </div>
          <div className="mb-3 d-flex align-items-center">
            <FaIdCard className="me-1" style={{ fontSize: '1.5em' }} />
            <span> {entidadeData.nif}</span>
          </div>
          <div className="mb-3 d-flex align-items-center">
            <FaEnvelope className="me-1" style={{ fontSize: '1.5em' }} />
            <span>{entidadeData.email}</span>
          </div>
          <div className="mb-3 d-flex align-items-center">
            <FaPhone className="me-1" style={{ fontSize: '1.5em' }} />
            <span>{entidadeData.telefone}</span>
          </div>
          <div className="mb-3 d-flex align-items-center">
            <FaMapMarkerAlt className="me-1" style={{ fontSize: '1.5em' }} />
            <span>{entidadeData.morada}</span>
          </div>
          <div className="mb-3 d-flex align-items-center">
            <FaList className="me-1" style={{ fontSize: '1.5em' }} />
            <span>{entidadeData.tipoQuota}</span>
          </div>
          <div className="mb-3 d-flex align-items-center">
            <FaMoneyBillWave className="me-1" style={{ fontSize: '1.5em' }} />
            <span>{entidadeData.valorQuota}</span>
          </div>
          <div className="text-center">
            {renderImagePreview()}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Entidade;
