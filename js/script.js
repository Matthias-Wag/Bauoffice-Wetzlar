document.addEventListener('DOMContentLoaded', () => {

    // --- Intersection Observer for Animations ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // When element comes into view
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: Stop observing once it's visible
                // observer.unobserve(entry.target);
            }
            // Optional: Uncomment below to make animation reset when scrolling up
            // else {
            //     entry.target.classList.remove('is-visible');
            // }
        });
    }, {
        root: null, // relative to the viewport
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    // Observe each animated element
    animatedElements.forEach(el => {
        observer.observe(el);
    });


    // --- Optional: Add class to header on scroll ---
    // const header = document.getElementById('header');
    // window.addEventListener('scroll', () => {
    //     if (window.scrollY > 50) { // Add class after scrolling 50px
    //         header.classList.add('scrolled');
    //     } else {
    //         header.classList.remove('scrolled');
    //     }
    // });

    // --- Optional: Basic Mobile Nav Toggle (Requires HTML for hamburger icon) ---
    // const navToggle = document.getElementById('nav-toggle'); // Add an ID to your hamburger button
    // const navMenu = document.querySelector('#header nav ul'); // Select the UL
    //
    // if (navToggle && navMenu) {
    //     navToggle.addEventListener('click', () => {
    //         navMenu.classList.toggle('active'); // You'll need CSS for .active state
    //     });
    // }

    // --- Cost Calculation ---
    document.getElementById('calculate-button').addEventListener('click', function() {
        const inputNumber = parseFloat(document.getElementById('input-number').value) || 0;

        // Kostenfaktoren für die Gewerke
        const costPerSquareMeter = {
            architecture: 100, // Architektur: 100 €/m²
            supervision: 150,
            energy: 50         // Energienachweis: 50 €/m²
        };

        // Berechnungen
        const costArchitecture = inputNumber * costPerSquareMeter.architecture;
        const costSupervision = inputNumber * costPerSquareMeter.supervision;
        const costEnergy = inputNumber * costPerSquareMeter.energy;
        const totalCost = costArchitecture + costSupervision + costEnergy;

        // Ergebnisse in die Tabelle einfügen
        document.getElementById('cost-architecture').textContent = costArchitecture.toLocaleString() + ' €';
        document.getElementById('cost-supervision').textContent = costSupervision.toLocaleString() + ' €';
        document.getElementById('cost-energy').textContent = costEnergy.toLocaleString() + ' €';
        document.getElementById('total-cost').textContent = totalCost.toLocaleString() + ' €';
    });

    // --- Theme Toggle ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Check for saved theme in localStorage
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.textContent = '☀️ Light Mode';
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        if (body.classList.contains('dark-mode')) {
            themeToggle.textContent = '☀️ Light Mode';
            localStorage.setItem('theme', 'dark');
        } else {
            themeToggle.textContent = '🌙 Dark Mode';
            localStorage.setItem('theme', 'light');
        }
    });

    const header = document.getElementById('header');
    const heroSection = document.getElementById('hero');

    function toggleHeaderVisibility() {
        const heroBottom = heroSection.getBoundingClientRect().bottom;

        if (heroBottom > 0) {
            header.style.opacity = '1';
            header.style.pointerEvents = 'auto';
        } else {
            header.style.opacity = '0';
            header.style.pointerEvents = 'none';
        }
    }

    window.addEventListener('scroll', toggleHeaderVisibility);

    window.addEventListener('scroll', () => {
        const heroBottom = heroSection.getBoundingClientRect().bottom;

        if (heroBottom > 0) {
            // Header bleibt sichtbar, solange der Hero-Bereich sichtbar ist
            header.style.position = 'absolute';
            header.style.top = '0';
            header.style.opacity = '1'; // Header sichtbar
            header.style.pointerEvents = 'auto'; // Interaktionen erlauben
            header.style.transition = 'opacity 0.3s ease, pointer-events 0.3s ease'; // Sanfter Übergang
        } else {
            // Header wird ausgeblendet, wenn der Hero-Bereich verlassen wird
            header.style.opacity = '0'; // Header unsichtbar
            header.style.pointerEvents = 'none'; // Interaktionen deaktivieren
            header.style.transition = 'opacity 0.3s ease, pointer-events 0.3s ease'; // Sanfter Übergang
        }

        if (window.scrollY < 100) {
            console.log('Header sichtbar');
            header.style.opacity = '1';
        } else {
            console.log('Header unsichtbar');
            header.style.opacity = '0';
        }
    });

}); // End DOMContentLoaded