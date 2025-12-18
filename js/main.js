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

/**
 * CONTACT FORM HANDLING (The AJAX Fix)
 * This sends data in the background so you never see the "Bot Check" page.
 */
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault(); // This is critical: it prevents the 404/Bot-check page

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    // Check if subject field exists, otherwise use a default string
    const subjectField = document.getElementById("subject");
    const subject = subjectField ? subjectField.value.trim() : "New Portfolio Message!";
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validation
    if (!name || !email || !message) {
      alert("Please fill in all fields.");
      return;
    }
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Show "Sending..." message to the user
    if (formStatus) {
      formStatus.innerHTML = '<div class="alert alert-info">Sending message... please wait.</div>';
    }

    // Prepare data
    const data = {
        name: name,
        email: email,
        _subject: subject, 
        message: message,
        _captcha: "false" // Ensures no bot-check page
    };
    
    // Send via AJAX using JSON
    fetch("https://formsubmit.co/ajax/pmahyavanshi13@gmail.com", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
    })
    .then(data => {
      // Hide the form
      if (contactForm) contactForm.style.display = "none"; 
      // Hide the "Sending..." status if it's still there
      if (formStatus) formStatus.style.display = "none";
      // Show the success message template
      if (successMessage) {
        successMessage.style.display = "block";
      }
      // Reset the form data in the background
      contactForm.reset();
      // NOTE: Automatic scroll removed. 
      // User must click the "Go to Top" button manually now.
      //  window.scrollTo({ top: contactForm.offsetTop - 100, behavior: 'smooth' });
    })
    .catch(error => {
        console.error("Error:", error);
        if (formStatus) {
            formStatus.innerHTML = '<div class="alert alert-danger">Error sending message. Please try again or email me directly.</div>';
        }
    });
  });
}
//
