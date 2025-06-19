import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/images/new_logo.jpg';
import './Navbar.css';

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest('.navbar')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navItems = [
    { 
      path: '/', 
      label: 'Home', 
      icon: '🏠', 
      description: 'Discover our premium collection'
    },
    { 
      path: '/aboutus', 
      label: 'About Us', 
      icon: '👥', 
      description: 'Our heritage since 1954'
    },
    { 
      path: '/products', 
      label: 'Products', 
      icon: '🛏️', 
      description: 'Premium silk cotton beds'
    },
    { 
      path: '/custom-bed-creator', 
      label: 'Custom Design', 
      icon: '🎨', 
      description: 'Design your perfect bed'
    }
  ];

  return (
    <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-content">
          {/* Logo Section */}
          <div className="logo-container">
            <Link to="/" className="logo-link" onClick={() => setIsMobileMenuOpen(false)}>
              <div className="logo-wrapper">
                <img 
                  src={logo} 
                  alt="Nagarathinam Logo"
                  className="logo-image"
                />
                <div className="logo-shine"></div>
              </div>
              <div className="company-info">
                <span className="company-name">Nagarathinam</span>
                <span className="company-tagline">Premium Comfort Since 1954</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="desktop-nav">
            <ul className="nav-menu">
              {navItems.map((item) => (
                <li key={item.path} className="nav-item">
                  <Link 
                    to={item.path} 
                    className={`nav-link ${location.pathname === item.path ? 'nav-link-active' : ''}`}
                  >
                    <span className="nav-icon">{item.icon}</span>
                    <span className="nav-text">{item.label}</span>
                    <div className="nav-link-indicator"></div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Desktop CTA & Mobile Menu Toggle */}
          <div className="navbar-actions">
            <Link to="/custom-bed-creator" className="cta-button-compact desktop-only">
              <span className="cta-icon-small">✨</span>
              <span className="cta-text-small">Start Design</span>
            </Link>
            
            {/* Hamburger Menu Toggle */}
            <button 
              className={`mobile-menu-toggle ${isMobileMenuOpen ? 'active' : ''}`}
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="toggle-line"></span>
              <span className="toggle-line"></span>
              <span className="toggle-line"></span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        <div className={`mobile-nav ${isMobileMenuOpen ? 'mobile-nav-open' : ''}`}>
          <div className="mobile-nav-container">
            <div className="mobile-nav-header">
              <div className="mobile-nav-brand">
                <span className="mobile-nav-title">Navigation</span>
                <span className="mobile-nav-subtitle">Choose your destination</span>
              </div>
              <button 
                className="mobile-nav-close"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close mobile menu"
              >
                <span className="close-icon">✕</span>
              </button>
            </div>

            <div className="mobile-nav-content">
              <ul className="mobile-nav-menu">
                {navItems.map((item, index) => (
                  <li key={item.path} className="mobile-nav-item" style={{animationDelay: `${index * 0.1}s`}}>
                    <Link 
                      to={item.path} 
                      className={`mobile-nav-link ${location.pathname === item.path ? 'mobile-nav-link-active' : ''}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <div className="mobile-nav-icon-wrapper">
                        <span className="mobile-nav-icon">{item.icon}</span>
                      </div>
                      <div className="mobile-nav-text-wrapper">
                        <span className="mobile-nav-text">{item.label}</span>
                        <span className="mobile-nav-description">{item.description}</span>
                      </div>
                      <div className="mobile-nav-arrow">
                        {location.pathname === item.path ? (
                          <span className="current-indicator">●</span>
                        ) : (
                          <span className="arrow-icon">→</span>
                        )}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
              
              <div className="mobile-nav-footer">
                <Link 
                  to="/custom-bed-creator" 
                  className="mobile-cta-button"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="cta-icon-container">
                    <span className="mobile-cta-icon">🎨</span>
                    <div className="cta-sparkle">✨</div>
                  </div>
                  <div className="mobile-cta-content">
                    <span className="mobile-cta-title">Start Custom Design</span>
                    <span className="mobile-cta-subtitle">Create your perfect bed experience</span>
                  </div>
                  <span className="mobile-cta-arrow">→</span>
                </Link>
                
                <div className="mobile-nav-contact">
                  <div className="contact-header">
                    <span className="contact-emoji">💬</span>
                    <span className="contact-title">Need Help?</span>
                  </div>
                  <div className="contact-actions">
                    <a href="tel:+1234567890" className="contact-link call">
                      <span className="contact-icon">📞</span>
                      <span>Call Now</span>
                    </a>
                    <a href="mailto:info@nagarathinam.com" className="contact-link email">
                      <span className="contact-icon">✉️</span>
                      <span>Email Us</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div 
            className="mobile-menu-overlay"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;