/* ============================================
   SKARA TRADERS — Admin login + console
   ============================================ */

const DEMO_USER = 'admin';
const DEMO_PASS = 'skara2025';

function store() {
    return window.SkaraStore || {};
}

function qs(sel, root = document) {
    return root.querySelector(sel);
}

function qsa(sel, root = document) {
    return [...root.querySelectorAll(sel)];
}

function initLoginPage() {
    if (!document.body.classList.contains('login-body')) return;

    if (localStorage.getItem('skaraAdmin') === '1') {
        window.location.replace('admin.html');
        return;
    }

    const form = qs('#adminLoginForm');
    const user = qs('#adminUser');
    const pass = qs('#adminPass');
    const remember = qs('#adminRemember');
    const error = qs('#loginError');
    const card = qs('.login-card');
    const toggle = qs('#togglePass');

    const saved = localStorage.getItem('skaraRememberUser');
    if (saved && user) {
        user.value = saved;
        if (remember) remember.checked = true;
    }

    toggle?.addEventListener('click', () => {
        if (!pass) return;
        const show = pass.type === 'password';
        pass.type = show ? 'text' : 'password';
        toggle.innerHTML = show ? '<i class="fas fa-eye-slash"></i>' : '<i class="fas fa-eye"></i>';
    });

    user?.addEventListener('input', () => { if (error) error.hidden = true; });
    pass?.addEventListener('input', () => { if (error) error.hidden = true; });

    form?.addEventListener('submit', (e) => {
        e.preventDefault();
        const u = (user?.value || '').trim();
        const p = pass?.value || '';

        if (u === DEMO_USER && p === DEMO_PASS) {
            localStorage.setItem('skaraAdmin', '1');
            if (remember?.checked) localStorage.setItem('skaraRememberUser', u);
            else localStorage.removeItem('skaraRememberUser');
            window.location.href = 'admin.html';
            return;
        }

        if (error) error.hidden = false;
        card?.classList.remove('is-shake');
        void card?.offsetWidth;
        card?.classList.add('is-shake');
        pass?.focus();
    });
}

function requireAdminSession() {
    if (!document.body.classList.contains('admin-body')) return true;
    if (localStorage.getItem('skaraAdmin') === '1') return true;
    window.location.replace('admin-login.html');
    return false;
}

const VIEW_META = {
    dashboard: { title: 'Dashboard', eyebrow: 'Overview' },
    vehicles: { title: 'Vehicles', eyebrow: 'Inventory' },
    promotions: { title: 'Promotions', eyebrow: 'Campaigns' },
    parts: { title: 'Spare Parts', eyebrow: 'Counter' },
    services: { title: 'Services', eyebrow: 'Workshop' },
    leads: { title: 'Leads', eyebrow: 'CRM' },
    finance: { title: 'Finance', eyebrow: 'Credit desk' },
    settings: { title: 'Settings', eyebrow: 'Console' }
};

function showView(name) {
    const view = VIEW_META[name] ? name : 'dashboard';
    qsa('.admin-view').forEach((el) => {
        const on = el.dataset.view === view;
        el.hidden = !on;
        el.classList.toggle('is-active', on);
    });
    qsa('.admin-nav-item[data-nav]').forEach((btn) => {
        btn.classList.toggle('is-active', btn.dataset.nav === view);
    });
    const meta = VIEW_META[view];
    const title = qs('#topbarTitle');
    const eye = qs('#topbarEyebrow');
    if (title) title.textContent = meta.title;
    if (eye) eye.textContent = meta.eyebrow;
    closeSidebar();
}

function openSidebar() {
    qs('#adminSidebar')?.classList.add('is-open');
    const backdrop = qs('#adminBackdrop');
    if (backdrop) backdrop.hidden = false;
}

function closeSidebar() {
    qs('#adminSidebar')?.classList.remove('is-open');
    const backdrop = qs('#adminBackdrop');
    if (backdrop) backdrop.hidden = true;
}

function statusClass(condition) {
    const c = String(condition || '').toLowerCase();
    if (c.includes('new') && !c.includes('recond')) return 'new';
    if (c.includes('recond')) return 'reco';
    return 'used';
}

