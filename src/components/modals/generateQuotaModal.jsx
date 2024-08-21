import React, { useState } from 'react';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { FaList, FaCalendarAlt, FaEuroSign, FaPen } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import format from 'date-fns/format';

const GenerateQuotaModal = ({ show, handleClose, handleGenerateQuota }) => {
  const [quotaData, setQuotaData] = useState({
    tipo: 'Anual',
    periodo: '',
    valor: '',
    descricao: '',
    data_pagamento: new Date()
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuotaData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleDateChange = (date) => {
    // Convertendo a data para string no formato "YYYY-MM-DD"
    const formattedDate = format(date, 'yyyy-MM-dd');
    setQuotaData(prevState => ({ ...prevState, data_pagamento: formattedDate }));
  };

  const handleSubmit = () => {
    // Verifica se data_pagamento é uma string e tenta convertê-la em Date
    const dataPagamento = typeof quotaData.data_pagamento === 'string'
        ? new Date(quotaData.data_pagamento)
        : quotaData.data_pagamento;

    // Formatar a data no formato YYYY-MM-DD
    const formattedQuotaData = {
        ...quotaData,
        data_pagamento: dataPagamento.toISOString().split('T')[0] // Formata a data como "YYYY-MM-DD"
    };

    handleGenerateQuota(formattedQuotaData);
    console.log('Quota gerada:', formattedQuotaData);
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
                selected={new Date(quotaData.data_pagamento)}
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
