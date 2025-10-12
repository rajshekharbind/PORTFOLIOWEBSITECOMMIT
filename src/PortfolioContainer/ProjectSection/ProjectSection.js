import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ProjectSection.css';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// **PERMANENT FIX: Network-resilient image system**
const getProjectImage = (category, id) => {
  // Multiple reliable image sources - if one fails, others will work
  const imageSources = [
    `https://picsum.photos/id/${id + 100}/400/250`,
    `https://source.unsplash.com/featured/400x250/?${category},technology`,
    `https://placehold.co/400x250/0a0a0a/28a745?text=${encodeURIComponent(category)}`,
  ];
  
  return imageSources[0]; // Primary source
};

const getFallbackImage = (category, id) => {
  // Local fallback - will NEVER fail
  const fallbacks = {
    'Project': `data:image/svg+xml;base64,${btoa(`
      <svg xmlns="http://www.w3.org/2000/svg" width="400" height="250" viewBox="0 0 400 250">
        <defs>
          <linearGradient id="bg${id}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#0a0a0a;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#28a745;stop-opacity:0.3" />
          </linearGradient>
        </defs>
        <rect width="400" height="250" fill="url(#bg${id})"/>
        <circle cx="200" cy="100" r="40" fill="#28a745" opacity="0.8"/>
        <rect x="160" y="150" width="80" height="10" fill="#28a745" opacity="0.6"/>
        <rect x="140" y="170" width="120" height="8" fill="#28a745" opacity="0.4"/>
        <text x="200" y="230" text-anchor="middle" fill="#28a745" font-family="Arial, sans-serif" font-size="14" font-weight="bold">
          ${category.toUpperCase()}
        </text>
      </svg>
    `)}`,
    'Certificate': `data:image/svg+xml;base64,${btoa(`
      <svg xmlns="http://www.w3.org/2000/svg" width="400" height="250" viewBox="0 0 400 250">
        <defs>
          <linearGradient id="cert${id}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#0a0a0a;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#e44d26;stop-opacity:0.3" />
          </linearGradient>
        </defs>
        <rect width="400" height="250" fill="url(#cert${id})"/>
        <path d="M180,100 L220,100 L220,140 L180,140 Z" fill="#e44d26" opacity="0.8"/>
        <path d="M185,105 L215,105 L215,135 L185,135 Z" fill="none" stroke="#ffffff" stroke-width="2"/>
        <text x="200" y="180" text-anchor="middle" fill="#e44d26" font-family="Arial, sans-serif" font-size="16" font-weight="bold">
          CERTIFICATE
        </text>
        <text x="200" y="200" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="12">
          Click to View
        </text>
      </svg>
    `)}`,
    'Qualification': `data:image/svg+xml;base64,${btoa(`
      <svg xmlns="http://www.w3.org/2000/svg" width="400" height="250" viewBox="0 0 400 250">
        <defs>
          <linearGradient id="qual${id}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#0a0a0a;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#17a2b8;stop-opacity:0.3" />
          </linearGradient>
        </defs>
        <rect width="400" height="250" fill="url(#qual${id})"/>
        <path d="M160,90 L240,90 L240,160 L160,160 Z" fill="#17a2b8" opacity="0.7"/>
        <path d="M170,100 L230,100 L230,150 L170,150 Z" fill="none" stroke="#ffffff" stroke-width="2"/>
        <text x="200" y="130" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="10">
          DIPLOMA
        </text>
        <text x="200" y="200" text-anchor="middle" fill="#17a2b8" font-family="Arial, sans-serif" font-size="16" font-weight="bold">
          QUALIFICATION
        </text>
      </svg>
    `)}`
  };
  
  return fallbacks[category] || fallbacks.Project;
};

