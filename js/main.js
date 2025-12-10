// ==============================================
// MOCA WEBSITE - MAIN JAVASCRIPT
// ==============================================

// Preloader
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    setTimeout(() => {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 1000);
});

// Mobile Navigation
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        
        // Remove active class from all links
        navLinks.forEach(l => l.classList.remove('active'));
        // Add active class to clicked link
        link.classList.add('active');
    });
});

// Sticky Header
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Improved Smooth Scrolling - ONLY for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Only prevent default for same-page anchors
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Animate Stats Counter
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const isPercentage = element.getAttribute('data-count').includes('.');
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = Math.floor(target) + (isPercentage ? '%' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + (isPercentage ? '%' : '');
        }
    }, 16);
}

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Animate stats
            if (entry.target.classList.contains('hero-stats')) {
                const stats = entry.target.querySelectorAll('.stat-number');
                stats.forEach(stat => {
                    const target = parseFloat(stat.getAttribute('data-count'));
                    if (!stat.classList.contains('animated')) {
                        stat.classList.add('animated');
                        animateCounter(stat, target);
                    }
                });
            }
            
            // Animate progress bars
            if (entry.target.classList.contains('feature-card')) {
                const progressFill = entry.target.querySelector('.progress-fill');
                if (progressFill && !progressFill.classList.contains('animated')) {
                    progressFill.classList.add('animated');
                    const width = progressFill.style.width;
                    progressFill.style.width = '0%';
                    setTimeout(() => {
                        progressFill.style.width = width;
                    }, 300);
                }
            }
            
            // Animate chart bars
            if (entry.target.classList.contains('chart-bar')) {
                const barValue = entry.target.querySelector('.bar-value');
                const percentage = entry.target.getAttribute('data-percentage');
                if (barValue && !barValue.classList.contains('animated')) {
                    barValue.classList.add('animated');
                    barValue.style.width = '0%';
                    setTimeout(() => {
                        barValue.style.width = percentage + '%';
                    }, 500);
                }
            }
            
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// Observe elements
document.addEventListener('DOMContentLoaded', () => {
    // Observe stats
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) observer.observe(heroStats);
    
    // Observe feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => observer.observe(card));
    
    // Observe chart bars
    const chartBars = document.querySelectorAll('.chart-bar');
    chartBars.forEach(bar => observer.observe(bar));
});

// Particles.js Background
document.addEventListener('DOMContentLoaded', function() {
    if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: "#00C853" },
                shape: { type: "circle" },
                opacity: { value: 0.5, random: true },
                size: { value: 3, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#00C853",
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "repulse" },
                    onclick: { enable: true, mode: "push" },
                    resize: true
                }
            },
            retina_detect: true
        });
    }
});

// Video Play Functionality
document.querySelector('.play-button')?.addEventListener('click', function() {
    // This would typically open a modal with the video
    alert('Video player would open here. Replace with actual video implementation.');
});

// Form Handling (for contact forms on other pages)
document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add form submission logic here
            alert('Form submitted! In a real implementation, this would send the data to your server.');
        });
    });
});

// Active link highlighting based on current page
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('MOCA Website initialized');
    
    // Add loading animation to elements
    const animatedElements = document.querySelectorAll('.feature-card, .product-card, .result-item');
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// WhatsApp integration
function openWhatsApp(product = '') {
    const phone = '6282211221488';
    let message = 'Halo, saya tertarik dengan produk MOCA';
    
    if (product) {
        message += ` - ${product}`;
    }
    
    message += '. Bisa info lebih lanjut?';
    
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// Add click events to WhatsApp buttons
document.addEventListener('DOMContentLoaded', function() {
    const whatsappButtons = document.querySelectorAll('[href*="wa.me"]');
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (!this.getAttribute('href').includes('text=')) {
                e.preventDefault();
                openWhatsApp();
            }
        });
    });
});

// Enhanced Client Logos Functionality
function enhanceClientLogos() {
    const clientLogos = document.querySelectorAll('.client-logo');
    
    clientLogos.forEach(logo => {
        const img = logo.querySelector('img');
        const website = logo.getAttribute('data-website');
        
        // Enhance accessibility
        if (!img.getAttribute('alt') && website) {
            const companyName = website.split('.')[0];
            img.setAttribute('alt', `${companyName} Logo`);
        }
        
        // Add loading lazy for performance
        img.setAttribute('loading', 'lazy');
        
        // Handle image loading
        img.addEventListener('load', function() {
            this.style.opacity = '1';
            
            // Auto-detect if logo needs dark background adjustment
            const rgb = getAverageColor(this);
            const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
            
            if (brightness < 128) { // If logo is dark
                logo.classList.add('dark-bg-logo');
            }
        });
        
        // Error handling
        img.addEventListener('error', function() {
            console.warn('Logo gagal dimuat:', this.src);
            
            // Create text fallback
            const companyName = website ? website.split('.')[0] : 'Client';
            const fallbackText = document.createElement('span');
            fallbackText.className = 'logo-fallback';
            fallbackText.textContent = companyName;
            fallbackText.style.color = 'var(--white)';
            fallbackText.style.fontWeight = '600';
            fallbackText.style.fontSize = '0.9rem';
            
            this.style.display = 'none';
            logo.appendChild(fallbackText);
        });
        
        // Add click analytics (optional)
        logo.addEventListener('click', function() {
            console.log('Client logo clicked:', website);
            // You can add Google Analytics or other tracking here
        });
    });
}

