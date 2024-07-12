// components/modals/ConfirmPaymentModal.jsx

import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { FaCheckCircle } from 'react-icons/fa';

const ConfirmPaymentModal = ({ show, handleClose, handleConfirmPayment, quotaId }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirmar Pagamento</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Tem a certeza que deseja marcar esta quota como paga?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="success" onClick={() => handleConfirmPayment(quotaId)}>
          <FaCheckCircle className="mr-2" /> Confirmar Pagamento
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

ConfirmPaymentModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleConfirmPayment: PropTypes.func.isRequired,
  quotaId: PropTypes.number.isRequired
};

export default ConfirmPaymentModal;
