import React, { useEffect, useState } from 'react';
import socios from '../../assets/images/laptop_soc.png';
import './socioslandingpage.css';

export default function SociosLandingPage() {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true);
    }, []);

    return (
        <div className={`socios-landing-page ${loaded ? 'loaded' : ''}`}>
            <div className="left-content">
                <img src={socios} alt="socios" className="imagem-socios" />
            </div>
            <div className="right-content">
                <div className="text-box">
                    <h1>Gestão de Sócios</h1>
                    <div className="border-box">
                        <h5>Faça toda a gestão da informação dos seus associados, no separador <strong>Gestão de Sócios</strong></h5>
                    </div>
                    <h1>Gestão de Quotas</h1>
                    <div className="border-box">
                        <h5>Faça toda a gestão da informação de pagamentos e quotas, no separador <strong>Gestão de Quotas</strong></h5>
                    </div>
                    <a href="#gestao-de-socios" className="info-button">+Info</a>
                </div>
            </div>
        </div>
    );
}

