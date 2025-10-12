import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-scroll";
import "./Navbar.css";
import { RiMenu2Fill } from "react-icons/ri";
import { RiCloseFill } from "react-icons/ri";
import gsap from "gsap";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const navbarRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef([]);
  const menuIconRef = useRef(null);

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
      
      // GSAP scroll animation
      if (isScrolled) {
        gsap.to(navbarRef.current, {
          duration: 0.3,
          backgroundColor: "rgba(34, 34, 34, 0.95)",
          backdropFilter: "blur(10px)",
          boxShadow: "0px 8px 25px rgba(0, 0, 0, 0.5)",
          ease: "power2.out"
        });
      } else {
        gsap.to(navbarRef.current, {
          duration: 0.3,
          backgroundColor: "#222",
          backdropFilter: "blur(0px)",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
          ease: "power2.out"
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Initial animation on component mount
  useEffect(() => {
    const tl = gsap.timeline();
    
    // Logo animation
    tl.fromTo(logoRef.current, 
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 1, ease: "elastic.out(1, 0.5)" }
    );

    // Menu items animation
    tl.fromTo(linksRef.current,
      { opacity: 0, y: -30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        stagger: 0.1,
        ease: "back.out(1.5)",
        delay: 0.2
      },
      "-=0.5"
    );

    // Menu icon animation
    tl.fromTo(menuIconRef.current,
      { opacity: 0, rotation: -180 },
      { opacity: 1, rotation: 0, duration: 0.6, ease: "back.out(1.7)" },
      "-=0.3"
    );
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    
    if (!menuOpen) {
      // Opening menu animation
      gsap.to(".navbar-links", {
        duration: 0.6,
        right: "0px",
        transform: "perspective(1000px) rotateY(0deg) scale(1)",
        opacity: 1,
        ease: "back.out(1.5)"
      });
      
      // Stagger animation for menu items
      gsap.fromTo(".navbar-links li",
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          delay: 0.2
        }
      );
    } else {
      closeMenu();
    }
  };

  const closeMenu = () => {
    // Closing menu animation
    gsap.to(".navbar-links", {
      duration: 0.4,
      right: "-100%",
      transform: "perspective(1000px) rotateY(-25deg) scale(0.95)",
      opacity: 0,
      ease: "power2.in",
      onComplete: () => {
        setMenuOpen(false);
      }
    });
  };

  const handleLinkClick = (section) => {
    setActiveSection(section);
    
    // Find the index of the clicked section
    const sections = ["home", "about", "projects", "skills", "contact"];
    const index = sections.indexOf(section);
    
    if (index !== -1) {
      // Click animation for the clicked link
      gsap.to(linksRef.current[index], {
        duration: 0.3,
        scale: 1.2,
        color: "#ff9800",
        ease: "back.out(1.7)",
        yoyo: true,
        repeat: 1
      });
    }
    
    // Close mobile menu after click
    if (window.innerWidth <= 768) {
      closeMenu();
    }
  };

  const handleLinkHover = (index) => {
    if (activeSection !== ["home", "about", "projects", "skills", "contact"][index]) {
      gsap.to(linksRef.current[index], {
        duration: 0.3,
        scale: 1.1,
        color: "#ff9800",
        ease: "power2.out"
      });
    }
  };

  const handleLinkLeave = (index) => {
    const sections = ["home", "about", "projects", "skills", "contact"];
    const currentSection = sections[index];
    
    if (activeSection !== currentSection) {
      gsap.to(linksRef.current[index], {
        duration: 0.3,
        scale: 1,
        color: "#fff",
        ease: "power2.out"
      });
    }
  };

  const handleSetActive = (to) => {
    setActiveSection(to);
  };

  const addToRefs = (el) => {
    if (el && !linksRef.current.includes(el)) {
      linksRef.current.push(el);
    }
  };

  // Section IDs that match the Link 'to' prop
  const navItems = [
    { id: "home", label: "Home" },
    { id: "projects", label: "Projects" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "ContactMe" }
  ];

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`} ref={navbarRef}>
      <div className="navbar-logo" ref={logoRef}>
        <Link 
          to="home" 
          smooth 
          duration={800} 
          offset={-70}
          onClick={() => handleLinkClick("home")}
        >
          <h1>My-Portfolio</h1>
        </Link>
        <div className="logo-glow"></div>
      </div>

      <div className="menu-icon" onClick={toggleMenu} ref={menuIconRef}>
        {menuOpen ? (
          <RiCloseFill size={28} className="menu-icon-svg" />
        ) : (
          <RiMenu2Fill size={28} className="menu-icon-svg" />
        )}
        <div className="menu-icon-glow"></div>
      </div>

      <ul className={`navbar-links ${menuOpen ? "active" : ""}`}>
        {navItems.map((item, index) => (
          <li 
            key={item.id}
            ref={addToRefs}
            onMouseEnter={() => handleLinkHover(index)}
            onMouseLeave={() => handleLinkLeave(index)}
            className={activeSection === item.id ? "active" : ""}
          >
            <Link 
              to={item.id}
              smooth 
              duration={800} 
              offset={-70}
              spy={true}
              activeClass="active-link"
              onSetActive={handleSetActive}
              onClick={() => handleLinkClick(item.id)}
            >
              {item.label}
              <span className="link-underline"></span>
              <span className="link-sparkle">✨</span>
            </Link>
          </li>
        ))}
      </ul>

      {/* Background blur overlay */}
      {menuOpen && (
        <div 
          className="menu-overlay" 
          onClick={closeMenu}
        ></div>
      )}
    </nav>
  );
};

export default Navbar;