// Helper function to detect logo color (optional)
function getAverageColor(img) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    
    let r = 0, g = 0, b = 0;
    
    for (let i = 0; i < data.length; i += 4) {
        r += data[i];
        g += data[i + 1];
        b += data[i + 2];
    }
    
    const pixelCount = data.length / 4;
    return {
        r: Math.floor(r / pixelCount),
        g: Math.floor(g / pixelCount),
        b: Math.floor(b / pixelCount)
    };
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    enhanceClientLogos();
    
    // Add animation to logos when they come into view
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '50px'
    };
    
    const logoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                logoObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe each logo for animation
    document.querySelectorAll('.client-logo').forEach(logo => {
        logo.style.opacity = '0';
        logo.style.transform = 'translateY(20px)';
        logo.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        logoObserver.observe(logo);
    });
    
    // Initialize YouTube Chapter Navigation
    initYouTubeChapters();
});

// ==============================================
// YOUTUBE FUNCTIONALITY - FIXED VERSION
// ==============================================

let youtubePlayer = null;

function initYouTubeChapters() {
    const chapterItems = document.querySelectorAll('.chapter-item');
    if (chapterItems.length === 0) return;
    
    chapterItems.forEach(item => {
        item.addEventListener('click', function() {
            const time = parseInt(this.getAttribute('data-time'));
            
            // Update active chapter UI
            chapterItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            
            // Scroll to video section
            const videoSection = document.querySelector('.video-section');
            if (videoSection) {
                videoSection.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
            }
            
            // Try to seek in YouTube player
            seekToTime(time);
        });
    });
}

// SOLUSI 1: Metode sederhana tanpa YouTube API
function seekToTime(time) {
    const iframe = document.querySelector('.youtube-player-container iframe');
    if (!iframe) return;
    
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const chapterTitle = document.querySelector('.chapter-item.active h4').textContent;
    
    // Method 1: Reload iframe dengan timestamp baru
    const currentSrc = iframe.src.split('?')[0];
    iframe.src = `${currentSrc}?start=${time}&autoplay=1&rel=0&modestbranding=1&controls=1`;
    
    // Show notification
    showTimestampInfo(time, chapterTitle);
}

// SOLUSI 2: Gunakan YouTube Player API jika diizinkan
function loadYouTubeAPI() {
    // Check if YouTube IFrame API is already loaded
    if (window.YT && window.YT.Player) {
        initializeYouTubePlayer();
        return;
    }
    
    // Load YouTube IFrame API
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    
    // Setup callback
    window.onYouTubeIframeAPIReady = function() {
        initializeYouTubePlayer();
    };
}

