// Initialize AOS animations
AOS.init({
  duration: 800,
  easing: "ease-in-out",
  once: true,
});

// Active nav highlight (ScrollSpy)
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";
  const scrollY = window.scrollY;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    // -200 is an offset to trigger the change before the section hits the very top
    if (scrollY >= sectionTop - 250) {
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

// Navbar and Back-to-top logic
const navbar = document.querySelector(".navbar");
const backToTopButton = document.querySelector(".back-to-top");

window.addEventListener("scroll", () => {
  const scrollPos = window.scrollY;
  
  // Toggle Navbar Background
  if (navbar) {
    scrollPos > 50 ? navbar.classList.add("navbar-scrolled") : navbar.classList.remove("navbar-scrolled");
  }

  // Toggle Back-to-top visibility
  if (backToTopButton) {
    scrollPos > 300 ? backToTopButton.classList.add("show") : backToTopButton.classList.remove("show");
  }
});

// Back to top click - ADDED NULL CHECK HERE
if (backToTopButton) {
  backToTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// Form validation
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !subject || !message) {
      event.preventDefault();
      alert("Please fill in all fields.");
      return;
    }

    if (!emailRegex.test(email)) {
      event.preventDefault();
      alert("Please enter a valid email address.");
      return;
    }

    if (message.length < 10) {
      event.preventDefault();
      alert("Message must be at least 10 characters long.");
      return;
    }
    // Success: Browser proceeds to POST to your form action
  });
}

//
