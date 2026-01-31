/* =====================================================
   ALL IN SNACKS - JAVASCRIPT
   Animations, Interactions & Effects
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initNavigation();
    initScrollAnimations();
    initParallaxEffects();
    initMenuModal();
    initCounterAnimation();
    init3DCardEffects();
    initSmoothScroll();
    initFoodCarousel();
});

/* =====================================================
   NAVIGATION
   ===================================================== */
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Scroll effect for navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Active link highlighting
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            const link = document.querySelector(`.nav-link[href="#${id}"]`);

            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(l => l.classList.remove('active'));
                if (link) link.classList.add('active');
            }
        });
    });
}

/* =====================================================
   SCROLL ANIMATIONS
   ===================================================== */
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add stagger effect for grid items
                const parent = entry.target.parentElement;
                if (parent && parent.classList.contains('about-content') || 
                    parent && parent.classList.contains('specials-grid') ||
                    parent && parent.classList.contains('stats-grid')) {
                    const siblings = parent.querySelectorAll('.animate-on-scroll');
                    siblings.forEach((sibling, index) => {
                        sibling.style.transitionDelay = `${index * 0.15}s`;
                    });
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

/* =====================================================
   PARALLAX EFFECTS
   ===================================================== */
function initParallaxEffects() {
    const floatingCards = document.querySelectorAll('.floating-cards .card');
    const floatingIngredients = document.querySelectorAll('.floating-ingredient');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // Floating cards parallax
        floatingCards.forEach((card, index) => {
            const speed = 0.05 + (index * 0.02);
            card.style.transform = `translateY(${scrollY * speed}px) rotate(${scrollY * 0.02}deg)`;
        });
    });

    // Mouse parallax for hero section
    const hero = document.querySelector('.hero');
    const burger = document.querySelector('.burger-3d');

    if (hero && burger) {
        hero.addEventListener('mousemove', (e) => {
            const rect = hero.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) / 50;
            const y = (e.clientY - rect.top - rect.height / 2) / 50;

            burger.style.transform = `translateY(-15px) rotateX(${-10 - y}deg) rotateY(${-5 + x}deg)`;
        });

        hero.addEventListener('mouseleave', () => {
            burger.style.transform = '';
        });
    }

    // Parallax for floating ingredients
    if (floatingIngredients.length > 0) {
        hero.addEventListener('mousemove', (e) => {
            const rect = hero.getBoundingClientRect();
            floatingIngredients.forEach((ing, index) => {
                const speed = 0.02 + (index * 0.01);
                const x = (e.clientX - rect.left - rect.width / 2) * speed;
                const y = (e.clientY - rect.top - rect.height / 2) * speed;
                ing.style.transform = `translate(${x}px, ${y}px)`;
            });
        });
    }
}

/* =====================================================
   MENU MODAL
   ===================================================== */
function initMenuModal() {
    const menuRefImage = document.getElementById('menuRefImage');
    const modal = document.getElementById('menuModal');
    const modalClose = document.querySelector('.modal-close');

    if (menuRefImage && modal) {
        menuRefImage.addEventListener('click', () => {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        modalClose.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

/* =====================================================
   COUNTER ANIMATION
   ===================================================== */
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    let animated = false;

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animated = true;
                counters.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-count'));
                    const duration = 2000;
                    const step = target / (duration / 16);
                    let current = 0;

                    const updateCounter = () => {
                        current += step;
                        if (current < target) {
                            counter.textContent = Math.floor(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target;
                        }
                    };

                    updateCounter();
                });
            }
        });
    }, observerOptions);

    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        observer.observe(statsSection);
    }
}

/* =====================================================
   3D CARD EFFECTS
   ===================================================== */
