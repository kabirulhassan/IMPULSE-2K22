//Timer
var finalDate = new Date("Jul 4, 2022 16:00:00").getTime();
var x = setInterval(function () {
  var now = new Date().getTime();
  var distance = finalDate - now;
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("daytext").innerHTML = days + "<br>DAYS";
  document.getElementById("hourtext").innerHTML = hours + "<br>HOURS";
  document.getElementById("minstext").innerHTML = minutes + "<br>MINS";
  document.getElementById("secstext").innerHTML = seconds + "<br>SECS";
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("daytext").innerHTML = 0 + "<br>DAYS";
    document.getElementById("hourtext").innerHTML = 0 + "<br>HOURS";
    document.getElementById("minstext").innerHTML = 0 + "<br>MINS";
    document.getElementById("secstext").innerHTML = 0 + "<br>SECS";
  }
}, 1000);
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

// particle animation

let max_particles = 2500;
let particles = [];
let frequency = 10;
let init_num = max_particles;
let max_time = frequency * max_particles;
let time_to_recreate = false;

// Enable repopolate
setTimeout(
  function () {
    time_to_recreate = true;
  }.bind(this),
  max_time
);

// Popolate particles
popolate(max_particles);

var tela = document.createElement("canvas");
tela.setAttribute("id", "canvas");
tela.width = $(window).width();
tela.height = $(window).height();
$("body").append(tela);

function resize() {
  $("#canvas").outerHeight(
    $(window).height() -
      $("#canvas").offset().top -
      Math.abs($("#canvas").outerHeight(true) - $("#canvas").outerHeight())
  );
}
$(document).ready(function () {
  resize();
  $(window).on("resize", function () {
    resize();
  });
});

var canvas = tela.getContext("2d");
class Particle {
  constructor(canvas) {
    let random = Math.random();
    this.progress = 0;
    this.canvas = canvas;
    this.center = {
      x: $(window).width() / 2,
      y: $(window).height() / 2,
    };

    this.point_of_attraction = {
      x: $(window).width() / 2,
      y: $(window).height() / 2,
    };

    if (Math.random() > 0.5) {
      this.x = $(window).width() * Math.random();
      this.y =
        Math.random() > 0.5
          ? -Math.random() - 100
          : $(window).height() + Math.random() + 100;
    } else {
      this.x =
        Math.random() > 0.5
          ? -Math.random() - 100
          : $(window).width() + Math.random() + 100;
      this.y = $(window).height() * Math.random();
    }

    this.s = Math.random() * 2;
    this.a = 0;
    this.w = $(window).width();
    this.h = $(window).height();
    this.radius = random > 0.2 ? Math.random() * 1 : Math.random() * 3;
    this.color = random > 0.2 ? "#694FB9" : "#9B0127";
    this.radius = random > 0.8 ? Math.random() * 2.2 : this.radius;
    this.color = random > 0.8 ? "#3CFBFF" : this.color;
  }

  calculateDistance(v1, v2) {
    let x = Math.abs(v1.x - v2.x);
    let y = Math.abs(v1.y - v2.y);
    return Math.sqrt(x * x + y * y);
  }

  render() {
    this.canvas.beginPath();
    this.canvas.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.canvas.lineWidth = 2;
    this.canvas.fillStyle = this.color;
    this.canvas.fill();
    this.canvas.closePath();
  }

  move() {
    let p1 = {
      x: this.x,
      y: this.y,
    };

    let distance = this.calculateDistance(p1, this.point_of_attraction);
    let force = Math.max(100, 1 + distance);

    let attr_x = (this.point_of_attraction.x - this.x) / force;
    let attr_y = (this.point_of_attraction.y - this.y) / force;

    this.x += Math.cos(this.a) * this.s + attr_x;
    this.y += Math.sin(this.a) * this.s + attr_y;
    this.a +=
      Math.random() > 0.5
        ? Math.random() * 0.9 - 0.45
        : Math.random() * 0.4 - 0.2;

    if (distance < 30 + Math.random() * 100) {
      return false;
    }

    this.render();
    this.progress++;
    return true;
  }
}

function popolate(num) {
  for (var i = 0; i < num; i++) {
    setTimeout(
      (function (x) {
        return function () {
          // Add particle
          particles.push(new Particle(canvas));
        };
      })(i),
      frequency * i
    );
  }
  return particles.length;
}

function createSphera() {
  let radius = 180;
  let center = {
    x: $(window).width() / 2,
    y: $(window).height() / 2,
  };
}

function clear() {
  canvas.globalAlpha = 0.08;
  // canvas.fillStyle = '#110031';
  canvas.fillStyle = "#000";
  canvas.fillRect(0, 0, tela.width, tela.height);
  canvas.globalAlpha = 1;
}

/*
 * Function to update particles in canvas
 */
function update() {
  particles = particles.filter(function (p) {
    return p.move();
  });
  // Recreate particles
  if (time_to_recreate) {
    if (particles.length < init_num) {
      popolate(1);
      console.log("Ricreo");
    }
  }
  clear();
  requestAnimationFrame(update.bind(this));
}
update();

setInterval(
  function () {
    var container = document.getElementById("rotatingText");
    var tmp = container.innerHTML;
    container.innerHTML = tmp;
  },
  5500 // length of the whole show in milliseconds
);
$(".owl1").owlCarousel({
  items: 3,
  loop: true,
  nav: false,
  margin: 22,
  autoplay: true,
  autoplayTimeout: 3000,
  autoplayHoverPause: true,
  dots: true,
  responsiveClass: true,
  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 1,
    },
    800: {
      items: 2,
    },
    1000: {
      items: 3,
      loop: true,
    },
  },
});

$(".owl2").owlCarousel({
  items: 3,
  loop: true,
  margin: 22,
  autoplay: true,
  autoplayTimeout: 2000,
  autoplayHoverPause: true,
  nav: true,
  navText: [
    "<i class='fa fa-angle-left'></i>",
    "<i class='fa fa-angle-right'></i>",
  ],
  dots: false,
  responsiveClass: true,
  responsive: {
    0: {
      items: 2,
    },
    600: {
      items: 3,
    },
    1000: {
      items: 4,
      loop: true,
    },
  },
});
$(".owl3").owlCarousel({
  items: 3,
  loop: true,
  margin: 22,
  autoplay: true,
  autoplayTimeout: 2000,
  autoplayHoverPause: true,
  nav: true,
  navText: [
    "<i class='fa fa-angle-left'></i>",
    "<i class='fa fa-angle-right'></i>",
  ],
  dots: false,
  responsiveClass: true,
  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 2,
      loop: true,
    },
    1000: {
      autoWidth: false,
      items: 3,
      loop: false,
    },
  },
});
