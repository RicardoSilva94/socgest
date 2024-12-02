import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button, Modal, Form, Card, Pagination, Alert, Spinner } from 'react-bootstrap';
import axios from '../../api/axios';
import { useUser } from '../../context/UserContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './gestaoNotificacoes.css';
import { FaMagnifyingGlass } from 'react-icons/fa6';

const GestaoNotificacoes = () => {
  const { user } = useUser(); // Obtem o user autenticado
  const [socios, setSocios] = useState([]);
  const [selectedSocios, setSelectedSocios] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch quotas em atraso da API
  useEffect(() => {
    const fetchQuotasEmAtraso = async () => {
      try {
        const response = await axios.get('/quotas/atraso');
        // Verificação se a resposta contém quotas
        setSocios(response.data.quotas || []);
      } catch (error) {
        console.error('Erro ao buscar quotas em atraso:', error);
      }
    };

    fetchQuotasEmAtraso();
  }, [user]);

  const filteredSocios = socios.filter(
    (socio) =>
      socio.socio.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      socio.socio.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastSocio = currentPage * itemsPerPage;
  const indexOfFirstSocio = indexOfLastSocio - itemsPerPage;
  const currentSocios = filteredSocios.slice(indexOfFirstSocio, indexOfLastSocio);

  const totalPages = Math.ceil(filteredSocios.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSelectSocio = (socio) => {
    setSelectedSocios((prevSelected) =>
      prevSelected.includes(socio)
        ? prevSelected.filter((s) => s !== socio)
        : [...prevSelected, socio]
    );
  };

  const handleSelectAll = () => {
    if (selectedSocios.length === filteredSocios.length) {
      setSelectedSocios([]);
    } else {
      setSelectedSocios(filteredSocios);
    }
  };

  // Novo método para enviar notificações
  const handleSendNotification = async () => {
    const quotaIds = selectedSocios.map((quota) => quota.id);
    setIsLoading(true);
    try {
      const response = await axios.post('/notificacoes/send', {
        quota_ids: quotaIds
      });

      console.log('Resposta do servidor:', response.data);

      // Mostrar mensagem de sucesso
      setShowSuccessAlert(true);
      setShowErrorAlert(false);

      // Limpar seleção após envio
      setSelectedSocios([]);
    } catch (error) {
      console.error('Erro ao enviar notificações:', error);

      // Mostrar mensagem de erro
      setShowErrorAlert(true);
      setShowSuccessAlert(false);
    } finally {
      setIsLoading(false);
      setShowModal(false); // Fechar o modal
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={12}>
          <Card className="my-1 mt-2 mb-2 custom-card">
            <Card.Body>
              <Card.Title>Notificações</Card.Title>
              <Card.Text>
                Aqui pode notificar por e-mail os sócios sobre o estado das suas quotas.
              </Card.Text>
            </Card.Body>
          </Card>

          {/* Alerta de Sucesso */}
          {showSuccessAlert && (
            <Alert variant="success" onClose={() => setShowSuccessAlert(false)} dismissible>
              Notificações enviadas com sucesso!
            </Alert>
          )}

          {/* Alerta de Erro */}
          {showErrorAlert && (
            <Alert variant="danger" onClose={() => setShowErrorAlert(false)} dismissible>
              Ocorreu um erro ao enviar as notificações. Por favor, tente novamente.
            </Alert>
          )}

          <div className="d-flex justify-content-between align-items-center mb-3">

            <a href="/historiconotificacoes" className="btn btn-primary d-flex align-items-center">
              <FaMagnifyingGlass className="me-2" />
              Consultar Histórico
            </a>

            <Form.Control
              type="text"
              placeholder="Pesquisar sócios por nome ou email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-bar"
              style={{ width: '30%' }}
            />
          </div>

          {/* Renderizar tabela somente se houver sócios */}
          {socios.length > 0 ? (
            <>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>
                      <Form.Check
                        type="checkbox"
                        checked={selectedSocios.length === filteredSocios.length}
                        onChange={handleSelectAll}
                      />
                    </th>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Descrição</th>
                    <th>Prazo de Pagamento</th>
                    <th>Valor</th>
                    <th>Status da Quota</th>
                  </tr>
                </thead>
                <tbody>
                  {currentSocios.map((quota) => (
                    <tr key={quota.id}>
                      <td>
                        <Form.Check
                          type="checkbox"
                          checked={selectedSocios.includes(quota)}
                          onChange={() => handleSelectSocio(quota)}
                        />
                      </td>
                      <td>{quota.socio.nome}</td>
                      <td>{quota.socio.email}</td>
                      <td>{quota.descricao}</td>
                      <td>{new Date(quota.data_pagamento).toLocaleDateString('pt-PT')}</td>
                      <td>{quota.valor}</td>
                      <td>{quota.estado}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              <div className="d-flex justify-content-center my-3">
                <Pagination>
                  <Pagination.Prev
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Anterior
                  </Pagination.Prev>
                  {Array.from({ length: totalPages }, (_, index) => (
                    <Pagination.Item
                      key={index + 1}
                      active={index + 1 === currentPage}
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </Pagination.Item>
                  ))}
                  <Pagination.Next
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Próximo
                  </Pagination.Next>
                </Pagination>
              </div>

              <div className="text-center">
                <Button
                  variant="primary"
                  disabled={selectedSocios.length === 0 || isLoading}
                  onClick={() => setShowModal(true)}
                >
                  {isLoading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Enviar Notificações'}
                </Button>
              </div>
            </>
          ) : (
            <p className="text-center">Nenhum sócio com quotas em atraso encontrado.</p>
          )}
        </Col>
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Envio de Notificações</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem a certeza de que deseja enviar as seguintes notificações?
          <ul>
            {selectedSocios.map((quota) => (
              <li key={quota.id}>{quota.socio.nome} ({quota.socio.email}) - {quota.descricao}</li>
            ))}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSendNotification} disabled={isLoading}>
            {isLoading ? (
              <>
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
                Enviando...
              </>
            ) : (
              'Enviar'
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default GestaoNotificacoes;
