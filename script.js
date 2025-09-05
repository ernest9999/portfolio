// ===== Dark / Light Mode Toggle =====
const toggleBtn = document.getElementById("mode-toggle");

if(toggleBtn){
  // Load saved theme
  if(localStorage.getItem('theme') === 'light'){
    document.body.classList.add('light-mode');
  }
  toggleBtn.textContent = document.body.classList.contains('light-mode') ? 'Dark Mode' : 'Light Mode';

  // Toggle on click
  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
    toggleBtn.textContent = document.body.classList.contains('light-mode') ? 'Dark Mode' : 'Light Mode';
  });
}

// ===== Initialize AOS =====
AOS.init({
  duration: 800,
  easing: 'ease-in-out',
  once: true
});

// ===== Sticky Header & Active Nav Links =====
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.site-nav a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if(window.scrollY >= sectionTop) current = section.getAttribute('id');
  });

  navLinks.forEach(link => link.classList.remove('active'));
  navLinks.forEach(link => {
    if(link.getAttribute('href').includes(current)) link.classList.add('active');
  });

  // Add shadow to header on scroll
  const header = document.querySelector('.site-header');
  if(window.scrollY > 10) header.classList.add('scrolled');
  else header.classList.remove('scrolled');
});

// ===== Portfolio Filtering =====
const filterBtns = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.cards .card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active from all
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    cards.forEach(card => {
      if(filter === 'all') card.style.display = 'block';
      else if(card.classList.contains(filter)) card.style.display = 'block';
      else card.style.display = 'none';
    });
  });
});

// ===== Simple Form Validation =====
function validateForm(){
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if(name === "" || email === "" || message === ""){
    alert("Please fill in all fields before submitting!");
    return false;
  }

  // Optional: Email pattern validation
  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if(!email.match(emailPattern)){
    alert("Please enter a valid email!");
    return false;
  }

  alert("Message sent successfully!");
  return true;
}

// Formspree submission handling
const contactForm = document.getElementById("contact-form");
const successMsg = document.getElementById("success-msg");

contactForm.addEventListener("submit", async function(e) {
  e.preventDefault(); // prevent default page reload

  const formData = new FormData(contactForm);

  try {
    const response = await fetch(contactForm.action, {
      method: "POST",
      body: formData,
      headers: { "Accept": "application/json" }
    });

    if (response.ok) {
      successMsg.style.display = "block";      // show success
      contactForm.reset();                     // clear the form
    } else {
      alert("Oops! There was a problem sending your message.");
    }
  } catch (error) {
    alert("Oops! There was a problem sending your message.");
    console.error(error);
  }
});
