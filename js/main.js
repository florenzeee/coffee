const menuData = {
    coffee: [
        ['c1', 'Эспрессо', 'Классический итальянский эспрессо', 150],
        ['c2', 'Американо', 'Эспрессо с горячей водой', 180],
        ['c3', 'Капучино', 'Эспрессо с молоком и густой пенкой', 220],
        ['c4', 'Латте', 'Нежный баланс кофе и молока', 250],
        ['c5', 'Раф', 'Кофе со сливками и ванилью', 280],
        ['c6', 'Флэт Уайт', 'Двойной эспрессо с микропеной', 260]
    ],
    tea: [
        ['t1', 'Чёрный', 'Ассам с насыщенным вкусом', 150],
        ['t2', 'Зелёный', 'Сенча со свежим ароматом', 160],
        ['t3', 'Травяной', 'Ромашка, мята и иван-чай', 180],
        ['t4', 'Облепиховый', 'Облепиха, мёд и имбирь', 220]
    ],
    dessert: [
        ['d1', 'Чизкейк', 'Нежный десерт с ягодным соусом', 280],
        ['d2', 'Тирамису', 'Маскарпоне и кофе по-итальянски', 300],
        ['d3', 'Круассан', 'Слоёное тесто и хрустящая корка', 150],
        ['d4', 'Маффин', 'Шоколадный маффин', 180]
    ]
};

const specials = [
    ['s1', 'Лавандовый раф', 'Раф с лавандовым сиропом и сливками', 320],
    ['s2', 'Пряный латте', 'Латте с корицей, мускатом и кардамоном', 300],
    ['s3', 'Кокосовый капучино', 'Капучино на кокосовом молоке', 310],
    ['s4', 'Кофе с апельсином', 'Эспрессо с апельсиновым соком и цедрой', 290]
];

const reviews = [
    ['Анна К.', 'АК', 'Лучшая кофейня в районе! Всегда свежий кофе, вкусные десерты и очень уютно.'],
    ['Дмитрий С.', 'ДС', 'Отличное место для работы: быстрый Wi-Fi, розетки и вкусный латте.'],
    ['Елена М.', 'ЕМ', 'Приходим всей семьёй по выходным. Персонал дружелюбный и внимательный.']
];

const questions = [
    ['Можно ли с ноутбуком?', 'Да. У нас есть Wi-Fi, розетки и удобные столы для работы.'],
    ['Есть ли веганские напитки?', 'Предлагаем овсяное, кокосовое, миндальное и соевое молоко.'],
    ['Можно ли забронировать столик?', 'Да, воспользуйтесь кнопкой «Забронировать» или позвоните нам.'],
    ['Есть ли доставка?', 'Доставки пока нет, но можно оформить предзаказ и забрать его в кофейне.'],
    ['Работаете ли вы в праздники?', 'Да, но расписание может меняться. Уточните его по телефону.']
];

const categoryLabels = {
    coffee: 'Кофе',
    tea: 'Чай',
    dessert: 'Десерты',
    special: 'Особые напитки'
};

const team = [
    ['АК', 'Анна Крылова', 'Старший бариста', 'Настраивает эспрессо и обучает команду видеть вкус в деталях.'],
    ['МС', 'Михаил Соколов', 'Бариста', 'Любит альтернативные способы заваривания и спокойные утренние смены.'],
    ['ЕС', 'Елена Смирнова', 'Бариста-кондитер', 'Придумывает десерты к сезонным напиткам и встречает гостей улыбкой.']
];

let maxMenuPrice = 300;
const REVIEWS_KEY = 'coffeeReviews';

