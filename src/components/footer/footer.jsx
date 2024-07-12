import React from 'react';
import './footer.css';
import { IoMdMail, IoMdCall } from 'react-icons/io';
import { handleScrollToTop } from '../header/header';

export default function Footer() {
  return (
    <footer className="footer" id="contactos">
      <div className="footer-section">
        <h4>Contactos</h4>
        <div className="contact-info">
          <div className="contact-item">
            <IoMdMail className="contact-icon" />
            <p>socGest@gmail.com</p>
          </div>
          <div className="contact-item">
            <IoMdCall className="contact-icon" />
            <p>+351 917 736 696</p>
          </div>
        </div>
      </div>
      <div className="footer-section">
        <h4>Envie-nos uma Mensagem</h4>
        <form className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Nome:</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="message">Mensagem:</label>
            <textarea id="message" name="message" required></textarea>
          </div>
          <button type="submit" className="submit-button">Enviar</button>
        </form>
      </div>
      <div className="footer-section">
        <h4>Navegação</h4>
        <nav className="footer-nav">
          <ul>
            <li><a href="#home"onClick={handleScrollToTop}>Home</a></li>
            <li><a href="/socios">Sócios</a></li>
            <li><a href="/quotas">Quotas</a></li>
            <li><a href="#about">Quem Somos</a></li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}

