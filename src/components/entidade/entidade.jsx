import React, { useState } from 'react';
import { Container, Row, Col, Button, Form, Card } from 'react-bootstrap';
import { FaIdCard, FaEnvelope, FaPhone, FaMapMarkerAlt, FaMoneyBillWave, FaImage, FaPlus } from 'react-icons/fa';
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
    console.log('Nova entidade criada:', entidadeData);
  };

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
                    <FaIdCard className="me-1" /> Nome:
                  </Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="Introduza o nome da entidade" 
                    name="nome" 
                    value={entidadeData.nome} 
                    onChange={handleChange} 
                    style={{ flex: 1 }}
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
                    placeholder="Introduza a morada da entidade" 
                    name="morada" 
                    value={entidadeData.morada} 
                    onChange={handleChange} 
                    style={{ flex: 1 }}
                  />
                </Form.Group>

                <Row className="mb-3">
                  <Col sm={6}>
                    <Form.Group className="d-flex align-items-center" controlId="formTipoQuota">
                      <Form.Label className="me-2 mb-0" style={{ whiteSpace: 'nowrap' }}>
                        <FaMoneyBillWave className="me-1" /> Tipo:
                      </Form.Label>
                      <Form.Control 
                        as="select" 
                        name="tipoQuota" 
                        value={entidadeData.tipoQuota} 
                        onChange={handleChange}
                        style={{ flex: 1 }}
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
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <div className="text-center mt-4">
                  <Button variant="primary" type="submit">
                    <FaPlus /> Criar Entidade
                    </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Entidade;