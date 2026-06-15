/* ============================================
   SKARA TRADERS - Main JavaScript
   ============================================ */

const VEHICLE_CATALOG = {
    'a4': {
        title: 'Audi A4 S-Line 2023', hero: 'Audi A4', year: '2023', price: 'LKR 18,500,000', priceNum: 18500000,
        badge: 'New Arrival', image: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=800',
        km: '25,000 km', fuel: 'Petrol', trans: 'Automatic', condition: 'New',
        desc: 'Experience luxury and performance with the Audi A4 S-Line. Turbocharged engine, premium leather interior, and advanced driver-assist systems.',
        make: 'Audi', model: 'A4 S-Line', engine: '2000 cc (2.0L TFSI)', body: 'Sedan', color: 'Glacier White',
        features: ['Apple CarPlay & Android Auto', 'Sunroof', 'Premium Leather Seats', '360 Reverse Camera', 'Parking Sensors', 'Adaptive Cruise Control']
    },
    'x5': {
        title: 'BMW X5 2022', hero: 'BMW X5', year: '2022', price: 'LKR 32,000,000', priceNum: 32000000,
        badge: 'Hot Deal', image: 'https://images.pexels.com/photos/12532746/pexels-photo-12532746.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=800',
        km: '18,000 km', fuel: 'Diesel', trans: 'Automatic', condition: 'Used',
        desc: 'Premium BMW X5 SUV with powerful diesel engine, spacious interior, and full option package. Excellent condition with service history.',
        make: 'BMW', model: 'X5', engine: '3000 cc Diesel', body: 'SUV', color: 'Black Sapphire',
        features: ['Panoramic Sunroof', 'Leather Interior', 'Navigation System', 'Reverse Camera', 'Heated Seats', 'xDrive AWD']
    },
    '3-series': {
        title: 'BMW 3 Series 2023', hero: 'BMW 3 Series', year: '2023', price: 'LKR 22,500,000', priceNum: 22500000,
        badge: 'Premium', image: 'https://images.pexels.com/photos/17601809/pexels-photo-17601809.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=800',
        km: '12,000 km', fuel: 'Petrol', trans: 'Automatic', condition: 'Reconditioned',
        desc: 'Sporty BMW 3 Series sedan with dynamic handling, premium cabin, and efficient petrol engine. Low mileage and immaculate condition.',
        make: 'BMW', model: '3 Series', engine: '2000 cc Turbo Petrol', body: 'Sedan', color: 'Alpine White',
        features: ['Sport Package', 'Digital Cockpit', 'LED Headlights', 'Parking Assist', 'Cruise Control', 'Bluetooth Audio']
    },
    'range-rover-sport': {
        title: 'Range Rover Sport 2022', hero: 'Range Rover Sport', year: '2022', price: 'LKR 45,000,000', priceNum: 45000000,
        badge: 'Hot Deal', image: 'https://images.pexels.com/photos/10820126/pexels-photo-10820126.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=800',
        km: '30,000 km', fuel: 'Diesel', trans: 'Automatic', condition: 'Used',
        desc: 'Luxury Range Rover Sport with commanding road presence, premium terrain response system, and executive interior finish.',
        make: 'Land Rover', model: 'Range Rover Sport', engine: '3000 cc Diesel', body: 'SUV', color: 'Santorini Black',
        features: ['Terrain Response', 'Meridian Sound', 'Air Suspension', 'Panoramic Roof', 'Ventilated Seats', '360 Camera']
    },
    'c200': {
        title: 'Mercedes-Benz C200 2023', hero: 'Mercedes C200', year: '2023', price: 'LKR 27,800,000', priceNum: 27800000,
        badge: 'Luxury', image: 'https://images.pexels.com/photos/12960439/pexels-photo-12960439.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=800',
        km: '8,000 km', fuel: 'Petrol', trans: 'Automatic', condition: 'Reconditioned',
        desc: 'Elegant Mercedes-Benz C200 with refined comfort, advanced MBUX infotainment, and smooth turbocharged performance.',
        make: 'Mercedes-Benz', model: 'C200', engine: '1500 cc Turbo Petrol', body: 'Sedan', color: 'Obsidian Black',
        features: ['MBUX Infotainment', 'Ambient Lighting', 'Leather Seats', 'Keyless Go', 'Active Brake Assist', 'Dual Zone AC']
    },
    'hiace': {
        title: 'Toyota HiAce 2021', hero: 'Toyota HiAce', year: '2021', price: 'LKR 14,200,000', priceNum: 14200000,
        badge: 'Best Seller', image: 'https://images.pexels.com/photos/4391469/pexels-photo-4391469.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=800',
        km: '45,000 km', fuel: 'Diesel', trans: 'Manual', condition: 'Used',
        desc: 'Reliable Toyota HiAce van ideal for business and passenger transport. Spacious cabin, proven diesel engine, and low running costs.',
        make: 'Toyota', model: 'HiAce', engine: '2800 cc Diesel', body: 'Van', color: 'White',
        features: ['Dual AC', 'Sliding Doors', 'High Roof', 'ABS Brakes', 'Power Steering', '15 Seater Capacity']
    },
    'ranger': {
        title: 'Ford Ranger 2022', hero: 'Ford Ranger', year: '2022', price: 'LKR 19,500,000', priceNum: 19500000,
        badge: 'Popular', image: 'https://images.pexels.com/photos/12021863/pexels-photo-12021863.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=800',
        km: '32,000 km', fuel: 'Diesel', trans: 'Automatic', condition: 'Used',
        desc: 'Tough Ford Ranger double cab built for work and adventure. Strong towing capacity, modern tech, and rugged reliability.',
        make: 'Ford', model: 'Ranger', engine: '3200 cc Diesel', body: 'Double Cab', color: 'Metallic Grey',
        features: ['4x4 Capability', 'Touchscreen Display', 'Reverse Camera', 'Bed Liner', 'Side Steps', 'Cruise Control']
    },
    'corolla': {
        title: 'Toyota Corolla 2023', hero: 'Toyota Corolla', year: '2023', price: 'LKR 12,800,000', priceNum: 12800000,
        badge: 'Value Pick', image: 'https://images.pexels.com/photos/6706311/pexels-photo-6706311.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=800',
        km: '15,000 km', fuel: 'Hybrid', trans: 'Automatic', condition: 'Reconditioned',
        desc: 'Fuel-efficient Toyota Corolla Hybrid perfect for daily commuting. Excellent economy, comfortable ride, and Toyota reliability.',
        make: 'Toyota', model: 'Corolla', engine: '1800 cc Hybrid', body: 'Sedan', color: 'Silver Metallic',
        features: ['Hybrid System', 'Toyota Safety Sense', 'Reverse Camera', 'Bluetooth', 'Auto Climate', 'Push Start']
    },
    'touareg': {
        title: 'VW Touareg 2022', hero: 'VW Touareg', year: '2022', price: 'LKR 28,500,000', priceNum: 28500000,
        badge: 'Premium', image: 'https://images.pexels.com/photos/16646416/pexels-photo-16646416.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=800',
        km: '22,000 km', fuel: 'Diesel', trans: 'Automatic', condition: 'Reconditioned',
        desc: 'Premium Volkswagen Touareg SUV with refined ride quality, advanced 4Motion AWD, and luxurious cabin appointments.',
        make: 'Volkswagen', model: 'Touareg', engine: '3000 cc Diesel', body: 'SUV', color: 'Deep Black',
        features: ['4Motion AWD', 'Digital Cockpit', 'Adaptive Air Suspension', 'LED Matrix Lights', 'Premium Audio', 'Lane Assist']
    },
    'vito': {
        title: 'Mercedes Vito 2023', hero: 'Mercedes Vito', year: '2023', price: 'LKR 21,000,000', priceNum: 21000000,
        badge: 'Luxury', image: 'https://images.pexels.com/photos/36377071/pexels-photo-36377071.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=800',
        km: '10,000 km', fuel: 'Diesel', trans: 'Automatic', condition: 'Reconditioned',
        desc: 'Executive Mercedes Vito van with premium passenger comfort, ideal for corporate transport and family travel.',
        make: 'Mercedes-Benz', model: 'Vito', engine: '2200 cc Diesel', body: 'Van', color: 'Arctic White',
        features: ['Captain Seats', 'Rear AC Vents', 'Electric Sliding Door', 'Cruise Control', 'Parking Sensors', '8 Seater']
    },
    'hilux': {
        title: 'Toyota Hilux 2022', hero: 'Toyota Hilux', year: '2022', price: 'LKR 17,900,000', priceNum: 17900000,
        badge: 'Hot Deal', image: 'https://images.pexels.com/photos/12021856/pexels-photo-12021856.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=800',
        km: '28,000 km', fuel: 'Diesel', trans: 'Manual', condition: 'Used',
        desc: 'Legendary Toyota Hilux double cab known for durability and resale value. Perfect for commercial and personal use.',
        make: 'Toyota', model: 'Hilux', engine: '2800 cc Diesel', body: 'Double Cab', color: 'White',
        features: ['4x4 Drive', 'Deck Liner', 'Side Steps', 'ABS & EBD', 'Power Windows', 'Heavy Duty Suspension']
    },
    'lancer-evo-x': {
        title: 'Mitsubishi Lancer Evo X 2019', hero: 'Lancer Evo X', year: '2019', price: 'LKR 16,500,000', priceNum: 16500000,
        badge: 'Sport', image: 'https://images.pexels.com/photos/24017320/pexels-photo-24017320.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=800',
        km: '42,000 km', fuel: 'Petrol', trans: 'Manual', condition: 'Used',
        desc: 'Iconic Mitsubishi Lancer Evolution X with turbocharged performance and rally-bred handling. A true enthusiast vehicle.',
        make: 'Mitsubishi', model: 'Lancer Evo X', engine: '2000 cc Turbo', body: 'Sedan', color: 'Octane Blue',
        features: ['Twin Clutch SST', 'Recaro Seats', 'Brembo Brakes', 'Active Yaw Control', 'Turbo Boost Gauge', 'Sport Exhaust']
    },
    'hr-v': {
        title: 'Honda HR-V 2023', hero: 'Honda HR-V', year: '2023', price: 'LKR 13,500,000', priceNum: 13500000,
        badge: 'Popular', image: 'https://images.pexels.com/photos/16816785/pexels-photo-16816785.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=800',
        km: '20,000 km', fuel: 'Petrol', trans: 'Automatic', condition: 'Used',
        desc: 'Compact Honda HR-V crossover with versatile Magic Seats, excellent fuel economy, and Honda reliability.',
        make: 'Honda', model: 'HR-V', engine: '1500 cc Petrol', body: 'SUV', color: 'Platinum White',
        features: ['Magic Seats', 'Honda Sensing', 'Reverse Camera', 'Touchscreen Audio', 'Auto AC', 'LED Headlights']
    },
    'sylphy': {
        title: 'Nissan Sylphy 2022', hero: 'Nissan Sylphy', year: '2022', price: 'LKR 11,500,000', priceNum: 11500000,
        badge: 'Eco', image: 'https://images.pexels.com/photos/19868900/pexels-photo-19868900.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=800',
        km: '18,000 km', fuel: 'Hybrid', trans: 'Automatic', condition: 'Used',
        desc: 'Comfortable Nissan Sylphy sedan with spacious rear legroom, smooth hybrid drive, and excellent fuel efficiency.',
        make: 'Nissan', model: 'Sylphy', engine: '1200 cc Hybrid', body: 'Sedan', color: 'Pearl White',
        features: ['e-POWER Hybrid', 'Spacious Cabin', 'Around View Monitor', 'Keyless Entry', 'Cruise Control', 'ISOFIX Mounts']
    },
    'ranger-wildtrak': {
        title: 'Ford Ranger Wildtrak 2023', hero: 'Ranger Wildtrak', year: '2023', price: 'LKR 23,000,000', priceNum: 23000000,
        badge: 'New', image: 'https://images.pexels.com/photos/12021863/pexels-photo-12021863.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=800',
        km: '5,000 km', fuel: 'Diesel', trans: 'Automatic', condition: 'New',
        desc: 'Top-spec Ford Ranger Wildtrak with orange accents, premium interior, and full off-road capability. Nearly brand new condition.',
        make: 'Ford', model: 'Ranger Wildtrak', engine: '3200 cc Bi-Turbo Diesel', body: 'Double Cab', color: 'Shadow Black',
        features: ['Wildtrak Styling', 'SYNC 4 Infotainment', '360 Camera', 'LED Light Bar', 'Leather Seats', 'Off-Road Pack']
    },
    'isuzu-nqr': {
        title: 'Isuzu NQR 2021', hero: 'Isuzu NQR', year: '2021', price: 'LKR 16,500,000', priceNum: 16500000,
        badge: 'Heavy Duty', image: 'https://images.pexels.com/photos/2199293/pexels-photo-2199293.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=800',
        km: '65,000 km', fuel: 'Diesel', trans: 'Manual', condition: 'Used',
        desc: 'Dependable Isuzu NQR truck built for commercial hauling. Strong diesel engine, high payload capacity, and proven durability.',
        make: 'Isuzu', model: 'NQR', engine: '5200 cc Diesel', body: 'Truck', color: 'White',
        features: ['High Payload', 'Power Steering', 'Air Brakes', 'Dual Rear Wheels', 'Steel Cargo Bed', 'Fleet Maintained']
    }
};

