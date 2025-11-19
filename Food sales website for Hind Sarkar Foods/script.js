// Products data
const products = [
    {
        id: '1',
        name: 'Microwave Popcorn',
        category: 'popcorn',
        description: 'Convenient microwave popcorn in multiple delicious flavors',
        image: 'assets/Endevour Catalogue - 2025_page-0004.jpg',
        flavors: ['Butter', 'Cheese', 'Chilli Tomato', 'Cream & Onion']
    },
    {
        id: '2',
        name: 'Peanut Chikki',
        category: 'chikki',
        description: 'Traditional peanut chikki in various exciting flavors',
        image: 'assets/Endevour Catalogue - 2025_page-0009.jpg',
        flavors: ['Peanut Crush', 'Peanut Butter', 'Chocolate', 'Dryfruit Coconut', 'Rajgira', 'Sesame', 'Coconut']
    },
    {
        id: '3',
        name: 'Peanut Butter',
        category: 'spreads',
        description: 'Creamy and crunchy peanut butter made from premium peanuts',
        //image: 'https://images.unsplash.com/photo-1558022032-1356636a26ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwc25hY2tzJTIwcGVhbnV0c3xlbnwxfHx8fDE3NTk0NzA4MzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
        image: 'assets/Endevour Catalogue - 2025_page-0010.jpg'
    },
    {
        id: '4',
        name: 'Celebration Pack',
        category: 'combo',
        description: 'Perfect combo pack for parties and celebrations',
        image: 'assets/Endevour Catalogue - 2025_page-0014.jpg'
    },
    {
        id: '5',
        name: 'Dryfruit Burfi',
        category: 'sweets',
        description: 'Rich and nutritious dryfruit burfi made with premium ingredients',
        image: 'https://images.unsplash.com/photo-1558022032-1356636a26ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwc25hY2tzJTIwcGVhbnV0c3xlbnwxfHx8fDE3NTk0NzA4MzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
        id: '6',
        name: 'Spicy Snacks',
        category: 'spicy',
        description: 'Variety of spicy snacks for those who love heat',
        image: 'assets/Endevour Catalogue - 2025_page-0017.jpg',
        flavors: ['Jingle', 'Panipuri', 'Kolhapuri Bhel', 'Khajapur', 'Chhatani Imli Goli']
    },
    {
        id: '7',
        name: 'Protein Bar',
        category: 'healthy',
        description: 'High-protein bars perfect for fitness enthusiasts',
        image: 'assets/Endevour Catalogue - 2025_page-0019.jpg'
    },
    {
        id: '8',
        name: 'Multigrain Cookies',
        category: 'healthy',
        description: 'Nutritious multigrain cookies baked to perfection',
        image: 'assets/Endevour Catalogue - 2025_page-0020.jpg'
    },
    {
        id: '9',
        name: 'Corn on Cob - Sweetcorn',
        category: 'healthy',
        description: 'Fresh and sweet corn kernels, perfect for healthy snacking',
        image: 'assets/Endevour Catalogue - 2025_page-0023.jpg'
    }
];

// DOM Elements
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNav = document.getElementById('mobileNav');
const productsGrid = document.getElementById('productsGrid');
const filterBtns = document.querySelectorAll('.filter-btn');
const contactForm = document.getElementById('contactForm');
const header = document.getElementById('header');

// Mobile Menu Toggle
mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    mobileNav.classList.toggle('active');
});

// Close mobile menu when clicking on links
document.querySelectorAll('.nav-link-mobile').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        mobileNav.classList.remove('active');
    });
});

// Smooth Scrolling
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const headerHeight = header.offsetHeight;
        const elementPosition = element.offsetTop - headerHeight;

        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
}

// Navigation Links Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        scrollToSection(targetId);
    });
});

// Header Scroll Effect
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }

    lastScrollTop = scrollTop;
});

// Product Filtering
let currentCategory = 'all';

function renderProducts(category = 'all') {
    const filteredProducts = category === 'all'
        ? products
        : products.filter(product => product.category === category);

    productsGrid.innerHTML = '';

    filteredProducts.forEach((product, index) => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);

        // Animate product cards
        setTimeout(() => {
            productCard.classList.add('show');
        }, index * 100);
    });
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card loading';

    const flavorsHtml = product.flavors ? `
        <div class="flavors">
            <p>Available Flavors:</p>
            <div class="flavor-tags">
                ${product.flavors.map(flavor => `<span class="flavor-tag">${flavor}</span>`).join('')}
            </div>
        </div>
    ` : '';

    card.innerHTML = `
        <div class="product-image-container">
            <img src="${product.image}" alt="${product.name}" loading="lazy">
            <div class="new-badge">New</div>
        </div>
        <div class="product-content">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            ${flavorsHtml}
        </div>
    `;

    return card;
}

// Filter Button Events
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');

        const category = btn.getAttribute('data-category');
        currentCategory = category;
        renderProducts(category);
    });
});

