

import './AboutMe.css';
import Navbar from '../../Navbar/Navbar';

import React, { useState } from 'react';

const AboutMe = () => {
  const [activeSection, setActiveSection] = useState(''); // Track active section

  const handleSkillClick = (skill) => {
    // Handle scroll and active state change
    const element = document.getElementById(skill);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const renderDetails = () => {
    switch (activeSection) {
      case 'skills':
        return (
      
          <div className="styled-box">
            <h2 className='perfect'>Skills</h2>
            <ul className="skills-list">
              <li id="HTML" className="skill-item"  onClick={() => handleSkillClick("HTML")}>HTML<img src="/icons/html.png" alt="" />  </li>
              <li id="CSS" className="skill-item" onClick={() => handleSkillClick("CSS")}>CSS</li>
              <li id="JavaScript" className="skill-item" onClick={() => handleSkillClick("JavaScript")}>JavaScript</li>
              <li id="C" className="skill-item" onClick={() => handleSkillClick("C")}>C Program</li>
              <li id="C++" className="skill-item" onClick={() => handleSkillClick("C++")}>C++</li>
              <li id="Python" className="skill-item" onClick={() => handleSkillClick("Python")}>Python</li>
              <li id="DSA" className="skill-item" onClick={() => handleSkillClick("DSA")}>DSA</li>
              <li id="React" className="skill-item" onClick={() => handleSkillClick("React")}>React.js</li>
              <li id="MongoDB" className="skill-item" onClick={() => handleSkillClick("MongoDB")}>MongoDB</li>
              <li id="NodeJS" className="skill-item" onClick={() => handleSkillClick("NodeJS")}>Node.js</li>
              <li id="ProblemSolving" className="skill-item" onClick={() => handleSkillClick("ProblemSolving")}>Problem-solving</li>
              <li id="OS" className="skill-item" onClick={() => handleSkillClick("OS")}>Operating System</li>
            </ul>
          </div>
        );
      case 'education':
        return (
          <div className="styled-box">
            <h2 className='perfect'>Education</h2>
            <p className='p2'>High School(10th), [SMT Shanti Devi Intercollege], [2020]</p>
            <p>Inter(12th), [SMT Shanti Devi Intercollege], [2022]</p>
            <p>Bachelor of Technology, [IIIT BHAGALPUR], [2nd Year]</p>
            <p>Study in Web Development</p>
          </div>
        );
      case 'contact':
        return (
          <div className="styled-box">
            <h2 className='perfect'>Contact</h2>
            <p>Mobile No: <a href="tel:+91 9170879955">+91 9170879 955</a></p>
            <p>Message: <a href="sms:+91 9170879955">Send SMS</a></p>
            <p>Chat on WhatsApp: <a href="https://wa.me/9170879955" target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a></p>
            <p>Email: <a href="mailto:example@example.com">your.email@example.com</a></p>
            <p>LinkedIn: <a href="https://www.linkedin.com/in/raj-shekhar-92012a298/" target="_blank" rel="noopener noreferrer">Your Profile</a></p>
          </div>
        );
      default:
        return (
          <div className="styled-box">
            <h2 className='p'>Welcome!</h2>
            <p className='pa'>Click on the links to view details about Skills, Education, or Contact.</p>
          </div>
        );
    }
  };

  return (
    <section className="about-me">

<div className="intro">
  {/* Profile Image */}
  <div className="profile-container">
  <img src="../ProjectSection/pictures.jpg" alt="Profile" className="profile-image" />
  <h2 className="signature">Rajshekhar</h2>
</div>


  {/* Text Content */}
  <div className="intro-content">
    <h1>***About Me***</h1>
    <h2>Aspiring Software Engineer</h2>
    <p>I am a 2nd-year Computer Science Engineering student at the Indian Institute of Information Technology, Bhagalpur, Bihar.</p>
    <p>Passionate about full-stack development, I specialize in building intuitive front-end designs and scalable back-end solutions.</p>
    <p>Proficient in <strong>MERN Stack</strong>, I enjoy working with modern web technologies to create impactful and efficient digital experiences.</p>
    <p>Beyond web development, I explore <strong>blockchain technology</strong>, <strong>competitive programming</strong>, and <strong>problem-solving</strong>, constantly refining my skills.</p>
    <p>I thrive on tackling real-world challenges through <strong>innovation, clean code, and efficient algorithms</strong>.</p>
    <p>With a keen interest in UI/UX design, I also explore <strong>Figma</strong> for designing engaging user interfaces.</p>
    <p>Driven by curiosity, I am always eager to learn and stay updated with the latest advancements in technology.</p>
  </div>
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
