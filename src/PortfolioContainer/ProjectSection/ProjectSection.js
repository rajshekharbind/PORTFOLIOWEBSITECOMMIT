import React, { useState } from 'react';
import './ProjectSection.css';

const projects = [
  { id: 1, category: 'Project', image: 'https://www.foodiv.com/wp-content/uploads/2023/06/online-ordering-business.jpg', link: 'https://example.com/app1' },
  { id: 2, category: 'Certificate', image: 'https://images.besttemplates.com/wp-content/uploads/2024/06/Certificate828129-scaled.jpg', link: 'https://example.com/product1' },
  { id: 3, category: 'Qualification', image: '/images/projects/branding1.jpg', link: 'https://example.com/branding1' },
  { id: 4, category: 'Project', image: 'https://blog.pwskills.com/wp-content/uploads/2023/05/Untitled-1-3.png', link: 'https://example.com/app2' },
  { id: 5, category: 'Certificate', image: 'https://media.istockphoto.com/id/1836865227/photo/strategic-planning-and-meticulous-analysis-in-the-stock-market.jpg?s=1024x1024&w=is&k=20&c=4D6olOzpNHB8q3eqMjhJr0fNAKqnjkLzUYMsifjK370=', link: 'https://example.com/product2' },
  { id: 6, category: 'Qualification', image: 'https://t4.ftcdn.net/jpg/08/64/56/03/360_F_864560351_I8Ye9Klp1DTkiDqeq0DvkxUYu9IQnPIG.jpg', link: 'https://example.com/branding2' },
  { id: 7, category: 'Project', image: 'https://thumbs.dreamstime.com/b/circle-network-connection-35158562.jpg', link: 'https://example.com/app3' },
  { id: 8, category: 'Certificate', image: '', link: 'https://example.com/product3' },
  { id: 9, category: 'Qualification', image: '/images/projects/branding3.jpg', link: 'https://example.com/branding3' }
];

const categories = ['All', 'Project', 'Certificate', 'Qualification'];

const ProjectSection = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(project => project.category === activeCategory);
 
  return (
    <div className="project-section">
      <h2>***Our Projects***</h2>
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

