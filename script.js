/* ============================================
   MOBILE MENU TOGGLE
   ============================================ */

const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
});

/* ============================================
   ACTIVE NAVIGATION LINK
   ============================================ */

const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });

    // Close mobile menu on scroll
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
});

/* ============================================
   SCROLL REVEAL ANIMATIONS
   ============================================ */

ScrollReveal({ 
    distance: '60px',
    duration: 2000,
    delay: 200,
    reset: false
});

// Reveal elements on scroll
ScrollReveal().reveal('.hero-content', { origin: 'left' });
ScrollReveal().reveal('.hero-image', { origin: 'right' });
ScrollReveal().reveal('.section-header', { origin: 'top' });
ScrollReveal().reveal('.project-card', { origin: 'bottom', interval: 100 });
ScrollReveal().reveal('.expertise-card', { origin: 'bottom', interval: 100 });
ScrollReveal().reveal('.contact-item', { origin: 'left', interval: 100 });
ScrollReveal().reveal('.about-image', { origin: 'left' });
ScrollReveal().reveal('.about-content', { origin: 'right' });

/* ============================================
   CONTACT FORM HANDLING
   ============================================ */

const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const name = this.name.value.trim();
        const email = this.email.value.trim();
        const message = this.message.value.trim();

        // Basic validation
        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }

        // Check email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }

        try {
            const response = await fetch('https://portfolio-contact-backend-svic.onrender.com/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, message })
            });

            const data = await response.json();
            alert(data.message || 'Message sent successfully!');
            contactForm.reset();
        } catch (error) {
            console.error('Error sending message:', error);
            alert('Failed to send message. Please try again or contact me directly via email.');
        }
    });
}

/* ============================================
   SMOOTH SCROLL FOR ANCHOR LINKS
   ============================================ */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu after clicking
            menuIcon.classList.remove('bx-x');
            navbar.classList.remove('active');
        }
    });
});

/* ============================================
   LAZY LOADING FOR IMAGES (Optional)
   ============================================ */

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('fade-in');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img').forEach(img => imageObserver.observe(img));
}

/* ============================================
   PERFORMANCE: DEBOUNCE SCROLL EVENTS
   ============================================ */

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

// Optional: Add any scroll-based animations here with debouncing
const debouncedScroll = debounce(() => {
    // Performance-intensive operations go here
}, 100);

window.addEventListener('scroll', debouncedScroll);

/* ============================================
   UTILITY: DETECT PREFETCH SUPPORT
   ============================================ */

if ('connection' in navigator) {
    const connection = navigator.connection;
    if (connection.saveData === false && connection.effectiveType !== 'slow-2g') {
        // Preload resources for faster connections
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = 'https://thegallantxd.itch.io/';
        document.head.appendChild(link);
    }
}
