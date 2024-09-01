import React, { useState } from 'react';
import './footer.css';
import { IoMdMail, IoMdCall } from 'react-icons/io';
import emailjs from 'emailjs-com';
import ReCAPTCHA from 'react-google-recaptcha';

export default function Footer() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState('');
  const [errors, setErrors] = useState({});
  const [captchaToken, setCaptchaToken] = useState('');


  const validate = () => {
    const newErrors = {};
    if (!name) {
      newErrors.name = 'Nome é obrigatório!';
    } else if (name.length < 3) {
      newErrors.name = 'Nome deve ter pelo menos 3 caracteres!';
    }

    if (!email) {
      newErrors.email = 'Email é obrigatório!';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email inválido';
    }

    if (!message) {
      newErrors.message = 'Mensagem é obrigatória!';
    } else if (message.length < 10) {
      newErrors.message = 'Mensagem deve ter pelo menos 10 caracteres!';
    }

    if (!captchaToken) {
      newErrors.captcha = 'Por favor, verifique que você não é um robô.';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formErrors = validate();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    // Enviar dados para o EmailJS junto com o token do reCAPTCHA
    emailjs.send('service_i89ghpt', 'template_fobr9yx', {
      from_name: name,
      from_email: email,
      message,
      'g-recaptcha-response': captchaToken, // Enviar o token do reCAPTCHA
    }, 'AEn47PtQIehuW4Rd4')
      .then((result) => {
        setSubmissionStatus('Mensagem enviada com sucesso!');
        setName('');
        setEmail('');
        setMessage('');
        setErrors({});
        setCaptchaToken(''); // Limpa o token do captcha após envio
      }, (error) => {
        setSubmissionStatus('Ocorreu um erro. Tente novamente.');
      });
  };

  const onCaptchaChange = (token) => {
    setCaptchaToken(token);
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
        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="name">Nome:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <p className="error-message">{errors.name}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="message">Mensagem:</label>
            <textarea
              id="message"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            {errors.message && <p className="error-message">{errors.message}</p>}
          </div>
          <div className="form-group">
            <ReCAPTCHA
              sitekey="6LfwKC8qAAAAAJBx8fCJKLvvvBNk4_2Syntg_1Vt"
              onChange={onCaptchaChange}
            />
            {errors.captcha && <p className="error-message">{errors.captcha}</p>}
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
