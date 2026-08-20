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

function refreshConsole() {
    renderDashboard();
    renderVehiclesTable(qs('#adminSearch')?.value || '');
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
        if (q.trim()) showView('vehicles');
        renderVehiclesTable(q);
    });

    qs('#addVehicleBtn')?.addEventListener('click', () => {
        showView('vehicles');
        openDrawer('', true);
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

    qsa('[data-close-drawer]').forEach((el) => el.addEventListener('click', closeDrawer));

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
