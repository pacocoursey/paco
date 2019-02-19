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

  document.body.addEventListener('click', (e) => {
    if (e.target.closest('.burger') === burger) {
      // Toggle menu if burger clicked
      menu.classList.toggle('visible');
    } else if (!e.target.closest('.menu')) {
      // Close menu if outside menu is clicked
      menu.classList.remove('visible');
    }
  });

  // Close menu on ESC keypress
  document.body.addEventListener('keydown', (e) => {
    if (e.keyCode === 27) {
      if (menu.classList.contains('visible')) {
        menu.classList.remove('visible');
      }
    }
  });
}

function initLogo() {
  const logo = document.querySelector('.logo');

  logo.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    window.location = '/design';
  });
}

window.addEventListener('load', () => {
  document.body.classList.remove('preload');

  if (theme === 'white') {
    setTheme(true);
  }

  initTheme();
  initMenu();
  initLogo();
});
