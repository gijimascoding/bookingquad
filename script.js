/* =============================================
   MileHomes | Residential Property Management
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
    const sections = document.querySelectorAll(
        '.service-card, .approach-card, .metric-card, .section-header, .office-item, .market-dot, .stat-item, .value-item'
    );

    let animCounter = 0;
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const delay = animCounter * 50;
                animCounter++;
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, delay);
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
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        sectionObserver.observe(el);
    });

    // --- Contact Form Handling (FormSubmit.co → info@spventures.co) ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnHTML = submitBtn ? submitBtn.innerHTML : '';

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Show loading state
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = `
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;">
                        <path d="M12 2v4m0 12v4m-7.07-3.93l2.83-2.83m8.48-8.48l2.83-2.83M2 12h4m12 0h4m-3.93 7.07l-2.83-2.83M7.76 7.76L4.93 4.93"/>
                    </svg>
                    Sending...
                `;
            }

            const formData = new FormData(contactForm);

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    contactForm.innerHTML = `
                        <div class="form-success">
                            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                                <polyline points="22 4 12 14.01 9 11.01"/>
                            </svg>
                            <h3>Thank you for your inquiry</h3>
                            <p>Your message has been sent to our property management team. We will respond within one business day.</p>
                        </div>
                    `;
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                // Fallback: open mailto if the form service fails
                const data = Object.fromEntries(formData.entries());
                const subject = encodeURIComponent('Property Management Inquiry | MileHomes');
                const body = encodeURIComponent(
                    `Name: ${data.firstName} ${data.lastName}\n` +
                    `Email: ${data.email}\n` +
                    `Phone: ${data.phone || 'Not provided'}\n` +
                    `Property Location: ${data.location || 'Not specified'}\n` +
                    `Property Type: ${data.propertyType || 'Not specified'}\n` +
                    `Number of Units: ${data.unitCount || 'Not specified'}\n` +
                    `Message: ${data.message || 'Not provided'}\n`
                );
                window.location.href = `mailto:info@spventures.co?subject=${subject}&body=${body}`;

                // Reset button
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnHTML;
                }
            }
        });
    }

    // --- Stat number animation ---
    const statValues = document.querySelectorAll('.stat-number');
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
