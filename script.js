const navSlide = () => {
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav-links");
  const navbar = document.querySelector("nav");
  const navLinks = document.querySelectorAll(".nav-links li");

  let elementsArray = document.querySelectorAll(".nav-links li, .burger");

  elementsArray.forEach(function (elem) {
    elem.addEventListener("click", function () {
      //toggle navbar
      nav.classList.toggle("nav-active");
      //toggle-blur
      navbar.classList.toggle("no-blur");
      //animate links
      navLinks.forEach((link, index) => {
        if (link.style.animation) {
          link.style.animation = "";
        } else {
          link.style.animation = `navLinkFade 0.2s ease forwards ${
            index / 10 + 0.1
          }s`;
        }
      });
      //burger animation
      burger.classList.toggle("toggle");
    });
  });
};

$(document).ready(function () {
  navSlide();
  const openmfButtons = document.querySelectorAll("[data-mf-target]");
  const closemfButtons = document.querySelectorAll("[data-close-button]");
  const overlay = document.getElementById("overlay");

  openmfButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const mf = document.querySelector(button.dataset.mfTarget);
      openmf(mf);
    });
  });

  overlay.addEventListener("click", () => {
    const mfs = document.querySelectorAll(".mf.active");
    mfs.forEach((mf) => {
      closemf(mf);
    });
  });

  closemfButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const mf = button.closest(".mf");
      closemf(mf);
    });
  });

  function openmf(mf) {
    if (mf == null) return;
    mf.classList.add("active");
    overlay.classList.add("active");
  }

  function closemf(mf) {
    if (mf == null) return;
    mf.classList.remove("active");
    overlay.classList.remove("active");
  }
});
// Some random colors
