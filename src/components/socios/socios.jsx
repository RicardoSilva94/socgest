import React, { useState, useMemo, useEffect } from 'react';
import { useTable, usePagination } from 'react-table';
import { Button, Table, OverlayTrigger, Tooltip, Modal, Alert } from 'react-bootstrap';
import { FaEye, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './socios.css';
import AddSocioModal from '../modals/addSocioModal';
import EditSocioModal from '../modals/editSocioModal';
import ViewSocioModal from '../modals/viewSocioModal';
import axios from '../../api/axios';
import { useUser } from '../../context/UserContext';

const Socios = () => {
  const { user } = useUser();
  const [searchTerm, setSearchTerm] = useState('');
  const [socios, setSocios] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showAddSocioModal, setShowAddSocioModal] = useState(false);
  const [showEditSocioModal, setShowEditSocioModal] = useState(false);
  const [showViewSocioModal, setShowViewSocioModal] = useState(false);
  const [selectedSocio, setSelectedSocio] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('success'); 

  const handleCloseAddSocioModal = () => setShowAddSocioModal(false);
  const handleCloseEditSocioModal = () => setShowEditSocioModal(false);
  const handleShowAddSocioModal = () => setShowAddSocioModal(true);
  const handleShowEditSocioModal = (socio) => {
    setSelectedSocio(socio);
    setShowEditSocioModal(true);
  };

  const handleShowViewSocioModal = (socio) => {
    setSelectedSocio(socio);
    setShowViewSocioModal(true);
  };

  const columns = useMemo(
    () => [
      { Header: 'Nome', accessor: 'nome' },
      { Header: 'Nº Sócio', accessor: 'num_socio' },
      { Header: 'Email', accessor: 'email' },
      {
        Header: 'Gerir Sócio',
        accessor: 'actions',
        Cell: ({ row }) => (
          <div className="action-buttons">
            <OverlayTrigger overlay={<Tooltip id={`tooltip-view`}>Mais Informação</Tooltip>}>
              <Button variant="success" size="sm" className="mr-2" onClick={() => handleShowViewSocioModal(row.original)}>
                <FaEye />
              </Button>
            </OverlayTrigger>
            <OverlayTrigger overlay={<Tooltip id={`tooltip-edit`}>Editar</Tooltip>}>
              <Button variant="info" size="sm" className="mr-2" onClick={() => handleShowEditSocioModal(row.original)}>
                <FaEdit />
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

  const fetchSocios = async () => {
    try {
      const response = await axios.get('/socios');
      const sociosData = response.data.socios;
      if (Array.isArray(sociosData)) {
        setSocios(sociosData);
        setFilteredData(sociosData);
      } else {
        console.error('Os dados retornados não são um array:', sociosData);
      }
    } catch (error) {
      console.error('Erro ao buscar sócios:', error);
      setAlertMessage('Erro ao buscar sócios. Por favor, tente novamente.');
      setAlertVariant('danger');
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  useEffect(() => {
    fetchSocios();
  }, []);

  useEffect(() => {
    const results = socios.filter(socio =>
      socio.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(results);
  }, [searchTerm, socios]);

  const handleAddSocio = async (socioData) => {
    try {
      const response = await axios.post('/socios', { 
        ...socioData, 
        entidade_id: user.entidade_id 
      });
      console.log('Resposta da API:', response.data);

      setAlertMessage('Sócio adicionado com sucesso!');
      setAlertVariant('success');
      setShowAlert(true);
      
      setTimeout(() => setShowAlert(false), 3000);
      
      fetchSocios();
    } catch (error) {
      console.error('Erro ao adicionar sócio:', error);

      setAlertMessage('Erro ao adicionar sócio. Por favor, tente novamente.');
      setAlertVariant('danger');
      setShowAlert(true);
      
      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  const handleEditSocio = async (socioEditado) => {
    try {
      const response = await axios.put(`/socios/${socioEditado.id}`, socioEditado);
      console.log('Sócio editado:', response.data);
      setShowEditSocioModal(false);

      setAlertMessage('Sócio editado com sucesso!');
      setAlertVariant('success');
      setShowAlert(true);
      
      setTimeout(() => setShowAlert(false), 3000);
      
      fetchSocios();
    } catch (error) {
      console.error('Erro ao editar sócio:', error);

      setAlertMessage('Erro ao editar sócio. Por favor, tente novamente.');
      setAlertVariant('danger');
      setShowAlert(true);
      
      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  const handleShowDeleteModal = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/socios/${id}`);
      console.log('Sócio excluído com sucesso:', id);
      setShowDeleteModal(false);
      
      setAlertMessage('Sócio excluído com sucesso!');
      setAlertVariant('success');
      setShowAlert(true);
      
      setTimeout(() => setShowAlert(false), 3000);
      
      fetchSocios();
    } catch (error) {
      console.error('Erro ao excluir sócio:', error);

      setAlertMessage('Erro ao excluir sócio. Por favor, tente novamente.');
      setAlertVariant('danger');
      setShowAlert(true);
      
      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  return (
    <div>
      {showAlert && (
        <Alert variant={alertVariant} onClose={() => setShowAlert(false)} dismissible>
          {alertMessage}
        </Alert>
      )}
      <div className="d-flex justify-content-between align-items-center mb-2 mt-1">
        <button className="btn btn-custom" onClick={handleShowAddSocioModal}>
          <FaPlus className="mr-2" /> Adicionar Sócio
        </button>
        <div className="d-flex align-items-center">
          <label className="mr-2 me-2">Pesquisar:</label>
          <div className="input-group">
            <input
              type="text"
              placeholder="Pesquisar por nome"
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
            <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()} key={column.id}>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={row.id}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()} key={cell.column.id}>
                    {cell.render('Cell')}
                  </td>
                ))}
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

      <AddSocioModal
        show={showAddSocioModal}
        handleClose={handleCloseAddSocioModal}
        handleAddSocio={handleAddSocio}
      />
      <EditSocioModal
        show={showEditSocioModal}
        handleClose={handleCloseEditSocioModal}
        socio={selectedSocio}
        handleEditSocio={handleEditSocio}
      />
      <ViewSocioModal
        show={showViewSocioModal}
        handleClose={() => setShowViewSocioModal(false)}
        socio={selectedSocio}
      />

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>Tem certeza que deseja excluir este sócio?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={() => handleDelete(deleteId)}>
            Excluir
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Socios;