const VEHICLE_TITLE_MAP = {
    'Audi A4 2023': 'a4',
    'BMW X5 2022': 'x5',
    'BMW 3 Series 2023': '3-series',
    'Range Rover Sport 2022': 'range-rover-sport',
    'Mercedes-Benz C200 2023': 'c200',
    'Toyota HiAce 2021': 'hiace',
    'Ford Ranger 2022': 'ranger',
    'Toyota Corolla 2023': 'corolla',
    'VW Touareg 2022': 'touareg',
    'Mercedes Vito 2023': 'vito',
    'Toyota Hilux 2022': 'hilux',
    'Mitsubishi Lancer Evo X': 'lancer-evo-x',
    'Isuzu NQR 2021': 'isuzu-nqr'
};

function getVehicleIdFromCard(card) {
    if (card.dataset.model) return card.dataset.model;
    const title = card.querySelector('.vehicle-card-body h3')?.textContent?.trim();
    return VEHICLE_TITLE_MAP[title] || 'a4';
}

function initVehicleExploreLinks() {
    document.querySelectorAll('#vehicleGrid .vehicle-card, #vehiclePageGrid .vehicle-card').forEach(card => {
        const vehicleId = getVehicleIdFromCard(card);
        const detailUrl = `vehicle-detail.html?vehicle=${encodeURIComponent(vehicleId)}`;

        const overlayLink = card.querySelector('.vehicle-overlay a');
        if (overlayLink) {
            overlayLink.href = detailUrl;
            overlayLink.textContent = 'Explore More';
        }

        if (!card.querySelector('.vehicle-explore-more')) {
            const body = card.querySelector('.vehicle-card-body');
            if (!body) return;
            const link = document.createElement('a');
            link.className = 'vehicle-explore-more';
            link.href = detailUrl;
            link.innerHTML = 'Explore More <i class="fas fa-arrow-right"></i>';
            body.appendChild(link);
        } else {
            card.querySelector('.vehicle-explore-more').href = detailUrl;
        }
    });
}

