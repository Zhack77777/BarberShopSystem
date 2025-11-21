document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            const icon = this.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-times');
                icon.classList.toggle('fa-bars');
            }
        });
    }
    
    // Close mobile menu when clicking on a nav link
    if (navLinksItems.length > 0) {
        navLinksItems.forEach(link => {
            link.addEventListener('click', function() {
                if (navLinks) navLinks.classList.remove('active');
                if (menuToggle) {
                    const icon = menuToggle.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                }
                
                // Update active link
                navLinksItems.forEach(item => item.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }
    
    // Set active navigation link based on current page
    function setActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        navLinksItems.forEach(link => {
            const linkHref = link.getAttribute('href');
            if ((currentPage === '' && linkHref === 'index.html') || 
                (linkHref !== 'index.html' && currentPage.includes(linkHref))) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    
    // Call the function on page load
    setActiveNavLink();
    
    // Form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = new FormData(this);
            const formValues = Object.fromEntries(formData.entries());
            
            // Here you would typically send the form data to a server
            console.log('Form submitted:', formValues);
            
            // Show success message
            alert('Thank you for your message! We will get back to you soon.');
            
            // Reset form
            this.reset();
        });
    }
    
    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        // Hide all testimonials
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
        });
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show current testimonial and activate corresponding dot
        testimonials[index].classList.add('active');
        if (dots[index]) {
            dots[index].classList.add('active');
        }
        
        currentTestimonial = index;
    }
    
    // Auto-rotate testimonials
    function nextSlide() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }
    
    // Event listeners for dots
    if (dots.length > 0) {
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showTestimonial(index);
            });
        });
    }
    
    // Event listeners for navigation buttons
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
            showTestimonial(currentTestimonial);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }
    
    // Auto-rotate testimonials if on testimonials page
    if (testimonials.length > 0) {
        showTestimonial(0);
        const testimonialInterval = setInterval(nextSlide, 5000);
        
        // Pause auto-rotation when hovering over testimonials
        const testimonialContainer = document.querySelector('.testimonial-slider');
        if (testimonialContainer) {
            testimonialContainer.addEventListener('mouseenter', () => {
                clearInterval(testimonialInterval);
            });
            
            testimonialContainer.addEventListener('mouseleave', () => {
                clearInterval(testimonialInterval);
                testimonialInterval = setInterval(nextSlide, 5000);
            });
        }
    }
    
    // Sample services data - replace with your actual services
    const servicesData = [
        {
            id: 1,
            name: 'Army Cut',
            category: 'haircut',
            price: 30,
            duration: 45,
            description: 'Classic military-style haircut with clean, sharp lines and professional finish.',
            image: 'Images/Haircut%20types/army%20cut.png'
        },
        {
            id: 2,
            name: 'Baby Haircut',
            category: 'haircut',
            price: 25,
            duration: 30,
            description: 'Gentle and comfortable haircut service designed specifically for our youngest clients.',
            image: 'Images/Haircut%20types/baby%20haircut%201.png'
        },
        {
            id: 3,
            name: 'Burst Fade',
            category: 'haircut',
            price: 35,
            duration: 50,
            description: 'Modern fade style with a burst pattern that creates a unique, eye-catching look.',
            image: 'Images/Haircut%20types/burst%20fade.png'
        },
        {
            id: 4,
            name: 'Buzz Cut',
            category: 'haircut',
            price: 25,
            duration: 30,
            description: 'Low-maintenance, uniform length cut that\'s perfect for a clean, classic look.',
            image: 'Images/Haircut%20types/buzz%20cut.png'
        },
        {
            id: 5,
            name: 'Flat Top',
            category: 'haircut',
            price: 35,
            duration: 45,
            description: 'Iconic flat top style with perfectly level top and tapered sides for a bold statement.',
            image: 'Images/Haircut%20types/flat%20top.png'
        },
        {
            id: 6,
            name: 'French Crop',
            category: 'haircut',
            price: 32,
            duration: 40,
            description: 'Trendy French crop with textured top and faded sides for a modern, stylish appearance.',
            image: 'Images/Haircut%20types/french%20crop.png'
        },
        {
            id: 7,
            name: 'High Fade',
            category: 'haircut',
            price: 35,
            duration: 45,
            description: 'High fade haircut that starts high on the sides for a dramatic, clean transition.',
            image: 'Images/Haircut%20types/high%20fade.png'
        },
        {
            id: 8,
            name: 'High Taper',
            category: 'haircut',
            price: 32,
            duration: 40,
            description: 'High taper fade that gradually decreases in length from top to bottom for a smooth look.',
            image: 'Images/Haircut%20types/high%20taper.png'
        },
        {
            id: 9,
            name: 'Low Fade',
            category: 'haircut',
            price: 35,
            duration: 45,
            description: 'Low fade that starts near the bottom for a subtle, professional appearance.',
            image: 'Images/Haircut%20types/low%20fade.png'
        },
        {
            id: 10,
            name: 'Low Taper',
            category: 'haircut',
            price: 32,
            duration: 40,
            description: 'Low taper fade with a gradual transition that maintains more length on the sides.',
            image: 'Images/Haircut%20types/low%20taper.png'
        },
        {
            id: 11,
            name: 'Mid Fade',
            category: 'haircut',
            price: 35,
            duration: 45,
            description: 'Versatile mid fade that starts in the middle, offering the perfect balance of style.',
            image: 'Images/Haircut%20types/mid%20fade.png'
        },
        {
            id: 12,
            name: 'Mohawk',
            category: 'haircut',
            price: 40,
            duration: 50,
            description: 'Bold mohawk style with a strip of longer hair down the center and shaved sides.',
            image: 'Images/Haircut%20types/mohawk.png'
        },
        {
            id: 13,
            name: 'Mullet',
            category: 'haircut',
            price: 38,
            duration: 50,
            description: 'Retro mullet style with short front and sides, and longer hair in the back.',
            image: 'Images/Haircut%20types/mullet.png'
        },
        {
            id: 14,
            name: 'Trim',
            category: 'haircut',
            price: 20,
            duration: 25,
            description: 'Quick trim to maintain your current style and keep your hair looking fresh.',
            image: 'Images/Haircut%20types/trim.png'
        },
        {
            id: 15,
            name: 'Two Block',
            category: 'haircut',
            price: 35,
            duration: 45,
            description: 'Popular Korean-inspired two block cut with disconnected top and sides for a modern look.',
            image: 'Images/Haircut%20types/two%20block.png'
        }
    ];

    // DOM Elements
    const servicesGrid = document.getElementById('servicesGrid');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const categoryFilter = document.getElementById('categoryFilter');
    const priceFilter = document.getElementById('priceFilter');
    const durationFilter = document.getElementById('durationFilter');
    const noResults = document.getElementById('noResults');

    // Initialize the page
    if (window.location.pathname.includes('services.html')) {
        displayServices(servicesData);
        setupEventListeners();
    }

    // Display services in the grid
    function displayServices(services) {
        if (!servicesGrid) return;
        
        if (services.length === 0) {
            noResults.style.display = 'block';
            servicesGrid.innerHTML = '';
            return;
        }
        
        noResults.style.display = 'none';
        
        servicesGrid.innerHTML = services.map(service => `
            <div class="service-card" data-category="${service.category}" data-price="${service.price}" data-duration="${service.duration}">
                <div class="service-img">
                    <img src="${service.image}" alt="${service.name}">
                </div>
                <h3>${service.name}</h3>
                <p>${service.description}</p>
                <div class="service-meta">
                    <span class="price">$${service.price}</span>
                    <span class="duration">${service.duration} min</span>
                </div>
                <a href="#" class="btn book-now-btn" data-service="${service.name}">Book Now</a>
            </div>
        `).join('');
        
        // Add event listeners to book now buttons
        document.querySelectorAll('.book-now-btn').forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const serviceName = this.getAttribute('data-service');
                alert(`Booking requested for: ${serviceName}\nThis would typically open a booking form.`);
            });
        });
    }

    // Set up event listeners for search and filters
    function setupEventListeners() {
        if (searchButton) {
            searchButton.addEventListener('click', filterServices);
        }
        
        if (searchInput) {
            searchInput.addEventListener('keyup', function(e) {
                if (e.key === 'Enter') {
                    filterServices();
                }
            });
        }
        
        if (categoryFilter) {
            categoryFilter.addEventListener('change', filterServices);
        }
        
        if (priceFilter) {
            priceFilter.addEventListener('change', filterServices);
        }
        
        if (durationFilter) {
            durationFilter.addEventListener('change', filterServices);
        }
    }

    // Filter services based on search and filters
    function filterServices() {
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
        const category = categoryFilter ? categoryFilter.value : '';
        const priceRange = priceFilter ? priceFilter.value : '';
        const durationRange = durationFilter ? durationFilter.value : '';
        
        const filteredServices = servicesData.filter(service => {
            // Filter by search term
            const matchesSearch = service.name.toLowerCase().includes(searchTerm) || 
                                service.description.toLowerCase().includes(searchTerm);
            
            // Filter by category
            const matchesCategory = !category || service.category === category;
            
            // Filter by price range
            let matchesPrice = true;
            if (priceRange) {
                const [min, max] = priceRange.split('-').map(Number);
                if (max) {
                    matchesPrice = service.price >= min && service.price <= max;
                } else {
                    matchesPrice = service.price >= min;
                }
            }
            
            // Filter by duration range
            let matchesDuration = true;
            if (durationRange) {
                const [min, max] = durationRange.split('-').map(Number);
                if (max) {
                    matchesDuration = service.duration >= min && service.duration <= max;
                } else {
                    matchesDuration = service.duration >= min;
                }
            }
            
            return matchesSearch && matchesCategory && matchesPrice && matchesDuration;
        });
        
        displayServices(filteredServices);
    }

    // Add animation on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-card, .about-content, .testimonial, .contact-info, .contact-form, .promo-card, .info-box');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animation
    window.addEventListener('load', function() {
        const elements = document.querySelectorAll('.service-card, .about-content, .testimonial, .contact-info, .contact-form, .promo-card, .info-box');
        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
        
        // Trigger animation on load
        setTimeout(animateOnScroll, 300);
    });
    
    window.addEventListener('scroll', animateOnScroll);
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only prevent default for same-page anchors
            if (href !== '#' && href.startsWith('#')) {
                e.preventDefault();
                
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Adjust for fixed header
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});
