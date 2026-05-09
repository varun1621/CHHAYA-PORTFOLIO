// CHAAYA Consultancy - Premium Website JavaScript

// Loading Screen
window.addEventListener('load', function() {
    setTimeout(function() {
        const loadingScreen = document.getElementById('loadingScreen');
        loadingScreen.classList.add('hidden');
    }, 1500);
});

// Navigation Bar Scroll Effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', function() {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll Reveal Animation
function revealElements() {
    const reveals = document.querySelectorAll('.fade-in');
    
    reveals.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

// Add fade-in class to elements
document.addEventListener('DOMContentLoaded', function() {
    const elementsToReveal = [
        '.section-header',
        '.about-content',
        '.service-card',
        '.why-us-item',
        '.process-item',
        '.industry-card',
        '.stat-item',
        '.testimonial-card',
        '.contact-item',
        '.footer-section'
    ];
    
    elementsToReveal.forEach(selector => {
        document.querySelectorAll(selector).forEach(element => {
            element.classList.add('fade-in');
        });
    });
    
    // Initial reveal check
    revealElements();
});

// Reveal elements on scroll
window.addEventListener('scroll', revealElements);

// Animated Counter for Statistics
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;
    
    counters.forEach(counter => {
        const animate = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText.replace(/[^0-9]/g, '');
            const increment = target / speed;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(animate, 10);
            } else {
                counter.innerText = target;
                // Add percentage sign if needed
                if (counter.getAttribute('data-target') === '95') {
                    counter.innerText = target + '%';
                }
            }
        };
        
        // Start animation when element is in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animate();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(counter);
    });
}

// Initialize counters when DOM is loaded
document.addEventListener('DOMContentLoaded', animateCounters);

// Contact Form Handling
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const formObject = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });
    
    // Simple form validation
    if (!formObject.name || !formObject.email || !formObject.message) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formObject.email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    // Simulate form submission
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.innerText;
    submitButton.innerText = 'Sending...';
    submitButton.disabled = true;
    
    setTimeout(() => {
        // Reset form
        this.reset();
        submitButton.innerText = originalText;
        submitButton.disabled = false;
        
        // Show success message
        showNotification('Thank you for your message! We will get back to you soon.', 'success');
    }, 2000);
});

// Notification System
function showNotification(message, type = 'info') {
    // Remove any existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'var(--primary-green)' : type === 'error' ? '#e74c3c' : 'var(--soft-gold)'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        z-index: 10000;
        max-width: 300px;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        margin-left: 10px;
    `;
    
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// WhatsApp Button Animation Enhancement
const whatsappFloat = document.getElementById('whatsappFloat');
if (whatsappFloat) {
    // Add pulse animation on hover
    whatsappFloat.addEventListener('mouseenter', function() {
        this.style.animation = 'none';
        setTimeout(() => {
            this.style.animation = 'pulse 1s infinite';
        }, 10);
    });
    
    whatsappFloat.addEventListener('mouseleave', function() {
        this.style.animation = 'pulse 2s infinite';
    });
}

// Testimonial Slider (Manual for now, can be enhanced with auto-slide)
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-card');

function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
        testimonial.style.opacity = i === index ? '1' : '0.7';
        testimonial.style.transform = i === index ? 'scale(1)' : 'scale(0.95)';
    });
}

// Initialize testimonials
if (testimonials.length > 0) {
    showTestimonial(0);
    
    // Add click events for testimonial navigation
    testimonials.forEach((testimonial, index) => {
        testimonial.addEventListener('click', () => {
            currentTestimonial = index;
            showTestimonial(index);
        });
    });
}

// Parallax Effect for Hero Section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    const heroContent = document.querySelector('.hero-content');
    
    if (heroBackground && heroContent) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - scrolled / 600;
    }
});

// Service Cards Hover Effect Enhancement
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Why Choose Us Items Animation
document.querySelectorAll('.why-us-item').forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
    item.style.animation = 'fadeInUp 0.6s ease forwards';
});

// Process Timeline Animation
document.querySelectorAll('.process-item').forEach((item, index) => {
    item.style.animationDelay = `${index * 0.2}s`;
    item.style.animation = 'fadeInUp 0.8s ease forwards';
});

// Industry Cards Staggered Animation
document.querySelectorAll('.industry-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
    card.style.animation = 'fadeInUp 0.6s ease forwards';
});

// Add hover effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mouseenter', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            transform: scale(0);
            animation: ripple 0.6s linear;
            left: ${x}px;
            top: ${y}px;
            width: 20px;
            height: 20px;
            margin-left: -10px;
            margin-top: -10px;
        `;
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Performance optimization - Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(function() {
    revealElements();
}, 100));

