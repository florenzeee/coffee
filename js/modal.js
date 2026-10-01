function formatPhone(input) {
    let digits = input.value.replace(/\D/g, '');
    if (digits.startsWith('8')) digits = `7${digits.slice(1)}`;
    if (!digits.startsWith('7')) digits = `7${digits}`;
    digits = digits.slice(0, 11);
    let value = '+7';
    if (digits.length > 1) value += ` (${digits.slice(1, 4)}`;
    if (digits.length >= 4) value += `) ${digits.slice(4, 7)}`;
    if (digits.length >= 7) value += `-${digits.slice(7, 9)}`;
    if (digits.length >= 9) value += `-${digits.slice(9, 11)}`;
    input.value = value;
}

function setupPhoneMask(id) {
    const input = document.getElementById(id);
    input.addEventListener('focus', () => { if (!input.value) input.value = '+7 ('; });
    input.addEventListener('input', () => formatPhone(input));
    input.addEventListener('blur', () => { if (input.value === '+7 (') input.value = ''; });
}

function setupCalendar() {
    const input = document.getElementById('bookingDate');
    const calendar = document.getElementById('bookingCalendar');
    let month = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    let selected = null;
    const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    function draw() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const first = new Date(month.getFullYear(), month.getMonth(), 1);
        const offset = (first.getDay() + 6) % 7;
        const days = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
        calendar.innerHTML = `<div class="calendar__head"><button type="button" data-month="-1">‹</button><strong>${monthNames[month.getMonth()]} ${month.getFullYear()}</strong><button type="button" data-month="1">›</button></div><div class="calendar__week"><span>Пн</span><span>Вт</span><span>Ср</span><span>Чт</span><span>Пт</span><span>Сб</span><span>Вс</span></div><div class="calendar__days">${Array(offset).fill('<span></span>').join('')}${Array.from({ length: days }, (_, index) => { const day = index + 1; const date = new Date(month.getFullYear(), month.getMonth(), day); const past = date < today; const active = selected && date.getTime() === selected.getTime(); return `<button class="calendar__day${past ? ' is-past' : ''}${active ? ' is-selected' : ''}" type="button" data-day="${day}" ${past ? 'disabled' : ''}>${day}</button>`; }).join('')}</div>`;
        calendar.querySelectorAll('[data-month]').forEach(button => button.addEventListener('click', () => { month.setMonth(month.getMonth() + Number(button.dataset.month)); draw(); }));
        calendar.querySelectorAll('[data-day]').forEach(button => button.addEventListener('click', () => { selected = new Date(month.getFullYear(), month.getMonth(), Number(button.dataset.day)); input.value = selected.toLocaleDateString('ru-RU'); input.dataset.value = selected.toISOString(); calendar.hidden = true; }));
    }
    input.addEventListener('click', () => { calendar.hidden = !calendar.hidden; if (!calendar.hidden) draw(); });
}

