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
    
    // Test: Create first quote immediately
    setTimeout(createFloatingQuote, 2000);
}

// Track last used quote to avoid immediate repeats
let lastUsedQuoteIndex = -1;

function createFloatingQuote() {
    const quotes = [
        "\"Your morning essentials, Doc,\" he said, dropping the stack onto her desk with a practiced thud. \"Caffeine, calamity, and correspondence. In order of importance.\"",
        "Every instinct in her begged her to stay right there, in the stillness between breaths, wrapped in warmth and safety and something far more dangerous than either.",
        "The blade had been forged by the queen's consort—a brilliant, cruel woman of ice and calculation—and given to Resshael not just to slay the necromancers, but to trap them.",
        "It would be their sworn duty to police the gateways between the two realms and ensure that the chaos of the aether never again affected the law and order of the Kassian people.",
        "I understand you are feeling off balance, Lei. As an operator, I know how hard it can be to operate completely independent of any authority, but we can only control so much. Even the gods have their limits.",
        "Floating over the top of the blank page was a long yellow and white feather with a solid gold quill shaft and tip. The downy vanes rippled gently in the breeze, as the entire feather gently rose and fell away from the book, almost as if it were breathing.",
        "The living thing that sits on the wayside and does not fight for resources, has only one path available to it, death.",
        "Helena leaned against the bar, her weight settled comfortably against the worn wood, fingers idly tracing the faint grooves and nicks carved into its surface as she quietly observed the shifting currents of the tavern.",
        "\"You think your guilt is worth more than justice?\" Helena interrupted, voice as cool and flat as the stone beneath them. \"You'd rather let the real murderer walk free, just so you can wallow in self-pity?\"",
        "A single flex of his fingers, and she was lifted from the ground, her tiny body dangling like a broken marionette.",
        "She stood like a creature made for places like this—a predator at ease, watching the chaos she had orchestrated unfold with a faint, knowing smirk.",
        "She hadn't built Umbra Reserve to survive an apocalypse, but she had prepared for the worst. The distillery itself? Easily rebuilt. But the liquor? That was something else. Alcohol was always valuable, always barter-worthy, no matter what happened to the world around it.",
        "\"The necromancer,\" she said slowly, each word pulled up from the place where memory had been buried deep and carefully. \"He used to talk about her. He'd mention her while he was carving into my bones. Always with reverence. Almost with sorrow.\""
    ];

    let randomIndex;
    
    // Simple logic: pick a random quote that's not the same as the last one
    do {
        randomIndex = Math.floor(Math.random() * quotes.length);
    } while (randomIndex === lastUsedQuoteIndex && quotes.length > 1);
    
    lastUsedQuoteIndex = randomIndex;
    const randomQuote = quotes[randomIndex];
    const quoteBubble = document.createElement('div');
    quoteBubble.className = 'quote-bubble floating-quote';
    quoteBubble.innerHTML = `<p>${randomQuote}</p>`;
    
    // Position on left or right side only, avoiding center
    quoteBubble.style.position = 'absolute';
    
    // Randomly choose left or right side
    const isLeftSide = Math.random() < 0.5;
    
    if (isLeftSide) {
        // Left side: 5% to 30% from left edge
        quoteBubble.style.left = Math.random() * 25 + 5 + '%';
    } else {
        // Right side: 70% to 90% from left edge (10% to 30% from right edge)
        quoteBubble.style.left = Math.random() * 20 + 70 + '%';
    }
    
    // Vertical position: 20% to 80% from top
    quoteBubble.style.top = Math.random() * 60 + 20 + '%';
    quoteBubble.style.opacity = '0';
    quoteBubble.style.transform = 'translateY(20px)';
    quoteBubble.style.transition = 'all 0.5s ease';
    quoteBubble.style.maxWidth = '250px';
    
    const heroBackground = document.querySelector('.hero-background');
    
    if (heroBackground) {
        heroBackground.appendChild(quoteBubble);
    }
    
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