function getAllVehicles() {
    if (typeof store().getVehicles === 'function') return store().getVehicles();
    return {};
}

function renderDashboard() {
    const vehicles = getAllVehicles();
    const list = Object.values(vehicles);
    const stock = list.length;
    const deals = list.filter((v) => /hot/i.test(v.badge || '')).length;
    const book = list.reduce((sum, v) => sum + (Number(v.priceNum) || 0), 0);
    const monthly = Math.round(book / 60);

    const stockEl = qs('#kpiStock');
    const dealsEl = qs('#kpiDeals');
    const monthlyEl = qs('#kpiMonthly');
    if (stockEl) stockEl.textContent = String(stock);
    if (dealsEl) dealsEl.textContent = String(deals);
    if (monthlyEl) monthlyEl.textContent = store().formatLkr ? store().formatLkr(monthly) : `LKR ${monthly.toLocaleString()}`;

    const mix = { Sedan: 0, SUV: 0, Van: 0, 'Double Cab': 0, Truck: 0, Other: 0 };
    list.forEach((v) => {
        const b = v.body || '';
        if (/suv/i.test(b)) mix.SUV += 1;
        else if (/van/i.test(b)) mix.Van += 1;
        else if (/cab|pickup/i.test(b)) mix['Double Cab'] += 1;
        else if (/truck/i.test(b)) mix.Truck += 1;
        else if (/sedan|car/i.test(b)) mix.Sedan += 1;
        else mix.Other += 1;
    });
    const mixList = qs('#mixList');
    if (mixList) {
        mixList.innerHTML = Object.entries(mix)
            .filter(([, n]) => n > 0 || stock === 0)
            .map(([label, n]) => {
                const pct = stock ? Math.round((n / stock) * 100) : 0;
                return `<li><span>${label}</span><div class="mix-bar"><span style="width:${pct}%"></span></div><strong>${n}</strong></li>`;
            })
            .join('');
    }
}

