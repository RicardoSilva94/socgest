import React, { useState } from 'react';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { FaList, FaCalendarAlt, FaEuroSign, FaPen } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format, getYear, getMonth, setMonth } from 'date-fns';


const GenerateQuotaModal = ({ show, handleClose, handleGenerateQuota }) => {
  const currentYear = getYear(new Date());
  const currentMonth = getMonth(new Date());
  const [quotaData, setQuotaData] = useState({
    tipo: 'Anual',
    periodo: '',
    valor: '',
    descricao: '',
    data_pagamento: new Date()
  });

  const meses = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuotaData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleDateChange = (date) => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    setQuotaData((prevState) => ({ ...prevState, data_pagamento: formattedDate }));
  };

  const handleSubmit = () => {
    const dataPagamento =
      typeof quotaData.data_pagamento === 'string'
        ? new Date(quotaData.data_pagamento)
        : quotaData.data_pagamento;

    const formattedQuotaData = {
      ...quotaData,
      data_pagamento: dataPagamento.toISOString().split('T')[0]
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
              <InputGroup.Text>
                <FaList />
              </InputGroup.Text>
              <Form.Control as="select" name="tipo" value={quotaData.tipo} onChange={handleChange}>
                <option value="Anual">Anual</option>
                <option value="Mensal">Mensal</option>
              </Form.Control>
            </InputGroup>
          </Form.Group>
          <Form.Group controlId="formPeriodo">
            <Form.Label>Período</Form.Label>
            <InputGroup>
              <InputGroup.Text>
                <FaCalendarAlt />
              </InputGroup.Text>
              {quotaData.tipo === 'Anual' ? (
                <Form.Control
                  as="select"
                  name="periodo"
                  value={quotaData.periodo}
                  onChange={handleChange}
                >
                  <option value="">Selecione o ano aplicável...</option>
                  <option value={currentYear - 1}>{currentYear - 1}</option>
                  <option value={currentYear}>{currentYear}</option>
                  <option value={currentYear + 1}>{currentYear + 1}</option>
                </Form.Control>
              ) : (
                <Form.Control
                  as="select"
                  name="periodo"
                  value={quotaData.periodo}
                  onChange={handleChange}
                >
                  <option value="">Selecione o mês aplicável...</option>
                  {meses.map((mes, index) => (
                    <option key={index} value={`${mes} ${currentYear}`}>
                      {`${mes} ${currentYear}`}
                    </option>
                  ))}
                  <option value={`Janeiro ${currentYear + 1}`}>{`Janeiro ${currentYear + 1}`}</option>
                </Form.Control>
              )}
            </InputGroup>
          </Form.Group>
          <Form.Group controlId="formValor">
            <Form.Label>Valor</Form.Label>
            <InputGroup>
              <InputGroup.Text>
                <FaEuroSign />
              </InputGroup.Text>
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
              <InputGroup.Text>
                <FaPen />
              </InputGroup.Text>
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
              <InputGroup.Text>
                <FaCalendarAlt />
              </InputGroup.Text>
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
