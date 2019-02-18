/* global window, document, localStorage */

let theme = localStorage.getItem('theme') || 'black';

function setTheme(color, bg) {
  document.documentElement.style.setProperty('--bg', bg);
  document.documentElement.style.setProperty('--color', color);
}

function initTheme() {
  const toggle = document.querySelector('.toggle');

  toggle.addEventListener('click', () => {
    if (theme === 'black') {
      setTheme('#111', '#fdfdfd');
      theme = 'white';
      localStorage.setItem('theme', theme);
    } else {
      setTheme('#fdfdfd', '#111');
      theme = 'black';
      localStorage.setItem('theme', theme);
    }
  });
}

function initMenu() {
  const menu = document.querySelector('.menu');
  const burger = document.querySelector('.burger');
  const isVisible = false;

  burger.addEventListener('click', () => {
    menu.classList.toggle('visible');
  });
}

if (theme === 'white') {
  setTheme('#111', '#fdfdfd');
}

window.addEventListener('load', () => {
  initTheme();
  initMenu();
});