function loadVehicleDetailPage() {
    if (!document.querySelector('.vehicle-detail-section')) return;

    const params = new URLSearchParams(window.location.search);
    const vehicleId = params.get('vehicle') || 'a4';
    const data = VEHICLE_CATALOG[vehicleId] || VEHICLE_CATALOG.a4;

    document.title = `${data.title} | SKARA TRADERS`;

    const breadcrumb = document.getElementById('detailBreadcrumb');
    if (breadcrumb) breadcrumb.textContent = data.hero;

    const mainImage = document.getElementById('detailMainImage');
    const imageBadge = document.getElementById('detailImageBadge');
    const heroImage = data.image.replace('h=600', 'h=900').replace('w=800', 'w=1400');
    if (mainImage) {
        mainImage.src = heroImage;
        mainImage.alt = data.title;
    }
    if (imageBadge) imageBadge.textContent = data.badge;

    const badge = document.getElementById('detailBadge');
    const title = document.getElementById('detailTitle');
    const priceDisplay = document.getElementById('detailPriceDisplay');
    const desc = document.getElementById('detailDesc');
    if (badge) badge.textContent = data.badge;
    if (title) title.textContent = data.title;
    if (priceDisplay) priceDisplay.textContent = data.price;
    if (desc) desc.textContent = data.desc;

    const yearEl = document.getElementById('detailYear');
    const kmEl = document.getElementById('detailKm');
    const fuelEl = document.getElementById('detailFuel');
    const transEl = document.getElementById('detailTrans');
    if (yearEl) yearEl.textContent = data.year;
    if (kmEl) kmEl.textContent = data.km;
    if (fuelEl) fuelEl.textContent = data.fuel;
    if (transEl) transEl.textContent = data.trans;

    const specsList = document.getElementById('detailSpecsList');
    if (specsList) {
        specsList.innerHTML = `
            <li><span>Make</span><span>${data.make}</span></li>
            <li><span>Model</span><span>${data.model}</span></li>
            <li><span>Year of Manufacture</span><span>${data.year}</span></li>
            <li><span>Engine Capacity</span><span>${data.engine}</span></li>
            <li><span>Transmission</span><span>${data.trans}</span></li>
            <li><span>Body Type</span><span>${data.body}</span></li>
            <li><span>Color</span><span>${data.color}</span></li>
            <li><span>Condition</span><span>${data.condition}</span></li>
            <li><span>Mileage</span><span>${data.km}</span></li>
            <li><span>Fuel Type</span><span>${data.fuel}</span></li>
        `;
    }

    const featuresGrid = document.getElementById('detailFeatures');
    if (featuresGrid) {
        featuresGrid.innerHTML = data.features
            .map(f => `<span><i class="fas fa-check-circle"></i> ${f}</span>`)
            .join('');
    }

    const detailPrice = document.getElementById('detailPrice');
    const detailDown = document.getElementById('detailDownPayment');
    if (detailPrice) detailPrice.value = data.priceNum.toLocaleString();
    if (detailDown) detailDown.value = Math.round(data.priceNum * 0.3);

    window.__detailVehiclePrice = data.priceNum;
}