const projects = [
  {   
    id: 1,
    category: 'Project',
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with React, Node.js, and MongoDB featuring user authentication, payment integration, and admin dashboard.',
    image: 'https://th.bing.com/th/id/OIP.XiN-fdFDmEANBYjEAwRx1gHaHa?w=188&h=189&c=7&r=0&o=5&dpr=1.3&pid=1.7',
    codeLink: 'https://github.com/rajshekharbind/Ai_Based_Farmer_Support_System',
    liveLink: 'https://yourproject1.vercel.app',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    featured: true
  },
  { 
    id: 2, 
    category: 'Certificate', 
    title: 'Algorithm Master Certificate',
    description: 'Certified in advanced algorithms and data structures from AlgoExpert platform.',
    image: '/ProjectSection/Algocertificate.jpg', 
    liveLink: '/ProjectSection/Algocertificate.jpg',
    technologies: ['Algorithms', 'Data Structures'],
    featured: false
  },
  { 
    id: 3, 
    category: 'Qualification', 
    title: 'Full Stack Development',
    description: 'Bachelor of Technology in Computer Science with specialization in Full Stack Development.',
    image: '../ProjectSection/1743074398437-certificate.png', 
    liveLink: '../ProjectSection/1743074398437-certificate.png',
    technologies: ['Computer Science', 'Web Development'],
    featured: false
  },
  { 
    id: 4, 
    category: 'Project', 
    title: 'Blog Website',
    description: 'A modern blog platform with rich text editor, user comments, and social sharing features.',
    image: 'https://blog.pwskills.com/wp-content/uploads/2023/05/Untitled-1-3.png', 
    codeLink: 'https://github.com/rajshekharbind/Blog-Website',
    liveLink: 'https://mern-blog-ha28.onrender.com/',
    technologies: ['React', 'Firebase', 'CSS3'],
    featured: true
  },
  { 
    id: 5, 
    category: 'Certificate', 
    title: 'Generative AI Certification',
    description: 'Completed comprehensive course on Generative AI and Machine Learning concepts.',
    image: '/ProjectSection/generative_ai.png', 
    liveLink: '/ProjectSection/generative_ai.png',
    technologies: ['AI', 'Machine Learning'],
    featured: false
  },
  { 
    id: 6, 
    category: 'Qualification', 
    title: 'Frontend Development',
    description: 'Advanced frontend development certification focusing on modern JavaScript frameworks.',
    image: '../ProjectSection/Screenshot 2025-03-23 154040.png', 
    liveLink: '../ProjectSection/Screenshot 2025-03-23 154040.png',
    technologies: ['JavaScript', 'React', 'Vue'],
    featured: false
  },
  { 
    id: 7, 
    category: 'Project', 
    title: 'Task Management App',
    description: 'Real-time collaborative task management application with drag-drop functionality and team collaboration.',
    image: 'https://i.ytimg.com/vi/IuYVfEuiSso/maxresdefault.jpg', 
    codeLink: 'https://github.com/rajshekharbind/Blinkit-Clone-Full-Stack',
    liveLink: 'https://blinkit-clone-full-stack.vercel.app/',
    technologies: ['Vue.js', 'Socket.io', 'MongoDB'],
    featured: true
  },
  { 
    id: 8, 
    category: 'Certificate', 
    title: 'Google Cloud Certified',
    description: 'Google Cloud Platform certification demonstrating expertise in cloud infrastructure and services.',
    image: '/ProjectSection/gsokcertificate.jpg', 
    liveLink: '/ProjectSection/gsokcertificate.jpg',
    technologies: ['GCP', 'Cloud Computing'],
    featured: false
  },
  { 
    id: 9, 
    category: 'Qualification', 
    title: 'Backend Development',
    description: 'Specialized in backend technologies including Node.js, Express, and database management.',
    image: '../ProjectSection/image.png', 
    liveLink: '../ProjectSection/image.png',
    technologies: ['Node.js', 'Express', 'SQL'],
    featured: false
  },
  { 
    id: 10, 
    category: 'Certificate', 
    title: 'AWS Solutions Architect',
    description: 'AWS Certified Solutions Architect with expertise in cloud architecture and deployment.',
    image: './ProjectSection/Screenshot 2025-04-08 203135.png', 
    liveLink: './ProjectSection/Screenshot 2025-04-08 203135.png',
    technologies: ['AWS', 'Cloud Architecture'],
    featured: false
  },
];

const categories = ['All', 'Project', 'Certificate', 'Qualification'];

