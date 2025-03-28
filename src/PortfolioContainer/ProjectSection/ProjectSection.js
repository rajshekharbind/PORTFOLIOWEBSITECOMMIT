import React, { useState } from 'react';
import './ProjectSection.css';

const projects = [
  {   id: 1,category: 'Project',image: 'https://th.bing.com/th/id/OIP.XiN-fdFDmEANBYjEAwRx1gHaHa?w=188&h=189&c=7&r=0&o=5&dpr=1.3&pid=1.7',link: 'https://example.com/app1'},
  { id: 2, category: 'Certificate', image: '/ProjectSection/Algocertificate.jpg', link: 'https://example.com/product1' },
  { id: 3, category: 'Qualification', image: '../ProjectSection/1743074398437-certificate.png', link: 'https://example.com/branding1' },
  { id: 4, category: 'Project', image: 'https://blog.pwskills.com/wp-content/uploads/2023/05/Untitled-1-3.png', link: 'https://example.com/app2' },
  { id: 5, category: 'Certificate', image: '/ProjectSection/generative_ai.png', link: 'https://example.com/product2' },
  { id: 6, category: 'Qualification', image: '../ProjectSection/Screenshot 2025-03-23 154040.png', link: 'https://example.com/branding2' },
  { id: 7, category: 'Project', image: 'https://i.ytimg.com/vi/IuYVfEuiSso/maxresdefault.jpg', link: 'https://example.com/app3' },
  { id: 8, category: 'Certificate', image: '/ProjectSection/gsokcertificate.jpg', link: 'https://example.com/product3' },
  { id: 9, category: 'Qualification', image: '../ProjectSection/image.png', link: 'https://example.com/branding3' }
];

const categories = ['All', 'Project', 'Certificate', 'Qualification'];

const ProjectSection = () => {
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
            className={`project-item project-item-${index % 3}`} // for staggered layout
          >
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              <img src={project.image} alt={`${project.category} Project`} />
              <div className="overlay">
                <h3>{project.category} Project</h3>
                <p>Project description here...</p>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectSection;

