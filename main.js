/* global window, document, localStorage */

let theme = localStorage.getItem('theme') || 'black';
const white = '#fdfdfd';
const black = '#111';

function setTheme(isWhite = false) {
  if (isWhite) {
    document.documentElement.style.setProperty('--bg', white);
    document.documentElement.style.setProperty('--color', black);
    document.documentElement.style.setProperty('--light-gray', '#f0f0f0');
    document.documentElement.style.setProperty('--gray', '#7f7f7f');
  } else {
    document.documentElement.style.setProperty('--bg', black);
    document.documentElement.style.setProperty('--color', white);
    document.documentElement.style.setProperty('--light-gray', '#333');
    document.documentElement.style.setProperty('--gray', '#666');
  }
}

function initTheme() {
  const toggle = document.querySelector('.toggle');

  toggle.addEventListener('click', () => {
    if (theme === 'black') {
      setTheme(true);
      theme = 'white';
      localStorage.setItem('theme', theme);
    } else {
      setTheme(false);
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
