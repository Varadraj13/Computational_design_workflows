// Wait for the DOM to be fully loaded before running the code
document.addEventListener("DOMContentLoaded", function () {
    // Get a reference to the button using its ID
    const button = document.getElementById("changeTextBtn");

    // Get a reference to the paragraph we want to change
    const text = document.getElementById("dynamicText");

    // Array of interesting facts about Wong Kar-wai's films
    const filmFacts = [
        "🎬 'In the Mood for Love' was shot without a complete script - Wong Kar-wai developed the story day by day during filming.",
        "🎭 Maggie Cheung wore 23 different cheongsam dresses in 'In the Mood for Love', each representing a different emotional state.",
        "📽️ 'Chungking Express' was filmed in just 23 days while Wong Kar-wai was taking a break from editing 'Ashes of Time'.",
        "🌧️ The rain in Wong Kar-wai's films is often artificial - he uses sprinklers to create the moody, atmospheric effect.",
        "🎵 'Happy Together' was originally titled 'Buenos Aires Affair' and was inspired by Manuel Puig's novel.",
        "⏰ The number '2046' appears in multiple Wong Kar-wai films - it's the year Hong Kong's 'one country, two systems' policy expires.",
        "🎨 Christopher Doyle, Wong's frequent cinematographer, describes their collaboration as 'painting with light and time'.",
        "🏆 'In the Mood for Love' was voted the 24th greatest film of all time in the 2022 Sight & Sound poll.",
        "🎪 'Fallen Angels' was originally conceived as the third story in 'Chungking Express' but grew into its own feature.",
        "🎭 Tony Leung has appeared in 7 of Wong Kar-wai's films, making him the director's most frequent collaborator.",
        "📱 The famous 'California Dreamin'' sequence in 'Chungking Express' was filmed in a real Hong Kong apartment.",
        "🎬 'The Grandmaster' took 10 years to complete, with Wong Kar-wai researching martial arts history extensively.",
        "🎵 Wong Kar-wai often uses music from the 1960s to create nostalgia and emotional resonance in his films.",
        "🎭 Leslie Cheung's character in 'Days of Being Wild' was inspired by James Dean's performance in 'Rebel Without a Cause'.",
        "📽️ 'My Blueberry Nights' was Wong Kar-wai's first English-language film and his first feature shot in the United States.",
        "🎨 The distinctive color palette in Wong Kar-wai's films often features reds, greens, and blues to create emotional contrast.",
        "⏰ Many of Wong's films explore the theme of time - how it passes, how we remember, and how we try to recapture moments.",
        "🎭 The slow-motion sequences in Wong's films are often used to emphasize emotional moments and create dreamlike quality.",
        "📱 'Blossoms Shanghai' is Wong Kar-wai's first television series, adapting Jin Yucheng's novel about 1990s Shanghai.",
        "🎬 Wong Kar-wai is known for his meticulous attention to detail - he often shoots hundreds of takes for a single scene."
    ];

    // Add an event listener to the button
    button.addEventListener("click", function () {
        // Get a random fact from the array
        const randomFact = filmFacts[Math.floor(Math.random() * filmFacts.length)];
        
        // Change the text content when the button is clicked
        text.textContent = randomFact;
        
        // Add a subtle animation effect
        text.style.transform = "scale(1.05)";
        setTimeout(() => {
            text.style.transform = "scale(1)";
        }, 200);
    });
});

// p5.js sketch for the 3D sphere
let sphereSketch = function(p) {
    let sphereSize = 50;
    let rotationX = 0;
    let rotationY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;
    let zoomLevel = 1;
    let targetZoomLevel = 1;

    p.setup = function() {
        let canvas = p.createCanvas(200, 200, p.WEBGL);
        canvas.parent('sphere-container');
        p.frameRate(60);
    };

    p.draw = function() {
        // Clear the canvas with a semi-transparent background
        p.background(255, 255, 255, 50);
        
        // Smooth rotation interpolation
        rotationX = p.lerp(rotationX, targetRotationX, 0.1);
        rotationY = p.lerp(rotationY, targetRotationY, 0.1);
        zoomLevel = p.lerp(zoomLevel, targetZoomLevel, 0.1);
        
        // Apply transformations
        p.push();
        p.translate(0, 0, 0);
        p.rotateX(rotationX);
        p.rotateY(rotationY);
        p.scale(zoomLevel);
        
        // Create the sphere with gradient material
        p.noStroke();
        
        // Create a gradient effect by drawing multiple spheres
        for (let i = 0; i < 3; i++) {
            let alpha = 100 - i * 30;
            let size = sphereSize - i * 5;
            p.fill(78, 205, 196, alpha); // Teal color matching the website theme
            p.sphere(size);
        }
        
        // Add some ambient lighting effect
        p.ambientLight(255, 255, 255, 50);
        p.directionalLight(255, 255, 255, 0, 1, -1);
        
        p.pop();
    };

    p.mouseMoved = function() {
        // Get mouse position relative to the sphere container
        let container = document.getElementById('sphere-container');
        let rect = container.getBoundingClientRect();
        let mouseX = p.mouseX - rect.left - 100; // Center relative to container
        let mouseY = p.mouseY - rect.top - 100;
        
        // Calculate distance from center
        let distance = p.sqrt(mouseX * mouseX + mouseY * mouseY);
        let maxDistance = 100;
        
        // Map mouse position to rotation
        targetRotationX = p.map(mouseY, -100, 100, -p.PI/4, p.PI/4);
        targetRotationY = p.map(mouseX, -100, 100, -p.PI/4, p.PI/4);
        
        // Zoom effect based on distance from center
        if (distance < maxDistance) {
            targetZoomLevel = p.map(distance, 0, maxDistance, 1.5, 1.0);
        } else {
            targetZoomLevel = 1.0;
        }
    };

    p.mouseOut = function() {
        // Reset to default state when mouse leaves
        targetRotationX = 0;
        targetRotationY = 0;
        targetZoomLevel = 1.0;
    };
};

