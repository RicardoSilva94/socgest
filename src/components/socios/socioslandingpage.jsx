import React, { useEffect, useState } from 'react';
import socios from '../../assets/images/laptopSoc.png';
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
          <p>
            Com o SocGest poderá fazer toda a gestão da informação dos seus associados, no separador <span className="highlight">Gestão de Sócios</span>, 
            bem como a gestão da informação de pagamentos e emissão de quotas, no separador <span className="highlight">Gestão de Quotas</span>.
          </p>
          <a href="/dashboard" className="info-button">Começar a utilizar</a>
        </div>
      </div>
    </div>
  );
}

