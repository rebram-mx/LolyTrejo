// ---------------------------------------------
// SLIDER DE GALERÍA
// ---------------------------------------------

const slides = [
  { img: "img/1.jpg", text: "Descripción de la imagen 1." },
  { img: "img/2.jpg", text: "Descripción de la imagen 2." },
  { img: "img/3.jpg", text: "Descripción de la imagen 3." },
  { img: "img/4.jpg", text: "Descripción de la imagen 4." }
];

let currentSlide = 0;
let slideInterval = null;
const AUTOPLAY_MS = 5000;

function updateSlide() {
  const slideImg = document.getElementById("slideImg");
  const slideText = document.getElementById("slideText");
  const dots = document.getElementById("dots");

  slideImg.style.opacity = 0;
  slideText.style.opacity = 0;

  setTimeout(() => {
    slideImg.src = slides[currentSlide].img;
    slideText.textContent = slides[currentSlide].text;

    slideImg.style.opacity = 1;
    slideText.style.opacity = 1;

    dots.querySelectorAll("button").forEach((btn, idx) => {
      btn.classList.toggle("opacity-50", idx !== currentSlide);
    });
  }, 250);
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  updateSlide();
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  updateSlide();
}

function renderDots() {
  const dots = document.getElementById("dots");
  dots.innerHTML = "";

  slides.forEach((s, i) => {
    const btn = document.createElement("button");
    btn.className = "w-3 h-3 rounded-full bg-primary transition-opacity";
    btn.style.opacity = i === currentSlide ? "1" : "0.5";
    btn.addEventListener("click", () => {
      currentSlide = i;
      updateSlide();
    });
    dots.appendChild(btn);
  });
}

function startAutoplay() {
  slideInterval = setInterval(nextSlide, AUTOPLAY_MS);
}
function stopAutoplay() {
  clearInterval(slideInterval);
}

// ---------------------------------------------
// HERO IMG POR ORIENTACIÓN
// ---------------------------------------------
function updateHeroImage() {
  const heroImg = document.getElementById("heroImg");
  const isPortrait = window.innerHeight > window.innerWidth;

  heroImg.src = isPortrait ? "img/lt.jpg" : "img/3.jpg";
}

// ---------------------------------------------
// VIDEO CON INTERSECTION OBSERVER
// ---------------------------------------------
const heroVideo = document.getElementById("heroVideo");

function handleVideoObserver() {
  if (!heroVideo || typeof IntersectionObserver === "undefined") return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) heroVideo.play();
      else heroVideo.pause();
    });
  }, { threshold: 0.25 });

  obs.observe(heroVideo);
}

// ---------------------------------------------
// INIT
// ---------------------------------------------
window.addEventListener("load", () => {

  renderDots();
  updateSlide();
  startAutoplay();

  document.getElementById("nextBtn").onclick = nextSlide;
  document.getElementById("prevBtn").onclick = prevSlide;

  updateHeroImage();
  window.addEventListener("resize", updateHeroImage);

  handleVideoObserver();
});
