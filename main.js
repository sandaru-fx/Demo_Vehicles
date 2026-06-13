/* ============================================
   INDRA TRADERS - Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. STICKY HEADER
    // ==========================================
    const header = document.getElementById('mainHeader');
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            header?.classList.add('scrolled');
            backToTop?.classList.add('visible');
        } else {
            header?.classList.remove('scrolled');
            backToTop?.classList.remove('visible');
        }
    });

    backToTop?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ==========================================
    // 2. MOBILE MENU
    // ==========================================
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    hamburger?.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';

        // GSAP animate mobile links
        if (mobileMenu.classList.contains('active') && typeof gsap !== 'undefined') {
            gsap.fromTo(mobileLinks, 
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, stagger: 0.08, duration: 0.5, ease: 'power3.out', delay: 0.2 }
            );
        }
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger?.classList.remove('active');
            mobileMenu?.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // ==========================================
    // 3. HERO SWIPER
    // ==========================================
    if (document.querySelector('.hero-swiper')) {
        const heroSwiper = new Swiper('.hero-swiper', {
            loop: true,
            speed: 1200,
            autoplay: { delay: 5000, disableOnInteraction: false },
            effect: 'fade',
            fadeEffect: { crossFade: true },
            pagination: { el: '.hero-pagination', clickable: true },
            navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
            on: {
                slideChangeTransitionStart: function() {
                    const activeSlide = this.slides[this.activeIndex];
                    const elements = activeSlide?.querySelectorAll('.hero-tag, .hero-title, .hero-desc, .hero-btns');
                    if (elements && typeof gsap !== 'undefined') {
                        gsap.fromTo(elements,
                            { opacity: 0, y: 40 },
                            { opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: 'power3.out' }
                        );
                    }
                }
            }
        });
    }

    // ==========================================
    // 4. FEATURED SWIPER
    // ==========================================
    if (document.querySelector('.featured-swiper')) {
        new Swiper('.featured-swiper', {
            slidesPerView: 1,
            spaceBetween: 24,
            loop: true,
            autoplay: { delay: 4000 },
            pagination: { el: '.featured-swiper .swiper-pagination', clickable: true },
            breakpoints: {
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 }
            }
        });
    }


    // ==========================================
    // 6. GSAP SCROLL ANIMATIONS
    // ==========================================
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Animate all [data-anim] elements
        const animElements = document.querySelectorAll('[data-anim]');
        animElements.forEach((el) => {
            gsap.fromTo(el,
                { opacity: 0, y: 50 },
                {
                    opacity: 1, y: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 85%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        });

        // Stat counter animation
        const statNumbers = document.querySelectorAll('.stat-number');
        statNumbers.forEach(num => {
            const target = parseInt(num.getAttribute('data-count'));
            if (!target) return;
            ScrollTrigger.create({
                trigger: num,
                start: 'top 85%',
                onEnter: () => {
                    gsap.to(num, {
                        innerText: target,
                        duration: 2,
                        ease: 'power2.out',
                        snap: { innerText: 1 },
                        onUpdate: function() {
                            num.textContent = Math.floor(parseFloat(num.textContent)).toLocaleString();
                        }
                    });
                },
                once: true
            });
        });
    }

    // ==========================================
    // 7. VEHICLE CATEGORY FILTER
    // ==========================================
    const catTabs = document.querySelectorAll('.cat-tab');
    const vehicleCards = document.querySelectorAll('.vehicle-card[data-cat]');

    catTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            catTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const cat = tab.getAttribute('data-cat');

            vehicleCards.forEach(card => {
                if (cat === 'all' || card.getAttribute('data-cat') === cat) {
                    card.classList.remove('hidden');
                    if (typeof gsap !== 'undefined') {
                        gsap.fromTo(card, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.4 });
                    }
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // ==========================================
    // 7b. SPARE PARTS CATEGORY FILTER
    // ==========================================
    const partsGrid = document.getElementById('partsGrid');
    if (partsGrid) {
        const partsTabs = partsGrid.closest('.container')?.querySelectorAll('.cat-tab[data-cat]');
        const partCards = partsGrid.querySelectorAll('.part-card[data-cat]');

        partsTabs?.forEach(tab => {
            tab.addEventListener('click', () => {
                partsTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                const cat = tab.getAttribute('data-cat');

                partCards.forEach(card => {
                    if (cat === 'all' || card.getAttribute('data-cat') === cat) {
                        card.style.display = '';
                        if (typeof gsap !== 'undefined') {
                            gsap.fromTo(card, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.4 });
                        }
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // ==========================================
    // 8. 3D TILT EFFECT on Why Cards
    // ==========================================
    const tiltCards = document.querySelectorAll('.tilt-card');
    tiltCards.forEach(card => {
        const glow = card.querySelector('.why-card-glow');
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 12;
            const rotateY = (centerX - x) / 12;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
            if (glow) {
                glow.style.left = x + 'px';
                glow.style.top = y + 'px';
            }
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // ==========================================
    // 9. MINI FINANCE CALCULATOR (Home page)
    // ==========================================
    const miniPrice = document.getElementById('miniPrice');
    const miniDown = document.getElementById('miniDown');
    const miniDuration = document.getElementById('miniDuration');
    const miniPriceVal = document.getElementById('miniPriceVal');
    const miniDownVal = document.getElementById('miniDownVal');
    const miniResult = document.getElementById('miniResult');

    function updateMiniCalc() {
        if (!miniPrice || !miniDown || !miniDuration) return;
        const price = parseInt(miniPrice.value);
        const down = parseInt(miniDown.value);
        const years = parseInt(miniDuration.value);
        const interestRate = 0.12; // 12% annual
        const loanAmount = Math.max(price - down, 0);
        const monthlyRate = interestRate / 12;
        const months = years * 12;
        let monthly = 0;
        if (monthlyRate > 0 && months > 0) {
            monthly = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
        }
        if (miniPriceVal) miniPriceVal.textContent = price.toLocaleString();
        if (miniDownVal) miniDownVal.textContent = down.toLocaleString();
        if (miniResult) miniResult.textContent = 'LKR ' + Math.round(monthly).toLocaleString();

        // Update slider backgrounds
        updateSliderBg(miniPrice);
        updateSliderBg(miniDown);
    }

    function updateSliderBg(slider) {
        if (!slider) return;
        const pct = ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
        slider.style.background = `linear-gradient(to right, var(--gold) ${pct}%, var(--gray-100) ${pct}%)`;
    }

    [miniPrice, miniDown, miniDuration].forEach(el => {
        el?.addEventListener('input', updateMiniCalc);
    });
    updateMiniCalc();

    // ==========================================
    // 10. FULL FINANCE CALCULATOR (Finance page)
    // ==========================================
    const fullPrice = document.getElementById('fullPrice');
    const fullPriceSlider = document.getElementById('fullPriceSlider');
    const fullDown = document.getElementById('fullDown');
    const fullDownSlider = document.getElementById('fullDownSlider');
    const fullProvider = document.getElementById('fullProvider');
    const fullDuration = document.getElementById('fullDuration');
    const fullResult = document.getElementById('fullResult');
    const fullLoanAmt = document.getElementById('fullLoanAmt');
    const fullTotalInt = document.getElementById('fullTotalInt');
    const fullTotalPay = document.getElementById('fullTotalPay');
    const fullPriceDisplay = document.getElementById('fullPriceDisplay');
    const fullDownDisplay = document.getElementById('fullDownDisplay');

    function getProviderRate() {
        if (!fullProvider) return 0.12;
        const rates = {
            'boc': 0.11, 'peoples': 0.115, 'commercial': 0.12,
            'hnb': 0.125, 'sampath': 0.118, 'nsb': 0.105
        };
        return rates[fullProvider.value] || 0.12;
    }

    function updateFullCalc() {
        if (!fullPrice) return;
        const price = parseInt(fullPrice.value) || 0;
        const down = parseInt(fullDown.value) || 0;
        const years = parseInt(fullDuration?.value) || 3;
        const rate = getProviderRate();
        const loanAmount = Math.max(price - down, 0);
        const monthlyRate = rate / 12;
        const months = years * 12;
        let monthly = 0;
        if (monthlyRate > 0 && months > 0 && loanAmount > 0) {
            monthly = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
        }
        const totalPayment = monthly * months;
        const totalInterest = totalPayment - loanAmount;

        if (fullResult) fullResult.textContent = 'LKR ' + Math.round(monthly).toLocaleString();
        if (fullLoanAmt) fullLoanAmt.textContent = 'LKR ' + loanAmount.toLocaleString();
        if (fullTotalInt) fullTotalInt.textContent = 'LKR ' + Math.round(totalInterest).toLocaleString();
        if (fullTotalPay) fullTotalPay.textContent = 'LKR ' + Math.round(totalPayment).toLocaleString();
        if (fullPriceDisplay) fullPriceDisplay.textContent = 'LKR ' + price.toLocaleString();
        if (fullDownDisplay) fullDownDisplay.textContent = 'LKR ' + down.toLocaleString();

        // Update result sidebar rows
        const resultVehiclePrice = document.getElementById('resultVehiclePrice');
        const resultDownPayment = document.getElementById('resultDownPayment');
        if (resultVehiclePrice) resultVehiclePrice.textContent = 'LKR ' + price.toLocaleString();
        if (resultDownPayment) resultDownPayment.textContent = 'LKR ' + down.toLocaleString();

        if (fullPriceSlider) {
            fullPriceSlider.value = price;
            updateSliderBg(fullPriceSlider);
        }
        if (fullDownSlider) {
            fullDownSlider.value = down;
            updateSliderBg(fullDownSlider);
        }
    }

    // Sync sliders with inputs
    fullPriceSlider?.addEventListener('input', () => {
        if (fullPrice) fullPrice.value = fullPriceSlider.value;
        updateFullCalc();
    });
    fullDownSlider?.addEventListener('input', () => {
        if (fullDown) fullDown.value = fullDownSlider.value;
        updateFullCalc();
    });
    fullPrice?.addEventListener('input', updateFullCalc);
    fullDown?.addEventListener('input', updateFullCalc);
    fullProvider?.addEventListener('change', updateFullCalc);
    fullDuration?.addEventListener('change', updateFullCalc);
    updateFullCalc();

    // ==========================================
    // 11. CONTACT FORM (basic)
    // ==========================================
    const contactForm = document.getElementById('contactForm');
    contactForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('button[type="submit"]');
        const origText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        btn.style.background = '#2ecc71';
        setTimeout(() => {
            btn.innerHTML = origText;
            btn.style.background = '';
            contactForm.reset();
        }, 3000);
    });

    // ==========================================
    // 12. INITIAL HERO TEXT ANIMATION
    // ==========================================
    if (typeof gsap !== 'undefined' && document.querySelector('.hero-swiper')) {
        const firstSlide = document.querySelector('.swiper-slide-active, .hero-swiper .swiper-slide:first-child');
        const elements = firstSlide?.querySelectorAll('.hero-tag, .hero-title, .hero-desc, .hero-btns');
        if (elements) {
            gsap.fromTo(elements,
                { opacity: 0, y: 40 },
                { opacity: 1, y: 0, stagger: 0.2, duration: 1, ease: 'power3.out', delay: 0.5 }
            );
        }
    }

    // ==========================================
    // 13. VEHICLE PAGE FILTER (vehicles.html)
    // ==========================================
    const filterInputs = document.querySelectorAll('.filter-input');
    const vehiclePageCards = document.querySelectorAll('#vehiclePageGrid .vehicle-card');

    function filterVehicles() {
        const brand = document.getElementById('filterBrand')?.value?.toLowerCase() || '';
        const type = document.getElementById('filterType')?.value?.toLowerCase() || '';
        const price = document.getElementById('filterPrice')?.value || '';
        const fuel = document.getElementById('filterFuel')?.value?.toLowerCase() || '';

        vehiclePageCards.forEach(card => {
            const cardBrand = card.dataset.brand || '';
            const cardType = card.dataset.cat || '';
            const cardPrice = parseInt(card.dataset.price) || 0;
            const cardFuel = card.dataset.fuel || '';

            let show = true;
            if (brand && !cardBrand.includes(brand)) show = false;
            if (type && cardType !== type) show = false;
            if (fuel && cardFuel !== fuel) show = false;
            if (price === 'low' && cardPrice > 15000000) show = false;
            if (price === 'mid' && (cardPrice < 15000000 || cardPrice > 30000000)) show = false;
            if (price === 'high' && cardPrice < 30000000) show = false;

            card.style.display = show ? '' : 'none';
            if (show && typeof gsap !== 'undefined') {
                gsap.fromTo(card, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4 });
            }
        });
    }

    filterInputs.forEach(input => input.addEventListener('change', filterVehicles));
});