// Initialize the p5.js sketch
new p5(sphereSketch);

// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Loading Screen
window.addEventListener('load', () => {
    const loadingScreen = document.querySelector('.loading-screen');
    const mainContent = document.querySelector('.main-content');

    gsap.to(loadingScreen, {
        opacity: 0,
        duration: 1,
        onComplete: () => {
            loadingScreen.style.display = 'none';

            // ✨ Show your actual website
            mainContent.style.display = 'block';
            gsap.fromTo(mainContent, { opacity: 0 }, { opacity: 1, duration: 1 });

            // Now start your animations
            initAnimations();
        }
    });
});


// Theme Toggle
const themeBtn = document.getElementById('themeBtn');
const body = document.body;

themeBtn.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    body.setAttribute('data-theme', newTheme);
    
    // Animate theme transition
    gsap.to(body, {
        duration: 0.5,
        ease: 'power2.inOut'
    });
    
    // Update button icon
    const lightIcon = themeBtn.querySelector('.light-icon');
    const darkIcon = themeBtn.querySelector('.dark-icon');
    
    if (newTheme === 'light') {
        gsap.to(lightIcon, { opacity: 1, duration: 0.3 });
        gsap.to(darkIcon, { opacity: 0, duration: 0.3 });
    } else {
        gsap.to(lightIcon, { opacity: 0, duration: 0.3 });
        gsap.to(darkIcon, { opacity: 1, duration: 0.3 });
    }
});

// Typewriter Effect
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

