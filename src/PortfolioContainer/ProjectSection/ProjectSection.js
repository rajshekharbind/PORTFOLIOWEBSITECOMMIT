import React, { useState } from 'react';
import './ProjectSection.css';

const projects = [
  {   
    id: 1,
    category: 'Project',
    image: 'https://th.bing.com/th/id/OIP.XiN-fdFDmEANBYjEAwRx1gHaHa?w=188&h=189&c=7&r=0&o=5&dpr=1.3&pid=1.7',
    link: 'https://example.com/app1',
    codeLink: 'https://github.com/yourusername/project1',
    liveLink: 'https://yourproject1.vercel.app'
  },
  { 
    id: 2, 
    category: 'Certificate', 
    image: '/ProjectSection/Algocertificate.jpg', 
    link: 'https://example.com/product1',
    codeLink: null,
    liveLink: 'https://certificate-link.com'
  },
  { 
    id: 3, 
    category: 'Qualification', 
    image: '../ProjectSection/1743074398437-certificate.png', 
    link: 'https://example.com/branding1',
    codeLink: null,
    liveLink: null
  },
  { 
    id: 4, 
    category: 'Project', 
    image: 'https://blog.pwskills.com/wp-content/uploads/2023/05/Untitled-1-3.png', 
    link: 'https://example.com/app2',
    codeLink: 'https://github.com/rajshekharbind/Blog-Website.git',
    liveLink: 'https://yourproject2.vercel.app'
  },
  { 
    id: 5, 
    category: 'Certificate', 
    image: '/ProjectSection/generative_ai.png', 
    link: 'https://example.com/product2',
    codeLink: null,
    liveLink: 'https://certificate-link.com'
  },
  { 
    id: 6, 
    category: 'Qualification', 
    image: '../ProjectSection/Screenshot 2025-03-23 154040.png', 
    link: 'https://example.com/branding2',
    codeLink: null,
    liveLink: null
  },
  { 
    id: 7, 
    category: 'Project', 
    image: 'https://i.ytimg.com/vi/IuYVfEuiSso/maxresdefault.jpg', 
    link: 'https://example.com/app3',
    codeLink: 'https://github.com/yourusername/project3',
    liveLink: 'https://yourproject3.vercel.app'
  },
  { 
    id: 8, 
    category: 'Certificate', 
    image: '/ProjectSection/gsokcertificate.jpg', 
    link: 'https://example.com/product3',
    codeLink: null,
    liveLink: 'https://certificate-link.com'
  },
  { 
    id: 9, 
    category: 'Qualification', 
    image: '../ProjectSection/image.png', 
    link: 'https://example.com/branding3',
    codeLink: null,
    liveLink: null
  },
  { 
    id: 10, 
    category: 'Certificate', 
    image: './ProjectSection/Screenshot 2025-04-08 203135.png', 
    link: 'https://example.com/product3',
    codeLink: null,
    liveLink: 'https://certificate-link.com'
  },
];

const categories = ['All', 'Project', 'Certificate', 'Qualification'];

const ProjectSection = () => {
  const handleMouseMove = (e) => {
    const projectItem = e.currentTarget;
    const rect = projectItem.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    //const centerY = rect.height / 2;
    
    const rotateY = (x - centerX) / 10;
    const rotateX = (centerY - y) / 10;

    projectItem.style.setProperty('--rotate-x', `${rotateX}deg`);
    projectItem.style.setProperty('--rotate-y', `${rotateY}deg`);
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.setProperty('--rotate-x', '0deg');
    e.currentTarget.style.setProperty('--rotate-y', '0deg');
  };

  const [activeCategory, setActiveCategory] = useState('All');
  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(project => project.category === activeCategory);

  return (
    <div className="project-section">
      <h2>***Our Achievements***</h2>

      <div className="project-tabs">
        {categories.map(category => (
          <button
            key={category}
            className={`tab-button ${activeCategory === category ? 'active' : ''}`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="project-grid">
        {filteredProjects.map((project, index) => (
          <div
            key={project.id}
            className={`project-item project-item-${index % 3}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              <img src={project.image} alt={`${project.category} Project`} />
              <div className="overlay">
                <h3>{project.category} Project</h3>
                <p>Project description here...</p>
              </div>
            </a>

            {/* === New Links Section Below Card === */}
            <div className="project-links">
              {project.codeLink && (
                <a
                  href={project.codeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="code-btn"
                >
                  Source Code
                </a>
              )}
              {project.liveLink && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="live-btn"
                >
                  Live Demo
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectSection;
