import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Card, Pagination, Alert, Form } from 'react-bootstrap';
import axios from '../../api/axios';
import { useUser } from '../../context/UserContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './historicoNotificacoes.css';

const HistoricoNotificacoes = () => {
    const { user } = useUser(); 
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [notificacoes, setNotificacoes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchNotificacoes = async () => {
            setIsLoading(true); 
            try {
                const response = await axios.get('/notificacoes');
                setNotificacoes(response.data.data || []);
            } catch (error) {
                console.error('Erro ao obter notificações:', error);
            } finally {
                setIsLoading(false); 
            }
        };

        fetchNotificacoes();
    }, [user]);

    // Filtrar notificações pelo termo de pesquisa
    const filteredNotificacoes = notificacoes.filter((notificacao) =>
        notificacao.socio.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notificacao.socio.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentNotificacoes = filteredNotificacoes.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredNotificacoes.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <Container>
            <Row className="justify-content-center mt-4">
                <Col md={12}>
                    <Card className="my-1 mt-4 mb-2 custom-card">
                        <Card.Body>
                            <Card.Title>Histórico de Notificações</Card.Title>
                            <Card.Text>
                                Consulte as Notificações que enviou aos Sócios
                            </Card.Text>
                        </Card.Body>
                    </Card>

                    <div className="d-flex justify-content-end mb-3">
                        <Form.Control
                            type="text"
                            placeholder="Pesquisar sócios por nome ou e-mail..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-bar"
                            style={{ width: '30%' }}
                        />
                    </div>

                    {isLoading ? (
                        <Alert variant="info" className="mt-4">
                            A carregar as notificações...
                        </Alert>
                    ) : filteredNotificacoes.length > 0 ? (
                        <>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Desc. Quota</th>
                                        <th>Estado de Pag.</th>
                                        <th>Valor</th>
                                        <th>Status Notif.</th>
                                        <th>Data de Envio</th>
                                        <th>Sócio</th>
                                        <th>E-mail</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentNotificacoes.map((notificacao) => (
                                        <tr key={notificacao.id}>
                                            <td>{notificacao.quota.descricao}</td>
                                            <td>{notificacao.quota.estado}</td>
                                            <td>{notificacao.quota.valor}€</td>
                                            <td>{notificacao.estado}</td>
                                            <td>{notificacao.data_envio}</td>
                                            <td>{notificacao.socio.nome}</td>
                                            <td>{notificacao.socio.email}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>

                            <Pagination className="justify-content-center">
                                <Pagination.Prev
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                >
                                    Anterior
                                </Pagination.Prev>
                                {Array.from({ length: totalPages }, (_, index) => (
                                    <Pagination.Item
                                        key={index}
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
                                    Seguinte
                                </Pagination.Next>
                            </Pagination>
                        </>
                    ) : (
                        <Alert variant="info" className="mt-4">
                            Não existem notificações para mostrar.
                        </Alert>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default HistoricoNotificacoes;

