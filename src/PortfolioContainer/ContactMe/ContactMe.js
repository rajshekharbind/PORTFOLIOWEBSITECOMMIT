import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ContactMe.css';

// Register ScrollTrigger safely
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const ContactMe = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const inputRefs = useRef([]);
  const buttonRefs = useRef([]);

  // Initialize ref arrays
  useEffect(() => {
    inputRefs.current = [];
    buttonRefs.current = [];
  }, []);

  // GSAP Animations with comprehensive safe checks
  useEffect(() => {
    // Wait for component to mount completely
    const timer = setTimeout(() => {
      if (!sectionRef.current) {
        console.warn('Section ref not available');
        return;
      }

      const elements = {
        section: sectionRef.current,
        form: formRef.current,
        inputs: inputRefs.current.filter(Boolean),
        buttons: buttonRefs.current.filter(Boolean)
      };

      // Check if we have elements to animate
      if (!elements.section && !elements.form && elements.inputs.length === 0 && elements.buttons.length === 0) {
        console.warn('No elements found for animation');
        return;
      }

      const ctx = gsap.context(() => {
        // Section entrance animation
        if (elements.section) {
          gsap.fromTo(elements.section,
            {
              opacity: 0,
              y: 80
            },
            {
              opacity: 1,
              y: 0,
              duration: 1.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: elements.section,
                start: "top 85%",
                end: "bottom top",
                toggleActions: "play none none reverse",
                markers: false
              }
            }
          );
        }

        // Form animation
        if (elements.form) {
          gsap.fromTo(elements.form,
            {
              opacity: 0,
              scale: 0.8
            },
            {
              opacity: 1,
              scale: 1,
              duration: 1,
              ease: "back.out(1.7)",
              delay: 0.3
            }
          );
        }

        // Input animations
        if (elements.inputs.length > 0) {
          gsap.fromTo(elements.inputs,
            {
              opacity: 0,
              x: -50
            },
            {
              opacity: 1,
              x: 0,
              duration: 0.6,
              stagger: 0.1,
              ease: "power2.out",
              delay: 0.5
            }
          );
        }

        // Button animations
        if (elements.buttons.length > 0) {
          gsap.fromTo(elements.buttons,
            {
              opacity: 0,
              y: 30
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.15,
              ease: "back.out(1.5)",
              delay: 0.8
            }
          );
        }
      }, sectionRef);

      return () => {
        ctx.revert();
      };
    }, 100); // Small delay to ensure DOM is ready

    return () => clearTimeout(timer);
  }, []);

  // Ref assignment functions with validation
  const addInputRef = (el, index) => {
    if (el && el.nodeType === 1) { // Check if it's an element node
      inputRefs.current[index] = el;
    }
  };

  const addButtonRef = (el, index) => {
    if (el && el.nodeType === 1) {
      buttonRefs.current[index] = el;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Safe animation on change
    if (e.target && gsap) {
      gsap.to(e.target, {
        scale: value.trim() ? 1.02 : 1,
        duration: 0.2,
        ease: "power2.out"
      });
    }
  };

  const handleInputFocus = (e) => {
    if (e.target && gsap) {
      gsap.to(e.target, {
        scale: 1.02,
        duration: 0.2,
        ease: "power2.out",
        borderColor: "#4ecdc4"
      });
    }
  };

  const handleInputBlur = (e) => {
    if (e.target && gsap) {
      gsap.to(e.target, {
        scale: 1,
        duration: 0.2,
        ease: "power2.out",
        borderColor: "rgba(255, 255, 255, 0.2)"
      });
    }
  };

  const validateForm = (fields = ['name', 'email', 'message']) => {
    let isValid = true;
    const errors = [];

    fields.forEach(field => {
      if (!formData[field]?.trim()) {
        isValid = false;
        errors.push(field);
        
        // Animate the specific input field
        const fieldIndex = ['name', 'email', 'phone', 'message'].indexOf(field);
        const input = inputRefs.current[fieldIndex];
        if (input && gsap) {
          gsap.to(input, {
            x: 10,
            duration: 0.1,
            yoyo: true,
            repeat: 3,
            ease: "power2.inOut",
            backgroundColor: "rgba(255, 107, 107, 0.1)"
          });
        }
      }
    });

    return { isValid, errors };
  };

  const handleWhatsAppSend = async (e) => {
    e.preventDefault();
    
    const { isValid } = validateForm(['phone', 'message']);
    if (!isValid) {
      showNotification('Please fill in phone number and message for WhatsApp.', 'error');
      return;
    }

    setIsSubmitting(true);
    
    const button = e.currentTarget;
    if (button && gsap) {
      gsap.to(button, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
        onComplete: () => {
          try {
            const namePart = formData.name ? `Hello! I'm ${formData.name}. ` : '';
            const message = `${namePart}${formData.message}`;
            const whatsappURL = `https://wa.me/${formData.phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
            
            window.open(whatsappURL, '_blank', 'noopener,noreferrer');
            showNotification('Opening WhatsApp!', 'success');
          } catch (error) {
            console.error('WhatsApp error:', error);
            showNotification('Failed to open WhatsApp. Please try again.', 'error');
          } finally {
            setIsSubmitting(false);
          }
        }
      });
    } else {
      setIsSubmitting(false);
    }
  };

  const handleEmailSend = async (e) => {
    e.preventDefault();
    
    const { isValid } = validateForm(['email', 'message']);
    if (!isValid) {
      showNotification('Please fill in email and message.', 'error');
      return;
    }

    setIsSubmitting(true);
    
    const button = e.currentTarget;
    if (button && gsap) {
      gsap.to(button, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
        onComplete: () => {
          try {
            const subject = `Message from ${formData.name || 'Portfolio Visitor'}`;
            const body = `Name: ${formData.name || 'Not provided'}\nPhone: ${formData.phone || 'Not provided'}\nEmail: ${formData.email}\n\nMessage: ${formData.message}`;
            const mailtoURL = `mailto:${formData.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            
            // Use window.location for better compatibility
            window.location.href = mailtoURL;
            showNotification('Opening Email Client!', 'success');
          } catch (error) {
            console.error('Email error:', error);
            showNotification('Failed to open email client. Please try again.', 'error');
          } finally {
            setIsSubmitting(false);
          }
        }
      });
    } else {
      setIsSubmitting(false);
    }
  };

  const handleDirectContact = (e) => {
    e.preventDefault();
    
    const { isValid } = validateForm(['name', 'email', 'message']);
    if (!isValid) {
      showNotification('Please fill in all required fields!', 'error');
      return;
    }

    setIsSubmitting(true);
    const button = e.currentTarget;
    
    if (button && gsap) {
      gsap.to(button, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
        onComplete: () => {
          // Simulate form submission with API call
          setTimeout(() => {
            // Here you would typically make an API call to your backend
            console.log('Form data:', formData);
            
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            resetForm();
            setIsSubmitting(false);
          }, 1500);
        }
      });
    } else {
      setIsSubmitting(false);
    }
  };

  const showNotification = (message, type) => {
    setSuccessMessage({ text: message, type });
    
    // Auto hide notification
    const timer = setTimeout(() => {
      setSuccessMessage(null);
    }, 4000);

    return () => clearTimeout(timer);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
  };

  const contactMethods = [
    {
      type: 'whatsapp',
      label: 'WhatsApp',
      onClick: handleWhatsAppSend,
      icon: '💬',
      color: '#25d366'
    },
    {
      type: 'email',
      label: 'Email',
      onClick: handleEmailSend,
      icon: '✉️',
      color: '#0072c6'
    },
    {
      type: 'direct',
      label: 'Send Message',
      onClick: handleDirectContact,
      icon: '🚀',
      color: '#4ecdc4'
    }
  ];

  return (
    <section className="contact-me" id="contact" ref={sectionRef}>
      <div className="contact-container">
        {/* Header Section */}
        <div className="contact-header">
          <h2 className="contact-title">
            <span className="title-gradient">Let's Connect</span>
          </h2>
          <p className="contact-subtitle">
            Ready to bring your ideas to life? Let's create something amazing together!
          </p>
        </div>

        {/* Contact Form */}
        <div className="contact-form-container">
          <form className="contact-form" ref={formRef} onSubmit={(e) => e.preventDefault()}>
            <div className="input-group">
              <div className="input-wrapper">
                <input
                  ref={el => addInputRef(el, 0)}
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  className="form-input"
                  required
                />
                <span className="input-icon">👤</span>
              </div>

              <div className="input-wrapper">
                <input
                  ref={el => addInputRef(el, 1)}
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  className="form-input"
                  required
                />
                <span className="input-icon">📧</span>
              </div>

              <div className="input-wrapper">
                <input
                  ref={el => addInputRef(el, 2)}
                  type="tel"
                  name="phone"
                  placeholder="Mobile Number (Optional)"
                  value={formData.phone}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  className="form-input"
                />
                <span className="input-icon">📱</span>
              </div>

              <div className="input-wrapper textarea-wrapper">
                <textarea
                  ref={el => addInputRef(el, 3)}
                  name="message"
                  placeholder="Your Message... Tell me about your project or just say hello! 🌟"
                  value={formData.message}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  className="form-textarea"
                  rows="5"
                  required
                />
                <span className="input-icon">💭</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="contact-actions">
              {contactMethods.map((method, index) => (
                <button
                  key={method.type}
                  ref={el => addButtonRef(el, index)}
                  type="button"
                  onClick={method.onClick}
                  disabled={isSubmitting && method.type === 'direct'}
                  className={`contact-btn ${method.type}-btn`}
                  style={{ '--btn-color': method.color }}
                  aria-label={method.label}
                >
                  <span className="btn-icon">{method.icon}</span>
                  <span className="btn-text">
                    {isSubmitting && method.type === 'direct' ? 'Sending...' : method.label}
                  </span>
                  <div className="btn-glow"></div>
                  {isSubmitting && method.type === 'direct' && (
                    <div className="btn-spinner" aria-label="Loading"></div>
                  )}
                </button>
              ))}
            </div>
          </form>

          {/* Success Message */}
          {successMessage && (
            <div 
              className={`notification ${successMessage.type}`}
              role="alert"
              aria-live="polite"
            >
              <span className="notification-icon">
                {successMessage.type === 'success' ? '✅' : '⚠️'}
              </span>
              {successMessage.text}
            </div>
          )}
        </div>

        {/* Quick Contact Info */}
        <div className="quick-contact">
          <h3>Prefer direct contact?</h3>
          <div className="contact-links">
            <a 
              href="tel:+919170879955" 
              className="quick-link"
              aria-label="Call +91 9170879955"
            >
              <span className="link-icon">📞</span>
              +91 9170879955
            </a>
            <a 
              href="mailto:raju.rajsekhar123@gmail.com" 
              className="quick-link"
              aria-label="Email raju.rajsekhar123@gmail.com"
            >
              <span className="link-icon">📧</span>
              raju.rajsekhar123@gmail.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactMe;