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

// Theme Toggle
const themeBtn = document.getElementById('themeBtn');
const body = document.body;

themeBtn.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    body.setAttribute('data-theme', newTheme);
    
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

// Initialize animations when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Set initial theme
    body.setAttribute('data-theme', 'dark');
    
    // Show dark icon initially
    const lightIcon = themeBtn.querySelector('.light-icon');
    const darkIcon = themeBtn.querySelector('.dark-icon');
    gsap.set(lightIcon, { opacity: 0 });
    gsap.set(darkIcon, { opacity: 1 });
    
    // TEST ANIMATION 1: Gentle title glow effect
    const titleLines = document.querySelectorAll('.title-line');
    gsap.to(titleLines, {
        textShadow: '0 0 40px rgba(255, 0, 128, 0.8)',
        duration: 2,
        stagger: 0.5,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut'
    });
    
    // TEST ANIMATION 2: Floating elements - FIXED VERSION
    const floatElements = document.querySelectorAll('.float-element');
    console.log('Found floating elements:', floatElements.length); // Debug log
    
    floatElements.forEach((element, index) => {
        // Make sure elements are visible
        gsap.set(element, { opacity: 0.7 });
        
        // Create a simple floating animation
        gsap.to(element, {
            y: -20,
            duration: 2 + index,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: index * 0.3
        });
        
        // Add a subtle rotation
        gsap.to(element, {
            rotation: 5,
            duration: 3 + index,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: index * 0.5
        });
    });
    
    // Initialize vibe meters
    const meterFills = document.querySelectorAll('.meter-fill');
    meterFills.forEach(meter => {
        const value = meter.getAttribute('data-value');
        gsap.to(meter, {
            width: `${value}%`,
            duration: 2,
            delay: 0.5,
            ease: 'power2.out'
        });
    });

    // Navigation active state
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
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
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
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

    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        switch(e.key) {
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

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Theme Toggle
const themeBtn = document.getElementById('themeBtn');
const body = document.body;

themeBtn.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    body.setAttribute('data-theme', newTheme);
    
    // Update theme in localStorage
    localStorage.setItem('theme', newTheme);
});

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.setAttribute('data-theme', savedTheme);
}

// Title Glow Effect
gsap.to('.hero-title', {
    textShadow: '0 0 30px rgba(255, 0, 128, 0.8), 0 0 60px rgba(255, 0, 128, 0.4)',
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: 'power2.inOut'
});

// Floating Elements Animation
const floatingElements = document.querySelectorAll('.float-element');
console.log('Found floating elements:', floatingElements.length);

