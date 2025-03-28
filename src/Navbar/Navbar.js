// import React from 'react'
// import { Link } from 'react-router-dom';

// import './Navbar.css'; 

// const Navbar = () => {

//   return (
//     <nav className="navbar">
//       <div className="navbar-logo">
//         <h1>My-Portfolio</h1>
//       </div>
//       <ul className="navbar-links">
//         <li><a href="/">Home</a></li>
//         <li><a href="/AboutMe">About</a></li>
//         <li><a href="/ProjectSection">Projects</a></li>
//         <li><a href="#services">Skills</a></li>
//         <li><a href="/ContactMe">ContactMe</a></li>
//       </ul>
//     </nav>
//   );
// };
// export default Navbar;


import React from "react";
import { Link } from "react-scroll"; // Import react-scroll for smooth scrolling
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h1>My-Portfolio</h1>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="home" smooth={true} duration={800} offset={-70}>
            Home
          </Link>
        </li>
        <li>
          <Link to="about" smooth={true} duration={800} offset={-70}>
            About
          </Link>
        </li>
        <li>
          <Link to="projects" smooth={true} duration={800} offset={-70}>
            Projects
          </Link>
        </li>
        <li>
          <Link to="skills" smooth={true} duration={800} offset={-70}>
            Skills
          </Link>
        </li>
        <li>
          <Link to="contact" smooth={true} duration={800} offset={-70}>
            ContactMe
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;



