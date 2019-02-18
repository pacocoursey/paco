let theme = localStorage.getItem('theme') || 'black';

function setTheme(color, bg) {
  document.documentElement.style.setProperty('--bg', bg);
  document.documentElement.style.setProperty('--color', color);
}

window.addEventListener('load', () => {
  const toggle = document.querySelector('.toggle');
  toggle.addEventListener('click', () => {
    if (theme === 'black') {
      setTheme('--black', '--white');
      theme = 'white';
    } else {
      setTheme('--white', '--black');
      theme = 'black';
    }
  });
});
