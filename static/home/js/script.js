// Elementos del DOM
const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const closeMenuBtn = document.querySelector(".close-menu");
const mainNav = document.getElementById("main-nav");
const overlay = document.getElementById("overlay");
const messageElement = document.getElementById("messages");

// Mensajes para la barra superior
const ambientalMessages = [
  "El mundo es de todos",
  "Manten tu espacio de trabajo limpio",
];

let currentMessageIndex = 0;

function changeMessage() {
  messageElement.textContent = ambientalMessages[currentMessageIndex];
  currentMessageIndex = (currentMessageIndex + 1) % ambientalMessages.length;
}

function openMobileMenu() {
  mainNav.classList.add("active");
  overlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeMobileMenu() {
  mainNav.classList.remove("active");
  overlay.classList.remove("active");
  document.body.style.overflow = "";
}

mobileMenuBtn.addEventListener("click", openMobileMenu);
closeMenuBtn.addEventListener("click", closeMobileMenu);
overlay.addEventListener("click", closeMobileMenu);

const messageInterval = setInterval(changeMessage, 5000);
changeMessage();

window.addEventListener("beforeunload", () => {
  clearInterval(messageInterval);
});