// Add keyboard navigation for accessibility
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Close mobile menu if open
        if (navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});

// Add focus states for better accessibility
document.querySelectorAll('.btn, .nav-link, .social-link').forEach(element => {
    element.addEventListener('focus', function() {
        this.style.outline = '2px solid var(--soft-gold)';
        this.style.outlineOffset = '2px';
    });
    
    element.addEventListener('blur', function() {
        this.style.outline = 'none';
    });
});

// Page visibility API to pause animations when tab is not visible
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Pause animations when page is not visible
        document.querySelectorAll('.loading-spinner, .whatsapp-float').forEach(element => {
            element.style.animationPlayState = 'paused';
        });
    } else {
        // Resume animations when page is visible
        document.querySelectorAll('.loading-spinner, .whatsapp-float').forEach(element => {
            element.style.animationPlayState = 'running';
        });
    }
});

// Premium Section Title Scroll Reveal
const observeSectionTitles = () => {
    const sectionTitles = document.querySelectorAll('.section-title');
    
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Reset animations
                entry.target.style.animation = 'none';
                entry.target.style.setProperty('--underline-animation', 'none');
                entry.target.offsetHeight; // Trigger reflow
                
                // Apply reveal animation with delay
                setTimeout(() => {
                    entry.target.style.animation = 'sectionTitleReveal 1s cubic-bezier(0.4, 0, 0.2, 1) both';
                }, 200);
                
                // Apply underline animation with delay
                setTimeout(() => {
                    entry.target.style.setProperty('--underline-animation', 'underlineExpand 1.2s cubic-bezier(0.4, 0, 0.2, 1) 0.5s both');
                }, 700);
                
                observer.unobserve(entry.target);
            }
        });
    };
    
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    sectionTitles.forEach(title => {
        // Initially hide titles
        title.style.opacity = '0';
        title.style.transform = 'translateY(30px) scale(0.95)';
        title.style.filter = 'blur(5px)';
        
        // Initially hide underline
        const underline = title.querySelector('::after') || title;
        underline.style.setProperty('--underline-width', '0');
        underline.style.setProperty('--underline-opacity', '0');
        
        observer.observe(title);
    });
};

// Premium Section Divider Scroll Reveal
const observeSectionDividers = () => {
    const sectionDividers = document.querySelectorAll('.section-divider');
    
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Reset animation
                entry.target.style.animation = 'none';
                entry.target.offsetHeight; // Trigger reflow
                
                // Apply expand animation with delay
                setTimeout(() => {
                    entry.target.style.animation = 'dividerExpand 1.2s cubic-bezier(0.4, 0, 0.2, 1) 0.3s both';
                }, 500);
                
                observer.unobserve(entry.target);
            }
        });
    };
    
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    sectionDividers.forEach(divider => {
        // Initially hide dividers
        divider.style.width = '0';
        divider.style.opacity = '0';
        
        observer.observe(divider);
    });
};

// Initialize scroll reveals
document.addEventListener('DOMContentLoaded', function() {
    observeSectionTitles();
    observeSectionDividers();
});

// Console branding
console.log('%c🌿 CHAAYA Management & Recruitment Consultancy', 'color: #355E3B; font-size: 20px; font-weight: bold;');
console.log('%cPremium Corporate Website | Designed with Excellence', 'color: #C8A96B; font-size: 14px;');
