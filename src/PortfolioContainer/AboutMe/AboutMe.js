import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './AboutMe.css';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const AboutMe = () => {
  const [activeSection, setActiveSection] = useState('');
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const sectionRef = useRef(null);
  const profileRef = useRef(null);
  const contentRef = useRef(null);
  const buttonsRef = useRef([]);
  const skillItemsRef = useRef([]);

  // Initialize ref arrays
  useEffect(() => {
    buttonsRef.current = [];
    skillItemsRef.current = [];
  }, []);

  // Preload image and handle loading states
  useEffect(() => {
    const img = new Image();
    img.src = '/images/raj1.png';
    img.loading = 'eager'; // Force eager loading
    
    img.onload = () => {
      setImageLoaded(true);
      setImageError(false);
    };
    
    img.onerror = () => {
      setImageLoaded(false);
      setImageError(true);
    };
  }, []);

  // GSAP Animations with null checks
  useEffect(() => {
    if (!sectionRef.current) return;

    const elements = {
      section: sectionRef.current,
      profile: profileRef.current,
      content: contentRef.current,
      buttons: buttonsRef.current.filter(Boolean),
      skillItems: skillItemsRef.current.filter(Boolean)
    };

    const ctx = gsap.context(() => {
      // Section entrance animation
      if (elements.section) {
        gsap.fromTo(elements.section,
          {
            opacity: 0,
            y: 50
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: elements.section,
              start: "top 80%",
              end: "bottom top",
              toggleActions: "play none none reverse",
              markers: false
            }
          }
        );
      }

      // Profile animation - always animate the container
      if (elements.profile) {
        gsap.fromTo(elements.profile,
          {
            scale: 0,
            rotation: -180,
            opacity: 0
          },
          {
            scale: 1,
            rotation: 0,
            opacity: 1,
            duration: 1.2,
            ease: "back.out(1.7)",
            delay: 0.3
          }
        );
      }

      // Button animations
      if (elements.buttons.length > 0) {
        gsap.fromTo(elements.buttons,
          {
            opacity: 0,
            y: 30
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "back.out(1.5)",
            delay: 0.5
          }
        );
      }

      // Content animation
      if (elements.content) {
        gsap.fromTo(elements.content,
          {
            opacity: 0,
            x: -50
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power2.out",
            delay: 0.7
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Animate skill items when skills section is active
  useEffect(() => {
    if (activeSection === 'skills') {
      const validSkillItems = skillItemsRef.current.filter(Boolean);
      if (validSkillItems.length > 0) {
        gsap.fromTo(validSkillItems,
          {
            opacity: 0,
            scale: 0.8,
            x: -50
          },
          {
            opacity: 1,
            scale: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.05,
            ease: "back.out(1.4)"
          }
        );
      }
    }
  }, [activeSection]);

  const handleSectionChange = (section) => {
    if (section === activeSection) return;
    
    if (contentRef.current) {
      gsap.to(contentRef.current, {
        opacity: 0,
        x: 50,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          setActiveSection(section);
          setTimeout(() => {
            if (contentRef.current) {
              gsap.fromTo(contentRef.current,
                {
                  opacity: 0,
                  x: -50
                },
                {
                  opacity: 1,
                  x: 0,
                  duration: 0.5,
                  ease: "back.out(1.4)"
                }
              );
            }
          }, 50);
        }
      });
    } else {
      setActiveSection(section);
    }
  };

  const handleSkillHover = (e, isHovering) => {
    if (!e.currentTarget) return;
    
    const skillItem = e.currentTarget;
    gsap.to(skillItem, {
      scale: isHovering ? 1.05 : 1,
      y: isHovering ? -2 : 0,
      duration: 0.2,
      ease: "power2.out"
    });
  };

  // Ref assignment functions
  const addButtonRef = (el, index) => {
    if (el) {
      buttonsRef.current[index] = el;
    }
  };

  const addSkillRef = (el, index) => {
    if (el) {
      skillItemsRef.current[index] = el;
    }
  };

  const skillsData = [
    { name: 'HTML', level: 90, icon: '🔧' },
    { name: 'CSS', level: 85, icon: '🎨' },
    { name: 'JavaScript', level: 80, icon: '⚡' },
    { name: 'React.js', level: 75, icon: '⚛️' },
    { name: 'Node.js', level: 70, icon: '🚀' },
    { name: 'MongoDB', level: 65, icon: '🍃' },
    { name: 'Python', level: 75, icon: '🐍' },
    { name: 'C++', level: 70, icon: '⚙️' },
    { name: 'DSA', level: 80, icon: '🧠' },
    { name: 'Problem Solving', level: 85, icon: '💡' },
    { name: 'Operating Systems', level: 70, icon: '💻' },
    { name: 'Git', level: 75, icon: '📚' }
  ];

  const educationData = [
    { degree: 'High School (10th)', institution: 'SMT Shanti Devi Inter College Kankpur Abholi ,(Bhadohi) Uttar Pradesh ', year: '2020', score: '87%' },
    { degree: 'Intermediate (12th)', institution: 'SMT Shanti Devi Inter College Kankpur Abholi ,(Bhadohi) Uttar Pradesh', year: '2022', score: '79%' },
    { degree: 'Bachelor of Technology', institution: 'Indian Institute Of information technology Bhagalpur ,Bihar (Computer Science Engineering) ', year: '2nd Year', score: 'CGPA: 7.5' }
  ];

  const contactData = [
    { type: 'Mobile', value: '+91 9170879955', link: 'tel:+919170879955', icon: '📱' },
    { type: 'Email', value: 'raju.rajsekhar123@gmail.com', link: 'mailto:raju.rajsekhar123@gmail.com', icon: '✉️' },
    { type: 'WhatsApp', value: 'Chat on WhatsApp', link: 'https://wa.me/9170879955', icon: '💬' },
    { type: 'LinkedIn', value: 'My LinkedIn Profile', link: 'https://www.linkedin.com/in/raj-shekhar-92012a298/', icon: '💼' },
    { type: 'GitHub', value: 'My GitHub Profile', link: 'https://github.com/rajshekharbind', icon: '🐙' }
  ];

  const renderDetails = () => {
    switch (activeSection) {
      case 'skills':
        return (
          <div className="styled-box skills-box">
            <h2 className="section-title">Technical Skills</h2>
            <div className="skills-grid">
              {skillsData.map((skill, index) => (
                <div
                  key={skill.name}
                  ref={el => addSkillRef(el, index)}
                  className="skill-card"
                  onMouseEnter={(e) => handleSkillHover(e, true)}
                  onMouseLeave={(e) => handleSkillHover(e, false)}
                >
                  <div className="skill-header">
                    <span className="skill-icon">{skill.icon}</span>
                    <h3 className="skill-name">{skill.name}</h3>
                  </div>
                  <div className="skill-level">
                    <div className="level-bar">
                      <div 
                        className="level-progress" 
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                    <span className="level-percentage">{skill.level}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'education':
        return (
          <div className="styled-box education-box">
            <h2 className="section-title">Education Journey</h2>
            <div className="education-timeline">
              {educationData.map((edu, index) => (
                <div key={index} className="education-item">
                  <div className="edu-icon">🎓</div>
                  <div className="edu-content">
                    <h3 className="edu-degree">{edu.degree}</h3>
                    <p className="edu-institution">{edu.institution}</p>
                    <div className="edu-meta">
                      <span className="edu-year">{edu.year}</span>
                      <span className="edu-score">{edu.score}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="current-focus">
              <h4>Currently Focusing On:</h4>
              <p>Advanced Web Development, Competitive Programming, and DevOps Technology enthusiast. Currently started a new experience as <strong>Lead at DevC</strong>, where I guide and collaborate with developers on impactful projects. Gained strong hands-on experience working on multiple <strong>college projects</strong> and contributing to <strong>open-source initiatives</strong> organized within the college. Actively worked as a <strong>Project Maintainer</strong>, mentoring peers and ensuring high-quality contributions. Passionate about building scalable web applications, solving real-world problems through code, and continuously exploring innovative technologies in the Web3 and AI domains.</p>
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="styled-box contact-box">
            <h2 className="section-title">Get In Touch</h2>
            <div className="contact-grid">
              {contactData.map((contact, index) => (
                <a
                  key={contact.type}
                  href={contact.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-card"
                >
                  <div className="contact-icon">{contact.icon}</div>
                  <div className="contact-info">
                    <h3 className="contact-type">{contact.type}</h3>
                    <p className="contact-value">{contact.value}</p>
                  </div>
                  <div className="contact-arrow">→</div>
                </a>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div className="styled-box welcome-box">
            <h2 className="welcome-title">Welcome to My World! 🌟</h2>
            <div className="welcome-content">
              <p className="welcome-text">
                I'm passionate about creating digital experiences that make a difference. 
                Explore my skills, education journey, and get in touch to collaborate on 
                exciting projects!
              </p>
              <div className="welcome-features">
                <div className="feature">
                  <span className="feature-icon">💻</span>
                  <span>Full-Stack Development</span>
                </div>
                <div className="feature">
                  <span className="feature-icon">🎯</span>
                  <span>Problem Solving</span>
                </div>
                <div className="feature">
                  <span className="feature-icon">🚀</span>
                  <span>Innovation Driven</span>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <section className="about-me" id="about" ref={sectionRef}>
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-container">
          {/* Profile Section */}
          <div className="profile-section">
            <div className="profile-wrapper">
              <div className="profile-image-container" ref={profileRef}>
                {/* Show image only if loaded successfully */}
                {!imageError ? (
                  <img 
                    src="../ProjectSection/raj1.png" 
                    alt="Rajshekhar - Full Stack Developer"
                    className="profile-image"
                    loading="eager"
                    decoding="sync"
                    onLoad={() => setImageLoaded(true)}
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="profile-fallback">
                    <span className="fallback-text">RS</span>
                  </div>
                )}
                <div className="profile-glow"></div>
              </div>
              <div className="signature-container">
                <h2 className="signature">Rajshekhar</h2>
                <p className="title">Full Stack Developer</p>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="content-section" ref={contentRef}>
            <div className="intro-content">
              <h1 className="main-title">
                <span className="title-gradient">About Me</span>
              </h1>
              <h2 className="subtitle">Aspiring Software Engineer & Innovator</h2>
              
              <div className="description-grid">
                <p className="intro-text">
                  I am a passionate 2nd-year Computer Science Engineering student at 
                  <strong> Indian Institute of Information Technology, Bhagalpur</strong>, 
                  dedicated to crafting exceptional digital experiences.
                </p>
                
                <p className="intro-text">
                  Specializing in <strong>MERN Stack development</strong>, I build 
                  intuitive front-end designs and scalable back-end solutions that 
                  solve real-world problems efficiently.
                </p>

                <p className="intro-text">
                  Beyond web development, I explore <strong>DevOps</strong>, 
                  <strong> competitive programming</strong>, and <strong>UI/UX design</strong> 
                  with Figma, constantly pushing the boundaries of innovation.
                </p>

                <div className="tech-stack">
                  <span className="tech-tag">React.js</span>
                  <span className="tech-tag">Node.js</span>
                  <span className="tech-tag">MongoDB</span>
                  <span className="tech-tag">JavaScript</span>
                  <span className="tech-tag">Python</span>
                  <span className="tech-tag">Blockchain</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation & Content Display */}
      <div className="interactive-section">
        <div className="navigation-links">
          {['skills', 'education', 'contact'].map((section, index) => (
            <button
              key={section}
              ref={el => addButtonRef(el, index)}
              className={`nav-button ${activeSection === section ? 'active' : ''}`}
              onClick={() => handleSectionChange(section)}
            >
              <span className="button-icon">
                {section === 'skills' && '💻'}
                {section === 'education' && '🎓'}
                {section === 'contact' && '📞'}
              </span>
              <span className="button-text">
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </span>
              <div className="button-glow"></div>
            </button>
          ))}
        </div>

        <div className="content-display">
          {renderDetails()}
        </div>
      </div>
    </section>
  );
};

export default AboutMe;