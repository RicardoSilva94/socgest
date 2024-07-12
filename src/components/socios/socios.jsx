import React, { useMemo, useState, useEffect } from 'react';
import { useTable, usePagination } from 'react-table';
import { Button, Table, OverlayTrigger, Tooltip, Modal } from 'react-bootstrap';
import { FaEye, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './socios.css';
import AddSocioModal from '../modals/addSocioModal';


const Socios = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showAddSocioModal, setShowAddSocioModal] = useState(false);
  const handleCloseAddSocioModal = () => setShowAddSocioModal(false);
  const handleShowAddSocioModal = () => setShowAddSocioModal(true);

  const data = useMemo(
    () => [
      { id: 1, nome: 'João Silva Farinha', numSocio: '001', email: 'joao.silva@example.com' },
      { id: 2, nome: 'Maria Oliveira Roque', numSocio: '002', email: 'maria.oliveira@example.com' },
      { id: 3, nome: 'Carlos Sousa', numSocio: '003', email: 'carlos.sousa@example.com' },
      { id: 4, nome: 'Ana Santos', numSocio: '004', email: 'ana.santos@example.com' },
      { id: 5, nome: 'Rui Pereira Silva', numSocio: '005', email: 'rui.pereira@example.com' },
      { id: 6, nome: 'Marta Costa', numSocio: '006', email: 'marta.costa@example.com' },
      { id: 7, nome: 'Pedro Rodrigues Jorge Febra', numSocio: '007', email: 'pedro.rodrigues@example.com' },
      { id: 8, nome: 'Sofia Fernandes', numSocio: '008', email: 'sofia.fernandes@example.com' },
      { id: 9, nome: 'José Almeida', numSocio: '009', email: 'jose.almeida@example.com' },
      { id: 10, nome: 'Inês Ribeiro', numSocio: '010', email: 'ines.ribeiro@example.com' },
      { id: 11, nome: 'Miguel Lopes', numSocio: '011', email: 'miguel.lopes@example.com' },
      { id: 12, nome: 'Carolina Pereira', numSocio: '012', email: 'carolina.pereira@example.com' },
      { id: 13, nome: 'António Silva', numSocio: '013', email: 'antonio.silva@example.com' },
      { id: 14, nome: 'Diana Costa', numSocio: '014', email: 'diana.costa@example.com' },
      { id: 15, nome: 'Ricardo Almeida', numSocio: '015', email: 'ricardo.almeida@example.com' },
      { id: 16, nome: 'Mariana Ribeiro Gomes', numSocio: '016', email: 'mariana.ribeiro@example.com' },
      { id: 17, nome: 'Hugo Lopes', numSocio: '017', email: 'hugo.lopes@example.com' },
      { id: 18, nome: 'Sara Pereira', numSocio: '018', email: 'sara.pereira@example.com' },
      { id: 19, nome: 'Vasco Silva', numSocio: '019', email: 'vasco.silva@example.com' },
      { id: 20, nome: 'Pedro Rodrigues', numSocio: '020', email: 'teresa.costa@example.com' }
    ],
    []
  );

  const columns = useMemo(
    () => [
      { Header: 'Nome', accessor: 'nome' },
      { Header: 'Nº Sócio', accessor: 'numSocio' },
      { Header: 'Email', accessor: 'email' },
      {
        Header: 'Gerir Sócio',
        accessor: 'actions',
        Cell: ({ row }) => (
          <div className="action-buttons">
            <OverlayTrigger overlay={<Tooltip id={`tooltip-view`}>Mais Informação</Tooltip>}>
              <Button variant="success" size="sm" className="mr-2" onClick={() => handleView(row)}>
                <FaEye />
              </Button>
            </OverlayTrigger>
            <OverlayTrigger overlay={<Tooltip id={`tooltip-edit`}>Editar</Tooltip>}>
              <Button variant="info" size="sm" className="mr-2" onClick={() => handleEdit(row)}>
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

  useEffect(() => {
    const results = data.filter(socio =>
      socio.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(results);
  }, [searchTerm, data]);

  const handleView = (row) => {
    console.log('Ver mais detalhes do sócio', row.original);
  };

  const handleEdit = (row) => {
    console.log('Editar sócio', row.original);
  };

  const handleShowDeleteModal = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = (id) => {
    console.log('Excluir sócio com o id:', id);
    setShowDeleteModal(false);
    // Lógica para excluir o sócio
  };

  const handleAddSocio = () => {
    // Implemente a lógica para adicionar o sócio aqui
    console.log('Adicionar novo sócio');
  };

  return (
    <div>
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
          <Button style={{ marginRight: '10px' }}
          onClick={() => previousPage()} disabled={!canPreviousPage}>
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


      {/* Modal de confirmação para exclusão */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem a certeza que deseja eliminar este sócio?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={() => handleDelete(deleteId)}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Socios;
