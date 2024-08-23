import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form, Card, Modal, Alert } from 'react-bootstrap';
import { FaIdCard, FaEnvelope, FaPhone, FaMapMarkerAlt, FaMoneyBillWave, FaPlus, FaBuilding, FaList, FaEye, FaEdit } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './entidade.css';
import axios from '../../api/axios';
import { useUser } from '../../context/UserContext';

const Entidade = () => {
  const { user } = useUser(); // Obtém o user do context
  const [entidadeData, setEntidadeData] = useState({
    nome: '',
    nif: '',
    email: '',
    telefone: '',
    morada: '',
    tipo_quota: 'Anual',
    valor_quota: '',
  });

  const [isEditable, setIsEditable] = useState(true); // Controla se os campos são editáveis
  const [showModal, setShowModal] = useState(false); // Controle da exibição do modal
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [entidadeId, setEntidadeId] = useState(null);

  // Função para buscar dados da API
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user && user.id) { // Verifica se o user está disponível
          const response = await axios.get(`/entidades/${user.id}`); // Usa o userId na URL
          console.log('Dados da entidade:', response);

          if (response.data) { // Verifica se há dados retornados
            const entidade = response.data;
            setEntidadeData({
              nome: entidade.nome || '',
              nif: entidade.nif || '',
              email: entidade.email || '',
              telefone: entidade.telefone || '',
              morada: entidade.morada || '',
              tipo_quota: entidade.tipo_quota || 'Anual',
              valor_quota: entidade.valor_quota || '',
            });
            setEntidadeId(entidade.id); // Define o ID da entidade
          }
        } else {
          setErrorMessage('Utilizador não encontrado.'); // Exibe uma mensagem de erro se o user não for encontrado
        }
      } catch (error) {
        console.error('Erro ao carregar dados da API:', error);
      }
    };

    fetchData();
  }, [user, setEntidadeId]);

  // Função para lidar com mudanças nos campos de formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEntidadeData((prevState) => ({ ...prevState, [name]: value }));
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      Object.keys(entidadeData).forEach((key) => {
        formData.append(key, entidadeData[key]);
      });
      if (user && user.id) {
        formData.append('user_id', user.id);
      } else {
        setErrorMessage('User ID não encontrado.');
        return;
      }

      const url = entidadeId ? `/entidades/${entidadeId}` : '/entidades';
      const method = entidadeId ? 'put' : 'post';
      

      const response = await axios({
        method,
        url,
        data: formData,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      if (response.status === 200 || response.status === 201) {
        setSuccessMessage('Dados salvos com sucesso!');
        setErrorMessage('');
        setIsEditable(false);
        setShowModal(false);
      }
    } catch (error) {
      console.error('Erro ao salvar dados:', error.response ? error.response.data : error.message);
      const errorMsg = error.response && error.response.data ? error.response.data.message : 'Erro desconhecido';
      setErrorMessage(errorMsg);
    }
  };

  // Função para renderizar o conteúdo do modal
  const renderModalContent = () => (
    <Form onSubmit={handleSubmit}>
      <div className="mb-3 d-flex align-items-center">
        <FaBuilding className="me-1" style={{ fontSize: '1.5em' }} />
        {isEditable ? (
          <Form.Control
            type="text"
            placeholder="Introduza o nome da entidade"
            name="nome"
            value={entidadeData.nome}
            onChange={handleChange}
            style={{ flex: 1 }}
          />
        ) : (
          <span>{entidadeData.nome || 'N/A'}</span>
        )}
      </div>
      <div className="mb-3 d-flex align-items-center">
        <FaIdCard className="me-1" style={{ fontSize: '1.5em' }} />
        {isEditable ? (
          <Form.Control
            type="text"
            placeholder="Introduza o NIF"
            name="nif"
            value={entidadeData.nif}
            onChange={handleChange}
            style={{ flex: 1 }}
          />
        ) : (
          <span>{entidadeData.nif || 'N/A'}</span>
        )}
      </div>
      <div className="mb-3 d-flex align-items-center">
        <FaEnvelope className="me-1" style={{ fontSize: '1.5em' }} />
        {isEditable ? (
          <Form.Control
            type="email"
            placeholder="Introduza o email"
            name="email"
            value={entidadeData.email}
            onChange={handleChange}
            style={{ flex: 1 }}
          />
        ) : (
          <span>{entidadeData.email || 'N/A'}</span>
        )}
      </div>
      <div className="mb-3 d-flex align-items-center">
        <FaPhone className="me-1" style={{ fontSize: '1.5em' }} />
        {isEditable ? (
          <Form.Control
            type="text"
            placeholder="Introduza o telefone"
            name="telefone"
            value={entidadeData.telefone}
            onChange={handleChange}
            style={{ flex: 1 }}
          />
        ) : (
          <span>{entidadeData.telefone || 'N/A'}</span>
        )}
      </div>
      <div className="mb-3 d-flex align-items-center">
        <FaMapMarkerAlt className="me-1" style={{ fontSize: '1.5em' }} />
        {isEditable ? (
          <Form.Control
            type="text"
            placeholder="Introduza a morada"
            name="morada"
            value={entidadeData.morada}
            onChange={handleChange}
            style={{ flex: 1 }}
          />
        ) : (
          <span>{entidadeData.morada || 'N/A'}</span>
        )}
      </div>
      <div className="mb-3 d-flex align-items-center">
        <FaList className="me-1" style={{ fontSize: '1.5em' }} />
        {isEditable ? (
          <Form.Control
            as="select"
            name="tipo_quota"
            value={entidadeData.tipo_quota}
            onChange={handleChange}
            style={{ flex: 1 }}
          >
            <option value="Anual">Anual</option>
            <option value="Mensal">Mensal</option>
          </Form.Control>
        ) : (
          <span>{entidadeData.tipo_quota || 'N/A'}</span>
        )}
      </div>
      <div className="mb-3 d-flex align-items-center">
        <FaMoneyBillWave className="me-1" style={{ fontSize: '1.5em' }} />
        {isEditable ? (
          <Form.Control
            type="text"
            placeholder="Introduza o valor"
            name="valor_quota"
            value={entidadeData.valor_quota}
            onChange={handleChange}
            style={{ flex: 1 }}
          />
        ) : (
          <span>{entidadeData.valor_quota || 'N/A'}</span>
        )}
      </div>
      {isEditable && (
        <div className="text-center mt-4">
          <Button variant="primary" type="submit">
            Salvar
          </Button>
        </div>
      )}
    </Form>
  );

  const renderMessages = () => (
    <>
      {successMessage && (
        <Alert variant="success" onClose={() => setSuccessMessage('')} dismissible>
          {successMessage}
        </Alert>
      )}
      {errorMessage && (
        <Alert variant="danger" onClose={() => setErrorMessage('')} dismissible>
          {errorMessage}
        </Alert>
      )}
    </>
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
               {/* Exibe as mensagens de sucesso ou erro */}
               {renderMessages()}
              <Form onSubmit={handleSubmit}>
                {/* Campos de formulário na página */}
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
                    required
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
                    <Form.Group className="d-flex align-items-center" controlId="formTipo_quota">
                      <Form.Label className="me-2 mb-0" style={{ whiteSpace: 'nowrap' }}>
                        <FaList className="me-1" /> Tipo:
                      </Form.Label>
                      <Form.Control
                        as="select"
                        name="tipo_quota"
                        value={entidadeData.tipo_quota}
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
                    <Form.Group className="d-flex align-items-center" controlId="formValor_quota">
                      <Form.Label className="me-2 mb-0" style={{ whiteSpace: 'nowrap' }}>
                        <FaMoneyBillWave className="me-1" /> Valor:
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Introduza o valor"
                        name="valor_quota"
                        value={entidadeData.valor_quota}
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
                  <Button
                    variant="success"
                    className="ms-2"
                    onClick={() => {
                      setIsEditable(false);
                      setShowModal(true);
                    }}
                  >
                    <FaEye /> Ver mais
                  </Button>
                  <Button
                    variant="info"
                    className="ms-2"
                    onClick={() => {
                      setIsEditable(true);
                      setShowModal(true);
                    }}
                  >
                    <FaEdit /> Editar
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modal para exibir informações ou edição */}
      <Modal centered show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditable ? 'Editar Entidade' : 'Informações da Entidade'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{renderModalContent()}</Modal.Body>
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
