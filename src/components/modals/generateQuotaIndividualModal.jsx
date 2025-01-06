import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { FaList, FaCalendarAlt, FaEuroSign, FaPen } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format, getYear, getMonth, setMonth } from 'date-fns';
import axios from "../../api/axios";
import { FaPerson } from 'react-icons/fa6';


const GenerateQuotaIndividualModal = ({ show, handleClose, handleGenerateQuota }) => {
  const [socios, setSocios] = useState([]);
  const currentYear = getYear(new Date());
  const currentMonth = getMonth(new Date());
  const [quotaData, setQuotaData] = useState({
    tipo: 'Anual',
    periodo: '',
    valor: '',
    descricao: '',
    data_pagamento: new Date(),
    socio_id: ''
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

  useEffect(() => {
    const fetchSocios = async () => {
        try {
            const response = await axios.get(`/socios`);
            setSocios(response.data.socios);
        } catch (error) {
            console.error("Erro ao procurar sócios:", error);
        }
    };

    fetchSocios();
}, []);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Gerar Quota Individual</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
            <Form.Group controlId="formSocio">
            <Form.Label>Sócio</Form.Label>
            <InputGroup>
                <InputGroup.Text>
                <FaPerson />
                </InputGroup.Text>
                <Form.Control as="select" name="socio_id" value={quotaData.socio_id} onChange={handleChange}>
                <option value="">Selecione o sócio...</option>
                {socios.map((socio, index) => (
                    <option key={socio.id} value={socio.id}>
                    {socio.nome}
                    </option>
                ))}
                </Form.Control>
            </InputGroup>
                </Form.Group>
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

GenerateQuotaIndividualModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleGenerateQuota: PropTypes.func.isRequired
};

export default GenerateQuotaIndividualModal;
