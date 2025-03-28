import React from "react";
import "./Skills.css"; // Import external CSS file

const skills = [
  {
    category: "Frontend",
    items: [
      { name: "React Js", img: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" },
      { name: "Redux", img: "https://redux.js.org/img/redux.svg" },
      { name: "Next Js", img: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg" },
      { name: "Figma", img: "https://img.icons8.com/?size=96&id=W0YEwBDDfTeu&format=png" },
      { name: "HTML", img: "https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg" },
      { name: "CSS", img: "https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg" },
      { name: "JavaScript", img: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png" },
      { name: "Bootstrap", img: "https://upload.wikimedia.org/wikipedia/commons/b/b2/Bootstrap_logo.svg" },
      { name: "Material UI", img: "https://upload.wikimedia.org/wikipedia/commons/1/10/Material_UI_logo.svg" },
      { name: "Tailwind Css", img: "https://img.icons8.com/?size=96&id=x7XMNGh2vdqA&format=png" },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "Node Js", img: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg" },
      { name: "Express Js", img: "https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png" },
      { name: "GraphQL", img: "https://upload.wikimedia.org/wikipedia/commons/1/17/GraphQL_Logo.svg" },
      { name: "Python", img: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg" },
     // { name: "Flask", img: "https://upload.wikimedia.org/wikipedia/commons/3/3c/Flask_logo.svg" },
     // { name: "Django", img: "https://upload.wikimedia.org/wikipedia/commons/7/75/Django_logo.svg" },
      { name: "MySQL", img: "https://upload.wikimedia.org/wikipedia/en/d/dd/MySQL_logo.svg" },
      { name: "Github", img: "https://img.icons8.com/?size=96&id=63777&format=png" },
      { name: "MongoDB", img: "https://img.icons8.com/?size=160&id=8rKdRqZFLurS&format=png" },
       { name: "Git", img: "https://img.icons8.com/?size=96&id=20906&format=png" },
       { name: "Postman Api", img: "https://img.icons8.com/?size=128&id=QEQQKirln6Tf&format=png" },
    ],
  },
];

const Skills = () => {
  return (
    <div className="skills-container">
      <h2 className="skills-title">Skills</h2>
      <p className="skills-description">Here are some of my skills on which I have been working for the past 2 years.</p>
      <div className="skills-grid">
        {skills.map((section, index) => (
          <div key={index} className="skills-section">
            <h3 className="skills-category">{section.category}</h3>
            <div className="skills-items">
              {section.items.map((skill, i) => (
                <div key={i} className="skill-card">
                  <img src={skill.img} alt={skill.name} className="skill-image" />
                  <p className="skill-name">{skill.name}</p>
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