function init3DCardEffects() {
    const cards = document.querySelectorAll('.card-3d, .special-card, .info-card, .menu-category');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

/* =====================================================
   SMOOTH SCROLL
   ===================================================== */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* =====================================================
   TILT EFFECT FOR BURGER
   ===================================================== */
const burger3d = document.querySelector('.burger-3d');
if (burger3d) {
    burger3d.addEventListener('mouseenter', () => {
        burger3d.style.animationPlayState = 'paused';
    });
    
    burger3d.addEventListener('mouseleave', () => {
        burger3d.style.animationPlayState = 'running';
    });
}

/* =====================================================
   CARD SHUFFLE ANIMATION (EASTER EGG)
   ===================================================== */
let clickCount = 0;
const burgerElement = document.querySelector('.burger-3d');

if (burgerElement) {
    burgerElement.addEventListener('click', () => {
        clickCount++;
        if (clickCount >= 5) {
            triggerCardShuffle();
            clickCount = 0;
        }
    });
}

function triggerCardShuffle() {
    const suits = ['♠', '♥', '♦', '♣'];
    const container = document.body;
    
    for (let i = 0; i < 52; i++) {
        const card = document.createElement('div');
        card.className = 'shuffle-card';
        card.textContent = suits[i % 4];
        card.style.cssText = `
            position: fixed;
            font-size: 3rem;
            color: ${i % 2 === 0 ? '#fff' : '#e63946'};
            z-index: 9999;
            pointer-events: none;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            animation: shuffle ${1 + Math.random()}s ease-out forwards;
            animation-delay: ${i * 0.02}s;
        `;
        container.appendChild(card);
        
        setTimeout(() => card.remove(), 2000);
    }
    
    // Add keyframe animation dynamically
    if (!document.querySelector('#shuffle-style')) {
        const style = document.createElement('style');
        style.id = 'shuffle-style';
        style.textContent = `
            @keyframes shuffle {
                0% {
                    transform: translate(-50%, -50%) rotate(0deg) scale(1);
                    opacity: 1;
                }
                100% {
                    transform: translate(
                        calc(-50% + ${(Math.random() - 0.5) * 200}vw),
                        calc(-50% + ${(Math.random() - 0.5) * 200}vh)
                    ) rotate(${Math.random() * 720}deg) scale(0);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

/* =====================================================
   PRELOADER (Optional)
   ===================================================== */
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Trigger initial animations
    setTimeout(() => {
        document.querySelectorAll('.hero .animate-on-scroll').forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('visible');
            }, index * 200);
        });
    }, 100);
});

/* =====================================================
   HOVER SOUND EFFECT (Optional - Commented Out)
   ===================================================== */
/*
const buttons = document.querySelectorAll('.btn');
const hoverSound = new Audio('hover.mp3');
hoverSound.volume = 0.1;

buttons.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        hoverSound.currentTime = 0;
        hoverSound.play();
    });
});
*/

/* =====================================================
   RIPPLE EFFECT ON BUTTONS
   ===================================================== */
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.cssText = `
            position: absolute;
            width: 0;
            height: 0;
            background: rgba(255, 255, 255, 0.4);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            pointer-events: none;
            left: ${x}px;
            top: ${y}px;
            animation: ripple-effect 0.6s ease-out forwards;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple keyframes
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple-effect {
        to {
            width: 300px;
            height: 300px;
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

/* =====================================================
   TYPING EFFECT FOR TAGLINE
   ===================================================== */
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Optional: Apply typing effect to subtitle
// const subtitle = document.querySelector('.hero-subtitle');
// if (subtitle) {
//     const text = subtitle.textContent;
//     setTimeout(() => typeWriter(subtitle, text, 30), 1500);
// }

/* =====================================================
   FOOD CAROUSEL
   ===================================================== */
function initFoodCarousel() {
    const foodItems = document.querySelectorAll('.food-item');
    const indicators = document.querySelectorAll('.indicator');
    const labels = document.querySelectorAll('.food-label');
    const heroTitle = document.querySelector('.hero-main-title .title-word.highlight');
    
    const foodNames = ['BURGER', 'FRIES', 'OREO SHAKE'];
    let currentIndex = 0;
    let isAnimating = false;
    
    if (foodItems.length === 0) return;
    
    function showFood(index, direction = 'next') {
        if (isAnimating) return;
        isAnimating = true;
        
        const prevIndex = currentIndex;
        currentIndex = index;
        
        // Update food items
        foodItems.forEach((item, i) => {
            item.classList.remove('active', 'prev');
            if (i === currentIndex) {
                item.classList.add('active');
            } else if (i === prevIndex) {
                item.classList.add('prev');
            }
        });
        
        // Update indicators
        indicators.forEach((ind, i) => {
            ind.classList.toggle('active', i === currentIndex);
        });
        
        // Update labels
        labels.forEach((label, i) => {
            label.classList.toggle('active', i === currentIndex);
        });
        
        // Update hero title
        if (heroTitle) {
            heroTitle.style.opacity = '0';
            heroTitle.style.transform = 'translateY(20px)';
            setTimeout(() => {
                heroTitle.textContent = foodNames[currentIndex];
                heroTitle.style.opacity = '1';
                heroTitle.style.transform = 'translateY(0)';
            }, 200);
        }
        
        setTimeout(() => {
            isAnimating = false;
        }, 800);
    }
    
    function nextFood() {
        const next = (currentIndex + 1) % foodItems.length;
        showFood(next, 'next');
    }
    
    // Auto-rotate every 3 seconds
    let autoRotate = setInterval(nextFood, 3000);
    
    // Click on indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            clearInterval(autoRotate);
            showFood(index);
            autoRotate = setInterval(nextFood, 3000);
        });
    });
    
    // Click on labels
    labels.forEach((label, index) => {
        label.addEventListener('click', () => {
            clearInterval(autoRotate);
            showFood(index);
            autoRotate = setInterval(nextFood, 3000);
        });
    });
    
    // Pause on hover
    const carousel = document.querySelector('.food-carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', () => {
            clearInterval(autoRotate);
        });
        
        carousel.addEventListener('mouseleave', () => {
            autoRotate = setInterval(nextFood, 3000);
        });
    }
}

console.log('🃏 All In Snacks - Ready to serve winning flavors!');
