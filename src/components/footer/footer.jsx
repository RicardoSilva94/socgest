import React, { useState } from 'react';
import './footer.css';
import { IoMdMail, IoMdCall } from 'react-icons/io';
import emailjs from 'emailjs-com';

export default function Footer() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Configurar e enviar o e-mail com EmailJS
    emailjs.send('service_i89ghpt', 'template_fobr9yx', {
      from_name: name,
      from_email: email,
      message,
    }, 'AEn47PtQIehuW4Rd4')
    .then((result) => {
      setSubmissionStatus('Mensagem enviada com sucesso!');
      setName('');
      setEmail('');
      setMessage('');
    }, (error) => {
      setSubmissionStatus('Ocorreu um erro. Tente novamente.');
    });
  };

  return (
    <footer className="footer" id="contactos">
      <div className="footer-section">
        <h4>Contactos</h4>
        <div className="contact-info">
          <div className="contact-item">
            <IoMdMail className="contact-icon" />
            <p>socgest.socios@gmail.com</p>
          </div>
          <div className="contact-item">
            <IoMdCall className="contact-icon" />
            <p>+351 917 736 696</p>
          </div>
        </div>
      </div>
      <div className="footer-section">
        <h4>Envie-nos uma Mensagem</h4>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nome:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Mensagem:</label>
            <textarea
              id="message"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
          </div>
          <button type="submit" className="submit-button">Enviar</button>
          {submissionStatus && <p className="submission-status">{submissionStatus}</p>}
        </form>
      </div>
      <div className="footer-section">
        <h4>Navegação</h4>
        <nav className="footer-nav">
          <ul>
            <li><a href="#home" onClick={() => window.scrollTo(0, 0)}>Home</a></li>
            <li><a href="/socios">Sócios</a></li>
            <li><a href="/quotas">Quotas</a></li>
            <li><a href="#about">Quem Somos</a></li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
