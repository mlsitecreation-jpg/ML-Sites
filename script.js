// script.js

document.addEventListener('DOMContentLoaded', () => {

    // Mobile menu toggle
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            const isHidden = mobileMenu.classList.contains('hidden');
            // Toggle Tailwind's 'hidden' class to show/hide the menu
            mobileMenu.classList.toggle('hidden');
            // Toggle aria-expanded for accessibility
            menuBtn.setAttribute('aria-expanded', !isHidden); 

            // Change icon
            if (!isHidden) { // If it was visible and now hidden
                menuBtn.innerHTML = '<i class="fas fa-bars text-2xl"></i>';
            } else { // If it was hidden and now visible
                menuBtn.innerHTML = '<i class="fas fa-times text-2xl"></i>';
            }
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Calculate scroll position, accounting for fixed nav height
                const navElement = document.querySelector('nav'); 
                const navHeight = navElement ? navElement.offsetHeight : 80; // Default to 80 if nav not found
                // Adjusted offset for smooth scroll
                const offsetTop = targetElement.offsetTop - navHeight; 

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                // Close mobile menu if open after clicking a link
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                    if (menuBtn) { 
                        menuBtn.setAttribute('aria-expanded', false);
                        menuBtn.innerHTML = '<i class="fas fa-bars text-2xl"></i>'; // Reset icon
                    }
                }
            }
        });
    });

    // Contact Form Validation (kept from original, adjust if you have server-side submission)
    const contactForm = document.getElementById('contact-form'); 

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault(); // Prevent default form submission

            const name = contactForm.querySelector('#name').value.trim();
            const email = contactForm.querySelector('#email').value.trim();
            const message = contactForm.querySelector('#message').value.trim();

            if (name === '' || email === '' || message === '') {
                alert('Please fill in all fields.');
                return;
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            // If all validations pass
            alert('Thank you for your message! We will get back to you soon.');
            this.reset(); // Clear the form
        });
    }

    // Add scroll animation to elements (new functionality)
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.service-card, .nav-link, #about h2, #services h2, #contact h2'); // Added more elements to animate

        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3; // When element is 1/3rd from bottom of screen

            if (elementPosition < screenPosition) {
                element.classList.add('animate-fade-in-up'); // Ensure 'animate-fade-in-up' is defined in your CSS/Tailwind
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll); // Trigger on load for elements already in view
});