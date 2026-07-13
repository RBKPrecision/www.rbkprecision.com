/* nav.js — injects navbar + footer + shared behaviour on every page */
(function () {
    const currentPage = location.pathname.split('/').pop() || 'index.html';

    const pages = [
        { href: 'index.html',          label: 'Home' },
        { href: 'services.html',       label: 'Services' },
        { href: 'industries.html',     label: 'Industries' },
        { href: 'clients.html',        label: 'Clients' },
        { href: 'infrastructure.html', label: 'Infrastructure' },
        { href: 'contact.html',        label: 'Contact' },
    ];

    // Added a column wrap layout and the "ISO Certified" badge markup below the logo img
    const navHTML = `
<nav id="navbar">
  <div class="nav-inner">
    <a href="index.html" class="nav-logo" style="display: flex; flex-direction: column; align-items: center; text-decoration: none; gap: 4px;">
      <img src="Assets/Images/RBK Logo.jpeg" alt="RBK Logo" class="nav-logo-img">
      <span class="nav-iso-badge" style="font-family: 'Syne', sans-serif; font-size: 9px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #f5e642; border: 1px solid rgba(245,230,66,0.3); padding: 2px 6px; border-radius: 2px; white-space: nowrap; line-height: 1;">ISO Certified</span>
    </a>
    <ul class="nav-links" id="nav-menu">
      ${pages.map(p => `<li><a href="${p.href}" class="${p.href === currentPage ? 'active' : ''}">${p.label}</a></li>`).join('\n      ')}
    </ul>
    <button class="hamburger" id="hamburger" aria-label="Toggle navigation">
      <span></span><span></span><span></span>
    </button>
  </div>
</nav>`;

    const footerHTML = `
<footer>
  <div class="footer-top">
    <div class="footer-brand-block">
      <div class="footer-brand">
        <img src="Assets/Images/RBK Logo.jpeg" alt="RBK Logo" class="footer-logo-img">
      </div>
      <p class="footer-tagline">Precision in Every Part. Manufacturers of Turn Mill Components. <br> Serving Industries Accross the Globe.</p>
      <p class="footer-status">Accepting new projects · 2026</p>
    </div>
    <div class="footer-contact-block">
      <p>Sy. No. 256/222, Shed No.6, Vinayaka Nagar, Hebbagodi</p>
      <p>Bommasandra Industrial Area, Bangalore - 560099</p>
      <p style="margin-top:8px"><a href="tel:+917892302774">+91 78923 02774</a> / <a href="tel:+917349149965">+91 73491 49965</a></p>
      <p><a href="mailto:admin@rbkprecision.com">admin@rbkprecision.com</a></p>
    </div>
  </div>
  <div class="footer-grid">
    <div class="footer-col">
      <h4>Navigate</h4>
      <ul>
        ${pages.map(p => `<li><a href="${p.href}">${p.label}</a></li>`).join('\n        ')}
      </ul>
    </div>
    <div class="footer-col">
      <h4>Services</h4>
      <ul>
        <li>Precision CNC Turning</li>
        <li>VMC Milling</li>
        <li>Custom Machining</li>
        <li>Prototyping</li>
        <li>Reverse Engineering</li>
        <li>Secondary Operations</li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Industries</h4>
      <ul>
        <li>Aerospace</li>
        <li>Automotive</li>
        <li>Medical Devices</li>
        <li>Energy</li>
        <li>Defence &amp; Security</li>
        <li>Consumer Electronics</li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Legal</h4>
      <ul>
        <li>GST: 29ERDPB3173F1ZY</li>
        <li>ISO 9001:2015</li>
        <li><a href="contact.html">Contact Us</a></li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    <span>© 2026 RBK Precision · All rights reserved · Precision Engineered in India</span>
    <span>Quality · Innovation · Excellence</span>
  </div>
</footer>`;

    // inject before body close
    document.body.insertAdjacentHTML('afterbegin', navHTML);
    document.body.insertAdjacentHTML('beforeend', footerHTML);

    // Hamburger toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu   = document.getElementById('nav-menu');
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('open');
        hamburger.classList.toggle('active');
    });
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
            hamburger.classList.remove('active');
        });
    });

    // Navbar scroll shrink
    window.addEventListener('scroll', () => {
        document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 50);
    });

    // ── INITIALISE MULTIPLE IMAGE SLIDERS ───────────────────
    const initSliders = () => {
        const sliders = document.querySelectorAll('.svc-slider');
        
        sliders.forEach(slider => {
            const track = slider.querySelector('.svc-slider-track');
            const slides = slider.querySelectorAll('.svc-slide');
            const nextBtn = slider.querySelector('.slider-btn.next');
            const prevBtn = slider.querySelector('.slider-btn.prev');
            const dotsContainer = slider.querySelector('.slider-dots');
            
            if (!track || slides.length === 0) return;

            let currentIndex = 0;
            const totalSlides = slides.length;

            // Dynamically generate individual pagination dots
            if (dotsContainer) {
                dotsContainer.innerHTML = ''; // Prevent duplication
                for (let i = 0; i < totalSlides; i++) {
                    const dot = document.createElement('div');
                    dot.classList.add('slider-dot');
                    if (i === 0) dot.classList.add('active');
                    dot.addEventListener('click', () => goToSlide(i));
                    dotsContainer.appendChild(dot);
                }
            }

            const dots = slider.querySelectorAll('.slider-dot');

            function goToSlide(index) {
                if (index < 0) {
                    currentIndex = totalSlides - 1;
                } else if (index >= totalSlides) {
                    currentIndex = 0;
                } else {
                    currentIndex = index;
                }

                // Translate track via 100% chunks
                track.style.transform = `translateX(-${currentIndex * 100}%)`;

                // Sync navigation dots
                if (dots.length > 0) {
                    dots.forEach(d => d.classList.remove('active'));
                    dots[currentIndex].classList.add('active');
                }
            }

            if (nextBtn) {
                nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));
            }
            if (prevBtn) {
                prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
            }
        });
    };

    // Run slider execution block
    initSliders();
})();