floatingElements.forEach((element, index) => {
    const speed = parseFloat(element.dataset.speed) || 0.5;
    const delay = index * 0.5;
    
    gsap.set(element, { opacity: 0.7 });
    
    gsap.to(element, {
        y: -30,
        x: Math.random() * 20 - 10,
        duration: 3 + speed * 2,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut',
        delay: delay
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active Navigation
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

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

// Film Card Interactions
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
});

// Vibe Meters Animation
const vibeMeters = document.querySelectorAll('.meter-fill');
vibeMeters.forEach(meter => {
    const value = meter.dataset.value;
    gsap.to(meter, {
        width: `${value}%`,
        duration: 2,
        delay: 1,
        ease: 'power2.out'
    });
});

// p5.js Sketch for Atmospheric Effects
let particles = [];
let neonLines = [];
let mouseX = 0;
let mouseY = 0;

function setup() {
    const canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('p5-canvas-container');
    
    // Create atmospheric particles
    for (let i = 0; i < 50; i++) {
        particles.push(new Particle());
    }
    
    // Create neon line effects
    for (let i = 0; i < 5; i++) {
        neonLines.push(new NeonLine());
    }
}

function draw() {
    // Semi-transparent background for trail effect
    fill(10, 10, 10, 20);
    noStroke();
    rect(0, 0, width, height);
    
    // Update mouse position
    mouseX = mouseX * 0.9 + mouseX * 0.1;
    mouseY = mouseY * 0.9 + mouseY * 0.1;
    
    // Draw and update particles
    particles.forEach(particle => {
        particle.update();
        particle.display();
    });
    
    // Draw and update neon lines
    neonLines.forEach(line => {
        line.update();
        line.display();
    });
    
    // Add subtle scanlines effect
    drawScanlines();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

class Particle {
    constructor() {
        this.x = random(width);
        this.y = random(height);
        this.vx = random(-0.5, 0.5);
        this.vy = random(-0.5, 0.5);
        this.size = random(1, 3);
        this.alpha = random(50, 150);
        this.color = color(random([255, 0, 128], [139, 0, 255], [0, 255, 255]));
    }
    
    update() {
        this.x += this.vx;
        this.y += this.vy;
        
        // Wrap around edges
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
        
        // Subtle interaction with mouse
        let d = dist(this.x, this.y, mouseX, mouseY);
        if (d < 100) {
            let angle = atan2(mouseY - this.y, mouseX - this.x);
            this.vx += cos(angle) * 0.1;
            this.vy += sin(angle) * 0.1;
        }
        
        // Limit velocity
        this.vx = constrain(this.vx, -1, 1);
        this.vy = constrain(this.vy, -1, 1);
    }
    
    display() {
        noStroke();
        fill(red(this.color), green(this.color), blue(this.color), this.alpha);
        ellipse(this.x, this.y, this.size);
        
        // Add glow effect
        fill(red(this.color), green(this.color), blue(this.color), this.alpha * 0.3);
        ellipse(this.x, this.y, this.size * 3);
    }
}

class NeonLine {
    constructor() {
        this.x1 = random(width);
        this.y1 = random(height);
        this.x2 = this.x1 + random(-100, 100);
        this.y2 = this.y1 + random(-100, 100);
        this.alpha = random(30, 80);
        this.thickness = random(1, 3);
        this.color = color(random([255, 0, 128], [139, 0, 255]));
        this.pulse = 0;
    }
    
    update() {
        this.pulse += 0.05;
        this.alpha = 30 + sin(this.pulse) * 20;
        
        // Occasionally move the line
        if (random() < 0.01) {
            this.x1 = random(width);
            this.y1 = random(height);
            this.x2 = this.x1 + random(-100, 100);
            this.y2 = this.y1 + random(-100, 100);
        }
    }
    
    display() {
        stroke(red(this.color), green(this.color), blue(this.color), this.alpha);
        strokeWeight(this.thickness);
        line(this.x1, this.y1, this.x2, this.y2);
        
        // Add glow effect
        stroke(red(this.color), green(this.color), blue(this.color), this.alpha * 0.3);
        strokeWeight(this.thickness * 2);
        line(this.x1, this.y1, this.x2, this.y2);
    }
}

function drawScanlines() {
    stroke(255, 255, 255, 10);
    strokeWeight(1);
    for (let y = 0; y < height; y += 4) {
        line(0, y, width, y);
    }
}

// Mouse interaction
function mouseMoved() {
    mouseX = mouseX;
    mouseY = mouseY;
}

// Add some interactive elements when scrolling
window.addEventListener('scroll', () => {
    const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    
    // Adjust particle behavior based on scroll
    particles.forEach(particle => {
        particle.vx += random(-0.1, 0.1) * scrollPercent;
        particle.vy += random(-0.1, 0.1) * scrollPercent;
    });
});

// Add CRT flicker effect to outro section
const outroSection = document.querySelector('.outro-section');
if (outroSection) {
    setInterval(() => {
        if (Math.random() < 0.1) { // 10% chance every interval
            outroSection.style.filter = 'brightness(0.8) contrast(1.2)';
            setTimeout(() => {
                outroSection.style.filter = 'none';
            }, 100);
        }
    }, 2000);
}
