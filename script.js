// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initScrollEffects();
    initFloatingQuotes();
    initAudioPlayers();
    initContactForm();
    initLoadingAnimation();
    initParallaxEffects();
    initTypewriterEffect();
});

// Navigation functionality
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(26, 26, 26, 0.98)';
        } else {
            navbar.style.background = 'rgba(26, 26, 26, 0.95)';
        }
    });
}

// Scroll effects and animations
function initScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.genre-card, .sample-card, .audio-player, .contact-method');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Floating quotes animation
function initFloatingQuotes() {
    const quotes = document.querySelectorAll('.quote-bubble');
    
    // Add random movement to quotes
    quotes.forEach((quote, index) => {
        // Random initial position variation
        const randomX = (Math.random() - 0.5) * 100;
        const randomY = (Math.random() - 0.5) * 50;
        
        quote.style.left = `calc(${quote.style.left || '0%'} + ${randomX}px)`;
        quote.style.top = `calc(${quote.style.top || '0%'} + ${randomY}px)`;
        
        // Add hover effects
        quote.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.05)';
            this.style.boxShadow = '0 20px 40px rgba(212, 175, 55, 0.3)';
        });
        
        quote.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 30px rgba(212, 175, 55, 0.1)';
        });
    });

    // Create new floating quotes periodically
    setInterval(createFloatingQuote, 8000);
}

function createFloatingQuote() {
    const quotes = [
        "The pen is mightier than the sword, but the imagination is mightier than both.",
        "In every story lies a universe waiting to be explored.",
        "Words have the power to create worlds and destroy empires.",
        "The best stories are those that make us question everything we know.",
        "A writer's job is to make the impossible seem inevitable.",
        "Every character is a piece of the author's soul.",
        "The greatest adventures begin with a single word.",
        "In the silence between words, magic happens.",
        "From the depths of space to the corridors of power, stories transport us.",
        "Every mystery holds a truth waiting to be discovered.",
        "The future belongs to those who dare to dream it.",
        "In the shadows of history, love finds its way."
    ];

    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    const quoteBubble = document.createElement('div');
    quoteBubble.className = 'quote-bubble floating-quote';
    quoteBubble.innerHTML = `<p>${randomQuote}</p>`;
    
    // Random position within hero section bounds
    quoteBubble.style.position = 'absolute';
    quoteBubble.style.left = Math.random() * 70 + 15 + '%';
    quoteBubble.style.top = Math.random() * 50 + 25 + '%';
    quoteBubble.style.opacity = '0';
    quoteBubble.style.transform = 'translateY(20px)';
    quoteBubble.style.transition = 'all 0.5s ease';
    quoteBubble.style.maxWidth = '250px';
    
    document.querySelector('.hero-background').appendChild(quoteBubble);
    
    // Animate in
    setTimeout(() => {
        quoteBubble.style.opacity = '1';
        quoteBubble.style.transform = 'translateY(0)';
    }, 100);
    
    // Remove after 6 seconds
    setTimeout(() => {
        quoteBubble.style.opacity = '0';
        quoteBubble.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            if (quoteBubble.parentNode) {
                quoteBubble.parentNode.removeChild(quoteBubble);
            }
        }, 500);
    }, 6000);
}

// Audio player functionality
function initAudioPlayers() {
    const playButtons = document.querySelectorAll('.play-btn');
    
    playButtons.forEach(button => {
        button.addEventListener('click', function() {
            const isPlaying = this.classList.contains('playing');
            
            if (isPlaying) {
                this.classList.remove('playing');
                this.innerHTML = '<i class="fas fa-play"></i>';
                // Stop audio logic would go here
            } else {
                // Stop all other players
                playButtons.forEach(btn => {
                    btn.classList.remove('playing');
                    btn.innerHTML = '<i class="fas fa-play"></i>';
                });
                
                this.classList.add('playing');
                this.innerHTML = '<i class="fas fa-pause"></i>';
                // Play audio logic would go here
                
                // Simulate progress
                simulateProgress(this);
            }
        });
    });
}

function simulateProgress(button) {
    const progressBar = button.parentElement.querySelector('.progress');
    let progress = 0;
    
    const interval = setInterval(() => {
        if (button.classList.contains('playing')) {
            progress += Math.random() * 2;
            if (progress >= 100) {
                progress = 100;
                button.classList.remove('playing');
                button.innerHTML = '<i class="fas fa-play"></i>';
                clearInterval(interval);
            }
            progressBar.style.width = progress + '%';
        } else {
            clearInterval(interval);
        }
    }, 200);
}

// Contact form functionality
function initContactForm() {
    const form = document.querySelector('.contact-form form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const name = form.querySelector('input[type="text"]').value;
            const email = form.querySelector('input[type="email"]').value;
            const subject = form.querySelectorAll('input[type="text"]')[1].value;
            const message = form.querySelector('textarea').value;
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
            form.reset();
        });
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#f44336'};
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 10000;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Loading animation
function initLoadingAnimation() {
    // Create loading screen
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'loading';
    loadingScreen.innerHTML = '<div class="loading-spinner"></div>';
    document.body.appendChild(loadingScreen);
    
    // Hide loading screen after page loads
    window.addEventListener('load', function() {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                if (loadingScreen.parentNode) {
                    loadingScreen.parentNode.removeChild(loadingScreen);
                }
            }, 500);
        }, 1000);
    });
}

// Parallax effects
function initParallaxEffects() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-quotes');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Typewriter effect for hero title
function initTypewriterEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typewriter effect after a delay
        setTimeout(typeWriter, 1000);
    }
}

// Smooth reveal animations for sections
function revealOnScroll() {
    const reveals = document.querySelectorAll('.section-title, .genre-card, .sample-card');
    
    reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const elementTop = reveal.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            reveal.classList.add('active');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);

// Add active class to reveals
const style = document.createElement('style');
style.textContent = `
    .section-title, .genre-card, .sample-card {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .section-title.active, .genre-card.active, .sample-card.active {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    // Escape key closes mobile menu
    if (e.key === 'Escape') {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Add smooth hover effects to buttons
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Add click ripple effect to buttons
function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add('ripple');
    
    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) {
        ripple.remove();
    }
    
    button.appendChild(circle);
}

// Add ripple effect styles
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple 600ms linear;
        pointer-events: none;
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Add ripple effect to all buttons
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', createRipple);
    });
});

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll events
const throttledScroll = throttle(() => {
    revealOnScroll();
}, 100);

window.addEventListener('scroll', throttledScroll);
