// Hamburger menu
const hamburger = document.querySelector(".nav-hamburger");
const cross = document.querySelector(".nav-cross");
const rightNav = document.querySelector(".right-nav");
const navItems = document.querySelectorAll(".nav-item");
const body = document.querySelector("body");

hamburger.addEventListener("click", mobileMenu);
cross.addEventListener("click", mobileMenu);

function mobileMenu() {
  hamburger.classList.toggle("closed");
  rightNav.classList.toggle("closed");
  cross.classList.toggle("closed");
  body.classList.toggle("freeze");
  navItems.forEach(item => {
      item.classList.toggle("closed");
  });
}

// Light switch

const lightSwitchButton = document.querySelector(".light-button");
const lightSwitchImage = document.querySelector(".switch-image");
const background = document.querySelector(".section-three-3");

lightSwitchButton.addEventListener("click", lightSwitch);
let isOn = false;

function lightSwitch() {
  if(!isOn){
    background.style.backgroundColor = "#edebdf";
    lightSwitchImage.src = "/assets/switch-on.svg";
    isOn = true;
    return;
  }
  background.style.backgroundColor = "#6142da";
  lightSwitchImage.src = "/assets/switch-off.svg";
  isOn = false;
}