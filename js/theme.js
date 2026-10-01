const THEME_KEY = 'coffeeTheme';

function applyTheme(theme) {
    const dark = theme === 'dark';
    document.body.classList.toggle('theme-dark', dark);
    document.getElementById('themeIcon').textContent = dark ? '☀️' : '🌙';
    document.getElementById('themeToggle').setAttribute('aria-label', dark ? 'Включить светлую тему' : 'Включить тёмную тему');
}

document.addEventListener('DOMContentLoaded', () => {
    applyTheme(localStorage.getItem(THEME_KEY) || 'light');
    document.getElementById('themeToggle').addEventListener('click', () => {
        const dark = !document.body.classList.contains('theme-dark');
        localStorage.setItem(THEME_KEY, dark ? 'dark' : 'light');
        applyTheme(dark ? 'dark' : 'light');
    });
});