import React from "react";
import "./Skills.css";

const skills = [
  {
    category: "Frontend",
    items: [
      { name: "React Js", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Redux", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" },
      { name: "Next Js", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
      { name: "Figma", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
      { name: "HTML", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
      { name: "CSS", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
      { name: "JavaScript", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
      { name: "Bootstrap", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" },
      { name: "Material UI", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg" },
      { name: "Tailwind CSS", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg" },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "Node Js", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "Express Js", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
      { name: "GraphQL", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg" },
      { name: "Python", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "MySQL", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
      { name: "GitHub", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
      { name: "MongoDB", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
      { name: "Git", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
      { name: "Postman", img: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/postman.svg" },
    ],
  },
  {
    category: "Programming",
    items: [
      { name: "C Programming", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" },
      { name: "C++", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
      { name: "Python", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "DSA", img: "https://img.icons8.com/external-flat-icons-inmotus-design/67/external-data-structure-data-science-flat-icons-inmotus-design.png" },
      { name: "Competitive Programming", img: "https://img.icons8.com/external-flaticons-flat-flat-icons/64/external-coding-computer-programming-flaticons-flat-flat-icons.png" },
      { name: "Cloudinary", img: "https://res.cloudinary.com/cloudinary/image/upload/v1595534561/cloudinary_logo_for_white_bg.svg" },
      { name: "Git", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
      { name: "GitHub", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
      { name: "Postman API", img: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/postman.svg" }
    ]
  }
];

const Skills = () => {
  return (
    <div className="skills-container" id="skills">
      <div className="skills-header">
        <h2 className="skills-title">My Skills</h2>
        <p className="skills-subtitle">Technologies & tools I work with</p>
        <div className="skills-divider"></div>
      </div>
      
      <div className="skills-grid">
        {skills.map((section, index) => (
          <div key={index} className="skills-section">
            <div className="section-header">
              <h3 className="skills-category">{section.category}</h3>
              <div className="category-underline"></div>
            </div>
            <div className="skills-items">
              {section.items.map((skill, i) => (
                <div key={i} className="skill-card">
                  <div className="skill-icon">
                    <img 
                      src={skill.img} 
                      alt={skill.name} 
                      className="skill-image"
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = `data:image/svg+xml;base64,${btoa(`
                          <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50">
                            <rect width="50" height="50" fill="#21262d" rx="10"/>
                            <text x="25" y="30" text-anchor="middle" fill="#00c8ff" font-family="Arial" font-size="12">
                              ${skill.name.charAt(0)}
                            </text>
                          </svg>
                        `)}`;
                      }}
                    />
                  </div>
                  <p className="skill-name">{skill.name}</p>
                  <div className="skill-hover-effect"></div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;