function renderVehiclesTable(filter = '') {
    const body = qs('#vehiclesTableBody');
    const empty = qs('#vehiclesEmpty');
    const table = qs('#vehiclesTable');
    if (!body) return;

    const q = filter.trim().toLowerCase();
    const entries = Object.entries(getAllVehicles()).filter(([, v]) => {
        if (!q) return true;
        return `${v.title} ${v.year} ${v.badge} ${v.condition}`.toLowerCase().includes(q);
    });

    if (!entries.length) {
        body.innerHTML = '';
        const noneAtAll = Object.keys(getAllVehicles()).length === 0;
        if (empty) {
            empty.hidden = false;
            const h = empty.querySelector('h3');
            const p = empty.querySelector('p');
            if (h) h.textContent = noneAtAll ? 'No vehicles on the floor' : 'No matching vehicles';
            if (p) p.textContent = noneAtAll
                ? 'Add a listing or restore stock to populate the showroom overlay.'
                : 'Try a different search term.';
        }
        if (table) table.hidden = true;
        return;
    }

    if (empty) empty.hidden = true;
    if (table) table.hidden = false;

    body.innerHTML = entries.map(([id, v]) => {
        const img = v.image || store().SKARA_DEFAULT_IMAGE || '';
        const cond = v.condition || 'Used';
        return `
            <tr data-id="${id}">
                <td><img class="veh-photo" src="${img}" alt=""></td>
                <td>
                    <strong>${v.title || id}</strong>
                    <div style="color:var(--gray-300);font-size:0.75rem;margin-top:2px;">${v.badge || ''}</div>
                </td>
                <td>${v.year || '—'}</td>
                <td>${v.price || ''}</td>
                <td><span class="status-pill ${statusClass(cond)}">${cond}</span></td>
                <td>
                    <div class="row-actions">
                        <button type="button" class="row-btn" data-edit="${id}"><i class="fas fa-pen"></i> Edit</button>
                        <button type="button" class="row-btn delete" data-del="${id}"><i class="fas fa-trash"></i> Delete</button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

function fillSelect(sel, value) {
    if (!sel || value == null) return;
    const match = [...sel.options].find((o) => o.value.toLowerCase() === String(value).toLowerCase());
    if (match) sel.value = match.value;
    else sel.value = value;
}

function openDrawer(id, isNew = false) {
    const drawer = qs('#vehicleDrawer');
    const vehicles = getAllVehicles();
    const catalog = store().VEHICLE_CATALOG || {};
    const data = isNew ? {} : (vehicles[id] || catalog[id] || {});

    qs('#vehId').value = id || '';
    qs('#vehIsNew').value = isNew ? '1' : '0';
    qs('#drawerKicker').textContent = isNew ? 'New listing' : 'Edit listing';
    qs('#drawerTitle').textContent = isNew ? 'Add vehicle' : (data.title || 'Vehicle');
    qs('#vehTitle').value = data.title || '';
    qs('#vehYear').value = data.year || '';
    qs('#vehPrice').value = data.priceNum ? String(data.priceNum) : '';
    qs('#vehKm').value = data.km || '';
    qs('#vehBadge').value = data.badge || '';
    fillSelect(qs('#vehFuel'), data.fuel || 'Petrol');
    fillSelect(qs('#vehTrans'), data.trans || 'Automatic');
    fillSelect(qs('#vehCondition'), data.condition || 'Used');
    fillSelect(qs('#vehBody'), data.body || 'Sedan');
    qs('#vehDesc').value = data.desc || '';

    drawer.hidden = false;
    requestAnimationFrame(() => drawer.classList.add('is-on'));
}

function closeDrawer() {
    const drawer = qs('#vehicleDrawer');
    if (!drawer) return;
    drawer.classList.remove('is-on');
    setTimeout(() => { drawer.hidden = true; }, 220);
}

function collectFormFields() {
    const parse = store().parsePriceInput || ((v) => parseInt(String(v).replace(/[^\d]/g, ''), 10) || 0);
    const format = store().formatLkr || ((n) => `LKR ${Number(n).toLocaleString()}`);
    const priceNum = parse(qs('#vehPrice').value);
    const title = qs('#vehTitle').value.trim();
    const year = qs('#vehYear').value.trim();
    return {
        title,
        hero: title.replace(/\s+\d{4}$/, ''),
        year,
        priceNum,
        price: format(priceNum),
        km: qs('#vehKm').value.trim() || '—',
        fuel: qs('#vehFuel').value,
        trans: qs('#vehTrans').value,
        badge: qs('#vehBadge').value.trim() || 'Listed',
        condition: qs('#vehCondition').value,
        body: qs('#vehBody').value,
        desc: qs('#vehDesc').value.trim(),
        cat: store().bodyTypeToCat ? store().bodyTypeToCat(qs('#vehBody').value) : 'car'
    };
}

function slugId(title) {
    const base = (title || 'vehicle').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'vehicle';
    const all = { ...(store().VEHICLE_CATALOG || {}), ...getAllVehicles() };
    let id = base;
    let n = 2;
    while (all[id]) id = `${base}-${n++}`;
    return id;
}

/* ——— Promotions store ——— */
const SKARA_PROMOS_KEY = 'skaraPromotions';
const SKARA_PARTS_KEY = 'skaraParts';

const DEFAULT_PROMOS = {
    'bmw-x5': {
        title: 'BMW X5 2022',
        vehicleId: 'x5',
        badge: 'Hot Deal',
        discount: 'Save 10%',
        oldPrice: 'LKR 35,500,000',
        newPrice: 'LKR 32,000,000',
        oldPriceNum: 35500000,
        newPriceNum: 32000000,
        image: 'https://commons.wikimedia.org/wiki/Special:FilePath/BMW_G05_X5_xDrive45e_M_Sport_Black_Sapphire_Metallic_(2).jpg?width=800',
        status: 'live',
        note: 'Premium SUV campaign — finance packs available on the floor.'
    },
    'ford-ranger': {
        title: 'Ford Ranger Wildtrak 2023',
        vehicleId: 'ranger-wildtrak',
        badge: 'New Arrival',
        discount: 'Free Service',
        oldPrice: '',
        newPrice: 'LKR 23,000,000',
        oldPriceNum: 0,
        newPriceNum: 23000000,
        image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Ford_Ranger_(T6,_P703)_Wildtrak_IMG_7320.jpg?width=800',
        status: 'live',
        note: 'Complimentary first service pack with purchase this month.'
    },
    'toyota-corolla': {
        title: 'Toyota Corolla 2023',
        vehicleId: 'corolla',
        badge: 'Value Pick',
        discount: 'Best Value',
        oldPrice: 'LKR 14,200,000',
        newPrice: 'LKR 12,800,000',
        oldPriceNum: 14200000,
        newPriceNum: 12800000,
        image: 'https://commons.wikimedia.org/wiki/Special:FilePath/2023_Toyota_Corolla_Altis_1.8_Sport.jpg?width=800',
        status: 'ending',
        note: 'Hybrid commute deal — limited stock before campaign close.'
    }
};

const DEFAULT_PARTS = {
    'brk-fr-420': {
        name: 'Ceramic brake kit · front',
        category: 'brake',
        sku: 'BRK-FR-420',
        stock: 42,
        price: 'LKR 48,500',
        priceNum: 48500,
        status: 'in-stock'
    },
    'brk-rr-318': {
        name: 'OEM brake pads · rear',
        category: 'brake',
        sku: 'BRK-RR-318',
        stock: 28,
        price: 'LKR 22,000',
        priceNum: 22000,
        status: 'in-stock'
    },
    'flt-oil-90': {
        name: 'Oil filter pack (mixed)',
        category: 'filter',
        sku: 'FLT-OIL-90',
        stock: 118,
        price: 'LKR 3,200',
        priceNum: 3200,
        status: 'in-stock'
    },
    'flt-cab-55': {
        name: 'Cabin air filter',
        category: 'filter',
        sku: 'FLT-CAB-55',
        stock: 64,
        price: 'LKR 4,800',
        priceNum: 4800,
        status: 'in-stock'
    },
    'bdy-trim-07': {
        name: 'Body trim set · side skirts',
        category: 'body',
        sku: 'BDY-TRIM-07',
        stock: 7,
        price: 'LKR 65,000',
        priceNum: 65000,
        status: 'backordered'
    },
    'eng-oil-5w30': {
        name: 'Synthetic engine oil 5W-30 (4L)',
        category: 'engine',
        sku: 'ENG-OIL-5W30',
        stock: 36,
        price: 'LKR 12,500',
        priceNum: 12500,
        status: 'in-stock'
    },
    'spk-ir-16': {
        name: 'Iridium spark plugs (set of 4)',
        category: 'electrical',
        sku: 'SPK-IR-16',
        stock: 9,
        price: 'LKR 18,900',
        priceNum: 18900,
        status: 'low'
    },
    'sus-strut-l': {
        name: 'Front strut assembly · LH',
        category: 'suspension',
        sku: 'SUS-STRUT-L',
        stock: 4,
        price: 'LKR 78,000',
        priceNum: 78000,
        status: 'low'
    }
};

function parseStoredMap(key, fallback) {
    try {
        const raw = JSON.parse(localStorage.getItem(key) || 'null');
        if (raw && typeof raw === 'object' && !Array.isArray(raw)) return raw;
    } catch (_) { /* ignore corrupt */ }
    localStorage.setItem(key, JSON.stringify(fallback));
    return { ...fallback };
}

function saveStoredMap(key, map) {
    localStorage.setItem(key, JSON.stringify(map));
}

function getPromotions() {
    return parseStoredMap(SKARA_PROMOS_KEY, DEFAULT_PROMOS);
}

function getParts() {
    return parseStoredMap(SKARA_PARTS_KEY, DEFAULT_PARTS);
}

function formatPriceField(raw) {
    const parse = store().parsePriceInput || ((v) => parseInt(String(v).replace(/[^\d]/g, ''), 10) || 0);
    const format = store().formatLkr || ((n) => `LKR ${Number(n).toLocaleString()}`);
    const num = parse(raw);
    return { num, label: num ? format(num) : '' };
}

function promoStatusClass(status) {
    return String(status || '').toLowerCase() === 'ending' ? 'ending' : 'live';
}

function partStatusClass(status) {
    const s = String(status || '').toLowerCase();
    if (s === 'low') return 'low';
    if (s === 'backordered') return 'backordered';
    return 'in-stock';
}

function partStatusLabel(status) {
    const s = String(status || '').toLowerCase();
    if (s === 'low') return 'Low stock';
    if (s === 'backordered') return 'Back-ordered';
    return 'In stock';
}

function renderPromosTable(filter = '') {
    const body = qs('#promosTableBody');
    const empty = qs('#promosEmpty');
    const table = qs('#promosTable');
    if (!body) return;

    const q = filter.trim().toLowerCase();
    const entries = Object.entries(getPromotions()).filter(([, p]) => {
        if (!q) return true;
        return `${p.title} ${p.badge} ${p.discount} ${p.status} ${p.vehicleId}`.toLowerCase().includes(q);
    });

    if (!entries.length) {
        body.innerHTML = '';
        const noneAtAll = Object.keys(getPromotions()).length === 0;
        if (empty) {
            empty.hidden = false;
            const h = empty.querySelector('h3');
            const p = empty.querySelector('p');
            if (h) h.textContent = noneAtAll ? 'No promotions live' : 'No matching campaigns';
            if (p) p.textContent = noneAtAll
                ? 'Add a campaign tile to feature on the hot deals desk.'
                : 'Try a different search term.';
        }
        if (table) table.hidden = true;
        return;
    }

    if (empty) empty.hidden = true;
    if (table) table.hidden = false;

    body.innerHTML = entries.map(([id, p]) => {
        const img = p.image || store().SKARA_DEFAULT_IMAGE || '';
        const status = p.status === 'ending' ? 'ending' : 'live';
        const prices = [
            p.oldPrice ? `<span class="old">${p.oldPrice}</span>` : '',
            p.newPrice ? `<span class="new">${p.newPrice}</span>` : '<span class="new">—</span>'
        ].filter(Boolean).join('');
        return `
            <tr data-id="${id}">
                <td><img class="veh-photo" src="${img}" alt=""></td>
                <td>
                    <strong>${p.title || id}</strong>
                    <div style="color:var(--gray-300);font-size:0.75rem;margin-top:2px;">${p.badge || ''}${p.vehicleId ? ` · #${p.vehicleId}` : ''}</div>
                </td>
                <td>${p.discount || '—'}</td>
                <td><div class="promo-prices">${prices}</div></td>
                <td><span class="status-pill ${promoStatusClass(status)}">${status}</span></td>
                <td>
                    <div class="row-actions">
                        <button type="button" class="row-btn" data-promo-edit="${id}"><i class="fas fa-pen"></i> Edit</button>
                        <button type="button" class="row-btn delete" data-promo-del="${id}"><i class="fas fa-trash"></i> Delete</button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

function renderPartsTable(filter = '') {
    const body = qs('#partsTableBody');
    const empty = qs('#partsEmpty');
    const table = qs('#partsTable');
    if (!body) return;

    const q = filter.trim().toLowerCase();
    const entries = Object.entries(getParts()).filter(([, p]) => {
        if (!q) return true;
        return `${p.name} ${p.category} ${p.sku} ${p.status}`.toLowerCase().includes(q);
    });

    if (!entries.length) {
        body.innerHTML = '';
        const noneAtAll = Object.keys(getParts()).length === 0;
        if (empty) {
            empty.hidden = false;
            const h = empty.querySelector('h3');
            const p = empty.querySelector('p');
            if (h) h.textContent = noneAtAll ? 'No parts in the cage' : 'No matching parts';
            if (p) p.textContent = noneAtAll
                ? 'Add an SKU to start managing the parts counter.'
                : 'Try a different search term.';
        }
        if (table) table.hidden = true;
        return;
    }

    if (empty) empty.hidden = true;
    if (table) table.hidden = false;

    body.innerHTML = entries.map(([id, p]) => `
        <tr data-id="${id}">
            <td><strong>${p.name || id}</strong></td>
            <td><span class="cat-pill">${p.category || 'other'}</span></td>
            <td>${p.sku || '—'}</td>
            <td>${p.stock ?? 0}</td>
            <td>${p.price || '—'}</td>
            <td><span class="status-pill ${partStatusClass(p.status)}">${partStatusLabel(p.status)}</span></td>
            <td>
                <div class="row-actions">
                    <button type="button" class="row-btn" data-part-edit="${id}"><i class="fas fa-pen"></i> Edit</button>
                    <button type="button" class="row-btn delete" data-part-del="${id}"><i class="fas fa-trash"></i> Delete</button>
                </div>
            </td>
        </tr>
    `).join('');
}

function openPromoDrawer(id, isNew = false) {
    const drawer = qs('#promoDrawer');
    if (!drawer) return;
    const data = isNew ? {} : (getPromotions()[id] || {});

    qs('#promoId').value = id || '';
    qs('#promoIsNew').value = isNew ? '1' : '0';
    qs('#promoDrawerKicker').textContent = isNew ? 'New campaign' : 'Edit campaign';
    qs('#promoDrawerTitle').textContent = isNew ? 'Add promotion' : (data.title || 'Promotion');
    qs('#promoTitle').value = data.title || '';
    qs('#promoVehicleId').value = data.vehicleId || '';
    qs('#promoBadge').value = data.badge || '';
    qs('#promoDiscount').value = data.discount || '';
    qs('#promoOldPrice').value = data.oldPriceNum ? String(data.oldPriceNum) : '';
    qs('#promoNewPrice').value = data.newPriceNum ? String(data.newPriceNum) : '';
    qs('#promoImage').value = data.image || '';
    fillSelect(qs('#promoStatus'), data.status || 'live');
    qs('#promoNote').value = data.note || '';

    drawer.hidden = false;
    requestAnimationFrame(() => drawer.classList.add('is-on'));
}

function closePromoDrawer() {
    const drawer = qs('#promoDrawer');
    if (!drawer) return;
    drawer.classList.remove('is-on');
    setTimeout(() => { drawer.hidden = true; }, 220);
}

function openPartDrawer(id, isNew = false) {
    const drawer = qs('#partDrawer');
    if (!drawer) return;
    const data = isNew ? {} : (getParts()[id] || {});

    qs('#partId').value = id || '';
    qs('#partIsNew').value = isNew ? '1' : '0';
    qs('#partDrawerKicker').textContent = isNew ? 'New SKU' : 'Edit part';
    qs('#partDrawerTitle').textContent = isNew ? 'Add part' : (data.name || 'Spare part');
    qs('#partName').value = data.name || '';
    fillSelect(qs('#partCategory'), data.category || 'brake');
    qs('#partSku').value = data.sku || '';
    qs('#partStock').value = data.stock != null ? String(data.stock) : '';
    qs('#partPrice').value = data.priceNum ? String(data.priceNum) : '';
    fillSelect(qs('#partStatus'), data.status || 'in-stock');

    drawer.hidden = false;
    requestAnimationFrame(() => drawer.classList.add('is-on'));
}

function closePartDrawer() {
    const drawer = qs('#partDrawer');
    if (!drawer) return;
    drawer.classList.remove('is-on');
    setTimeout(() => { drawer.hidden = true; }, 220);
}

function slugFromMap(title, map, fallback = 'item') {
    const base = (title || fallback).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || fallback;
    let id = base;
    let n = 2;
    while (map[id]) id = `${base}-${n++}`;
    return id;
}

function collectPromoFields() {
    const oldP = formatPriceField(qs('#promoOldPrice').value);
    const newP = formatPriceField(qs('#promoNewPrice').value);
    return {
        title: qs('#promoTitle').value.trim(),
        vehicleId: qs('#promoVehicleId').value.trim(),
        badge: qs('#promoBadge').value.trim() || 'Featured',
        discount: qs('#promoDiscount').value.trim() || 'Deal',
        oldPrice: oldP.label,
        newPrice: newP.label,
        oldPriceNum: oldP.num,
        newPriceNum: newP.num,
        image: qs('#promoImage').value.trim() || (store().SKARA_DEFAULT_IMAGE || ''),
        status: qs('#promoStatus').value === 'ending' ? 'ending' : 'live',
        note: qs('#promoNote').value.trim()
    };
}

function collectPartFields() {
    const price = formatPriceField(qs('#partPrice').value);
    const stock = Math.max(0, parseInt(qs('#partStock').value, 10) || 0);
    let status = qs('#partStatus').value;
    if (!['in-stock', 'low', 'backordered'].includes(status)) status = 'in-stock';
    return {
        name: qs('#partName').value.trim(),
        category: qs('#partCategory').value || 'other',
        sku: qs('#partSku').value.trim().toUpperCase(),
        stock,
        price: price.label || 'LKR 0',
        priceNum: price.num,
        status
    };
}

function activeAdminView() {
    return qs('.admin-view.is-active')?.dataset.view || 'dashboard';
}

function refreshConsole() {
    const q = qs('#adminSearch')?.value || '';
    renderDashboard();
    renderVehiclesTable(q);
    renderPromosTable(q);
    renderPartsTable(q);
}

function initAdminConsole() {
    if (!document.body.classList.contains('admin-body')) return;
    if (!requireAdminSession()) return;

    store().ensureSkaraDialogs?.();
    refreshConsole();

    qsa('.admin-nav-item[data-nav]').forEach((btn) => {
        btn.addEventListener('click', () => showView(btn.dataset.nav));
    });

    qs('#adminMenuBtn')?.addEventListener('click', openSidebar);
    qs('#adminBackdrop')?.addEventListener('click', closeSidebar);

    qs('#adminLogout')?.addEventListener('click', async () => {
        const ok = await (store().skaraConfirm
            ? store().skaraConfirm({
                title: 'Sign out of the console?',
                message: 'Inventory edits stay in this browser. You will need to log in again.',
                confirmText: 'Logout',
                danger: true
            })
            : Promise.resolve(true));
        if (!ok) return;
        localStorage.removeItem('skaraAdmin');
        window.location.href = 'admin-login.html';
    });

    qs('#adminBell')?.addEventListener('click', () => {
        const panel = qs('#adminBellPanel');
        if (panel) panel.hidden = !panel.hidden;
    });
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.admin-bell-wrap')) {
            const panel = qs('#adminBellPanel');
            if (panel) panel.hidden = true;
        }
    });

    qs('#adminSearch')?.addEventListener('input', (e) => {
        const q = e.target.value;
        const view = activeAdminView();
        if (q.trim() && !['vehicles', 'promotions', 'parts'].includes(view)) {
            showView('vehicles');
        }
        renderVehiclesTable(q);
        renderPromosTable(q);
        renderPartsTable(q);
    });

    qs('#addVehicleBtn')?.addEventListener('click', () => {
        showView('vehicles');
        openDrawer('', true);
    });

    qs('#addPromoBtn')?.addEventListener('click', () => {
        showView('promotions');
        openPromoDrawer('', true);
    });

    qs('#addPartBtn')?.addEventListener('click', () => {
        showView('parts');
        openPartDrawer('', true);
    });

    qs('#vehiclesTableBody')?.addEventListener('click', async (e) => {
        const edit = e.target.closest('[data-edit]');
        const del = e.target.closest('[data-del]');
        if (edit) openDrawer(edit.getAttribute('data-edit'), false);
        if (del) {
            const id = del.getAttribute('data-del');
            const row = del.closest('tr');
            const name = row?.querySelector('strong')?.textContent || 'this vehicle';
            const ok = await store().skaraConfirm?.({
                title: 'Delete this listing?',
                message: `${name} will be removed from the public showroom overlay.`,
                confirmText: 'Delete listing'
            });
            if (!ok) return;
            store().deleteVehicleById?.(id);
            refreshConsole();
            store().skaraToast?.('Listing removed');
        }
    });

    qs('#promosTableBody')?.addEventListener('click', async (e) => {
        const edit = e.target.closest('[data-promo-edit]');
        const del = e.target.closest('[data-promo-del]');
        if (edit) openPromoDrawer(edit.getAttribute('data-promo-edit'), false);
        if (del) {
            const id = del.getAttribute('data-promo-del');
            const row = del.closest('tr');
            const name = row?.querySelector('strong')?.textContent || 'this promotion';
            const ok = await store().skaraConfirm?.({
                title: 'Delete this campaign?',
                message: `${name} will be removed from the hot deals desk in this browser.`,
                confirmText: 'Delete promotion'
            });
            if (!ok) return;
            const map = getPromotions();
            delete map[id];
            saveStoredMap(SKARA_PROMOS_KEY, map);
            refreshConsole();
            store().skaraToast?.('Promotion removed');
        }
    });

    qs('#partsTableBody')?.addEventListener('click', async (e) => {
        const edit = e.target.closest('[data-part-edit]');
        const del = e.target.closest('[data-part-del]');
        if (edit) openPartDrawer(edit.getAttribute('data-part-edit'), false);
        if (del) {
            const id = del.getAttribute('data-part-del');
            const row = del.closest('tr');
            const name = row?.querySelector('strong')?.textContent || 'this part';
            const ok = await store().skaraConfirm?.({
                title: 'Delete this part?',
                message: `${name} will be removed from the parts counter inventory.`,
                confirmText: 'Delete part'
            });
            if (!ok) return;
            const map = getParts();
            delete map[id];
            saveStoredMap(SKARA_PARTS_KEY, map);
            refreshConsole();
            store().skaraToast?.('Part removed');
        }
    });

    qsa('[data-close-drawer]').forEach((el) => el.addEventListener('click', closeDrawer));
    qsa('[data-close-promo-drawer]').forEach((el) => el.addEventListener('click', closePromoDrawer));
    qsa('[data-close-part-drawer]').forEach((el) => el.addEventListener('click', closePartDrawer));

    qs('#vehicleForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const isNew = qs('#vehIsNew').value === '1';
        let id = qs('#vehId').value;
        const fields = collectFormFields();
        if (isNew) {
            id = slugId(fields.title);
            fields.image = store().SKARA_DEFAULT_IMAGE;
            fields.make = fields.title.split(' ')[0] || 'SKARA';
            fields.model = fields.title;
            fields.engine = '—';
            fields.color = '—';
            fields.features = ['Showroom inspected', 'Finance available', 'Trade-in welcome'];
        }
        store().upsertVehicle?.(id, fields, isNew);
        closeDrawer();
        refreshConsole();
        store().skaraToast?.(isNew ? 'Vehicle added to the overlay' : 'Listing saved');
    });

    qs('#promoForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const isNew = qs('#promoIsNew').value === '1';
        const map = getPromotions();
        let id = qs('#promoId').value;
        const fields = collectPromoFields();
        if (isNew) id = slugFromMap(fields.title, map, 'promo');
        map[id] = { ...(map[id] || {}), ...fields };
        saveStoredMap(SKARA_PROMOS_KEY, map);
        closePromoDrawer();
        refreshConsole();
        store().skaraToast?.(isNew ? 'Promotion added' : 'Promotion saved');
    });

    qs('#partForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const isNew = qs('#partIsNew').value === '1';
        const map = getParts();
        let id = qs('#partId').value;
        const fields = collectPartFields();
        if (isNew) id = slugFromMap(fields.sku || fields.name, map, 'part');
        map[id] = { ...(map[id] || {}), ...fields };
        saveStoredMap(SKARA_PARTS_KEY, map);
        closePartDrawer();
        refreshConsole();
        store().skaraToast?.(isNew ? 'Part added to inventory' : 'Part saved');
    });

    const params = new URLSearchParams(window.location.search);
    const editId = params.get('edit');
    if (editId) {
        showView('vehicles');
        const exists = getAllVehicles()[editId] || (store().VEHICLE_CATALOG || {})[editId];
        if (exists) openDrawer(editId, false);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initLoginPage();
    initAdminConsole();
});
