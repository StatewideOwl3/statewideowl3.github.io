/**
 * Main.js - Main initialization and application orchestration
 */

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize other components after loading screen
    window.addEventListener('load', () => {
        // Make sure navigation.js has run first
        setTimeout(() => {
            if (!window.portfolioNavigation) {
                console.error('Navigation not initialized!');
                return;
            }
            addParallaxEffect();
            initOrbsAnimation();
            setTimeout(() => {
                addNeuralPulseEffect();
            }, 500);
        }, 1000); // Reduced delay for better responsiveness
    });

    // Initialize form handling
    if (document.getElementById('contact-form')) {
        document.getElementById('contact-form').addEventListener('submit', function(e) {
            e.preventDefault();
            // In a real application, you would send the form data to a server
            alert('Form submitted successfully! (This is a demo)');
            this.reset();
        });
    }
});

// Add parallax effect to the universe background
function addParallaxEffect() {
    const content = document.querySelector('.content');
    const orbitSystem = document.querySelector('.orbit-system');
    
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        // Calculate movement amount based on mouse position
        const moveX = (x - 0.5) * 20; // 20px max movement
        const moveY = (y - 0.5) * 20;
        
        // Apply parallax effect to different elements
        content.style.transform = `translate(${moveX * 0.5}px, ${moveY * 0.5}px)`;
        orbitSystem.style.transform = `translate(${moveX * 0.8}px, ${moveY * 0.8}px)`;
        
        // Adjust orbit system rotation slightly based on mouse position for extra depth
        const rotateX = (y - 0.5) * 5; // 5 degrees max rotation
        const rotateY = (x - 0.5) * 5;
        orbitSystem.style.transform += ` rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
}

// Initialize orbs animation and interaction
function initOrbsAnimation() {
    const orbs = document.querySelectorAll('.orb');
    
    orbs.forEach((orb, index) => {
        // Initial animation setup
        orb.style.opacity = '0';
        orb.style.transform = 'scale(0.5)';
        
        // Fade in each orb with a delay
        setTimeout(() => {
            orb.style.transition = 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            orb.style.opacity = '1';
            orb.style.transform = 'scale(1)';

            // Add counter-rotation after fade in
            const parentOrbit = orb.closest('.orbit');
            if (parentOrbit) {
                const isReverse = parentOrbit.style.animation.includes('reverse');
                orb.style.animation = `counter-rotate ${isReverse ? '80s' : '80s'} linear infinite ${isReverse ? '' : 'reverse'}`;
            }
        }, 300 + index * 200);

        // Hover effects with counter-rotation preservation
        orb.addEventListener('mouseenter', () => {
            if (!orb.classList.contains('active')) {
                const currentRotation = getComputedStyle(orb).animation;
                orb.style.transform = 'scale(1.2)';
                orb.style.zIndex = '100';
                // Preserve the counter-rotation during hover
                orb.style.animation = currentRotation;
            }
        });

        orb.addEventListener('mouseleave', () => {
            if (!orb.classList.contains('active')) {
                const currentRotation = getComputedStyle(orb).animation;
                orb.style.transform = 'scale(1)';
                orb.style.zIndex = '5';
                // Restore the counter-rotation after hover
                orb.style.animation = currentRotation;
            }
        });

        // Prevent orbit rotation from affecting click handling
        orb.addEventListener('click', (e) => {
            e.stopPropagation();
            const section = orb.getAttribute('data-section');
            const navigation = window.portfolioNavigation;
            if (navigation) {
                // Store current rotation state
                const currentRotation = getComputedStyle(orb).animation;
                navigation.openSection(section);
                // Restore rotation after click
                setTimeout(() => {
                    orb.style.animation = currentRotation;
                }, 100);
            }
        });
    });
}

// Helper function for section transitions
function transitionToSection(section) {
    const sectionView = document.querySelector('.section-view');
    const contentContainer = document.querySelector('.section-content');
    
    // Clear current content
    contentContainer.innerHTML = '';
    
    // Add new content based on section
    const template = document.getElementById(`${section}-template`);
    if (template) {
        contentContainer.appendChild(template.content.cloneNode(true));
    }
    
    // Show the section view
    sectionView.classList.add('active');
}

// Add neural/cosmic pulse effect
function addNeuralPulseEffect() {
    const canvas = document.createElement('canvas');
    canvas.id = 'neural-pulse';
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1';
    document.querySelector('.universe-container').appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const pulses = [];
    
    function createPulse(x, y) {
        pulses.push({
            x: x,
            y: y,
            radius: 5,
            maxRadius: 100,
            opacity: 1,
            color: getRandomColor()
        });
    }
    
    function getRandomColor() {
        const colors = [
            'rgba(65, 105, 225, ',  // Royal Blue
            'rgba(123, 104, 238, ', // Medium Slate Blue
            'rgba(0, 191, 255, ',   // Deep Sky Blue
            'rgba(72, 209, 204, ',  // Medium Turquoise
            'rgba(138, 43, 226, ',  // Blue Violet
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    function animatePulses() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < pulses.length; i++) {
            const pulse = pulses[i];
            
            // Draw pulse
            ctx.beginPath();
            ctx.arc(pulse.x, pulse.y, pulse.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'transparent';
            ctx.strokeStyle = pulse.color + pulse.opacity + ')';
            ctx.lineWidth = 2;
            ctx.stroke();
            
            // Update pulse
            pulse.radius += 2;
            pulse.opacity -= 0.02;
            
            // Remove old pulses
            if (pulse.opacity <= 0) {
                pulses.splice(i, 1);
                i--;
            }
        }
        
        requestAnimationFrame(animatePulses);
    }
    
    // Create random pulses periodically
    setInterval(() => {
        createPulse(
            Math.random() * canvas.width,
            Math.random() * canvas.height
        );
    }, 1000);
    
    // Start animation
    animatePulses();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Initialize neural pulse effect after loading
window.addEventListener('load', () => {
    setTimeout(() => {
        addNeuralPulseEffect();
    }, 3000); // After the main elements have appeared
});
