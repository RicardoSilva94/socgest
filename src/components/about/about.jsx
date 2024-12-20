import React from 'react';
import './about.css';

export default function About() {
  return (
    <section id="about" className="about-section">
      <div className="about-content">
        <h2>Quem Somos</h2>
        <p>
          Este projeto foi desenvolvido no âmbito do curso de Técnico de Especialista em Tecnologias e Programação de Sistemas de Informação, como projeto final de curso.
          O objetivo é apresentar uma solução simples, intuitiva e eficaz para a gestão de sócios e respetivas quotas de uma associação, coletividades, clube, etc. O destaque desta aplicação é 
          a possibilidade de enviar notificações aos sócios para pagamento de quotas em atraso. Para aprender a utilizar a nossa solução, clique no botão de "Começar a utilizar" no topo da página e veja o video.
        </p>
      </div>
    </section>
  );
}
