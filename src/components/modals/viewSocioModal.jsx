import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ViewSocioModal = ({ show, handleClose, socio }) => {
  if (!socio) {
    return null;
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Detalhes do Sócio</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Nome:</strong> {socio.nome}</p>
        <p><strong>Nº de Sócio:</strong> {socio.num_socio}</p>
        <p><strong>NIF:</strong> {socio.nif}</p>
        <p><strong>Telemóvel:</strong> {socio.telefone}</p>
        <p><strong>Email:</strong> {socio.email}</p>
        <p><strong>Morada:</strong> {socio.morada}</p>
        <p><strong>Notas:</strong> {socio.notas}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Fechar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewSocioModal;