// Contact Form Submission - WhatsApp Integration
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const name = formData.get('name')?.trim();
    const message = formData.get('message')?.trim();

    // Validate form data
    if (!name || !message) {
        alert('Please fill in both Name and Inquiry fields.');
        return;
    }

    try {
        // WhatsApp number (without + or spaces)
        const whatsappNumber = '919769395292';
        
        // Create a simpler, cleaner message format
        const composedMessage = `Hi! I'm interested in your products.

Name: ${name}
Inquiry: ${message}`;
        
        // Use the correct WhatsApp API URL
        const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(composedMessage)}`;
        
        console.log('WhatsApp URL:', whatsappUrl);
        console.log('Message to send:', composedMessage);

        // Try to open WhatsApp
        const whatsappWindow = window.open(whatsappUrl, '_blank');
        
        // Check if popup was blocked
        if (!whatsappWindow || whatsappWindow.closed || typeof whatsappWindow.closed == 'undefined') {
            // If popup blocked, try direct navigation
            window.location.href = whatsappUrl;
        }

        // Show success message
        alert('Opening WhatsApp to send your message...');

        // Reset form
        contactForm.reset();

        // Add animation to form elements
        const formElements = contactForm.querySelectorAll('.form-group');
        formElements.forEach((element, index) => {
            element.style.animation = 'none';
            setTimeout(() => {
                element.style.animation = 'fadeInUp 0.6s ease forwards';
            }, index * 100);
        });

        console.log('WhatsApp message prepared:', { name, message });
    } catch (error) {
        console.error('Error opening WhatsApp:', error);
        alert('Sorry, there was an error opening WhatsApp. Please try again or contact us directly.');
    }
});

// Scroll Animations
function animateOnScroll() {
    const elements = document.querySelectorAll('.scroll-animate');
    const windowHeight = window.innerHeight;

    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;

        if (elementTop < windowHeight - 100) {
            element.classList.add('animate');
        }
    });
}

// Add scroll animation classes to elements
function addScrollAnimations() {
    const elementsToAnimate = document.querySelectorAll('.about-card, .value-card, .hero-features .feature');
    elementsToAnimate.forEach(element => {
        element.classList.add('scroll-animate');
    });
}

// Parallax Effect for Hero Background
function parallaxEffect() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
}

// Image Lazy Loading
function lazyLoadImages() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.src;
                img.classList.remove('loading');
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Typing Animation for Hero Title
function typeWriterEffect() {
    const heroTitle = document.querySelector('.hero-title');
    const text = heroTitle.textContent;
    heroTitle.textContent = '';

    let i = 0;
    const typeInterval = setInterval(() => {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(typeInterval);
        }
    }, 100);
}

// Floating Animation for Product Images
function addFloatingAnimation() {
    const productImages = document.querySelectorAll('.product-image');
    productImages.forEach((img, index) => {
        img.style.animationDelay = `${index * 0.2}s`;
        img.classList.add('animate-float');
    });
}

// Counter Animation for Statistics (if needed in future)
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;

        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target;
            }
        };

        updateCounter();
    });
}

// Particle Background Effect (optional enhancement)
function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.background = 'rgba(249, 115, 22, 0.3)';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `float ${3 + Math.random() * 4}s ease-in-out infinite`;
        particle.style.animationDelay = Math.random() * 2 + 's';
        hero.appendChild(particle);
    }
}

// Smooth Page Load Animation
function pageLoadAnimation() {
    document.body.style.opacity = '0';

    window.addEventListener('load', () => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';

        // Animate hero elements
        setTimeout(() => {
            const heroElements = document.querySelectorAll('.hero-text > *');
            heroElements.forEach((element, index) => {
                element.style.opacity = '0';
                element.style.transform = 'translateY(30px)';
                setTimeout(() => {
                    element.style.transition = 'all 0.6s ease';
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, index * 200);
            });
        }, 300);
    });
}

// Smooth scroll for all browsers
function smoothScrollPolyfill() {
    if (!('scrollBehavior' in document.documentElement.style)) {
        // Polyfill for browsers that don't support smooth scrolling
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/gh/iamdustan/smoothscroll@master/smoothscroll.min.js';
        document.head.appendChild(script);
    }
}

// Event Listeners
window.addEventListener('scroll', () => {
    animateOnScroll();
    parallaxEffect();
});

window.addEventListener('resize', () => {
    // Handle responsive changes
    if (window.innerWidth > 768) {
        mobileMenuBtn.classList.remove('active');
        mobileNav.classList.remove('active');
    }
});

// Initialize Everything
document.addEventListener('DOMContentLoaded', () => {
    // Initial setup
    renderProducts();
    addScrollAnimations();
    smoothScrollPolyfill();
    pageLoadAnimation();

    // Optional enhancements
    setTimeout(() => {
        lazyLoadImages();
        addFloatingAnimation();
        createParticles();
    }, 1000);

    // Add intersection observer for better performance
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.scroll-animate').forEach(el => {
        observer.observe(el);
    });
});

// Performance optimization
function debounce(func, wait) {
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

// Debounced scroll handler for better performance
const debouncedScrollHandler = debounce(() => {
    animateOnScroll();
    parallaxEffect();
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Add smooth transitions to all elements
document.documentElement.style.scrollBehavior = 'smooth';

// Service Worker for better performance (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Export functions for global access
window.scrollToSection = scrollToSection;
window.renderProducts = renderProducts;

