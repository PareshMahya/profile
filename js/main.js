// Initialize AOS animations
AOS.init({
  duration: 800,
  easing: "ease-in-out",
  once: true,
});

// Active nav highlight
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";
  const scrollY = window.scrollY;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// Navbar background toggle
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("navbar-scrolled");
  } else {
    navbar.classList.remove("navbar-scrolled");
  }
});

// Back to top button
const backToTopButton = document.querySelector(".back-to-top");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopButton.classList.add("show");
  } else {
    backToTopButton.classList.remove("show");
  }
});

// Form validation (DO NOT block submission)
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    // Basic empty check
    if (!name || !email || !subject || !message) {
      event.preventDefault();
      alert("Please fill in all fields.");
      return;
    }

    // Minimum message length
    if (message.length < 10) {
      event.preventDefault();
      alert("Message must be at least 10 characters long.");
      return;
    }

    // If validation passes, DO NOT prevent submit
    // Browser will POST to the backend normally
  });
}

