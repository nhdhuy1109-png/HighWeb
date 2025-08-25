// Enhanced CV functionality
class CVManager {
    constructor() {
        this.init();
        this.setupEventListeners();
    }

    init() {
        this.createThemeToggle();
        this.setupSmoothScrolling();
        this.setupIntersectionObserver();
    }

    createThemeToggle() {
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'theme-toggle';
        toggleBtn.innerHTML = '🌙';
        toggleBtn.title = 'Toggle Dark Mode';
        document.body.appendChild(toggleBtn);

        toggleBtn.addEventListener('click', () => this.toggleTheme());
        
        // Load saved theme
        const savedTheme = localStorage.getItem('cv-theme');
        if (savedTheme === 'dark') {
            this.setDarkTheme();
            toggleBtn.innerHTML = '☀️';
        }
    }

    toggleTheme() {
        const body = document.body;
        const toggleBtn = document.querySelector('.theme-toggle');
        
        if (body.classList.contains('dark-theme')) {
            body.classList.remove('dark-theme');
            toggleBtn.innerHTML = '🌙';
            localStorage.setItem('cv-theme', 'light');
        } else {
            this.setDarkTheme();
            toggleBtn.innerHTML = '☀️';
            localStorage.setItem('cv-theme', 'dark');
        }
    }

    setDarkTheme() {
        document.body.classList.add('dark-theme');
    }

    setupSmoothScrolling() {
        // Add navigation dots
        const nav = document.createElement('nav');
        nav.className = 'scroll-nav';
        nav.innerHTML = `
            <div class="nav-dot" data-section="intro"></div>
            <div class="nav-dot" data-section="experience"></div>
            <div class="nav-dot" data-section="education"></div>
            <div class="nav-dot" data-section="skills"></div>
            <div class="nav-dot" data-section="contact"></div>
        `;
        document.body.appendChild(nav);

        // Add smooth scrolling to navigation
        nav.addEventListener('click', (e) => {
            if (e.target.classList.contains('nav-dot')) {
                const section = e.target.dataset.section;
                const element = document.querySelector(`.${section}, .${section}-section`);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe all animatable elements
        document.querySelectorAll('.experience-item, .education-item, .skills, .contact-section').forEach(el => {
            observer.observe(el);
        });
    }

    setupEventListeners() {
        // Enhanced contact form
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => this.handleContactSubmit(e));
        }

        // Skill hover effects
        document.querySelectorAll('.skills li').forEach(skill => {
            skill.addEventListener('mouseenter', () => {
                skill.style.transform = 'scale(1.1) rotate(2deg)';
            });
            skill.addEventListener('mouseleave', () => {
                skill.style.transform = 'scale(1) rotate(0deg)';
            });
        });

        // Profile image click effect
        const profileImg = document.querySelector('.profile-img');
        if (profileImg) {
            profileImg.addEventListener('click', () => {
                profileImg.style.animation = 'pulse 0.6s ease-in-out';
                setTimeout(() => {
                    profileImg.style.animation = '';
                }, 600);
            });
        }
    }

    handleContactSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        
        // Show loading state
        const submitBtn = e.target.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Đang gửi...';
        submitBtn.disabled = true;

        // Simulate API call
        setTimeout(() => {
            this.showNotification(`Cảm ơn ${data.name}! Tin nhắn đã được gửi thành công.`, 'success');
            e.target.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // PDF Generation with better formatting
    generatePDF() {
        const originalDisplay = document.querySelector('.contact-section').style.display;
        document.querySelector('.contact-section').style.display = 'none';
        
        // Add print-specific styles
        const printStyles = document.createElement('style');
        printStyles.textContent = `
            @media print {
                .cv-container { 
                    box-shadow: none !important; 
                    margin: 0 !important;
                    max-width: none !important;
                }
                .sidebar { page-break-inside: avoid; }
                .main-content { page-break-inside: avoid; }
            }
        `;
        document.head.appendChild(printStyles);
        
        window.print();
        
        // Restore original state
        setTimeout(() => {
            document.querySelector('.contact-section').style.display = originalDisplay;
            printStyles.remove();
        }, 1000);
    }
}

// Analytics tracking (if needed)
class CVAnalytics {
    static trackEvent(action, section) {
        // Placeholder for analytics tracking
        console.log(`CV Event: ${action} in ${section}`);
        
        // Example: Google Analytics
        // if (typeof gtag !== 'undefined') {
        //     gtag('event', action, {
        //         event_category: 'CV',
        //         event_label: section
        //     });
        // }
    }

    static trackDownload() {
        this.trackEvent('download', 'cv');
    }

    static trackContact() {
        this.trackEvent('contact', 'form');
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CVManager();
    
    // Track page view
    CVAnalytics.trackEvent('view', 'cv');
});

// Enhanced download function
function downloadCV() {
    CVAnalytics.trackDownload();
    const cvManager = new CVManager();
    cvManager.generatePDF();
}

// Service Worker registration for PWA capabilities
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