function cardTemplate(item, category, special = false, showCategory = false) {
    const [id, name, desc, price] = item;
    const icon = special ? '<svg class="card__icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-2.9-5.6 2.9 1.1-6.2L3 9.6l6.2-.9L12 3Z"/></svg>' : category === 'tea' ? '<svg class="card__icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 4C9 4 4 9 4 20c6-1 11-5 12-11-3 2-6 4-9 5"/><path d="M4 20c3-5 7-9 12-12"/></svg>' : category === 'dessert' ? '<svg class="card__icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 10h14l-1 10H6L5 10Z"/><path d="M7 10c0-4 3-6 5-6s5 2 5 6M9 14h6M9 17h6"/></svg>' : '<svg class="card__icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 10h14v6a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5v-6Z"/><path d="M18 12h1a3 3 0 0 1 0 6h-2M7 7c0-2 2-2 2-4M12 7c0-2 2-2 2-4"/></svg>';
    const categoryMarkup = showCategory ? `<span class="card__category">· ${categoryLabels[category]}</span>` : '';
    const favoriteButton = `<button class="favorite-toggle" type="button" data-favorite-toggle data-id="${id}" data-name="${name}" data-price="${price}" data-category="${category}" aria-label="Добавить ${name} в избранное"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 8.6c0 5.4-8.8 10.4-8.8 10.4S3.2 14 3.2 8.6A4.6 4.6 0 0 1 12 6.1a4.6 4.6 0 0 1 8.8 2.5Z"/></svg></button>`;
    return `<article class="card${special ? ' card--special' : ''}">${favoriteButton}${icon}<h3 class="card__name">${name}</h3>${categoryMarkup}<p class="card__desc">${desc}</p><div class="card__bottom"><strong class="card__price">${price} ₽</strong><button class="btn btn--primary card__btn" type="button" data-cart-add data-id="${id}" data-name="${name}" data-price="${price}" data-category="${category}">В корзину</button></div></article>`;
}

function renderCards(id, items, category, special = false) {
    const grid = document.getElementById(id);
    const panel = grid.parentElement;
    let emptyState = panel.querySelector('.menu-empty');
    grid.hidden = items.length === 0;
    grid.innerHTML = items.map(item => cardTemplate(item, category, special)).join('');
    if (!emptyState) {
        emptyState = document.createElement('p');
        emptyState.className = 'menu-empty';
        emptyState.textContent = 'Ничего не найдено. Попробуйте другой запрос.';
        panel.append(emptyState);
    }
    emptyState.hidden = items.length > 0;
    if (window.Favorites) window.Favorites.updateButtons();
}

function renderMenuCategory(category, query = '') {
    const normalizeSearchText = value => value.toLocaleLowerCase().replaceAll('ё', 'е').replaceAll('э', 'а');
    const normalizedQuery = normalizeSearchText(query.trim());
    const items = menuData[category].filter(item => item[3] <= maxMenuPrice && normalizeSearchText(item[1]).includes(normalizedQuery));
    renderCards(`${category}Grid`, items, category);
}

function renderSearchResults(query) {
    const normalizeSearchText = value => value.toLocaleLowerCase().replaceAll('ё', 'е').replaceAll('э', 'а');
    const normalizedQuery = normalizeSearchText(query.trim());
    const catalog = [
        ...menuData.coffee.map(item => ({ item, category: 'coffee' })),
        ...menuData.tea.map(item => ({ item, category: 'tea' })),
        ...menuData.dessert.map(item => ({ item, category: 'dessert' })),
        ...specials.map(item => ({ item, category: 'special' }))
    ];
    const matches = catalog.filter(({ item }) => item[3] <= maxMenuPrice && normalizeSearchText(item[1]).includes(normalizedQuery));
    const grid = document.getElementById('menuSearchGrid');
    const empty = document.getElementById('menuSearchEmpty');
    grid.hidden = matches.length === 0;
    grid.innerHTML = matches.map(({ item, category }) => cardTemplate(item, category, category === 'special', true)).join('');
    empty.hidden = matches.length > 0;
    grid.querySelectorAll('.card').forEach(card => { card.classList.remove('card--enter'); requestAnimationFrame(() => card.classList.add('card--enter')); });
    if (window.Favorites) window.Favorites.updateButtons();
}

function renderReviews() {
    const savedReviews = JSON.parse(localStorage.getItem(REVIEWS_KEY) || '[]');
    const allReviews = [...savedReviews, ...reviews];
    document.getElementById('reviewsGrid').innerHTML = allReviews.map(item => {
        const [name, initials, text, date = '2026', rating = 5] = item;
        return `<article class="review-card"><svg class="review-card__quote" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 11h5v8H4v-6c0-5 2-8 6-9v3c-3 .8-4.5 2.1-5 4Zm9 0h5v8h-6v-6c0-5 2-8 6-9v3c-3 .8-4.5 2.1-5 4Z"/></svg><div class="review-card__header"><span class="review-card__avatar">${initials}</span><div><div class="review-card__name">${name}</div><time class="review-card__date">${date}</time></div></div><div class="review-card__stars" aria-label="${rating} из 5">${'★'.repeat(rating)}</div><p class="review-card__text">${text}</p></article>`;
    }).join('');
}