// Initialize all animations
function initAnimations() {
    // Typewriter effect for hero section
    const typewriterElement = document.getElementById('typewriter');
    const typewriterText = "Hong Kong's master of mood, memory, and melancholy. A director who paints with light, time, and the spaces between people.";
    
    // Start typewriter after a delay
    setTimeout(() => {
        typeWriter(typewriterElement, typewriterText, 50);
    }, 1000);

    // Hero section animations
    gsap.from('.hero-title .title-line', {
        y: 100,
        opacity: 0,
        duration: 1.5,
        stagger: 0.3,
        ease: 'power3.out'
    });

    gsap.from('.floating-elements .float-element', {
        y: 50,
        opacity: 0,
        duration: 2,
        stagger: 0.2,
        ease: 'power2.out'
    });

    // Floating elements parallax effect
    const floatElements = document.querySelectorAll('.float-element');
    floatElements.forEach(element => {
        const speed = element.getAttribute('data-speed');
        
        gsap.to(element, {
            y: -100,
            duration: 10,
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut',
            delay: Math.random() * 2
        });
    });

    // Scroll-triggered animations
    gsap.from('.favorite-section .section-title', {
        scrollTrigger: {
            trigger: '.favorite-section',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        x: -100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });

    gsap.from('.handwritten-text p', {
        scrollTrigger: {
            trigger: '.favorite-section',
            start: 'top 70%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.3,
        ease: 'power3.out'
    });

    gsap.from('.image-content', {
        scrollTrigger: {
            trigger: '.favorite-section',
            start: 'top 70%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        x: 100,
        opacity: 0,
        duration: 1.5,
        ease: 'power3.out'
    });

    // Film cards animations
    gsap.from('.film-card', {
        scrollTrigger: {
            trigger: '.films-section',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out'
    });

    // Vibe meters animations
    gsap.from('.vibe-card', {
        scrollTrigger: {
            trigger: '.vibe-section',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        scale: 0.8,
        opacity: 0,
        duration: 1,
        stagger: 0.3,
        ease: 'back.out(1.7)'
    });

    // Animate vibe meters
    const meterFills = document.querySelectorAll('.meter-fill');
    meterFills.forEach(meter => {
        const value = meter.getAttribute('data-value');
        
        gsap.to(meter, {
            width: `${value}%`,
            duration: 2,
            delay: 1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: meter,
                start: 'top 90%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Outro section animations
    gsap.from('.wkw-quote', {
        scrollTrigger: {
            trigger: '.outro-section',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 1.5,
        ease: 'power3.out'
    });

    gsap.from('.transmission-text', {
        scrollTrigger: {
            trigger: '.outro-section',
            start: 'top 70%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.5,
        ease: 'power3.out'
    });

    // Navigation active state
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Smooth scrolling for navigation
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            gsap.to(window, {
                duration: 1.5,
                scrollTo: targetSection,
                ease: 'power3.inOut'
            });
        });
    });

    // Film card hover effects
    const filmCards = document.querySelectorAll('.film-card');
    filmCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                scale: 1.05,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        // Play overlay animation
        const playOverlay = card.querySelector('.play-overlay');
        card.addEventListener('mouseenter', () => {
            gsap.to(playOverlay, {
                opacity: 1,
                scale: 1.2,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(playOverlay, {
                opacity: 0,
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });

    // VHS flicker effect
    const vhsOverlay = document.querySelector('.vhs-overlay');
    setInterval(() => {
        gsap.to(vhsOverlay, {
            opacity: Math.random() * 0.3 + 0.1,
            duration: 0.1,
            ease: 'none'
        });
    }, 100);

    // CRT scanlines effect
    const scanlines = document.querySelector('.scanlines');
    gsap.to(scanlines, {
        y: '100%',
        duration: 0.1,
        repeat: -1,
        ease: 'none'
    });

    // Glitch effect for image content
    const glitchOverlay = document.querySelector('.glitch-overlay');
    setInterval(() => {
        gsap.to(glitchOverlay, {
            opacity: Math.random() * 0.3,
            duration: 0.1,
            ease: 'none'
        });
    }, 3000);

    // Parallax effect for slow zoom background
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const slowZoomBg = document.querySelector('.slow-zoom-bg');
        const speed = scrolled * 0.5;
        
        gsap.set(slowZoomBg, {
            y: speed,
            scale: 1 + (scrolled * 0.0001)
        });
    });

    // Add some random glitch effects
    setInterval(() => {
        const randomElement = document.querySelector('.hero-title');
        if (randomElement) {
            gsap.to(randomElement, {
                x: Math.random() * 10 - 5,
                duration: 0.1,
                ease: 'none',
                onComplete: () => {
                    gsap.to(randomElement, {
                        x: 0,
                        duration: 0.1,
                        ease: 'none'
                    });
                }
            });
        }
    }, 5000);

    // Initialize floating elements with different speeds
    const floatingElements = document.querySelectorAll('.float-element');
    floatingElements.forEach((element, index) => {
        const speed = 3 + index * 2;
        const delay = index * 0.5;
        
        gsap.to(element, {
            y: -50,
            rotation: 360,
            duration: speed,
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut',
            delay: delay
        });
    });
}

// Add GSAP ScrollTo plugin for smooth scrolling
gsap.registerPlugin(ScrollToPlugin);

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Set initial theme
    body.setAttribute('data-theme', 'dark');
    
    // Show light icon initially
    const lightIcon = themeBtn.querySelector('.light-icon');
    const darkIcon = themeBtn.querySelector('.dark-icon');
    gsap.set(lightIcon, { opacity: 0 });
    gsap.set(darkIcon, { opacity: 1 });
    
    // Add some ambient sound effects (optional)
    // You can add audio files and play them on certain interactions
    
    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        switch(e.key) {
            case 'ArrowUp':
                e.preventDefault();
                gsap.to(window, {
                    duration: 1,
                    scrollTo: '-=100vh',
                    ease: 'power3.inOut'
                });
                break;
            case 'ArrowDown':
                e.preventDefault();
                gsap.to(window, {
                    duration: 1,
                    scrollTo: '+=100vh',
                    ease: 'power3.inOut'
                });
                break;
            case ' ':
                e.preventDefault();
                // Toggle theme with spacebar
                themeBtn.click();
                break;
        }
    });
});

// Add some retro console logging for fun
console.log('%c🎬 Welcome to the Wong Kar-wai Vibe-Coded Cinema! 🎬', 'color: #ff0080; font-size: 20px; font-weight: bold;');
console.log('%c🌆 Urban loneliness, romantic melancholy, neon ambiance... 🌆', 'color: #00ffff; font-size: 14px;');
console.log('%c💔 "In the mood for love, in the mood for life." 💔', 'color: #8b00ff; font-size: 12px; font-style: italic;');
