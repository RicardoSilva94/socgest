import React, { useMemo, useState, useEffect } from 'react';
import { useTable, usePagination } from 'react-table';
import { Button, Table, OverlayTrigger, Tooltip, Dropdown, Alert } from 'react-bootstrap';
import { FaCheckCircle, FaTimes, FaTrash, FaPlus, FaCheck } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './quotas.css';
import GenerateQuotaModal from '../modals/generateQuotaModal';
import DeleteQuotaModal from '../modals/deleteQuotaModal';
import ConfirmPaymentModal from '../modals/confirmPaymentModal';
import GenerateQuotaIndividualModal from '../modals/generateQuotaIndividualModal';
import 'react-datepicker/dist/react-datepicker.css';
import axios from '../../api/axios';


const Quotas = () => {
  ;
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showGenerateQuotaModal, setShowGenerateQuotaModal] = useState(false);
  const [showConfirmPaymentModal, setShowConfirmPaymentModal] = useState(false);
  const [selectedQuotaId, setSelectedQuotaId] = useState(0);
  const [paymentStatus, setPaymentStatus] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('success');
  const [data, setData] = useState([]); // Estado para armazenar os dados das quotas
  const handleCloseGenerateQuotaModal = () => setShowGenerateQuotaModal(false);
  const [showGenerateQuotaIndividualModal, setShowGenerateQuotaIndividualModal] = useState(false);
  const handleCloseGenerateQuotaIndividualModal = () => setShowGenerateQuotaIndividualModal(false);


  // Faz a requisição para buscar quotas
  const fetchQuotas = async () => {
    try {
      const response = await axios.get('/quotas');
      if (response.data && Array.isArray(response.data.quotas)) {
        const sortedData = response.data.quotas.sort((a, b) => new Date(b.data_emissao) - new Date(a.data_emissao));
        setData(sortedData);
      } else {
        console.error('Resposta da API não contém uma lista de quotas:', response.data);
        setAlertMessage('Erro na resposta da API. Tente novamente.');
        setAlertVariant('danger');
        setShowAlert(true);
      }
    } catch (error) {
      console.error('Erro ao buscar quotas:', error);
      setAlertMessage('Erro ao buscar quotas. Tente novamente.');
      setAlertVariant('danger');
      setShowAlert(true);
    }
  };

  // Carrega quotas na montagem do componente
  useEffect(() => {
    fetchQuotas();
  }, []);

  // Atualiza a lista filtrada e ordenada com base em searchTerm e paymentStatus
  useEffect(() => {
    const results = data.filter(quota => {
      const lowerSearchTerm = searchTerm ? searchTerm.toLowerCase() : '';
      const socioName = quota.socio ? quota.socio.nome.toLowerCase() : '';
      return (
        (paymentStatus === '' || quota.estado === paymentStatus) &&
        socioName.includes(lowerSearchTerm)
      );
    });

    const sortedResults = results.sort((a, b) => new Date(b.data_emissao) - new Date(a.data_emissao));
    setFilteredData(sortedResults);
  }, [searchTerm, data, paymentStatus]);

  const columns = useMemo(
    () => [
      { Header: 'ID', accessor: 'id' },
      {
        Header: 'Sócio',
        accessor: 'socio',
        Cell: ({ value }) => value ? value.nome : 'Desconhecido'
      },
      { Header: 'Descrição', accessor: 'descricao' },
      { Header: 'Período', accessor: 'periodo' },
      {
        Header: 'Data de Emissão', accessor: 'data_emissao',
        Cell: ({ value }) => new Date(value).toLocaleDateString('pt-PT')
      },
      {
        Header: 'Data de Pagamento', accessor: 'data_pagamento',
        Cell: ({ value }) => new Date(value).toLocaleDateString('pt-PT')
      },
      {
        Header: () => (
          <div className="d-flex align-items-center estado-header">
            <span className="dropdown-title">Estado</span>
            <Dropdown onSelect={(eventKey) => setPaymentStatus(eventKey)} className="custom-dropdown">
              <Dropdown.Toggle variant="link" id="dropdown-basic" className="custom-dropdown-toggle">
              </Dropdown.Toggle>
              <Dropdown.Menu className="custom-dropdown-menu">
                <Dropdown.Item eventKey="">Todos</Dropdown.Item>
                <Dropdown.Item eventKey="Pago">Pago</Dropdown.Item>
                <Dropdown.Item eventKey="Não Pago">Não Pago</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        ),
        accessor: 'estado',
        Cell: ({ value }) => (
          <div className="quota-state">
            {value === 'Pago' ? (
              <FaCheckCircle className="text-success me-1" />
            ) : (
              <FaTimes className="text-danger me-1" />
            )}
            <span>{value}</span>
          </div>
        ),
        className: 'estado-header'
      },
      { Header: 'Valor', accessor: 'valor' },
      {
        Header: 'Ações',
        accessor: 'actions',
        Cell: ({ row }) => (
          <div className="action-buttons">
            <OverlayTrigger overlay={<Tooltip id={`tooltip-edit`}>Marcar como Pago</Tooltip>}>
              <Button variant="outline-success" size="sm" className="mr-2" onClick={() => handleShowConfirmPaymentModal(row.original.id)}>
                <FaCheck />
              </Button>
            </OverlayTrigger>
            <OverlayTrigger overlay={<Tooltip id={`tooltip-delete`}>Eliminar</Tooltip>}>
              <Button variant="outline-dark" size="sm" onClick={() => handleShowDeleteModal(row.original.id)}>
                <FaTrash />
              </Button>
            </OverlayTrigger>
          </div>
        )
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    prepareRow,
    state: { pageIndex, pageSize }
  } = useTable(
    {
      columns,
      data: filteredData, // Usa filteredData para a tabela
      initialState: { pageIndex: 0, pageSize: 10 }
    },
    usePagination
  );

  const handleShowDeleteModal = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/quotas/${id}`);
      await fetchQuotas(); // Recarrega os dados após a exclusão
      setAlertMessage('Quota excluída com sucesso!');
      setAlertVariant('success');
    } catch (error) {
      console.error('Erro ao excluir a quota:', error);
      setAlertMessage('Erro ao excluir a quota. Tente novamente.');
      setAlertVariant('danger');
    } finally {
      setShowDeleteModal(false);
      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  const handleGenerateQuota = async (quotaData) => {
    try {
      setAlertMessage('Gerando nova quota...');
      setAlertVariant('info');
      setShowAlert(true);

      await axios.post('/quotas/emitir', quotaData);
      await fetchQuotas(); // Recarrega os dados após a geração
      setAlertMessage('Quota gerada com sucesso!');
      setAlertVariant('success');
    } catch (error) {
      console.error('Erro ao gerar a quota:', error);
      setAlertMessage('Erro ao gerar a quota. Tente novamente.');
      setAlertVariant('danger');
    } finally {
      handleCloseGenerateQuotaModal();
      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  const handleGenerateQuotaIndividual = async (quotaData) => {
    try {
      setAlertMessage('Gerando nova quota...');
      setAlertVariant('info');
      setShowAlert(true);

      await axios.post('/individual', quotaData);
      await fetchQuotas();
      setAlertMessage('Quota gerada com sucesso!');
      setAlertVariant('success');
    } catch (error) {
      console.error('Erro ao gerar a quota:', error);
      setAlertMessage('Erro ao gerar a quota. Tente novamente.');
      setAlertVariant('danger');
    } finally {
      handleCloseGenerateQuotaIndividualModal();
      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  const handleShowConfirmPaymentModal = (id) => {
    setSelectedQuotaId(id);
    setShowConfirmPaymentModal(true);
  };

  const handleCloseConfirmPaymentModal = () => setShowConfirmPaymentModal(false);

  const handleConfirmPayment = async (id) => {
    try {
      const response = await axios.put(`/quotas/${id}`);
      await fetchQuotas(); // Recarrega os dados após a confirmação do pagamento
      setAlertMessage(response.data.message);
      setAlertVariant('success');
    } catch (error) {
      console.error('Erro ao confirmar pagamento:', error);
      setAlertMessage('Erro ao confirmar pagamento. Tente novamente.');
      setAlertVariant('danger');
    } finally {
      setShowConfirmPaymentModal(false);
      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  return (
    <div>
      {showAlert && <Alert variant={alertVariant}>{alertMessage}</Alert>}
      <div className="d-flex justify-content-between align-items-center mb-2 mt-1">
        <div className="d-flex align-items-center" style={{ gap: '4px' }}>
          <Button variant="primary" onClick={() => setShowGenerateQuotaModal(true)} className="mr-2">
            <FaPlus className="mr-2" /> Gerar Quota
          </Button>
          <Button variant="secondary" onClick={() => setShowGenerateQuotaIndividualModal(true)} className="mr-2">
          <FaPlus className="mr-2" /> Gerar Quota Individual
          </Button>
        </div>
        <div className="d-flex align-items-center">
          <label className="mr-2 me-2">Pesquisar:</label>
          <div className="input-group">
            <input
              type="text"
              placeholder="Pesquisar por sócio"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-control search-input"
            />
          </div>
        </div>
      </div>

      <Table {...getTableProps()} striped bordered hover>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </Table>
      <div className="pagination-controls d-flex justify-content-center mt-3">
        <Button
          className="me-1"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          Anterior
        </Button>
        <Button
          className="ms-1"
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          Próximo
        </Button>
      </div>
      <div className="results-info mt-3">
        <span>A mostrar {filteredData.length} resultados</span>
        <span> | Página {pageIndex + 1} de {Math.ceil(filteredData.length / pageSize)}</span>
      </div>
      <GenerateQuotaModal
        show={showGenerateQuotaModal}
        handleClose={handleCloseGenerateQuotaModal}
        handleGenerateQuota={handleGenerateQuota}
      />
      <GenerateQuotaIndividualModal
        show={showGenerateQuotaIndividualModal}
        handleClose={handleCloseGenerateQuotaIndividualModal}
        handleGenerateQuota={handleGenerateQuotaIndividual}
      />
      <DeleteQuotaModal
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        handleDelete={() => handleDelete(deleteId)}
      />
      <ConfirmPaymentModal
        show={showConfirmPaymentModal}
        handleClose={handleCloseConfirmPaymentModal}
        handleConfirmPayment={handleConfirmPayment}
        quotaId={selectedQuotaId}
      />
    </div>
  );
};

export default Quotas;
