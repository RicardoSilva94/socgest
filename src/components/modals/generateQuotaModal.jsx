import React, { useState } from 'react';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { FaList, FaCalendarAlt, FaEuroSign, FaPen } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


const GenerateQuotaModal = ({ show, handleClose, handleGenerateQuota }) => {
  const [quotaData, setQuotaData] = useState({
    tipo: 'Anual',
    periodo: '',
    valor: '',
    descricao: '',
    prazoPagamento: new Date()
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuotaData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleDateChange = (date) => {
    setQuotaData(prevState => ({ ...prevState, prazoPagamento: date }));
  };

  const handleSubmit = () => {
    handleGenerateQuota(quotaData);
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Gerar Quota</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formTipo">
            <Form.Label>Tipo</Form.Label>
            <InputGroup>
              <InputGroup.Text><FaList /></InputGroup.Text>
              <Form.Control as="select" name="tipo" value={quotaData.tipo} onChange={handleChange}>
                <option value="Anual">Anual</option>
                <option value="Mensal">Mensal</option>
              </Form.Control>
            </InputGroup>
          </Form.Group>
          <Form.Group controlId="formPeriodo">
            <Form.Label>Período</Form.Label>
            <InputGroup>
              <InputGroup.Text><FaCalendarAlt /></InputGroup.Text>
              <Form.Control
                type="text"
                placeholder={quotaData.tipo === 'Anual' ? 'Ano (e.g., 2024)' : 'Mês (e.g., Julho 2024)'}
                name="periodo"
                value={quotaData.periodo}
                onChange={handleChange}
              />
            </InputGroup>
          </Form.Group>
          <Form.Group controlId="formValor">
            <Form.Label>Valor</Form.Label>
            <InputGroup>
              <InputGroup.Text><FaEuroSign /></InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Valor da quota"
                name="valor"
                value={quotaData.valor}
                onChange={handleChange}
              />
            </InputGroup>
          </Form.Group>
          <Form.Group controlId="formDescricao">
            <Form.Label>Descrição</Form.Label>
            <InputGroup>
              <InputGroup.Text><FaPen /></InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Descrição da quota"
                name="descricao"
                value={quotaData.descricao}
                onChange={handleChange}
              />
            </InputGroup>
          </Form.Group>
          <Form.Group controlId="formPrazoPagamento">
            <Form.Label>Prazo de Pagamento</Form.Label>
            <InputGroup>
              <InputGroup.Text><FaCalendarAlt /></InputGroup.Text>
              <DatePicker
                selected={quotaData.prazoPagamento}
                onChange={handleDateChange}
                dateFormat="dd/MM/yyyy"
                className="form-control"
              />
            </InputGroup>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Gerar Quota
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

GenerateQuotaModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleGenerateQuota: PropTypes.func.isRequired
};

export default GenerateQuotaModal;