import React, { useState } from 'react';
import './ContactMe.css';

const ContactMe = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleWhatsAppSend = () => {
    if (!phoneNumber || !message) {
      setSuccessMessage('Please fill in all fields for WhatsApp.');
      clearNotification();
      return;
    }
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
    setSuccessMessage('Message sent successfully via WhatsApp!');
    clearForm();
    clearNotification();
  };

  const handleEmailSend = () => {
    if (!email || !message) {
      setSuccessMessage('Please fill in all fields for Email.');
      clearNotification();
      return;
    }
    const mailtoURL = `mailto:${email}?subject=Contact%20Message&body=${encodeURIComponent(message)}`;
    window.open(mailtoURL, '_blank');
    setSuccessMessage('Message sent successfully via Email!');
    clearForm();
    clearNotification();
  };

  const clearForm = () => {
    setPhoneNumber('');
    setMessage('');
    setEmail('');
  };

  const clearNotification = () => {
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000); // Notification disappears after 3 seconds
  };

  return (
    <div className="contact-me" id="contact">
      <h2>***Contact Me***</h2>
      <form>
        <label>Mobile Number:</label>
        <input
          type="tel"
          placeholder="Enter your mobile number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />

        <label>Message:</label>
        <textarea
          placeholder="Enter your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>

        <label>Email:</label>
        <input
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="contact-buttons">
          <button type="button" onClick={handleWhatsAppSend}>
            Send via WhatsApp
          </button>
          <button type="button" onClick={handleEmailSend}>
            Send via Email
          </button>
        </div>
      </form>
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
};

export default ContactMe;



