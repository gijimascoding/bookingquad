/* =============================================
   BookingQuad | Landing Page Interactions
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

    // --- Navbar scroll behavior ---
    const navbar = document.getElementById('navbar');
    const handleScroll = () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // --- Mobile navigation toggle ---
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');

    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile nav when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // --- Smooth scroll for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                const offset = 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Scroll-triggered animations ---
    const animateElements = document.querySelectorAll('.animate-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    animateElements.forEach(el => observer.observe(el));

    // Auto-add animation classes to sections
    const sections = document.querySelectorAll(
        '.platform-card, .solution-card, .why-point, .step-card, .comparison-card, .section-header'
    );
    let animCounter = 0;
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const delay = animCounter * 60;
                animCounter++;
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, delay);
                // Reset counter after a batch completes
                setTimeout(() => { animCounter = 0; }, 400);
                sectionObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.05,
        rootMargin: '0px 0px 40px 0px'
    });

    sections.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(16px)';
        el.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
        sectionObserver.observe(el);
    });

    // --- Contact Form Handling ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Gather form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());

            // Build mailto link as a fallback
            const subject = encodeURIComponent('New Inquiry | BookingQuad Technology Platform');
            const body = encodeURIComponent(
                `Name: ${data.name}\n` +
                `Email: ${data.email}\n` +
                `Phone: ${data.phone || 'Not provided'}\n` +
                `Properties: ${data.properties}\n` +
                `Property Type: ${data.type}\n` +
                `Goals: ${data.message || 'Not provided'}\n`
            );

            // Open mailto
            window.location.href = `mailto:info@bookingcloud.com?subject=${subject}&body=${body}`;

            // Show success state
            contactForm.innerHTML = `
                <div class="form-success">
                    <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                        <polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                    <h3>Your request has been submitted</h3>
                    <p>Our team will review your information and reach out within 24 hours with a tailored technology roadmap for your operation.</p>
                </div>
            `;
        });
    }

    // --- Counter animation for hero stats ---
    const statValues = document.querySelectorAll('.stat-value');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statValues.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(10px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        statsObserver.observe(el);
    });
});
