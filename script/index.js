const hamburger = document.querySelector(".nav-hamburger");
const cross = document.querySelector(".nav-cross");
const rightNav = document.querySelector(".right-nav");
const navItems = document.querySelectorAll(".nav-item");

hamburger.addEventListener("click", mobileMenu);
cross.addEventListener("click", mobileMenu);

function mobileMenu() {
  hamburger.classList.toggle("closed");
  rightNav.classList.toggle("closed");
  cross.classList.toggle("closed");
  navItems.forEach(item => {
      item.classList.toggle("closed");
  });
}
