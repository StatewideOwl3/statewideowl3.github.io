document.addEventListener('DOMContentLoaded', () => {
    // Track initial page view
    const viewTimestamp = new Date().toISOString();
    console.log(`${viewTimestamp}, view, page`);

    // Track orb hover events
    document.querySelectorAll('.orb').forEach(orb => {
        orb.addEventListener('mouseenter', () => {
            const timestamp = new Date().toISOString();
            const section = orb.getAttribute('data-section');
            console.log(`${timestamp}, hover, orb-${section}`);
        });
    });

    // Track navigation button hover events
    document.querySelectorAll('.nav-button').forEach(button => {
        button.addEventListener('mouseenter', () => {
            const timestamp = new Date().toISOString();
            const section = button.getAttribute('data-section') || 'home';
            console.log(`${timestamp}, hover, nav-${section}`);
        });
    });

    // Track all clicks
    document.addEventListener('click', (event) => {
        const target = event.target;
        const timestamp = new Date().toISOString();
        let objectType = 'text'; // Default type

        // Determine the type of object clicked
        if (target.classList.contains('orb')) {
            const section = target.getAttribute('data-section');
            objectType = `orb-${section}`;
        } else if (target.tagName === 'IMG') {
            objectType = 'image';
        } else if (target.tagName === 'SELECT') {
            objectType = 'drop-down';
        } else if (target.tagName === 'BUTTON') {
            objectType = 'button';
            // Add specific tracking for nav buttons
            if (target.classList.contains('nav-button')) {
                const section = target.getAttribute('data-section') || 'home';
                objectType = `nav-${section}`;
            }
        } else if (target.tagName === 'A') {
            objectType = 'link';
        }
        
        // Log in the exact format required: Timestamp_of_click, type of event (click/view), event object
        console.log(`${timestamp}, click, ${objectType}`);
    });
});