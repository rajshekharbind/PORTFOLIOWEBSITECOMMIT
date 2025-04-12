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


import React, { useState } from "react";
import { Link } from "react-scroll";
import "./Navbar.css";
import { RiMenu2Fill } from "react-icons/ri";
import { RiCloseFill } from "react-icons/ri";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h1>My-Portfolio</h1>
      </div>

      <div className="menu-icon" onClick={toggleMenu}>
        {menuOpen ? <RiCloseFill size={28} /> : <RiMenu2Fill size={28} />}
      </div>

      <ul className={`navbar-links ${menuOpen ? "active" : ""}`}>
        <li>
          <Link to="home" smooth duration={800} offset={-70} onClick={closeMenu}>Home</Link>
        </li>
        <li>
          <Link to="about" smooth duration={800} offset={-70} onClick={closeMenu}>About</Link>
        </li>
        <li>
          <Link to="projects" smooth duration={800} offset={-70} onClick={closeMenu}>Projects</Link>
        </li>
        <li>
          <Link to="skills" smooth duration={800} offset={-70} onClick={closeMenu}>Skills</Link>
        </li>
        <li>
          <Link to="contact" smooth duration={800} offset={-70} onClick={closeMenu}>ContactMe</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;