function renderRecommendations() {
    const catalog = [
        ...menuData.coffee.map(item => ({ item, category: 'coffee' })),
        ...menuData.tea.map(item => ({ item, category: 'tea' })),
        ...menuData.dessert.map(item => ({ item, category: 'dessert' })),
        ...specials.map(item => ({ item, category: 'special' }))
    ];
    const randomItems = catalog.sort(() => Math.random() - 0.5).slice(0, 3);
    document.getElementById('recommendationsGrid').innerHTML = randomItems.map(({ item, category }) => cardTemplate(item, category, category === 'special')).join('');
}

function renderContent() {
    renderMenuCategory('coffee');
    renderMenuCategory('tea');
    renderMenuCategory('dessert');
    renderCards('specialGrid', specials, 'special', true);
    renderReviews();
    document.getElementById('faqList').innerHTML = questions.map(([question, answer], index) => `<article class="faq-item"><button class="faq-question" type="button" aria-expanded="false" aria-controls="faq-${index}">${question}</button><div class="faq-answer" id="faq-${index}"><p>${answer}</p></div></article>`).join('');
    document.querySelector('.about__features').innerHTML = ['Свежая обжарка каждый день', 'Домашние десерты', 'Wi-Fi и розетки', 'Уютная атмосфера'].map((text, index) => `<span class="about__feature"><svg viewBox="0 0 24 24" aria-hidden="true">${index === 0 ? '<path d="M4 10h14v6a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5v-6ZM18 12h1a3 3 0 0 1 0 6h-2M7 7c0-2 2-2 2-4M12 7c0-2 2-2 2-4"/>' : index === 1 ? '<path d="M5 10h14l-1 10H6L5 10ZM7 10c0-4 3-6 5-6s5 2 5 6"/>' : index === 2 ? '<path d="M12 18V6M7 12l5-6 5 6M5 20h14"/>' : '<path d="M4 11h16M6 11c0-4 2-7 6-7s6 3 6 7v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4v-5Z"/>'}</svg>${text}</span>`).join('');
    document.getElementById('teamGrid').innerHTML = team.map(([initials, name, role, description]) => `<article class="team-card"><div class="team-card__avatar">${initials}</div><div><h3>${name}</h3><span>${role}</span></div><p>${description}</p></article>`).join('');
    renderRecommendations();
    window.renderReviews = renderReviews;
}

function setupInteractions() {
    const menu = document.getElementById('menu');
    const search = document.getElementById('menuSearch');
    const clear = document.getElementById('menuSearchClear');
    const searchResults = document.getElementById('menuSearchResults');
    const priceRange = document.getElementById('priceRange');
    const priceValue = document.getElementById('priceValue');

    const showTabs = () => {
        menu.classList.remove('is-searching');
        searchResults.hidden = true;
    };

    const showSearchResults = () => {
        menu.classList.add('is-searching');
        searchResults.hidden = false;
        renderSearchResults(search.value);
    };

    document.querySelectorAll('.menu-tab').forEach(tab => tab.addEventListener('click', () => {
        const category = tab.dataset.category;
        document.querySelectorAll('.menu-tab').forEach(item => { item.classList.toggle('is-active', item === tab); item.setAttribute('aria-selected', String(item === tab)); });
        document.querySelectorAll('.menu-panel').forEach(panel => { panel.hidden = panel.id !== `${category}Panel`; panel.classList.toggle('is-active', !panel.hidden); });
        search.value = '';
        clear.hidden = true;
        showTabs();
        renderMenuCategory(category);
        const activePanel = document.getElementById(`${category}Panel`);
        activePanel.querySelectorAll('.card').forEach(card => { card.classList.remove('card--enter'); requestAnimationFrame(() => card.classList.add('card--enter')); });
    }));

    search.addEventListener('input', () => {
        clear.hidden = search.value.length === 0;
        if (search.value.trim()) showSearchResults();
        else showTabs();
    });
    priceRange.addEventListener('input', () => {
        maxMenuPrice = Number(priceRange.value);
        priceValue.value = `${maxMenuPrice} ₽`;
        priceValue.textContent = `${maxMenuPrice} ₽`;
        if (search.value.trim()) showSearchResults();
        else renderMenuCategory(document.querySelector('.menu-tab.is-active').dataset.category);
    });
    clear.addEventListener('click', () => {
        search.value = '';
        clear.hidden = true;
        document.querySelector('[data-category="coffee"]').click();
        search.focus();
    });

    document.querySelectorAll('.faq-question').forEach(button => button.addEventListener('click', () => {
        const answer = document.getElementById(button.getAttribute('aria-controls'));
        const expanded = button.getAttribute('aria-expanded') === 'true';
        button.setAttribute('aria-expanded', String(!expanded));
        answer.style.maxHeight = expanded ? '0' : `${answer.scrollHeight}px`;
    }));

    const nav = document.getElementById('nav');
    const menuButton = document.getElementById('mobileMenuBtn');
    menuButton.addEventListener('click', () => { const open = nav.classList.toggle('is-open'); menuButton.setAttribute('aria-expanded', String(open)); });
    document.querySelectorAll('.nav__link').forEach(link => link.addEventListener('click', () => nav.classList.remove('is-open')));

    const header = document.getElementById('header');
    const scrollTop = document.getElementById('scrollTop');
    window.addEventListener('scroll', () => { header.classList.toggle('header--scrolled', window.scrollY > 20); scrollTop.hidden = window.scrollY < 400; }, { passive: true });
    scrollTop.addEventListener('click', () => { scrollTop.classList.remove('is-pulsing'); requestAnimationFrame(() => scrollTop.classList.add('is-pulsing')); window.scrollTo({ top: 0, behavior: 'smooth' }); });
    document.getElementById('bookBtn').addEventListener('click', () => window.openModal('booking'));
    document.getElementById('heroBookBtn').addEventListener('click', () => window.openModal('booking'));
    document.getElementById('cartToggle').addEventListener('click', () => window.openModal('cart'));
}

