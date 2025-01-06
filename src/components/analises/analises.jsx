import React, { useState, useEffect } from "react";
import axios from "../../api/axios";
import { useUser } from "../../context/UserContext";
import { Container, Card, Tab, Tabs, Table, Form, Alert, Pagination, Button } from "react-bootstrap";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import "./analises.css";
import { FaCheckCircle, FaTimes } from "react-icons/fa";
import jsPDF from "jspdf";
import "jspdf-autotable";

const Analises = () => {
    const [socios, setSocios] = useState([]);
    const [quotas, setQuotas] = useState([]);
    const [chartOptions, setChartOptions] = useState({});
    const [filteredQuotas, setFilteredQuotas] = useState([]);
    const [activeTab, setActiveTab] = useState("estado");
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const { user } = useUser();
    const [selectedMensalYear, setSelectedMensalYear] = useState(new Date().getFullYear());

    // Função para exportar uma tabela para PDF
    const exportTableToPDF = (tableId, title) => {
        try {
            const doc = new jsPDF();

            doc.setFontSize(18);
            doc.text(title, 14, 20);

            const table = document.getElementById(tableId);

            if (!table) {
                console.error(`Tabela com ID '${tableId}' não encontrada.`);
                return;
            }

            const rows = [];
            const headers = [];

            const thead = table.querySelector("thead tr");
            if (thead) {
                thead.querySelectorAll("th").forEach((th) => headers.push(th.textContent));
            }

            table.querySelectorAll("tbody tr").forEach((row) => {
                const cells = [];
                row.querySelectorAll("td").forEach((cell) => cells.push(cell.textContent));
                rows.push(cells);
            });

            doc.autoTable({
                head: [headers],
                body: rows,
                startY: 30,
                styles: {
                    fontSize: 8,
                },
            });

            doc.save(`${title.replace(/\s+/g, "_")}.pdf`);
        } catch (error) {
            console.error("Erro ao exportar tabela para PDF:", error);
        }
    };

    // Função para agrupar quotas por sócio
    const GroupBySocio = (quotas) => {
        return quotas
            .filter((quota) => quota.tipo === "Mensal")
            .reduce((acc, quota) => {
                if (!acc[quota.socio_id]) {
                    acc[quota.socio_id] = { nome: quota.socio.nome, quotas: [] };
                }
                acc[quota.socio_id].quotas.push(quota);
                return acc;
            }, {});
    };

    const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",];

    // Função para obter quotas mensais por sócio
    const getQuotasMensaisPorSocio = () => {
        const sociosQuotas = GroupBySocio(
            quotas.filter((quota) =>
                quota.periodo.toLowerCase().includes(selectedMensalYear.toString())
            )
        );

        return Object.keys(sociosQuotas).map((socioId) => {
            const socioData = sociosQuotas[socioId];
            const row = {
                nome: socioData.nome,
            };

            meses.forEach((mes) => {
                const quotaDoMes = socioData.quotas.find((quota) =>
                    quota.periodo.toLowerCase().includes(mes.toLowerCase())
                );
                row[mes] = quotaDoMes
                    ? { estado: quotaDoMes.estado, pago: quotaDoMes.estado.toLowerCase() === "pago" }
                    : { estado: "Sem quota", pago: false };
            });

            return row;
        });
    };

    const quotasMensaisData = getQuotasMensaisPorSocio();

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

    useEffect(() => {
        const fetchQuotas = async () => {
            try {
                const response = await axios.get(`/quotas`);
                setQuotas(response.data.quotas);
            } catch (error) {
                console.error("Erro ao procurar quotas:", error);
            }
        };

        fetchQuotas();
    }, []);

    // Filtra as quotas por ano selecionado
    useEffect(() => {
        const quotasFiltradas = quotas.filter((quota) => quota.periodo.startsWith(selectedYear.toString()));
        setFilteredQuotas(quotasFiltradas);
    }, [quotas, selectedYear]);

    useEffect(() => {
        if (activeTab === "estado" && socios.length > 0) {
            const estados = ["Activo", "Desistiu", "Faleceu", "Expulso", "Suspenso"];
            const counts = estados.map((estado) =>
                socios.filter((socio) => socio.estado === estado).length
            );

            setChartOptions({
                chart: { type: "bar" },
                title: { text: "Quantidade de Sócios por Estado" },
                xAxis: { categories: estados, title: { text: null } },
                yAxis: {
                    min: 0,
                    labels: { overflow: "justify" },
                },
                tooltip: {
                    pointFormat: "<b>{point.y} sócios</b>",
                },
                series: [{ name: "Sócios", data: counts }],
            });
        } else if (activeTab === "quotas" && quotas.length > 0) {
            const quotasEstados = ["Pago", "Não Pago"];
            const counts = quotasEstados.map((estado) =>
                quotas.filter((quota) => quota.estado === estado).length
            );

            let totalPago = 0;
            let totalNaoPago = 0;

            // Calcula os totais somando os valores das quotas de acordo com o estado
            quotas.forEach((quota) => {
                if (quota.estado === "Pago") {
                    totalPago += parseFloat(quota.valor);
                } else if (quota.estado === "Não Pago") {
                    totalNaoPago += parseFloat(quota.valor);
                }
            });

            setChartOptions({
                chart: { type: "pie" },
                title: { text: "Estado de Quotas" },
                tooltip: {
                    pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b> ({point.y} quotas)<br>" +
                        "Total Pago: {point.totalPago} €<br>" +
                        "Total Não Pago: {point.totalNaoPago} €",
                },
                accessibility: {
                    point: {
                        valueSuffix: "%",
                    },
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: "pointer",
                        dataLabels: {
                            enabled: true,
                            format: "<b>{point.name}</b>: {point.percentage:.1f} %",
                        },
                    },
                },
                series: [
                    {
                        name: "Quotas",
                        colorByPoint: true,
                        data: quotasEstados.map((estado, index) => ({
                            name: estado,
                            y: quotas.filter((quota) => quota.estado === estado).length,
                            totalPago: totalPago.toFixed(2),
                            totalNaoPago: totalNaoPago.toFixed(2),
                        })),
                    },
                ],
            });
        }
        else if (activeTab === "top10" && quotas.length > 0) {

            const quotasNaoPagas = quotas.filter((quota) => quota.estado === "Não Pago");

            const totaisPorSocio = quotasNaoPagas.reduce((acc, quota) => {
                if (!acc[quota.socio_id]) {
                    acc[quota.socio_id] = { nome: quota.socio.nome, totalNaoPago: 0 };
                }
                acc[quota.socio_id].totalNaoPago += parseFloat(quota.valor);
                return acc;
            }, {});

            const sociosDevedores = Object.values(totaisPorSocio)
                .sort((a, b) => b.totalNaoPago - a.totalNaoPago)
                .slice(0, 10);

            const labels = sociosDevedores.map((socio) => socio.nome);
            const data = sociosDevedores.map((socio) => socio.totalNaoPago);

            setChartOptions({
                chart: {
                    type: "bar",
                },
                title: {
                    text: "Top 10 Sócios - Quotas Não Pagas",
                },
                xAxis: {
                    categories: labels,
                    title: {
                        text: "Sócios",
                    },
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: "Valor Total (€)",
                        align: "high",
                    },
                    labels: {
                        overflow: "justify",
                    },
                },
                tooltip: {
                    pointFormat: "{series.name}: {point.y}€</b>",
                },
                series: [
                    {
                        name: "Total Não Pago",
                        data: data,
                    },
                ],
            });
        }
    }, [activeTab, socios, quotas]);

    return (
        <Container className="analises-container">
            <Card className="my-1 mt-2 mb-2 custom-card">
                <Card.Body>
                    <Card.Title>Análises</Card.Title>
                    <Card.Text>
                        Confira algumas estatísticas relativas à sua entidade
                    </Card.Text>
                </Card.Body>
            </Card>
            <Tabs
                activeKey={activeTab}
                onSelect={(k) => setActiveTab(k)}
                className="mb-2"
            >
                <Tab eventKey="estado" title="Sócios Por Estado">
                    {socios.length > 0 && (
                        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
                    )}
                </Tab>
                <Tab eventKey="quotas" title="Estado das Quotas">
                    {quotas.length > 0 && (
                        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
                    )}
                </Tab>
                <Tab eventKey="top10" title="Top 10 Socios Devedores">
                    {quotas.length > 0 && (
                        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
                    )}
                </Tab>
                <Tab eventKey="anual" title="Quotas Anuais">
                    <div className="mb-3 d-flex justify-content-between align-items-center">
                        {/* Seletor de Ano */}
                        <Form.Select
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(Number(e.target.value))}
                            style={{ maxWidth: "200px" }}
                        >
                            {[...Array(7)].map((_, index) => {
                                const year = new Date().getFullYear() + 1 - index;
                                return (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                );
                            })}
                        </Form.Select>
                        <button
                            className="btn btn-primary"
                            onClick={() => exportTableToPDF("quotas-anuais-table", "Quotas Anuais")}
                        >
                            Exportar para PDF
                        </button>
                    </div>
                    {filteredQuotas.length > 0 ? (
                        <>
                            <Table striped bordered hover id="quotas-anuais-table">
                                <thead>
                                    <tr>
                                        <th>Nome do Sócio</th>
                                        <th>Descrição</th>
                                        <th>Valor</th>
                                        <th>Estado</th>
                                        <th>Período</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredQuotas
                                        .filter((quota) => quota.tipo === "Anual")
                                        .map((quota) => (
                                            <tr key={quota.id}>
                                                <td>{quota.socio.nome}</td>
                                                <td>{quota.descricao}</td>
                                                <td>{quota.valor} €</td>
                                                <td>
                                                    {quota.estado === "Pago" ? (
                                                        <FaCheckCircle className="text-success me-1" />
                                                    ) : (
                                                        <FaTimes className="text-danger me-1" />
                                                    )}
                                                    <span>{quota.estado}</span>
                                                </td>
                                                <td>{quota.periodo}</td>
                                            </tr>
                                        ))}
                                </tbody>
                            </Table>
                        </>
                    ) : (
                        <Alert variant="info">Não há dados relativos ao ano selecionado.</Alert>
                    )}
                </Tab>

                <Tab eventKey="mensais" title="Quotas Mensais">
                    <div className="mb-3 d-flex justify-content-between align-items-center">
                        <Form.Select
                            value={selectedMensalYear}
                            onChange={(e) => setSelectedMensalYear(Number(e.target.value))}
                            style={{ maxWidth: "200px" }}
                        >
                            <option key={new Date().getFullYear() + 1} value={new Date().getFullYear() + 1}>
                                {new Date().getFullYear() + 1}
                            </option>
                            {[...Array(6)].map((_, index) => {
                                const year = new Date().getFullYear() - index;
                                return (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                );
                            })}
                        </Form.Select>
                        <button
                            className="btn btn-primary"
                            onClick={() => exportTableToPDF("quotas-mensais-table", "Quotas Mensais")}
                        >
                            Exportar para PDF
                        </button>
                    </div>

                    {quotasMensaisData.length > 0 ? (
                        <>
                            <Table striped bordered hover id="quotas-mensais-table">
                                <thead>
                                    <tr>
                                        <th>Sócio</th>
                                        {meses.map((mes) => (
                                            <th key={mes}>{mes}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {quotasMensaisData
                                        .map((row, index) => (
                                            <tr key={index}>
                                                <td>{row.nome}</td>
                                                {meses.map((mes) => (
                                                    <td key={mes} className="text-center">
                                                        {row[mes].estado === "Sem quota" ? (
                                                            <span>N/A</span>
                                                        ) : row[mes].pago ? (
                                                            <>
                                                                <FaCheckCircle color="green" /> Pago
                                                            </>
                                                        ) : (
                                                            <>
                                                                <FaTimes color="red" /> Não Pago
                                                            </>
                                                        )}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                </tbody>
                            </Table>
                        </>
                    ) : (
                        <Alert variant="info">
                            Não há dados relativos ao ano selecionado.
                        </Alert>
                    )}
                </Tab>
            </Tabs>
        </Container>
    );
};

export default Analises;
