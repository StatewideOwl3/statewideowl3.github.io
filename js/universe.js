/**
 * Universe.js - Creates the 3D background with stars and particles
 */

class Universe {
    constructor() {
        this.canvas = document.getElementById('universe-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.stars = [];
        this.particles = [];
        this.numStars = Math.floor((this.width + this.height) / 8);
        this.numParticles = Math.floor((this.width + this.height) / 100);
        
        // Ensure canvas doesn't interfere with interactions
        this.canvas.style.pointerEvents = 'none';
        
        this.mouse = {
            x: 0,
            y: 0,
            px: 0,
            py: 0,
            active: false
        };

        this.init();
    }

    init() {
        // Set canvas dimensions
        this.canvas.width = this.width;
        this.canvas.height = this.height;

        // Create stars
        for (let i = 0; i < this.numStars; i++) {
            this.stars.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                size: Math.random() * 2,
                opacity: Math.random() * 0.8 + 0.2
            });
        }

        // Create particles
        for (let i = 0; i < this.numParticles; i++) {
            this.particles.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                size: Math.random() * 3 + 1,
                vx: Math.random() * 0.2 - 0.1,
                vy: Math.random() * 0.2 - 0.1,
                opacity: Math.random() * 0.5 + 0.3,
                color: this.getRandomColor()
            });
        }

        // Setup mouse events
        window.addEventListener('mousemove', (e) => {
            this.mouse.px = this.mouse.x;
            this.mouse.py = this.mouse.y;
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
            this.mouse.active = true;
        });

        window.addEventListener('mouseout', () => {
            this.mouse.active = false;
        });

        // Handle window resize
        window.addEventListener('resize', () => this.handleResize());

        // Start animation loop
        this.animate();
    }

    handleResize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;

        // Adjust star count
        const targetStarCount = Math.floor((this.width + this.height) / 8);
        if (targetStarCount > this.stars.length) {
            const starsToAdd = targetStarCount - this.stars.length;
            for (let i = 0; i < starsToAdd; i++) {
                this.stars.push({
                    x: Math.random() * this.width,
                    y: Math.random() * this.height,
                    size: Math.random() * 2,
                    opacity: Math.random() * 0.8 + 0.2
                });
            }
        } else if (targetStarCount < this.stars.length) {
            this.stars = this.stars.slice(0, targetStarCount);
        }
    }

    getRandomColor() {
        const colors = [
            'rgba(65, 105, 225, 0.8)',  // Royal Blue
            'rgba(123, 104, 238, 0.8)', // Medium Slate Blue
            'rgba(0, 191, 255, 0.8)',   // Deep Sky Blue
            'rgba(72, 209, 204, 0.8)',  // Medium Turquoise
            'rgba(138, 43, 226, 0.8)',  // Blue Violet
            'rgba(75, 0, 130, 0.8)'     // Indigo
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    animate() {
        // Clear canvas
        this.ctx.fillStyle = 'rgba(5, 7, 21, 0.3)';  // Slightly transparent black for motion trail
        this.ctx.fillRect(0, 0, this.width, this.height);

        // Draw and update stars
        this.stars.forEach(star => {
            this.ctx.beginPath();
            this.ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
            this.ctx.fill();

            // Subtle twinkling
            star.opacity += (Math.random() - 0.5) * 0.01;
            star.opacity = Math.max(0.2, Math.min(1, star.opacity));
        });

        // Draw and update particles
        this.particles.forEach(particle => {
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color.replace('0.8', particle.opacity.toString());
            this.ctx.fill();

            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Mouse interaction
            if (this.mouse.active) {
                const dx = this.mouse.x - particle.x;
                const dy = this.mouse.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    const force = 0.5 / distance;
                    particle.vx -= dx * force;
                    particle.vy -= dy * force;
                }
            }

            // Add some randomness
            particle.vx += (Math.random() - 0.5) * 0.02;
            particle.vy += (Math.random() - 0.5) * 0.02;
            
            // Limit velocity
            const speed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
            if (speed > 1) {
                particle.vx = (particle.vx / speed) * 1;
                particle.vy = (particle.vy / speed) * 1;
            }

            // Boundary check with wrapping
            if (particle.x < 0) particle.x = this.width;
            if (particle.x > this.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.height;
            if (particle.y > this.height) particle.y = 0;
        });

        // Draw connections between nearby particles
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const p1 = this.particles[i];
                const p2 = this.particles[j];
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(p1.x, p1.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.strokeStyle = `rgba(255, 255, 255, ${(1 - distance / 100) * 0.3})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.stroke();
                }
            }
        }

        requestAnimationFrame(() => this.animate());
    }
}

// Initialize the universe when the page loads
window.addEventListener('load', () => {
    const loadingScreen = document.querySelector('.loading-screen');
    
    // Simulate loading for effect
    setTimeout(() => {
        const universe = new Universe();
        
        // Fade out loading screen
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 1000);
    }, 2000);
});
