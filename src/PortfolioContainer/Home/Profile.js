import React, { useEffect, useRef } from 'react';
import { Typewriter } from 'react-simple-typewriter';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import "./Profile.css";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Profile = () => {
  const profileContainerRef = useRef(null);
  const profileParentRef = useRef(null);
  const profileDetailsRef = useRef(null);
  const profilePictureRef = useRef(null);
  const profileBackgroundRef = useRef(null);
  const nameRef = useRef(null);
  const roleRef = useRef(null);
  const taglineRef = useRef(null);
  const buttonsRef = useRef([]);
  const socialIconsRef = useRef([]);
  const particlesRef = useRef([]);

  // Use state for dynamic elements
  const [particles] = React.useState(() => Array(15).fill(0).map(() => React.createRef()));
  const [isInitialized, setIsInitialized] = React.useState(false);

  useEffect(() => {
    if (isInitialized) return;
    
    // Safe GSAP animations with error handling
    const initAnimations = () => {
      try {
        const tl = gsap.timeline();
        
        // Profile container entrance
        if (profileContainerRef.current) {
          tl.fromTo(profileContainerRef.current, 
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
          );
        }

        // Name animation
        if (nameRef.current) {
          tl.fromTo(nameRef.current,
            { 
              opacity: 0,
              y: -30
            },
            { 
              opacity: 1, 
              y: 0,
              duration: 1, 
              ease: "back.out(1.7)" 
            },
            "-=0.5"
          );
        }

        // Role animation
        if (roleRef.current) {
          tl.fromTo(roleRef.current,
            { 
              scale: 0.8, 
              opacity: 0
            },
            { 
              scale: 1, 
              opacity: 1,
              duration: 1, 
              ease: "elastic.out(1, 0.5)" 
            },
            "-=0.8"
          );
        }

        // Tagline animation
        if (taglineRef.current) {
          tl.fromTo(taglineRef.current,
            { 
              y: 30, 
              opacity: 0
            },
            { 
              y: 0, 
              opacity: 1,
              duration: 0.8, 
              ease: "power2.out" 
            },
            "-=0.5"
          );
        }

        // Buttons animation
        const validButtons = buttonsRef.current.filter(Boolean);
        if (validButtons.length > 0) {
          tl.fromTo(validButtons,
            { 
              scale: 0, 
              opacity: 0
            },
            { 
              scale: 1, 
              opacity: 1,
              duration: 0.6, 
              stagger: 0.2,
              ease: "back.out(1.7)" 
            },
            "-=0.3"
          );
        }

        // Profile picture animation
        if (profilePictureRef.current) {
          tl.fromTo(profilePictureRef.current,
            { 
              scale: 0, 
              opacity: 0
            },
            { 
              scale: 1, 
              opacity: 1,
              duration: 1.5, 
              ease: "elastic.out(1, 0.5)" 
            },
            "-=0.8"
          );
        }

        // Social icons animation
        const validSocialIcons = socialIconsRef.current.filter(Boolean);
        if (validSocialIcons.length > 0) {
          tl.fromTo(validSocialIcons,
            { 
              scale: 0, 
              opacity: 0
            },
            { 
              scale: 1, 
              opacity: 1,
              duration: 0.8, 
              stagger: 0.15,
              ease: "back.out(1.7)" 
            },
            "-=0.5"
          );
        }

        // ScrollTrigger animation
        if (profileParentRef.current) {
          gsap.fromTo(profileParentRef.current,
            {
              y: 50
            },
            {
              y: 0,
              duration: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: profileContainerRef.current,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse",
                markers: false
              }
            }
          );
        }

        // Continuous floating animation for profile picture
        if (profilePictureRef.current) {
          gsap.to(profilePictureRef.current, {
            y: -20,
            duration: 3,
            ease: "power1.inOut",
            repeat: -1,
            yoyo: true
          });
        }

        // Setup scroll fire effects
        setupScrollFireEffects();

        // Particle animations
        animateParticles();

        setIsInitialized(true);

      } catch (error) {
        console.warn('Animation error:', error);
      }
    };

    initAnimations();

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isInitialized]);

  const setupScrollFireEffects = () => {
    let lastScrollY = window.scrollY;
    let scrollTimeout;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDirection = currentScrollY < lastScrollY ? 'up' : 'down';
      
      // Only trigger on scroll up and when profile section is in view
      if (scrollDirection === 'up' && isProfileInViewport()) {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          triggerScrollFireExplosion();
        }, 50);
      }
      
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  };

  const isProfileInViewport = () => {
    if (!profileContainerRef.current) return false;
    const rect = profileContainerRef.current.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };

  const triggerScrollFireExplosion = () => {
    if (!profilePictureRef.current) return;

    const tl = gsap.timeline();
    
    // Activate corner fires with explosive effect
    tl.to(".corner-fire", {
      duration: 0.2,
      scale: 3,
      opacity: 1,
      filter: "blur(15px)",
      stagger: 0.1,
      ease: "power2.out"
    });

    // Create additional fire particles around corners
    createScrollFireParticles();

    // Shake effect for the entire profile picture
    tl.to(profilePictureRef.current, {
      duration: 0.1,
      x: 10,
      y: -10,
      ease: "power2.out"
    }, "-=0.2");

    tl.to(profilePictureRef.current, {
      duration: 0.1,
      x: -10,
      y: 10,
      ease: "power2.out"
    });

    tl.to(profilePictureRef.current, {
      duration: 0.1,
      x: 0,
      y: 0,
      ease: "power2.out"
    });

    // Scale up the profile picture briefly
    tl.to(profilePictureRef.current, {
      duration: 0.3,
      scale: 1.1,
      boxShadow: "0 0 50px rgba(255, 69, 0, 0.8)",
      ease: "back.out(1.7)"
    });

    // Return to normal state
    tl.to(profilePictureRef.current, {
      duration: 0.5,
      scale: 1,
      boxShadow: "0 20px 40px rgba(255, 126, 95, 0.3)",
      ease: "power2.out"
    });

    // Hide corner fires gradually
    tl.to(".corner-fire", {
      duration: 0.8,
      scale: 0,
      opacity: 0,
      filter: "blur(5px)",
      stagger: 0.1,
      ease: "power2.in"
    }, "-=0.3");
  };

  const createScrollFireParticles = () => {
    const corners = [
      { x: 0, y: 0 }, // top-left
      { x: 100, y: 0 }, // top-right
      { x: 0, y: 100 }, // bottom-left
      { x: 100, y: 100 } // bottom-right
    ];

    corners.forEach((corner) => {
      for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.className = 'scroll-fire-particle';
        particle.style.cssText = `
          position: absolute;
          width: 15px;
          height: 15px;
          background: radial-gradient(circle, #ff4500, #ff8c00, #ffd700);
          border-radius: 50%;
          pointer-events: none;
          z-index: 1000;
          left: ${corner.x}%;
          top: ${corner.y}%;
          opacity: 0;
          filter: blur(3px);
        `;
        
        if (profileContainerRef.current) {
          profileContainerRef.current.appendChild(particle);
        }
        
        const angle = (i / 8) * Math.PI * 2;
        const distance = 100 + Math.random() * 100;
        const targetX = Math.cos(angle) * distance;
        const targetY = Math.sin(angle) * distance;
        
        gsap.to(particle, {
          x: targetX,
          y: targetY,
          opacity: 1,
          scale: 1.5,
          duration: 0.8,
          ease: "power2.out",
          onComplete: () => {
            gsap.to(particle, {
              opacity: 0,
              scale: 0,
              duration: 0.4,
              onComplete: () => {
                if (particle.parentNode) {
                  particle.parentNode.removeChild(particle);
                }
              }
            });
          }
        });
      }
    });
  };

  const animateParticles = () => {
    particles.forEach((particle, index) => {
      if (particle.current) {
        gsap.to(particle.current, {
          x: gsap.utils.random(-100, 100),
          y: gsap.utils.random(-100, 100),
          duration: gsap.utils.random(3, 6),
          ease: "power1.inOut",
          repeat: -1,
          yoyo: true,
          delay: index * 0.2
        });
      }
    });
  };

  const handleButtonHover = (index) => {
    const button = buttonsRef.current[index];
    if (!button) return;
    
    gsap.to(button, {
      duration: 0.3,
      scale: 1.1,
      y: -5,
      boxShadow: "0 10px 25px rgba(255, 152, 0, 0.4)",
      ease: "power2.out"
    });
  };

  const handleButtonLeave = (index) => {
    const button = buttonsRef.current[index];
    if (!button) return;
    
    gsap.to(button, {
      duration: 0.3,
      scale: 1,
      y: 0,
      boxShadow: "0 5px 15px rgba(255, 152, 0, 0.3)",
      ease: "power2.out"
    });
  };

  const handleSocialHover = (index) => {
    const socialIcon = socialIconsRef.current[index];
    if (!socialIcon) return;
    
    gsap.to(socialIcon, {
      duration: 0.4,
      scale: 1.3,
      y: -10,
      boxShadow: "0 8px 20px rgba(255, 126, 95, 0.6)",
      ease: "back.out(1.7)"
    });
  };

  const handleSocialLeave = (index) => {
    const socialIcon = socialIconsRef.current[index];
    if (!socialIcon) return;
    
    gsap.to(socialIcon, {
      duration: 0.4,
      scale: 1,
      y: 0,
      boxShadow: "0 5px 10px rgba(255, 126, 95, 0.4)",
      ease: "power2.out"
    });
  };

  const handleProfilePictureHover = () => {
    if (!profilePictureRef.current) return;
    
    const tl = gsap.timeline();
    
    // Scale on hover
    tl.to(profilePictureRef.current, {
      duration: 0.5,
      scale: 1.1,
      boxShadow: "0 20px 40px rgba(255, 152, 0, 0.6)",
      ease: "power2.out"
    });

    // Fire burst animation from corners
    tl.to(".corner-fire", {
      duration: 0.3,
      scale: 1,
      opacity: 1,
      stagger: 0.1,
      ease: "power2.out"
    }, "-=0.3");
  };

  const handleProfilePictureLeave = () => {
    if (!profilePictureRef.current) return;
    
    const tl = gsap.timeline();
    
    // Reset scale
    tl.to(profilePictureRef.current, {
      duration: 0.5,
      scale: 1,
      boxShadow: "0 10px 20px rgba(255, 152, 0, 0.3)",
      ease: "power2.out"
    });

    // Hide corner fires
    tl.to(".corner-fire", {
      duration: 0.2,
      scale: 0,
      opacity: 0,
      stagger: 0.05,
      ease: "power2.in"
    });
  };

  const addButtonToRefs = (el) => {
    if (el && !buttonsRef.current.includes(el)) {
      buttonsRef.current.push(el);
    }
  };

  const addSocialToRefs = (el) => {
    if (el && !socialIconsRef.current.includes(el)) {
      socialIconsRef.current.push(el);
    }
  };

  const socialLinks = [
    { 
      href: "https://www.linkedin.com/in/raj-shekhar-92012a298/", 
      icon: "fa fa-linkedin", 
      name: "LinkedIn" 
    },
    { 
      href: "https://github.com/rajshekharbind", 
      icon: "fa fa-github", 
      name: "GitHub" 
    },
    { 
      href: "https://www.instagram.com/raju.rajsekhar123/", 
      icon: "fa fa-instagram", 
      name: "Instagram" 
    },
    { 
      href: "#", 
      icon: "fa fa-youtube", 
      name: "YouTube" 
    },
    { 
      href: "#", 
      icon: "fa fa-twitter", 
      name: "Twitter" 
    }
  ];

  return (
    <div className='profile-container' ref={profileContainerRef} id="home">
      {/* Animated Background Particles */}
      <div className="profile-particles">
        {particles.map((particleRef, index) => (
          <div 
            key={index}
            className="particle"
            ref={particleRef}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          ></div>
        ))}
      </div>

      <div className='profile-parent' ref={profileParentRef}>
        <div className='profile-details' ref={profileDetailsRef}>
          <div className='profile-details-name'>
            <span className='primary-text' ref={nameRef}>
              {" "}
              Hello, I'M <span className='highlighted-text'>RajShekhar</span>
            </span>
          </div>
          
          <div className='profile-details-role' ref={roleRef}>
            <span className='primary-text'>
              {" "}
              <h1 className="typewriter-container">
                <Typewriter 
                  words={[
                    "Raj Dev ",
                    "Full Stack Developer",
                    "MERN Stack Dev",
                    "Cross Platform Dev",
                    "React/React Native Dev",
                  ]}
                  loop={Infinity}
                  cursor
                  cursorStyle="_"
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={1000}
                />
              </h1>
              <span className="profile-role-tagline" ref={taglineRef}>
                Knack for building applications with front-end and back-end operations.  
                <br />
                Passionate B.Tech student skilled in full-stack development<br />
                and competitive programming. Enthusiastic about web technologies,<br />
                problem-solving, and creating impactful digital experiences..
              </span>
            </span>
          </div>
          
          <div className='profile-option'>
            <button 
              className='btn primary-btn'
              ref={addButtonToRefs}
              onMouseEnter={() => handleButtonHover(0)}
              onMouseLeave={() => handleButtonLeave(0)}
            > 
              {" "}
              Hire Me{" "}
            </button>
            <a href="/myresume.pdf" download='myresume.pdf'>
              <button 
                className='btn highlighted-btn'
                ref={addButtonToRefs}
                onMouseEnter={() => handleButtonHover(1)}
                onMouseLeave={() => handleButtonLeave(1)}
              >
               Get Resume
              </button>
            </a>
          </div>
        </div>
        
        <div className="profile-picture-container">
          <div 
            className="profile-picture" 
            ref={profilePictureRef}
            onMouseEnter={handleProfilePictureHover}
            onMouseLeave={handleProfilePictureLeave}
          >
            {/* Corner Fire Effects */}
            <div className="corner-fire top-left"></div>
            <div className="corner-fire top-right"></div>
            <div className="corner-fire bottom-left"></div>
            <div className="corner-fire bottom-right"></div>
            
            <div className="profile-picture-background" ref={profileBackgroundRef}>
              {/* 3D Frame */}
              <div className="profile-frame"></div>
            </div>
          </div>

          {/* Social Icons - Fixed positioning */}
          <div className="social-icons-container">
            <div className='social-container'> 
              {socialLinks.map((social, index) => (
                <a 
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  ref={addSocialToRefs}
                  onMouseEnter={() => handleSocialHover(index)}
                  onMouseLeave={() => handleSocialLeave(index)}
                  aria-label={social.name}
                >
                  <i className={social.icon}></i>
                </a>
              ))}
            </div> 
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator">
        <div className="scroll-arrow"></div>
      </div>
    </div>
  );
};

export default Profile;