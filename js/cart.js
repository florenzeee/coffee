const STORAGE_KEY = 'warm_corner_cart';
let cartItems = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

function saveCart() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
    document.getElementById('cartCount').textContent = cartItems.reduce((sum, item) => sum + item.qty, 0);
}

function renderCart() {
    const list = document.getElementById('cartList');
    const empty = document.getElementById('cartEmpty');
    const footer = document.getElementById('cartFooter');
    if (!cartItems.length) { list.hidden = true; empty.hidden = false; footer.hidden = true; return; }
    list.hidden = false;
    empty.hidden = true;
    footer.hidden = false;
    list.innerHTML = cartItems.map(item => `<li class="cart-item cart-item--enter" data-id="${item.id}"><div><div class="cart-item__name">${item.name}</div><div class="cart-item__meta">${item.qty} × ${item.price} ₽</div></div><button class="cart-item__remove" type="button" data-remove="${item.id}" aria-label="Удалить ${item.name}">×</button></li>`).join('');
    document.getElementById('cartTotal').textContent = `${cartItems.reduce((sum, item) => sum + item.price * item.qty, 0)} ₽`;
}

function addToCart(item, openPanel = true) {
    const current = cartItems.find(product => product.id === item.id);
    if (current) current.qty += 1;
    else cartItems.push({ ...item, qty: 1 });
    saveCart();
    renderCart();
    if (openPanel) window.openModal('cart');
}

function removeFromCart(id) {
    cartItems = cartItems.filter(item => item.id !== id);
    saveCart();
    renderCart();
}

function clearCart() {
    cartItems = [];
    saveCart();
    renderCart();
}

function createOrder() {
    const orderNumber = `#${new Date().getFullYear()}-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`;
    const order = {
        number: orderNumber,
        createdAt: new Date().toISOString(),
        items: cartItems.map(item => ({ ...item })),
        total: cartItems.reduce((sum, item) => sum + item.price * item.qty, 0),
        customer: {
            name: document.getElementById('checkoutName').value.trim(),
            phone: document.getElementById('checkoutPhone').value.trim(),
            pickupTime: document.getElementById('checkoutPickupTime').value
        }
    };
    const orders = JSON.parse(localStorage.getItem('coffeeOrders') || '[]');
    orders.unshift(order);
    localStorage.setItem('coffeeOrders', JSON.stringify(orders.slice(0, 10)));
    return order;
}

document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('click', event => { const addButton = event.target.closest('[data-cart-add]'); const removeButton = event.target.closest('[data-remove]'); if (addButton) addToCart({ id: addButton.dataset.id, name: addButton.dataset.name, price: Number(addButton.dataset.price) }); if (removeButton) removeFromCart(removeButton.dataset.remove); });
    document.getElementById('cartCheckoutBtn').addEventListener('click', () => { document.getElementById('cartFooter').hidden = true; document.getElementById('cartList').hidden = true; document.getElementById('checkoutForm').hidden = false; });
    document.getElementById('checkoutBackBtn').addEventListener('click', () => { document.getElementById('cartFooter').hidden = false; document.getElementById('cartList').hidden = false; document.getElementById('checkoutForm').hidden = true; });
    document.getElementById('checkoutForm').addEventListener('submit', event => { event.preventDefault(); if (!event.currentTarget.reportValidity() || !cartItems.length) return; const order = createOrder(); document.getElementById('checkoutForm').hidden = true; window.dispatchEvent(new CustomEvent('order:success', { detail: order })); });
    window.addEventListener('order:closed', clearCart);
    window.Cart = { addItem: addToCart, clear: clearCart, render: renderCart, getCount: () => cartItems.reduce((sum, item) => sum + item.qty, 0) };
    saveCart();
    renderCart();
});