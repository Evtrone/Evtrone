document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('dark-mode-switch');
    const body = document.body;
    const navLinks = document.querySelector('.nav-links');
    const menuToggle = document.createElement('div'); // Create hamburger icon element
    menuToggle.classList.add('menu-toggle');
    menuToggle.innerHTML = '<span class="bar"></span><span class="bar"></span><span class="bar"></span>';
    document.querySelector('.navbar').insertBefore(menuToggle, navLinks); // Insert before nav links

    // --- Dark Mode Logic ---
    // Check for saved dark mode preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('dark-mode');
        darkModeToggle.checked = true;
    }

    darkModeToggle.addEventListener('change', () => {
        if (darkModeToggle.checked) {
            body.classList.add('dark-mode');
            localStorage.setItem('darkMode', 'enabled');
        } else {
            body.classList.remove('dark-mode');
            localStorage.setItem('darkMode', 'disabled');
        }
    });

    // --- Mobile Menu Logic ---
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('open');
    });

    // Close mobile menu when a link is clicked (for single-page navigation or general UX)
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('open');
            }
        });
    });

    // --- Locate Charger Button (Example - for a real site, integrate Google Maps API) ---
    const locateChargerBtn = document.getElementById('locate-charger-btn');
    if (locateChargerBtn) {
        locateChargerBtn.addEventListener('click', (e) => {
            e.preventDefault();
            alert("This feature would typically open Google Maps or a dedicated charger locator. For demonstration purposes, this is a placeholder.");
            // In a real application, you might do something like:
            // window.open('https://www.google.com/maps/search/EV+charging+stations+near+me', '_blank');
        });
    }
});