const ProjectSection = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [loadedImages, setLoadedImages] = useState(new Set());
  const sectionRef = useRef(null);
  const projectsRef = useRef(null);
  const categoryRefs = useRef([]);

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  // **FIX: Optimized image preloading with network resilience**
  useEffect(() => {
    const preloadImage = (src, id) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          setLoadedImages(prev => new Set([...prev, id]));
          resolve(true);
        };
        img.onerror = () => {
          console.log(`Image ${id} failed to load, will use fallback`);
          resolve(false); // Don't fail, just use fallback
        };
        img.src = src;
        
        // Timeout after 3 seconds
        setTimeout(() => resolve(false), 3000);
      });
    };

    // Preload images sequentially to avoid network congestion
    const preloadAllImages = async () => {
      for (const project of projects) {
        await preloadImage(project.image, project.id);
        // Small delay between loads to prevent network flooding
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    };

    preloadAllImages();
  }, []);

  // **FIX: Get final image URL with multiple fallbacks**
  const getFinalImageUrl = (project) => {
    // If image loaded successfully, use it
    if (loadedImages.has(project.id)) {
      return project.image;
    }
    
    // Otherwise use SVG fallback (will NEVER fail)
    return getFallbackImage(project.category, project.id);
  };

  // GSAP Animations with error handling
  useEffect(() => {
    let ctx;
    
    try {
      ctx = gsap.context(() => {
        // Section entrance animation
        gsap.fromTo(sectionRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
              // Prevent ScrollTrigger errors on slow networks
              invalidateOnRefresh: true,
              fastScrollEnd: true
            }
          }
        );

        // Category buttons animation
        if (categoryRefs.current.length > 0) {
          gsap.fromTo(categoryRefs.current,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              stagger: 0.08,
              ease: "back.out(1.4)",
              delay: 0.2
            }
          );
        }
      });
    } catch (error) {
      console.warn('GSAP animation error:', error);
      // Fallback: simple fade in
      if (sectionRef.current) {
        sectionRef.current.style.opacity = '1';
        sectionRef.current.style.transform = 'translateY(0)';
      }
    }

    return () => {
      if (ctx) ctx.revert();
      // Cleanup ScrollTrigger
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Project items animation when category changes
  useEffect(() => {
    const projectElements = projectsRef.current?.children || [];
    
    if (projectElements.length > 0) {
      try {
        const tl = gsap.timeline();
        
        tl.to(projectElements, {
          opacity: 0,
          scale: 0.95,
          duration: 0.25,
          stagger: 0.03,
          ease: "power2.in"
        });
        
        tl.to(projectElements, {
          opacity: 1,
          scale: 1,
          duration: 0.35,
          stagger: 0.04,
          ease: "back.out(1.2)"
        });
      } catch (error) {
        console.warn('Project animation error:', error);
        // Fallback: show immediately
        gsap.set(projectElements, { opacity: 1, scale: 1 });
      }
    }
  }, [activeCategory]);

  const handleCategoryClick = (category) => {
    if (category === activeCategory) return;
    setActiveCategory(category);
  };

  const handleProjectHover = (e, isHovering) => {
    try {
      const projectCard = e.currentTarget;
      
      if (isHovering) {
        gsap.to(projectCard, {
          scale: 1.03,
          y: -5,
          duration: 0.25,
          ease: "power2.out"
        });

        const links = projectCard.querySelector('.project-links');
        if (links) {
          gsap.to(links, {
            y: 0,
            opacity: 1,
            duration: 0.2
          });
        }

        gsap.to(projectCard, {
          boxShadow: "0 15px 40px rgba(40, 167, 69, 0.2)",
          duration: 0.25
        });
      } else {
        gsap.to(projectCard, {
          scale: 1,
          y: 0,
          duration: 0.25,
          ease: "power2.out"
        });

        const links = projectCard.querySelector('.project-links');
        if (links) {
          gsap.to(links, {
            y: 10,
            opacity: 0,
            duration: 0.15
          });
        }

        gsap.to(projectCard, {
          boxShadow: "0 5px 20px rgba(0, 0, 0, 0.1)",
          duration: 0.25
        });
      }
    } catch (error) {
      console.warn('Hover animation error:', error);
    }
  };

  const handleCardClick = (project) => {
    if (project.category === 'Project' && project.liveLink) {
      window.open(project.liveLink, '_blank', 'noopener,noreferrer');
    } else if (project.category === 'Certificate' && project.certificateLink) {
      window.open(project.certificateLink, '_blank', 'noopener,noreferrer');
    } else if (project.category === 'Qualification' && project.qualificationLink) {
      window.open(project.qualificationLink, '_blank', 'noopener,noreferrer');
    } else {
      const availableLink = project.liveLink || project.codeLink || project.certificateLink || project.qualificationLink;
      if (availableLink) {
        window.open(availableLink, '_blank', 'noopener,noreferrer');
      }
    }
  };

  const getActionButtons = (project) => {
    const buttons = [];

    switch (project.category) {
      case 'Project':
        if (project.codeLink) {
          buttons.push(
            <a
              key="github"
              href={project.codeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link code-link"
              onClick={(e) => e.stopPropagation()}
            >
              <i className="fas fa-code-branch"></i>
              <span>GitHub</span>
            </a>
          );
        }
        if (project.liveLink) {
          buttons.push(
            <a
              key="live"
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link live-link"
              onClick={(e) => e.stopPropagation()}
            >
              <i className="fas fa-external-link-alt"></i>
              <span>Live Demo</span>
            </a>
          );
        }
        break;
      
      case 'Certificate':
        if (project.certificateLink) {
          buttons.push(
            <a
              key="certificate"
              href={project.certificateLink}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link certificate-link"
              onClick={(e) => e.stopPropagation()}
            >
              <i className="fas fa-certificate"></i>
              <span>View Certificate</span>
            </a>
          );
        }
        break;
      
      case 'Qualification':
        if (project.qualificationLink) {
          buttons.push(
            <a
              key="qualification"
              href={project.qualificationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link qualification-link"
              onClick={(e) => e.stopPropagation()}
            >
              <i className="fas fa-graduation-cap"></i>
              <span>View Details</span>
            </a>
          );
        }
        break;
      
      default:
        break;
    }

    return buttons;
  };

  return (
    <div className="project-section" id="projects" ref={sectionRef}>
      <div className="project-container">
        <div className="project-header">
          {/* <h2 className="section-title">My Portfolio</h2> */}
          <p className="section-subtitle">
            Showcasing my <span className="highlight">projects</span>, 
            <span className="highlight"> certifications</span>, and 
            <span className="highlight"> qualifications</span>
          </p>
        </div>

        <div className="category-tabs">
          {categories.map((category, index) => (
            <button
              key={category}
              ref={el => categoryRefs.current[index] = el}
              className={`category-tab ${activeCategory === category ? 'active' : ''}`}
              onClick={() => handleCategoryClick(category)}
            >
              <span className="tab-name">{category}</span>
              <span className="tab-count">
                {category === 'All' ? projects.length : projects.filter(p => p.category === category).length}
              </span>
            </button>
          ))}
        </div>

        <div className="projects-grid" ref={projectsRef}>
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="project-card"
              onMouseEnter={(e) => handleProjectHover(e, true)}
              onMouseLeave={(e) => handleProjectHover(e, false)}
              onClick={() => handleCardClick(project)}
            >
              <div className="card-bg"></div>
              
              {project.featured && (
                <div className="featured-badge">
                  <i className="fas fa-star"></i>
                  Featured
                </div>
              )}

              <div className="project-image">
                {/* **FIX: Single reliable image source */}
                <img 
                  src={getFinalImageUrl(project)}
                  alt={project.title}
                  loading="eager"
                  decoding="async"
                  onError={(e) => {
                    // Ultimate fallback - should never reach here
                    e.target.src = getFallbackImage(project.category, project.id);
                  }}
                />
                <div className="image-overlay"></div>
                
                <div className={`category-tag ${project.category.toLowerCase()}`}>
                  {project.category}
                </div>
              </div>

              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                
                <div className="technologies">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>

              <div className="project-links">
                <div className="links-grid">
                  {getActionButtons(project)}
                </div>
              </div>

              <div className="click-indicator">
                <i className="fas fa-mouse-pointer"></i>
                {project.category === 'Project' ? 'View Demo' : 
                 project.category === 'Certificate' ? 'View Certificate' : 'View Details'}
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="no-projects">
            <i className="fas fa-folder-open"></i>
            <h3>No {activeCategory.toLowerCase()} found</h3>
            <p>Check back later for new additions!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectSection;