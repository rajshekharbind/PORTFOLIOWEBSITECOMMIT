import React from "react";
import "./Footer.css";
import { FaLinkedin, FaGithub, FaTwitter, FaWhatsapp, FaYoutube, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer-container1">
      <div className="footer-content1">
        <h2 className="footer-title1">Connect with Me</h2>
        <hr className="footer-underline" />
        <p className="footer-text1">Let's build something amazing together.</p>
        
        {/* Social Icons */}
        <div className="social-icons1">
          <a href="https://www.linkedin.com/in/raj-shekhar-92012a298/" target="_blank" rel="noopener noreferrer" className="icon linkedin">
            <FaLinkedin />
          </a>
          <a href="https://github.com/rajshekharbind" target="_blank" rel="noopener noreferrer" className="icon github">
            <FaGithub />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="icon twitter">
            <FaTwitter />
          </a>
          <a href="https://wa.me/yourwhatsappphonenumber" target="_blank" rel="noopener noreferrer" className="icon whatsapp">
            <FaWhatsapp />
          </a>
          <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="icon youtube">
            <FaYoutube />
          </a>
          <a href="https://www.instagram.com/raju.rajsekhar123/" target="_blank" rel="noopener noreferrer" className="icon instagram">
            <FaInstagram />
          </a>
        </div>

        {/* Footer Copyright */}
        <p className="footer-copyright">© {new Date().getFullYear()} Your Name. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
