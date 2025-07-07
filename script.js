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
