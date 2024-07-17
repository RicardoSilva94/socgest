import React, { useState } from 'react';
import { Container, Row, Col, Table, Button, Modal, Form, Card, Pagination } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './gestaoNotificacoes.css';

const GestaoNotificacoes = () => {
  const [socios, setSocios] = useState([
    { id: 1, nome: 'João Silva', email: 'joao.silva@example.com', statusQuota: 'Em atraso', descricao: 'Quota Anual 2024', prazoPagamento: new Date('2024-12-31'), valor: '50€' },
    { id: 2, nome: 'Maria Oliveira', email: 'maria.oliveira@example.com', statusQuota: 'Em dia', descricao: 'Quota Mensal Julho 2024', prazoPagamento: new Date('2024-07-31'), valor: '5€' },
    { id: 3, nome: 'José Pereira', email: 'modus@gmail.com', statusQuota: 'Em dia', descricao: 'Quota Mensal Julho 2024', prazoPagamento: new Date('2024-07-31'), valor: '5€' },
    { id: 4, nome: 'Ana Santos', email: 'aninha@gmail.com', statusQuota: 'Em dia', descricao: 'Quota Mensal Julho 2024', prazoPagamento: new Date('2024-07-31'), valor: '5€' },
    { id: 5, nome: 'Ana Santos', email: 'aninha@gmail.com', statusQuota: 'Em dia', descricao: 'Quota Mensal Julho 2024', prazoPagamento: new Date('2024-07-31'), valor: '5€' },
    { id: 6, nome: 'Ana Santos', email: 'aninha@gmail.com', statusQuota: 'Em dia', descricao: 'Quota Mensal Julho 2024', prazoPagamento: new Date('2024-07-31'), valor: '5€' },
    { id: 7, nome: 'Ana Santos', email: 'aninha@gmail.com', statusQuota: 'Em dia', descricao: 'Quota Mensal Julho 2024', prazoPagamento: new Date('2024-07-31'), valor: '5€' },
    { id: 8, nome: 'Ana Santos', email: 'aninha@gmail.com', statusQuota: 'Em dia', descricao: 'Quota Mensal Julho 2024', prazoPagamento: new Date('2024-07-31'), valor: '5€' },
    { id: 9, nome: 'Ana Santos', email: 'aninha@gmail.com', statusQuota: 'Em dia', descricao: 'Quota Mensal Julho 2024', prazoPagamento: new Date('2024-07-31'), valor: '5€' },
    { id: 10, nome: 'Ana Santos', email: 'aninha@gmail.com', statusQuota: 'Em dia', descricao: 'Quota Mensal Julho 2024', prazoPagamento: new Date('2024-07-31'), valor: '5€' },
    { id: 11, nome: 'Ana Santos', email: 'aninha@gmail.com', statusQuota: 'Em dia', descricao: 'Quota Mensal Julho 2024', prazoPagamento: new Date('2024-07-31'), valor: '5€' },
    { id: 12, nome: 'Rui Santos', email: 'rui@gmail.com', statusQuota: 'Em dia', descricao: 'Quota Mensal Julho 2024', prazoPagamento: new Date('2024-07-31'), valor: '5€' },


  ]);

  const [selectedSocios, setSelectedSocios] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

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

  const handleSendNotification = () => {
    console.log('Notificações enviadas para:', selectedSocios);
    setShowModal(false);
  };

  const filteredSocios = socios.filter(
    (socio) =>
      (socio.nome.toLowerCase().includes(searchTerm.toLowerCase()) || socio.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterStatus === '' || socio.statusQuota === filterStatus)
  );

  const indexOfLastSocio = currentPage * itemsPerPage;
  const indexOfFirstSocio = indexOfLastSocio - itemsPerPage;
  const currentSocios = filteredSocios.slice(indexOfFirstSocio, indexOfLastSocio);

  const totalPages = Math.ceil(filteredSocios.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
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

          <div className="d-flex justify-content-between align-items-center mb-3">
            <Form.Control
              type="text"
              placeholder="Pesquisar sócios por nome ou email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-bar"
              style={{ width: '60%' }}
            />
            <Form.Control
              as="select"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="status-filter"
              style={{ width: '35%' }}
            >
              <option value="">Filtre os Sócios pelo Status da Quota &#x25BC;</option>
              <option value="Em dia">Em dia</option>
              <option value="Em atraso">Em atraso</option>
            </Form.Control>
          </div>

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
              {currentSocios.map((socio) => (
                <tr key={socio.id}>
                  <td>
                    <Form.Check
                      type="checkbox"
                      checked={selectedSocios.includes(socio)}
                      onChange={() => handleSelectSocio(socio)}
                    />
                  </td>
                  <td>{socio.nome}</td>
                  <td>{socio.email}</td>
                  <td>{socio.descricao}</td>
                  <td>{socio.prazoPagamento.toLocaleDateString('pt-PT')}</td>
                  <td>{socio.valor}</td>
                  <td>{socio.statusQuota}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div className="d-flex justify-content-center">
            <Pagination>
              {Array.from({ length: totalPages }, (_, index) => (
                <Pagination.Item
                  key={index + 1}
                  active={index + 1 === currentPage}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              ))}
            </Pagination>
          </div>

          <div className="text-center">
            <Button
              variant="primary"
              disabled={selectedSocios.length === 0}
              onClick={() => setShowModal(true)}
            >
              Enviar Notificações
            </Button>
          </div>
        </Col>
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Envio de Notificações</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem certeza de que deseja enviar notificações para os seguintes sócios?
          <ul>
            {selectedSocios.map((socio) => (
              <li key={socio.id}>{socio.nome} ({socio.email})</li>
            ))}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSendNotification}>
            Enviar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default GestaoNotificacoes;