document.addEventListener('DOMContentLoaded', () => {
    const booking = document.getElementById('bookingModal');
    const cart = document.getElementById('cartModal');
    const reviewModal = document.getElementById('reviewModal');
    const bookingForm = document.getElementById('bookingForm');
    const bookingSuccess = document.getElementById('bookingSuccess');
    const guests = document.getElementById('bookingGuests');
    const cartOverlay = document.createElement('div');
    cartOverlay.className = 'cart-overlay';
    cartOverlay.setAttribute('aria-hidden', 'true');
    document.body.append(cartOverlay);
    const orderConfirmation = document.createElement('div');
    orderConfirmation.className = 'modal-overlay order-confirmation';
    orderConfirmation.hidden = true;
    orderConfirmation.innerHTML = '<div class="modal order-confirmation__modal"><button class="modal__close" type="button" aria-label="Закрыть">×</button><div class="order-confirmation__icon">✓</div><h2 class="modal__title">Спасибо за заказ!</h2><p>Мы свяжемся с вами в течение 15 минут для подтверждения.</p><strong class="order-confirmation__number"></strong><button class="btn btn--primary btn--full" type="button">Закрыть</button></div>';
    document.body.append(orderConfirmation);
    const close = modal => {
        modal.classList.remove('is-open');
        if (modal === cart) cartOverlay.classList.remove('is-open');
        document.body.style.overflow = '';
        window.clearTimeout(modal._closeTimer);
        modal._closeTimer = window.setTimeout(() => { modal.hidden = true; }, 400);
    };
    const showOrderConfirmation = order => {
        orderConfirmation.querySelector('.order-confirmation__number').textContent = `Номер заказа: ${order.number}`;
        orderConfirmation.hidden = false;
        document.body.style.overflow = 'hidden';
        requestAnimationFrame(() => orderConfirmation.classList.add('is-open'));
    };
    const closeOrderConfirmation = () => {
        close(orderConfirmation);
        window.dispatchEvent(new CustomEvent('order:closed'));
    };
    window.openModal = type => {
        const modal = type === 'booking' ? booking : cart;
        window.clearTimeout(modal._closeTimer);
        modal.hidden = false;
        document.body.style.overflow = 'hidden';
        requestAnimationFrame(() => {
            modal.classList.add('is-open');
            if (modal === cart) cartOverlay.classList.add('is-open');
        });
        if (type === 'cart' && window.Cart) window.Cart.render();
    };
    document.getElementById('bookingClose').addEventListener('click', () => close(booking));
    document.getElementById('cartClose').addEventListener('click', () => close(cart));
    document.getElementById('bookingSuccessClose').addEventListener('click', () => close(booking));
    document.getElementById('cartEmptyBtn').addEventListener('click', () => close(cart));
    cartOverlay.addEventListener('click', () => close(cart));
    [booking, cart].forEach(modal => modal.addEventListener('click', event => { if (event.target === modal) close(modal); }));
    document.addEventListener('keydown', event => { if (event.key === 'Escape') { if (!orderConfirmation.hidden) closeOrderConfirmation(); close(booking); close(cart); close(reviewModal); } });
    window.addEventListener('order:success', event => { close(cart); showOrderConfirmation(event.detail); });
    orderConfirmation.querySelector('.modal__close').addEventListener('click', closeOrderConfirmation);
    orderConfirmation.querySelector('.btn').addEventListener('click', closeOrderConfirmation);
    orderConfirmation.addEventListener('click', event => { if (event.target === orderConfirmation) closeOrderConfirmation(); });
    document.querySelectorAll('#guestSelector button').forEach(button => button.addEventListener('click', () => { document.querySelectorAll('#guestSelector button').forEach(item => item.classList.remove('is-selected')); button.classList.add('is-selected'); guests.value = button.dataset.guests; }));
    setupPhoneMask('bookingPhone');
    setupPhoneMask('checkoutPhone');
    setupCalendar();
    bookingForm.addEventListener('submit', event => { event.preventDefault(); const phone = document.getElementById('bookingPhone'); const valid = bookingForm.reportValidity() && /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(phone.value) && guests.value && document.getElementById('bookingDate').dataset.value; if (!valid) { if (!/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(phone.value)) document.getElementById('bookingPhoneError').textContent = 'Введите корректный телефон'; return; } bookingForm.hidden = true; bookingSuccess.hidden = false; bookingSuccess.classList.remove('is-complete'); requestAnimationFrame(() => bookingSuccess.classList.add('is-complete')); });
    const reviewForm = document.getElementById('reviewForm');
    const reviewName = document.getElementById('reviewName');
    const reviewText = document.getElementById('reviewText');
    let reviewRating = 5;
    const setRating = value => { reviewRating = value; document.querySelectorAll('#reviewRating button').forEach(button => button.classList.toggle('is-selected', Number(button.dataset.rating) <= value)); };
    document.getElementById('reviewOpen').addEventListener('click', () => { reviewForm.reset(); setRating(5); reviewModal.hidden = false; document.body.style.overflow = 'hidden'; requestAnimationFrame(() => reviewModal.classList.add('is-open')); });
    document.getElementById('reviewClose').addEventListener('click', () => close(reviewModal));
    reviewModal.addEventListener('click', event => { if (event.target === reviewModal) close(reviewModal); });
    document.querySelectorAll('#reviewRating button').forEach(button => button.addEventListener('click', () => setRating(Number(button.dataset.rating))));
    reviewForm.addEventListener('submit', event => { event.preventDefault(); if (!reviewForm.reportValidity()) return; const name = reviewName.value.trim(); const initials = name.split(/\s+/).map(word => word[0]).join('').slice(0, 2).toUpperCase(); const saved = JSON.parse(localStorage.getItem('coffeeReviews') || '[]'); saved.unshift([name, initials, reviewText.value.trim(), new Date().toLocaleDateString('ru-RU'), reviewRating]); localStorage.setItem('coffeeReviews', JSON.stringify(saved)); window.renderReviews(); close(reviewModal); });
});