function setupSectionObserver() {
    const navLinks = [...document.querySelectorAll('.nav__link')];
    const trackedSections = [...document.querySelectorAll('#hero, #menu, #about, #contact')];
    const animatedSections = document.querySelectorAll('.section');

    const activateLink = id => {
        navLinks.forEach(link => {
            link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
        });
    };

    const activeObserver = new IntersectionObserver(entries => {
        entries.filter(entry => entry.isIntersecting).forEach(entry => activateLink(entry.target.id));
    }, { rootMargin: '-32% 0px -56% 0px', threshold: 0 });

    const revealObserver = new IntersectionObserver(entries => {
        entries.filter(entry => entry.isIntersecting).forEach(entry => {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
        });
    }, { threshold: 0.12 });

    trackedSections.forEach(section => activeObserver.observe(section));
    animatedSections.forEach(section => revealObserver.observe(section));
    activateLink('hero');
}

function setupHeroParallax() {
    const hero = document.getElementById('hero');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = null;

    const update = () => {
        frame = null;
        if (window.innerWidth <= 680 || motionQuery.matches) {
            hero.style.removeProperty('--hero-parallax');
            hero.style.removeProperty('--hero-glow-parallax');
            return;
        }
        const scrollOffset = Math.min(window.scrollY, hero.offsetHeight) * 0.12;
        const glowOffset = Math.min(window.scrollY, hero.offsetHeight) * 0.22;
        hero.style.setProperty('--hero-parallax', `${scrollOffset}px`);
        hero.style.setProperty('--hero-glow-parallax', `${glowOffset}px`);
    };

    const requestUpdate = () => {
        if (frame === null) frame = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate, { passive: true });
    motionQuery.addEventListener('change', requestUpdate);
    requestUpdate();
}

function setupHoursStatus() {
    const status = document.getElementById('hoursStatus');
    const update = () => {
        const now = new Date();
        const weekend = now.getDay() === 0 || now.getDay() === 6;
        const opening = weekend ? 9 : 8;
        const closing = weekend ? 23 : 22;
        const isOpen = now.getHours() >= opening && now.getHours() < closing;
        status.classList.toggle('is-open', isOpen);
        status.classList.toggle('is-closed', !isOpen);
        status.querySelector('strong').textContent = isOpen ? `Открыто до ${closing}:00` : `Закрыто. Откроется в ${opening}:00`;
    };
    update();
    window.setInterval(update, 60000);
}

document.addEventListener('DOMContentLoaded', () => {
    renderContent();
    setupInteractions();
    setupSectionObserver();
    setupHeroParallax();
    setupHoursStatus();
});