function initializeYouTubePlayer() {
    const iframe = document.getElementById('moca-video');
    if (!iframe) return;
    
    try {
        youtubePlayer = new YT.Player('moca-video', {
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    } catch (error) {
        console.log('YouTube Player API initialization failed:', error);
        // Fallback to simple method
    }
}

function onPlayerReady(event) {
    console.log('YouTube Player is ready');
    // You can add more functionality here if needed
}

function onPlayerStateChange(event) {
    // Optional: Handle player state changes
}

function seekWithAPI(time) {
    if (youtubePlayer && youtubePlayer.seekTo) {
        try {
            youtubePlayer.seekTo(time, true);
            youtubePlayer.playVideo();
        } catch (error) {
            console.log('YouTube API seek failed, using fallback');
            seekToTime(time); // Fallback
        }
    } else {
        seekToTime(time); // Fallback
    }
}

function showTimestampInfo(time, chapterTitle) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'video-timestamp-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-clock"></i>
            <div>
                <div class="notification-title">${chapterTitle}</div>
                <div class="notification-time">Menuju ke ${minutes}:${seconds.toString().padStart(2, '0')}</div>
            </div>
        </div>
    `;
    
    // Remove existing notification
    const existingNotification = document.querySelector('.video-timestamp-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Add to body
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Enhanced error handling for YouTube
function handleYouTubeError() {
    const iframe = document.querySelector('.youtube-player-container iframe');
    if (!iframe) return;
    
    // Add error event listener
    iframe.addEventListener('error', function() {
        console.log('YouTube iframe failed to load');
        
        // Show fallback message
        const fallback = document.querySelector('.video-fallback') || createVideoFallback();
        fallback.style.display = 'block';
        
        // Alternative: Try to reload with different parameters
        setTimeout(() => {
            const currentSrc = iframe.src;
            if (currentSrc.includes('youtube.com')) {
                iframe.src = currentSrc.replace('youtube.com', 'youtube-nocookie.com');
            }
        }, 2000);
    });
    
    // Check if iframe loaded successfully
    iframe.addEventListener('load', function() {
        console.log('YouTube iframe loaded successfully');
        const fallback = document.querySelector('.video-fallback');
        if (fallback) {
            fallback.style.display = 'none';
        }
    });
}

function createVideoFallback() {
    const fallback = document.createElement('div');
    fallback.className = 'video-fallback';
    fallback.innerHTML = `
        <div class="fallback-message">
            <p><i class="fas fa-exclamation-triangle"></i> Video tidak dapat dimuat. Silakan:</p>
            <div class="fallback-options">
                <a href="https://youtu.be/zjVlspUciSY" target="_blank" class="btn btn-primary">
                    <i class="fab fa-youtube"></i> Tonton di YouTube
                </a>
                <button class="btn btn-secondary reload-video">
                    <i class="fas fa-redo"></i> Muat Ulang Video
                </button>
            </div>
        </div>
    `;
    
    document.querySelector('.video-container').appendChild(fallback);
    
    // Add reload functionality
    fallback.querySelector('.reload-video').addEventListener('click', function() {
        const iframe = document.querySelector('.youtube-player-container iframe');
        if (iframe) {
            iframe.src = iframe.src;
            fallback.style.display = 'none';
        }
    });
    
    return fallback;
}

// Initialize YouTube when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize chapters
    initYouTubeChapters();
    
    // Try to load YouTube API
    loadYouTubeAPI();
    
    // Add error handling
    handleYouTubeError();
    
    // Alternative chapter navigation for mobile/touch
    setupTouchFriendlyChapters();
});

function setupTouchFriendlyChapters() {
    const chapters = document.querySelector('.video-chapters');
    if (!chapters) return;
    
    chapters.style.cursor = 'pointer';
    
    // Make chapters more touch-friendly
    document.querySelectorAll('.chapter-item').forEach(item => {
        item.style.touchAction = 'manipulation';
        item.style.webkitTapHighlightColor = 'rgba(0,212,170,0.2)';
    });
}

// Add this CSS to your style.css
const youtubeFixStyle = `
    .video-timestamp-notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, rgba(0,212,170,0.9) 0%, rgba(108,99,255,0.9) 100%);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: var(--border-radius);
        z-index: 10000;
        box-shadow: var(--shadow-lg);
        font-weight: 600;
        max-width: 300px;
        animation: slideInRight 0.3s ease;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255,255,255,0.2);
    }
    
    .video-timestamp-notification.fade-out {
        animation: slideOutRight 0.3s ease;
        opacity: 0;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .notification-content i {
        font-size: 1.2rem;
    }
    
    .notification-title {
        font-size: 0.9rem;
        opacity: 0.9;
        margin-bottom: 2px;
    }
    
    .notification-time {
        font-size: 1.1rem;
    }
    
    .video-fallback {
        display: none;
        margin-top: 2rem;
        text-align: center;
        padding: 2rem;
        background: var(--gradient-glass);
        border-radius: var(--border-radius);
        border: 1px solid rgba(255,255,255,0.1);
    }
    
    .fallback-message p {
        margin-bottom: 1rem;
        color: rgba(255,255,255,0.8);
    }
    
    .fallback-message i {
        color: var(--accent);
        margin-right: 0.5rem;
    }
    
    .fallback-options {
        display: flex;
        gap: 1rem;
        justify-content: center;
        flex-wrap: wrap;
    }
    
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    /* Improve touch experience */
    .chapter-item {
        -webkit-tap-highlight-color: transparent;
    }
    
    /* Ensure YouTube iframe is responsive */
    .youtube-player-container {
        position: relative;
        width: 100%;
        padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
        height: 0;
        overflow: hidden;
        border-radius: var(--border-radius-lg);
        background: #000;
        box-shadow: var(--shadow-lg);
        margin-bottom: 2rem;
    }
    
    .youtube-player-container iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border: none;
    }
`;

// Inject the CSS
const styleElement = document.createElement('style');
styleElement.textContent = youtubeFixStyle;
document.head.appendChild(styleElement);