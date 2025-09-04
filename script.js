// Dark / Light mode toggle (persists per tab)
const toggleBtn = document.getElementById("mode-toggle");
if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    toggleBtn.textContent = document.body.classList.contains("light-mode")
      ? "Dark Mode"
      : "Light Mode";
  });
}

// Simple contact form validation (shared)
function validateForm() {
  const name = document.getElementById("name")?.value.trim();
  const email = document.getElementById("email")?.value.trim();
  const message = document.getElementById("message")?.value.trim();

  if (!name || !email || !message) {
    alert("Please fill in all fields.");
    return false;
  }
  alert("Message sent successfully!");
  return true;
}
