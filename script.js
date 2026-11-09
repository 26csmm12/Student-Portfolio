const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navItems = document.querySelectorAll(".nav-link");
const feedbackForm = document.getElementById("feedbackForm");
const formStatus = document.getElementById("formStatus");

document.getElementById("year").textContent = new Date().getFullYear();

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navItems.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    navItems.forEach((item) => item.classList.remove("active"));
    link.classList.add("active");
  });
});

const sections = document.querySelectorAll("main section[id]");
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navItems.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    }
  });
}, { rootMargin: "-35% 0px -55% 0px" });
sections.forEach((section) => observer.observe(section));

feedbackForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  formStatus.textContent = "";
  formStatus.className = "form-status";

  if (!feedbackForm.reportValidity()) return;

  const formData = new FormData(feedbackForm);
  const payload = {
    visitorName: formData.get("visitorName").trim(),
    email: formData.get("email").trim(),
    rating: Number(formData.get("rating")),
    message: formData.get("message").trim()
  };

  const submitButton = feedbackForm.querySelector("button[type='submit']");
  submitButton.disabled = true;
  submitButton.textContent = "Submitting...";

  try {
    const response = await fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Something went wrong.");

    formStatus.textContent = result.message;
    formStatus.classList.add("success");
    feedbackForm.reset();
  } catch (error) {
    formStatus.textContent = error.message || "Could not submit feedback. Please try again.";
    formStatus.classList.add("error");
  } finally {
    submitButton.disabled = false;
    submitButton.innerHTML = 'Submit feedback <span aria-hidden="true">→</span>';
  }
});