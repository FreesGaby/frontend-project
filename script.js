// Menu mobile
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");

  const isOpen = navLinks.classList.contains("open");
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Fermer le menu" : "Ouvrir le menu"
  );
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-label", "Ouvrir le menu");
  });
});

// Dark mode
const themeToggle = document.querySelector(".theme-toggle");
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark");
  themeToggle.textContent = "☀️";
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  const isDark = document.body.classList.contains("dark");
  themeToggle.textContent = isDark ? "☀️" : "🌙";

  localStorage.setItem("theme", isDark ? "dark" : "light");
});

// Cards dynamiques
const features = [
  {
    title: "Rapide",
    description: "Une interface simple, claire et efficace."
  },
  {
    title: "Responsive",
    description: "Un site adapté aux mobiles, tablettes et ordinateurs."
  },
  {
    title: "Accessible",
    description: "Une structure HTML pensée pour être lisible et utilisable."
  }
];

const featuresList = document.querySelector("#features-list");

features.forEach((feature) => {
  const card = document.createElement("article");
  card.classList.add("card");

  card.innerHTML = `
    <h3>${feature.title}</h3>
    <p>${feature.description}</p>
  `;

  featuresList.appendChild(card);
});

// Formulaire
const form = document.querySelector("#contact-form");
const formMessage = document.querySelector("#form-message");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const nameInput = document.querySelector("#name");
  const emailInput = document.querySelector("#email");
  const messageInput = document.querySelector("#message");

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();

  clearErrors([nameInput, emailInput, messageInput]);

  if (!name || !email || !message) {
    showFormMessage("Tous les champs sont obligatoires.", "error");
    markEmptyFields([nameInput, emailInput, messageInput]);
    return;
  }

  if (!isValidEmail(email)) {
    showFormMessage("Veuillez entrer une adresse email valide.", "error");
    emailInput.classList.add("input-error");
    return;
  }

  showFormMessage("Message envoyé avec succès !", "success");
  form.reset();
});

function showFormMessage(text, type) {
  formMessage.textContent = text;
  formMessage.className = `form-message ${type}`;
}

function clearErrors(inputs) {
  inputs.forEach((input) => {
    input.classList.remove("input-error");
  });
}

function markEmptyFields(inputs) {
  inputs.forEach((input) => {
    if (!input.value.trim()) {
      input.classList.add("input-error");
    }
  });
}

function isValidEmail(email) {
  return email.includes("@") && email.includes(".");
}

// Navigation active au scroll
const sections = document.querySelectorAll("main section");
const navLinksArray = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let currentSectionId = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;

    if (window.scrollY >= sectionTop) {
      currentSectionId = section.getAttribute("id");
    }
  });

  navLinksArray.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${currentSectionId}`) {
      link.classList.add("active");
    }
  });
});