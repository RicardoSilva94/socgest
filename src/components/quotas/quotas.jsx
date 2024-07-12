import React, { useMemo, useState, useEffect } from 'react';
import { useTable, usePagination } from 'react-table';
import { Button, Table, OverlayTrigger, Tooltip, Modal } from 'react-bootstrap';
import { FaCheckCircle, FaTimes, FaTrash, FaPlus, FaCheck } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './quotas.css';
import GenerateQuotaModal from '../modals/generateQuotaModal';
import DeleteQuotaModal from '../modals/deleteQuotaModal';
import ConfirmPaymentModal from '../modals/confirmPaymentModal';


const Quotas = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showGenerateQuotaModal, setShowGenerateQuotaModal] = useState(false);
  const [showConfirmPaymentModal, setShowConfirmPaymentModal] = useState(false);
  const [selectedQuotaId, setSelectedQuotaId] = useState(0);
  const [selectedQuota, setSelectedQuota] = useState(null);

  const handleCloseGenerateQuotaModal = () => setShowGenerateQuotaModal(false);
  const handleShowGenerateQuotaModal = () => setShowGenerateQuotaModal(true);

  const data = useMemo(
    () => [
      { id: 1, socio: 'João Silva', descricao: 'Quota Anual 2024', periodo: '2024', estado: 'Não Pago', valor: '50€' },
      { id: 2, socio: 'Maria Oliveira', descricao: 'Quota Mensal Julho 2024', periodo: 'Julho 2024', estado: 'Pago', valor: '5€' },
      { id: 3, socio: 'Carlos Santos', descricao: 'Quota Anual 2024', periodo: '2024', estado: 'Não Pago', valor: '50€' },
        { id: 4, socio: 'Marta Costa', descricao: 'Quota Mensal Julho 2024', periodo: 'Julho 2024', estado: 'Pago', valor: '5€' },
        { id: 5, socio: 'Ana Rodrigues', descricao: 'Quota Anual 2024', periodo: '2024', estado: 'Não Pago', valor: '50€' },
        { id: 6, socio: 'José Pereira', descricao: 'Quota Mensal Julho 2024', periodo: 'Julho 2024', estado: 'Pago', valor: '5€' },
        { id: 7, socio: 'Rita Gomes', descricao: 'Quota Anual 2024', periodo: '2024', estado: 'Não Pago', valor: '50€' },
        { id: 8, socio: 'Pedro Almeida', descricao: 'Quota Mensal Julho 2024', periodo: 'Julho 2024', estado: 'Pago', valor: '5€' },
        { id: 9, socio: 'Inês Lopes', descricao: 'Quota Anual 2024', periodo: '2024', estado: 'Não Pago', valor: '50€' },
        { id: 10, socio: 'Miguel Ferreira', descricao: 'Quota Mensal Julho 2024', periodo: 'Julho 2024', estado: 'Pago', valor: '5€' },
        { id: 11, socio: 'Sara Costa', descricao: 'Quota Anual 2024', periodo: '2024', estado: 'Não Pago', valor: '50€' },
        { id: 12, socio: 'Vasco Santos', descricao: 'Quota Mensal Julho 2024', periodo: 'Julho 2024', estado: 'Pago', valor: '5€' },
        { id: 13, socio: 'Catarina Silva', descricao: 'Quota Anual 2024', periodo: '2024', estado: 'Não Pago', valor: '50€' },
        { id: 14, socio: 'Ricardo Oliveira', descricao: 'Quota Mensal Julho 2024', periodo: 'Julho 2024', estado: 'Pago', valor: '5€' },
    ],
    []
  );

  const columns = useMemo(
    () => [
      { Header: 'ID', accessor: 'id' },
      { Header: 'Sócio', accessor: 'socio' },
      { Header: 'Descrição', accessor: 'descricao' },
      { Header: 'Período', accessor: 'periodo' },
      { Header: 'Estado', accessor: 'estado', 
        Cell: ({ value }) => (
            <div className="quota-state">
                {value === 'Pago' ? (
                <FaCheckCircle className="text-success me-1" />
                ) : (
                <FaTimes className="text-danger me-1" />
                )}
                <span>{value}</span>
            </div>
            )
      },
      { Header: 'Valor', accessor: 'valor' },
      {
        Header: 'Ações',
        accessor: 'actions',
        Cell: ({ row }) => (
          <div className="action-buttons">
            <OverlayTrigger overlay={<Tooltip id={`tooltip-edit`}>Marcar como Pago</Tooltip>}>
              <Button variant="success" size="sm" className="mr-2" onClick={() => handleShowConfirmPaymentModal(row.original.id)}>
                <FaCheck />
              </Button>
            </OverlayTrigger>
            <OverlayTrigger overlay={<Tooltip id={`tooltip-delete`}>Eliminar</Tooltip>}>
              <Button variant="danger" size="sm" onClick={() => handleShowDeleteModal(row.original.id)}>
                <FaTrash />
              </Button>
            </OverlayTrigger>
          </div>
        )
      }
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
      data: filteredData,
      initialState: { pageIndex: 0, pageSize: 10 }
    },
    usePagination
  );

  useEffect(() => {
    const results = data.filter(quota =>
      quota.socio.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(results);
  }, [searchTerm, data]);

  const handleShowDeleteModal = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = (id) => {
    console.log('Excluir quota com o id:', id);
    setShowDeleteModal(false);
    // Lógica para excluir a quota
  };

  const handleGenerateQuota = (quotaData) => {
    console.log('Gerar nova quota:', quotaData);
    handleCloseGenerateQuotaModal();
    // Lógica para gerar nova quota
  };

  const handleShowConfirmPaymentModal = (id) => {
    setSelectedQuotaId(id);
    setShowConfirmPaymentModal(true);
  };
  const handleCloseConfirmPaymentModal = () => setShowConfirmPaymentModal(false);

  const handleConfirmPayment = (id) => {
    console.log('Confirmar Pagomento para a Quota ID:', id);
    setShowConfirmPaymentModal(false);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-2 mt-1">
        <button className="btn btn-custom" onClick={handleShowGenerateQuotaModal}>
          <FaPlus className="mr-2" /> Gerar Quota
        </button>
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
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
      <div className="d-flex justify-content-between align-items-center mt-3">
        <div>
          <Button style={{ marginRight: '10px' }} onClick={() => previousPage()} disabled={!canPreviousPage}>
            Página Anterior
          </Button>
          <Button onClick={() => nextPage()} disabled={!canNextPage}>
            Próxima página
          </Button>
        </div>
        <div className="result-count ml-auto">
          {filteredData.length} resultados encontrados
        </div>
      </div>

        <ConfirmPaymentModal
            show={showConfirmPaymentModal}
            handleClose={handleCloseConfirmPaymentModal}
            handleConfirmPayment={handleConfirmPayment}
            quotaId={selectedQuotaId}
        />

      <GenerateQuotaModal
        show={showGenerateQuotaModal}
        handleClose={handleCloseGenerateQuotaModal}
        handleGenerateQuota={handleGenerateQuota}
      />

      <DeleteQuotaModal
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        handleDelete={() => handleDelete(deleteId)}

      />
    </div>


  );
};

export default Quotas;
