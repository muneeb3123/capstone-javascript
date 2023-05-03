const showMenuBtn = document.querySelector('.open-menu');
const closeMenuBtn = document.querySelector('.close-menu');
const menu = document.querySelector('.nav-items');
const navLinks = document.querySelectorAll('.nav-link');
const closeMenu = () => {
  closeMenuBtn.classList.toggle('displayNone');
  showMenuBtn.classList.toggle('displayNone');
  menu.classList.toggle('displayNone');
};

closeMenuBtn.addEventListener('click', closeMenu);

showMenuBtn.addEventListener('click', () => {
  showMenuBtn.classList.toggle('displayNone');
  closeMenuBtn.classList.toggle('displayNone');
  menu.classList.toggle('displayNone');
});

navLinks.forEach((e) => {
  e.addEventListener('click', closeMenu);
});