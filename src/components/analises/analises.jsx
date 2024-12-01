import React, { useState, useEffect } from "react";
import axios from "../../api/axios";
import { useUser } from "../../context/UserContext";
import { Container, Card, Tab, Tabs } from "react-bootstrap";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import "./analises.css";

const Analises = () => {
    const [socios, setSocios] = useState([]);
    const [quotas, setQuotas] = useState([]);
    const [chartOptions, setChartOptions] = useState({});
    const [activeTab, setActiveTab] = useState("estado");

    const { user } = useUser();

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
                    title: { text: "Quotas", align: "high" },
                    labels: { overflow: "justify" },
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

            </Tabs>
        </Container>
    );
};

export default Analises;