function initDetailGallery() {
    if (!document.querySelector('.gallery-main')) return;

    const thumbs = new Swiper('.gallery-thumbs', {
        spaceBetween: 10,
        slidesPerView: 4,
        freeMode: true,
        watchSlidesProgress: true
    });

    new Swiper('.gallery-main', {
        spaceBetween: 10,
        navigation: { nextEl: '.gallery-main .swiper-button-next', prevEl: '.gallery-main .swiper-button-prev' },
        thumbs: { swiper: thumbs }
    });
}

function initDetailLeaseCalc() {
    const detailPrice = document.getElementById('detailPrice');
    const detailDown = document.getElementById('detailDownPayment');
    const detailPeriod = document.getElementById('detailPeriod');
    const detailRate = document.getElementById('detailRate');
    const detailMonthly = document.getElementById('detailMonthly');
    if (!detailPrice || !detailMonthly) return;

    function updateDetailCalc() {
        const price = window.__detailVehiclePrice || parseInt(String(detailPrice.value).replace(/,/g, ''), 10) || 0;
        const down = parseInt(detailDown?.value, 10) || 0;
        const years = parseInt(detailPeriod?.value, 10) || 5;
        const rate = (parseFloat(detailRate?.value) || 14.5) / 100 / 12;
        const months = years * 12;
        const loan = Math.max(price - down, 0);
        let monthly = 0;
        if (rate > 0 && months > 0 && loan > 0) {
            monthly = loan * (rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
        }
        detailMonthly.textContent = 'LKR ' + Math.round(monthly).toLocaleString();
    }

    [detailDown, detailPeriod, detailRate].forEach(el => el?.addEventListener('input', updateDetailCalc));
    [detailDown, detailPeriod, detailRate].forEach(el => el?.addEventListener('change', updateDetailCalc));
    updateDetailCalc();
}

document.addEventListener('DOMContentLoaded', () => {

    loadVehicleDetailPage();
    initDetailGallery();
    initDetailLeaseCalc();
    initVehicleExploreLinks();

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

    function closeMobileMenu() {
        hamburger?.classList.remove('active');
        mobileMenu?.classList.remove('active');
        document.body.style.overflow = '';
    }

    hamburger?.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';

        if (mobileMenu.classList.contains('active') && typeof gsap !== 'undefined') {
            gsap.fromTo(mobileLinks,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, stagger: 0.08, duration: 0.5, ease: 'power3.out', delay: 0.2 }
            );
        }
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // ==========================================
    // 2b. PROMOTIONS DROPDOWN
    // ==========================================
    const promoDropdown = document.getElementById('promoDropdown');
    const promoTrigger = promoDropdown?.querySelector('.nav-dropdown-trigger');

    promoTrigger?.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = promoDropdown.classList.toggle('open');
        promoTrigger.setAttribute('aria-expanded', isOpen);
    });

    document.addEventListener('click', (e) => {
        if (promoDropdown && !promoDropdown.contains(e.target)) {
            promoDropdown.classList.remove('open');
            promoTrigger?.setAttribute('aria-expanded', 'false');
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && promoDropdown?.classList.contains('open')) {
            promoDropdown.classList.remove('open');
            promoTrigger?.setAttribute('aria-expanded', 'false');
        }
    });

    promoDropdown?.querySelectorAll('.promo-vehicle-card, .promo-dropdown-all').forEach(link => {
        link.addEventListener('click', (e) => {
            e.stopPropagation();
            promoDropdown.classList.remove('open');
            promoTrigger?.setAttribute('aria-expanded', 'false');
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
    const searchVehicleBtn = document.getElementById('searchVehicleBtn');
    const filterMake = document.getElementById('filterMake');
    const filterModel = document.getElementById('filterModel');
    const vehiclePageCards = document.querySelectorAll('#vehiclePageGrid .vehicle-card');
    const vehicleNoResults = document.getElementById('vehicleNoResults');
    const vehicleResultCount = document.getElementById('vehicleResultCount');

    const makeLabels = {
        toyota: 'Toyota', bmw: 'BMW', mercedes: 'Mercedes', audi: 'Audi',
        honda: 'Honda', nissan: 'Nissan', ford: 'Ford', vw: 'Volkswagen',
        mitsubishi: 'Mitsubishi', landrover: 'Land Rover'
    };

    const modelLabels = {
        a4: 'A4', x5: 'X5', '3-series': '3 Series', 'range-rover-sport': 'Range Rover Sport',
        c200: 'C200', hiace: 'HiAce', ranger: 'Ranger', corolla: 'Corolla',
        touareg: 'Touareg', vito: 'Vito', hilux: 'Hilux', 'lancer-evo-x': 'Lancer Evo X',
        'hr-v': 'HR-V', sylphy: 'Sylphy', 'ranger-wildtrak': 'Ranger Wildtrak'
    };

    const conditionLabels = {
        new: 'New', used: 'Used', reconditioned: 'Reconditioned'
    };

    function enrichVehicleCards() {
        vehiclePageCards.forEach(card => {
            const body = card.querySelector('.vehicle-card-body');
            if (!body || body.querySelector('.vehicle-filter-info')) return;

            const year = card.dataset.year || '';
            const make = makeLabels[card.dataset.brand] || card.dataset.brand || '';
            const model = modelLabels[card.dataset.model] || card.dataset.model || '';
            const condition = conditionLabels[card.dataset.condition] || card.dataset.condition || '';

            const meta = document.createElement('p');
            meta.className = 'vehicle-filter-info';
            meta.innerHTML = `
                <span>Year: ${year}</span>
                <span>Make: ${make}</span>
                <span>Model: ${model}</span>
                <span>Condition: ${condition}</span>
            `;

            const title = body.querySelector('h3');
            if (title) title.after(meta);
        });
    }

    const allModelOptions = filterModel
        ? Array.from(filterModel.options).slice(1).map(opt => ({
            value: opt.value,
            text: opt.textContent,
            make: opt.dataset.make || ''
        }))
        : [];

    function updateModelOptions() {
        if (!filterModel) return;

        const selectedMake = filterMake?.value || '';
        const currentModel = filterModel.value;

        filterModel.innerHTML = '<option value="">Select Model</option>';
        allModelOptions
            .filter(opt => !selectedMake || opt.make === selectedMake)
            .forEach(opt => {
                const option = document.createElement('option');
                option.value = opt.value;
                option.textContent = opt.text;
                option.dataset.make = opt.make;
                filterModel.appendChild(option);
            });

        if (currentModel && [...filterModel.options].some(o => o.value === currentModel)) {
            filterModel.value = currentModel;
        }
    }

    function matchesPriceRange(priceValue, cardPrice) {
        if (!priceValue) return true;
        if (priceValue === 'low') return cardPrice <= 15000000;
        if (priceValue === 'mid') return cardPrice > 15000000 && cardPrice <= 30000000;
        if (priceValue === 'high') return cardPrice > 30000000;
        return true;
    }

    const priceLabels = {
        low: 'Under LKR 15M', mid: 'LKR 15M - 30M', high: 'Above LKR 30M'
    };

    function buildFilterSummary() {
        const year = document.getElementById('filterYear')?.value || '';
        const make = filterMake?.value || '';
        const model = filterModel?.value || '';
        const condition = document.getElementById('filterCondition')?.value || '';
        const price = document.getElementById('filterPrice')?.value || '';
        const parts = [];

        if (year) parts.push(year);
        if (make) parts.push(makeLabels[make] || make);
        if (model) parts.push(modelLabels[model] || model);
        if (condition) parts.push(conditionLabels[condition] || condition);
        if (price) parts.push(priceLabels[price] || price);

        return parts.length ? parts.join(' · ') : 'All vehicles';
    }

    function collapseMobileFilter(visibleCount) {
        if (!window.matchMedia('(max-width: 768px)').matches) return;

        const filterBar = document.getElementById('vehicleFilterBar');
        const summary = document.getElementById('filterMobileSummary');
        const summaryText = document.getElementById('filterSummaryText');
        if (!filterBar || !summary) return;

        filterBar.classList.add('search-collapsed');
        summary.hidden = false;
        if (summaryText) {
            summaryText.textContent = `${visibleCount} vehicle${visibleCount === 1 ? '' : 's'} · ${buildFilterSummary()}`;
        }

        const grid = document.getElementById('vehiclePageGrid');
        if (grid) {
            const top = grid.getBoundingClientRect().top + window.scrollY - 110;
            window.scrollTo({ top: Math.max(top, 0), behavior: 'smooth' });
        }
    }

    function expandMobileFilter() {
        const filterBar = document.getElementById('vehicleFilterBar');
        const summary = document.getElementById('filterMobileSummary');
        filterBar?.classList.remove('search-collapsed');
        if (summary) summary.hidden = true;
    }

    function filterVehicles(options = {}) {
        const year = document.getElementById('filterYear')?.value || '';
        const make = filterMake?.value || '';
        const model = filterModel?.value || '';
        const condition = document.getElementById('filterCondition')?.value || '';
        const price = document.getElementById('filterPrice')?.value || '';

        let visibleCount = 0;

        vehiclePageCards.forEach(card => {
            const cardYear = card.dataset.year || '';
            const cardBrand = card.dataset.brand || '';
            const cardModel = card.dataset.model || '';
            const cardCondition = card.dataset.condition || '';
            const cardPrice = parseInt(card.dataset.price, 10) || 0;

            const show =
                (!year || cardYear === year) &&
                (!make || cardBrand === make) &&
                (!model || cardModel === model) &&
                (!condition || cardCondition === condition) &&
                matchesPriceRange(price, cardPrice);

            card.style.display = show ? '' : 'none';
            if (show) {
                visibleCount += 1;
                if (typeof gsap !== 'undefined') {
                    gsap.fromTo(card, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4 });
                }
            }
        });

        if (vehicleNoResults) vehicleNoResults.hidden = visibleCount > 0;
        if (vehicleResultCount) {
            vehicleResultCount.textContent = visibleCount
                ? `Showing ${visibleCount} of ${vehiclePageCards.length} vehicles`
                : '';
        }

        if (options.collapseMobile) {
            collapseMobileFilter(visibleCount);
        }
    }

    if (vehiclePageCards.length) {
        enrichVehicleCards();
        filterVehicles();
    }

    if (filterMake) filterMake.addEventListener('change', updateModelOptions);
    if (searchVehicleBtn) {
        searchVehicleBtn.addEventListener('click', () => filterVehicles({ collapseMobile: true }));
    }
    document.getElementById('filterExpandBtn')?.addEventListener('click', expandMobileFilter);
});
