let currentLanguage = 'fr';

// Language toggle function
function toggleLanguage() {
    currentLanguage = currentLanguage === 'fr' ? 'en' : 'fr';
    updateLanguage();
}

// Update all text elements based on current language
function updateLanguage() {
    const langBtn = document.getElementById('langBtn');
    langBtn.textContent = currentLanguage === 'fr' ? 'EN' : 'FR';

    // Update all elements with data attributes
    document.querySelectorAll('[data-fr]').forEach(element => {
        const frText = element.getAttribute('data-fr');
        const enText = element.getAttribute('data-en');
        element.textContent = currentLanguage === 'fr' ? frText : enText;
    });

    // Update placeholders
    document.querySelectorAll('[data-fr-placeholder]').forEach(element => {
        const frPlaceholder = element.getAttribute('data-fr-placeholder');
        const enPlaceholder = element.getAttribute('data-en-placeholder');
        element.placeholder = currentLanguage === 'fr' ? frPlaceholder : enPlaceholder;
    });
}

// Navigation functionality
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Remove active class from all links
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        
        // Add active class to clicked link
        this.classList.add('active');
        
        // Scroll to section
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Filter functionality for works
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        // Here you would implement the actual filtering logic
        // For now, we'll just show all items
    });
});

// Smooth scrolling for all internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Enhanced Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add staggered animation delay
            setTimeout(() => {
                entry.target.classList.add('fade-in');
            }, index * 100);
        }
    });
}, observerOptions);

// Observe all elements that should fade in
document.querySelectorAll('.card, .work-item, .timeline-item').forEach(el => {
    observer.observe(el);
});

// Add hover effects for cards
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add typing animation for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Add parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero-image');
    if (parallax) {
        const speed = scrolled * 0.5;
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Add smooth reveal animation for stats
const stats = document.querySelectorAll('.stat-number');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const finalValue = target.textContent;
            const startValue = 0;
            const duration = 2000;
            const increment = finalValue.replace(/\D/g, '') / (duration / 16);
            let currentValue = 0;
            
            const timer = setInterval(() => {
                currentValue += increment;
                if (currentValue >= finalValue.replace(/\D/g, '')) {
                    target.textContent = finalValue;
                    clearInterval(timer);
                } else {
                    target.textContent = Math.floor(currentValue) + finalValue.replace(/\d/g, '');
                }
            }, 16);
            
            statsObserver.unobserve(target);
        }
    });
});

stats.forEach(stat => statsObserver.observe(stat));

// Skill bars animation
const skillBars = document.querySelectorAll('.skill-progress');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            const skillBar = entry.target;
            const targetWidth = skillBar.getAttribute('data-width');
            
            // Set the target width as CSS custom property
            skillBar.style.setProperty('--target-width', targetWidth);
            
            // Add animation class with staggered delay
            setTimeout(() => {
                skillBar.classList.add('animate');
            }, index * 200);
            
            skillObserver.unobserve(skillBar);
        }
    });
}, {
    threshold: 0.5,
    rootMargin: '0px 0px -50px 0px'
});

skillBars.forEach(bar => skillObserver.observe(bar));

// Language bars animation
const languageBars = document.querySelectorAll('.language-progress');
const languageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            const languageBar = entry.target;
            const targetWidth = languageBar.getAttribute('data-width');
            
            // Set the target width as CSS custom property
            languageBar.style.setProperty('--target-width', targetWidth);
            
            // Add animation class with staggered delay
            setTimeout(() => {
                languageBar.classList.add('animate');
            }, index * 300);
            
            languageObserver.unobserve(languageBar);
        }
    });
}, {
    threshold: 0.5,
    rootMargin: '0px 0px -50px 0px'
});

languageBars.forEach(bar => languageObserver.observe(bar));

// Donut chart animation
const donutSegments = document.querySelectorAll('.donut-segment');
const donutObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('animate');
            }, index * 500);
            donutObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.5,
    rootMargin: '0px 0px -50px 0px'
});

donutSegments.forEach(segment => donutObserver.observe(segment));

// Form submission
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert(currentLanguage === 'fr' ? 'Message envoyé avec succès!' : 'Message sent successfully!');
});

// Initialize language
updateLanguage();