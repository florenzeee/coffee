const FAVORITES_KEY = 'coffeeFavorites';
let favoriteItems = JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]');

function saveFavorites() {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favoriteItems));
    updateFavoriteButtons();
    renderFavorites();
}

function updateFavoriteButtons() {
    const ids = new Set(favoriteItems.map(item => item.id));
    document.querySelectorAll('[data-favorite-toggle]').forEach(button => {
        const active = ids.has(button.dataset.id);
        button.classList.toggle('is-favorite', active);
        button.setAttribute('aria-pressed', String(active));
        button.setAttribute('aria-label', `${active ? 'Удалить' : 'Добавить'} ${button.dataset.name} ${active ? 'из' : 'в'} избранного`);
    });
    const count = document.getElementById('favoritesCount');
    count.textContent = favoriteItems.length;
    count.hidden = favoriteItems.length === 0;
}

function renderFavorites() {
    const list = document.getElementById('favoritesList');
    const empty = document.getElementById('favoritesEmpty');
    const footer = document.getElementById('favoritesFooter');
    list.hidden = favoriteItems.length === 0;
    empty.hidden = favoriteItems.length > 0;
    footer.hidden = favoriteItems.length === 0;
    list.innerHTML = favoriteItems.map(item => `<li class="favorite-item" data-id="${item.id}"><div><strong>${item.name}</strong><span>${item.price} ₽</span></div><button type="button" data-favorite-remove="${item.id}" aria-label="Удалить ${item.name}">×</button></li>`).join('');
}

function toggleFavorite(item) {
    const exists = favoriteItems.some(favorite => favorite.id === item.id);
    favoriteItems = exists ? favoriteItems.filter(favorite => favorite.id !== item.id) : [...favoriteItems, item];
    saveFavorites();
    const button = document.querySelector(`[data-favorite-toggle][data-id="${item.id}"]`);
    if (button && !exists) {
        button.classList.remove('is-bouncing');
        requestAnimationFrame(() => button.classList.add('is-bouncing'));
    }
}

function removeFavorite(id) {
    favoriteItems = favoriteItems.filter(item => item.id !== id);
    saveFavorites();
}

function openFavorites() {
    const panel = document.getElementById('favoritesPanel');
    const overlay = document.querySelector('.favorites-overlay');
    panel.hidden = false;
    renderFavorites();
    requestAnimationFrame(() => { panel.classList.add('is-open'); overlay.classList.add('is-open'); });
    document.body.style.overflow = 'hidden';
}

function closeFavorites() {
    const panel = document.getElementById('favoritesPanel');
    const overlay = document.querySelector('.favorites-overlay');
    panel.classList.remove('is-open');
    overlay.classList.remove('is-open');
    document.body.style.overflow = '';
    window.setTimeout(() => { panel.hidden = true; }, 400);
}

document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.createElement('div');
    overlay.className = 'favorites-overlay';
    document.body.append(overlay);

    document.addEventListener('click', event => {
        const favoriteButton = event.target.closest('[data-favorite-toggle]');
        const removeButton = event.target.closest('[data-favorite-remove]');
        if (favoriteButton) toggleFavorite({ id: favoriteButton.dataset.id, name: favoriteButton.dataset.name, price: Number(favoriteButton.dataset.price), category: favoriteButton.dataset.category });
        if (removeButton) removeFavorite(removeButton.dataset.favoriteRemove);
    });

    document.getElementById('favoritesToggle').addEventListener('click', openFavorites);
    document.getElementById('favoritesClose').addEventListener('click', closeFavorites);
    overlay.addEventListener('click', closeFavorites);
    document.addEventListener('keydown', event => { if (event.key === 'Escape') closeFavorites(); });
    document.getElementById('favoritesClear').addEventListener('click', () => { favoriteItems = []; saveFavorites(); });
    document.getElementById('favoritesAddAll').addEventListener('click', () => { favoriteItems.forEach(item => window.Cart.addItem(item, false)); closeFavorites(); window.openModal('cart'); });
    window.Favorites = { updateButtons: updateFavoriteButtons };
    updateFavoriteButtons();
    renderFavorites();
});