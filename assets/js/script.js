'use strict';

/**
 * PRELOAD
 */
const preloader = document.querySelector("[data-preaload]");
window.addEventListener("load", function () {
  preloader.classList.add("loaded");
  document.body.classList.add("loaded");
});

/**
 * ADD EVENT ON MULTIPLE ELEMENTS
 */
const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
};

/**
 * NAVBAR TOGGLE
 */
const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
};

addEventOnElements(navTogglers, "click", toggleNavbar);

/**
 * HEADER & BACK TO TOP BUTTON
 */
const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");
let lastScrollPos = 0;

const hideHeader = function () {
  const isScrollBottom = lastScrollPos < window.scrollY;
  header.classList.toggle("hide", isScrollBottom);
  lastScrollPos = window.scrollY;
};

window.addEventListener("scroll", function () {
  const isActive = window.scrollY >= 50;
  header.classList.toggle("active", isActive);
  backTopBtn.classList.toggle("active", isActive);
  hideHeader();
});

/**
 * HERO SLIDER
 */
const heroSlider = document.querySelector("[data-hero-slider]");
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
const heroSliderNextBtn = document.querySelector("[data-next-btn]");

let currentSlidePos = 0;
let lastActiveSliderItem = heroSliderItems[0];

const updateSliderPos = function () {
  lastActiveSliderItem.classList.remove("active");
  heroSliderItems[currentSlidePos].classList.add("active");
  lastActiveSliderItem = heroSliderItems[currentSlidePos];
};

const slideNext = function () {
  currentSlidePos = (currentSlidePos + 1) % heroSliderItems.length;
  updateSliderPos();
};

const slidePrev = function () {
  currentSlidePos = (currentSlidePos - 1 + heroSliderItems.length) % heroSliderItems.length;
  updateSliderPos();
};

heroSliderNextBtn.addEventListener("click", slideNext);
heroSliderPrevBtn.addEventListener("click", slidePrev);

// Auto Slide
let autoSlideInterval;
const autoSlide = function () {
  autoSlideInterval = setInterval(slideNext, 7000);
};

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseover", () => clearInterval(autoSlideInterval));
addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseout", autoSlide);
window.addEventListener("load", autoSlide);

// Swipe Support for Slider
let startX;
heroSlider.addEventListener("touchstart", (e) => startX = e.touches[0].clientX);
heroSlider.addEventListener("touchend", (e) => {
  const endX = e.changedTouches[0].clientX;
  if (startX - endX > 50) slideNext();
  else if (endX - startX > 50) slidePrev();
});

/**
 * PARALLAX EFFECT
 */
const parallaxItems = document.querySelectorAll("[data-parallax-item]");
let x, y;

window.addEventListener("mousemove", function (event) {
  x = ((event.clientX / window.innerWidth) * 10 - 5) * -1;
  y = ((event.clientY / window.innerHeight) * 10 - 5) * -1;

  for (let i = 0, len = parallaxItems.length; i < len; i++) {
    const speed = Number(parallaxItems[i].dataset.parallaxSpeed);
    parallaxItems[i].style.transform = `translate3d(${x * speed}px, ${y * speed}px, 0px)`;
  }
});

/**
 * DARK/LIGHT MODE TOGGLE
 */
const themeToggleBtn = document.querySelector("[data-theme-toggle]");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const setTheme = (mode) => document.documentElement.setAttribute("data-theme", mode);

if (prefersDark) setTheme("dark");

themeToggleBtn?.addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  setTheme(currentTheme === "dark" ? "light" : "dark");
});

/**
 * ANIMATE ON SCROLL (AOS) INIT
 */
window.addEventListener("load", () => {
  if (window.AOS) AOS.init({ duration: 1000, once: true });
});
