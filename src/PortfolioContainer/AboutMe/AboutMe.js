import React, { useState } from 'react';
import './AboutMe.css';

const AboutMe = () => {
  const [activeSection, setActiveSection] = useState(''); // Track active section

  const renderDetails = () => {
    switch (activeSection) {
      case 'skills':
        return (
          <div className="styled-box">
            <h2>Skills</h2>
            <ul>
              <li>HTML,CSS,JAVASCRIPT</li>
              <li>C Program </li>
              <li>C++</li>
              <li>Python</li>
              <li>DSA</li>
              <li>React.js</li>
              <li>MongoDB</li>
              <li>Node.js</li>
              <li>Problem-solving</li>
              <li>Operating System</li>
              
            </ul>
          </div>
        );
      case 'education':
        return (
          <div className="styled-box">
            <h2>Education</h2>
            <p>High School(10th),[SMT Shanti Devi Intercollege],[2020]</p>
            <p>Inter(12th),[SMT Shanti Devi Intercollege],[2022]</p>
            <p>Bachelor of Technology, [IIIT BHAGALPUR], [ 2nd Year]</p>
            <p>Study in web development</p>
          </div>
        );
      case 'contact':
        return (
          <div className="styled-box">
            <h2>Contact</h2>
            <p>Mobile No:<a href="tel:+9170879955">mobile no</a></p>
           <p>Message:<a href="sms:+1234567890">Send SMS</a> </p>
          <p>Chat on WhatsApp:<a href="https://wa.me/1234567890" target="_blank">Chat on WhatsApp</a>
          </p>
            <p>Email: <a href="mailto:example@example.com">your.email@example.com</a></p>
            <p>LinkedIn: <a href="https://www.linkedin.com/in/raj-shekhar-92012a298/" target="_blank" rel="noopener noreferrer">Your Profile</a></p>
          </div>
        );
      default:
        return (
          <div className="styled-box">
            <h2>Welcome!</h2>
            <p>Click on the links to view details about Skills, Education, or Contact.</p>
          </div>
        );
    }
  };

  return (
    <section className="about-me">
      <div className="intro">
        <h1>***About Me***</h1>
        <h2>Aspiring Software Engineer</h2>
        <p>I am a college 2nd year student and a passionate full-stack developer,</p>
        <p> skilled in building intuitive front-end designs</p>
        <p> and scalable back-end solutions to solve real-world challenges.</p>
      </div>
      <div className="navigation-links">
        <button
          className={activeSection === 'skills' ? 'active' : ''}
          onClick={() => setActiveSection('skills')}
        >
          Skills
        </button>
        <button
          className={activeSection === 'education' ? 'active' : ''}
          onClick={() => setActiveSection('education')}
        >
          Education
        </button>
        <button
          className={activeSection === 'contact' ? 'active' : ''}
          onClick={() => setActiveSection('contact')}
        >
          Contact
        </button>
      </div>
      <div className="content-display">{renderDetails()}</div>
    </section>
  );
};

export default AboutMe;


