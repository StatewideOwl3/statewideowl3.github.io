/**
 * Navigation.js - Handles section navigation and transitions
 */

class Navigation {
    constructor() {
        this.currentSection = null;
        this.activeOrb = null;
        this.isTransitioning = false;
        this.orbs = document.querySelectorAll('.orb');
        this.navButtons = document.querySelectorAll('.nav-button');
        this.closeButton = document.querySelector('.close-button');
        this.sectionView = document.querySelector('.section-view');
        this.sectionContent = document.querySelector('.section-content');
        this.homeButton = document.querySelector('.home-button');
        this.templates = {
            about: document.getElementById('about-template'),
            education: document.getElementById('education-template'),
            skills: document.getElementById('skills-template'),
            projects: document.getElementById('projects-template'),
            hobbies: document.getElementById('hobbies-template'),
            contact: document.getElementById('contact-template'),
            analyzer: document.getElementById('analyzer-template')
        };

        this.init();
    }

    init() {
        // Add click event to orbs
        this.orbs.forEach(orb => {
            orb.addEventListener('click', (e) => {
                // Prevent multiple clicks while animation is running
                if (this.activeOrb) return;
                
                const section = orb.getAttribute('data-section');
                const timestamp = new Date().toISOString();
                console.log(`${timestamp}, click, orb-${section}`);
                
                // Perform zoom animation before opening section
                this.zoomOrb(orb, () => {
                    // Only open the section if it's not already open
                    if (this.currentSection !== section) {
                        this.openSection(section);
                    }
                });
            });

            // Add custom hover effect with tilt and swing
            orb.addEventListener('mousemove', (e) => {
                // Prevent hover effect if any orb is already active or if we're in a section
                if (this.activeOrb || this.currentSection) return;
                
                const rect = orb.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                // Calculate tilt values, max 20 degrees
                const tiltX = y / (rect.height / 2) * 20;
                const tiltY = -x / (rect.width / 2) * 20;
                
                // Apply transform with horizontal swing (translateX)
                orb.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateX(-15px) scale(1.2)`;
                orb.style.zIndex = '100';
                
                // Enhance glow effect on hover
                const section = orb.getAttribute('data-section');
                let glowColor;
                
                switch(section) {
                    case 'about':
                        glowColor = 'rgba(123, 104, 238, 0.8)';
                        break;
                    case 'education':
                        glowColor = 'rgba(65, 105, 225, 0.8)';
                        break;
                    case 'skills':
                        glowColor = 'rgba(30, 144, 255, 0.8)';
                        break;
                    case 'projects':
                        glowColor = 'rgba(0, 191, 255, 0.8)';
                        break;
                    case 'hobbies':
                        glowColor = 'rgba(0, 206, 209, 0.8)';
                        break;
                    case 'contact':
                        glowColor = 'rgba(72, 209, 204, 0.8)';
                        break;
                    default:
                        glowColor = 'rgba(255, 255, 255, 0.8)';
                }
                
                orb.style.boxShadow = `0 0 30px ${glowColor}, 0 0 50px ${glowColor.replace('0.8', '0.4')}`;
            });
            
            // Reset on mouse leave
            orb.addEventListener('mouseleave', () => {
                // Only reset if this orb is not the active one
                if (this.activeOrb === orb) return;
                
                orb.style.transform = '';
                orb.style.zIndex = '5';
                
                // Reset glow to original
                this.resetOrbStyle(orb);
            });
        });

        // Add click event to nav buttons
        this.navButtons.forEach(button => {
            if (!button.classList.contains('home-button')) {
                button.addEventListener('click', () => {
                    const section = button.getAttribute('data-section');
                    this.openSection(section);
                });
            }
        });

        // Home button returns to main view
        this.homeButton.addEventListener('click', () => {
            this.closeSection();
        });

        // Close button
        this.closeButton.addEventListener('click', () => {
            this.closeSection();
        });

        // Handle escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.currentSection) {
                this.closeSection();
            }
        });

        // Contact form submission
        document.addEventListener('submit', (e) => {
            if (e.target.id === 'contact-form') {
                e.preventDefault();
                alert('Message sent! (This is a demo - no actual message was sent)');
                e.target.reset();
            }
        });
    }
    
    resetOrbStyle(orb) {
        const orbParent = orb.parentElement;
        if (orbParent.classList.contains('orbit-1')) {
            orb.style.boxShadow = 'inset -10px -10px 20px rgba(0,0,0,0.5), 0 0 20px rgba(123, 104, 238, 0.8)';
        } else if (orbParent.classList.contains('orbit-2')) {
            orb.style.boxShadow = 'inset -10px -10px 20px rgba(0,0,0,0.5), 0 0 20px rgba(65, 105, 225, 0.8)';
        } else if (orbParent.classList.contains('orbit-3')) {
            orb.style.boxShadow = 'inset -10px -10px 20px rgba(0,0,0,0.5), 0 0 20px rgba(30, 144, 255, 0.8)';
        } else if (orbParent.classList.contains('orbit-4')) {
            orb.style.boxShadow = 'inset -10px -10px 20px rgba(0,0,0,0.5), 0 0 20px rgba(0, 191, 255, 0.8)';
        } else if (orbParent.classList.contains('orbit-5')) {
            orb.style.boxShadow = 'inset -10px -10px 20px rgba(0,0,0,0.5), 0 0 20px rgba(0, 206, 209, 0.8)';
        } else if (orbParent.classList.contains('orbit-6')) {
            orb.style.boxShadow = 'inset -10px -10px 20px rgba(0,0,0,0.5), 0 0 20px rgba(72, 209, 204, 0.8)';
        }
    }
    
    zoomOrb(orb, callback) {
        // Prevent multiple zoom animations
        if (this.activeOrb) return;
        
        // Store the active orb
        this.activeOrb = orb;
        
        // Store current rotation state
        const currentRotation = getComputedStyle(orb).animation;
        
        // Mark the orb as active
        orb.classList.add('active');
        
        // Scale and translate the orb to create a zoom effect
        orb.style.transformOrigin = 'center center';
        orb.style.transform = 'scale(3) translateX(-30px)';
        orb.style.zIndex = '1000';
        // Temporarily pause rotation during zoom
        orb.style.animation = 'none';
        
        // Add glow effect
        const section = orb.getAttribute('data-section');
        let glowColor;
        
        switch(section) {
            case 'about':
                glowColor = 'rgba(123, 104, 238, 1)';
                break;
            case 'education':
                glowColor = 'rgba(65, 105, 225, 1)';
                break;
            case 'skills':
                glowColor = 'rgba(30, 144, 255, 1)';
                break;
            case 'projects':
                glowColor = 'rgba(0, 191, 255, 1)';
                break;
            case 'hobbies':
                glowColor = 'rgba(0, 206, 209, 1)';
                break;
            case 'contact':
                glowColor = 'rgba(72, 209, 204, 1)';
                break;
            default:
                glowColor = 'rgba(255, 255, 255, 1)';
        }
        
        orb.style.boxShadow = `0 0 40px ${glowColor}, 0 0 80px ${glowColor.replace('1', '0.6')}`;
        
        // After animation completes, execute callback
        setTimeout(() => {
            // Execute callback only once
            callback();
            
            // Reset orb after the section is open
            setTimeout(() => {
                orb.classList.remove('active');
                this.resetOrbStyle(orb);
                orb.style.transform = '';
                orb.style.zIndex = '5';
                // Restore original rotation
                orb.style.animation = currentRotation;
                this.activeOrb = null;
            }, 500);
        }, 700); // Duration of the zoom animation
    }

    openSection(section) {
        if (!section || !this.templates[section]) return;
        
        // If this section is already open, just return
        if (this.currentSection === section) return;
        
        // If another section is open, close it first
        if (this.currentSection) {
            this.closeSection();
            // Use a Promise to ensure proper sequencing
            return new Promise(resolve => {
                setTimeout(() => {
                    this._openSectionContent(section);
                    resolve();
                }, 600); // Wait for close animation to finish
            });
        }
        
        return Promise.resolve(this._openSectionContent(section));
    }

    _openSectionContent(section) {
        // Prevent opening if a section is transitioning
        if (this.isTransitioning) return;
        this.isTransitioning = true;
        this.currentSection = section;
        
        // Clone the template content
        const content = this.templates[section].content.cloneNode(true);
        
        // Clear and append to section view
        this.sectionContent.innerHTML = '';
        this.sectionContent.appendChild(content);
        
        // Show section with animation
        this.sectionView.classList.add('active');
        
        // Add special animation for section entrance
        const sectionContainer = this.sectionContent.querySelector('.section-container');
        if (sectionContainer) {
            sectionContainer.style.opacity = '0';
            sectionContainer.style.transform = 'translateY(30px) scale(0.95)';
            
            setTimeout(() => {
                sectionContainer.style.transition = 'opacity 0.8s ease-out, transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                sectionContainer.style.opacity = '1';
                sectionContainer.style.transform = 'translateY(0) scale(1)';
                
                // Initialize slideshow if this is the about section
                if (section === 'about') {
                    this.initializeSlideshow();
                }
                
                // Reset transition flag after animation completes
                setTimeout(() => {
                    this.isTransitioning = false;
                }, 800);
            }, 100);
        }
        
        // Animate elements inside the section
        this.animateSectionElements(sectionContainer);
    }

    initializeSlideshow() {
        const pages = document.querySelectorAll('.page');
        const leftBtn = document.querySelector('.left-button');
        const rightBtn = document.querySelector('.right-button');
        let currentPage = 1;
        const totalPages = pages.length;

        // Set initial state
        pages[0].classList.add('active');
        leftBtn.disabled = true;

        function updateButtons() {
            leftBtn.disabled = currentPage === 1;
            rightBtn.disabled = currentPage === totalPages;
        }

        function showPage(index) {
            pages.forEach((page, i) => {
                if (i + 1 < index) {
                    page.classList.remove('active', 'prev');
                    page.classList.add('prev');
                } else if (i + 1 === index) {
                    page.classList.remove('prev');
                    page.classList.add('active');
                } else {
                    page.classList.remove('active', 'prev');
                }
            });
            updateButtons();
        }

        function handleNavigation(direction) {
            if (direction === 'prev' && currentPage > 1) {
                currentPage--;
                showPage(currentPage);
            } else if (direction === 'next' && currentPage < totalPages) {
                currentPage++;
                showPage(currentPage);
            }
        }

        // Add click handlers
        leftBtn.addEventListener('click', () => handleNavigation('prev'));
        rightBtn.addEventListener('click', () => handleNavigation('next'));

        // Add keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (this.currentSection === 'about') {
                if (e.key === 'ArrowLeft') {
                    handleNavigation('prev');
                } else if (e.key === 'ArrowRight') {
                    handleNavigation('next');
                }
            }
        });

        // Initialize button states
        updateButtons();
    }

    closeSection() {
        if (!this.currentSection) return;
        
        // Add closing animation
        const sectionContainer = this.sectionContent.querySelector('.section-container');
        if (sectionContainer) {
            sectionContainer.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
            sectionContainer.style.opacity = '0';
            sectionContainer.style.transform = 'translateY(30px)';
        }
        
        // Hide section with animation after content fades
        setTimeout(() => {
            this.sectionView.classList.remove('active');
            this.currentSection = null;
            
            // Clear section content after it's hidden
            setTimeout(() => {
                this.sectionContent.innerHTML = '';
            }, 300);
        }, 500);
    }
    
    animateSectionElements(container) {
        if (!container) return;
        
        // Animate different elements based on section type
        if (container.classList.contains('skills-section')) {
            // Animate skill bars
            const skillLevels = container.querySelectorAll('.skill-level');
            skillLevels.forEach((level, index) => {
                level.style.width = '0';
                setTimeout(() => {
                    level.style.transition = 'width 1s ease-out';
                    level.style.width = level.getAttribute('style').split('width:')[1].trim();
                }, 300 + index * 100);
            });
        }
        
        else if (container.querySelector('.timeline')) {
            // Animate timeline items
            const timelineItems = container.querySelectorAll('.timeline-item');
            timelineItems.forEach((item, index) => {
                item.style.opacity = '0';
                item.style.transform = 'translateX(' + (index % 2 === 0 ? '-30px' : '30px') + ')';
                
                setTimeout(() => {
                    item.style.transition = 'opacity 0.6s ease-out, transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                    item.style.opacity = '1';
                    item.style.transform = 'translateX(0)';
                }, 200 + index * 150);
            });
        }
        
        // Generic animation for cards in any section
        ['project-card', 'hobby-card', 'contact-item'].forEach(cardClass => {
            const cards = container.querySelectorAll('.' + cardClass);
            cards.forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.9) translateY(20px)';
                
                setTimeout(() => {
                    card.style.transition = 'opacity 0.6s ease-out, transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1) translateY(0)';
                }, 200 + index * 100);
            });
        });
    }
}

// Initialize navigation directly and store it globally
window.portfolioNavigation = new Navigation();
