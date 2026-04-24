// ========== GLOBAL HEADER ==========
const header = `
<header class="w-full fixed-top">
 <nav class="navbar navbar-main navbar-expand-lg">

    <div class="container-fluid">

      <!-- LOGO -->
      <a class="navbar-brand" href="index.html">
        <div class="logo-icon">
          <img src="images/colored-logo[1].png" alt="Compass Housing Society" width="40" height="40">
        </div>
        <div class="brand-text">
          <span class="brand-name">Compass Housing <br>Society</span>
        </div>
      </a>

      <!-- MOBILE REGISTER BUTTON -->
      <div class="mobile-register-container d-lg-none">
     <a href="register.html" 
   class="btn btn-outline-light px-4 py-2 d-inline-flex align-items-center justify-content-center" style="font-size: 18px;">
  Register
</a>
      </div>

      <!-- MOBILE TOGGLER -->
      <button class="navbar-toggler-custom d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
          <div class="toggler-icon"></div>
      </button>

      <!-- NAVBAR CONTENT -->
      <div class="collapse navbar-collapse" id="navbarContent">
        <ul class="navbar-nav mx-auto">

 <li class="nav-item"><a class="nav-link-main" href="index.html">Home</a></li>
 <li class="nav-item"><a class="nav-link-main" href="home2.html">Home2</a></li>

 <li class="nav-item dropdown">
  <a class="nav-link-main" href="#" data-bs-toggle="dropdown">
    Blog <span class="dropdown-icon-model"></span>
  </a>
  <ul class="dropdown-menu">
    <li><a class="dropdown-item" href="blog.html">Blog</a></li>
    <li><a class="dropdown-item" href="blog2.html">Blog Details</a></li>
  </ul>
</li>

<li class="nav-item"><a class="nav-link-main" href="aboutus.html">About</a></li>

<li class="nav-item dropdown">
  <a class="nav-link-main" href="#" data-bs-toggle="dropdown">
    Services <span class="dropdown-icon-model"></span>
  </a>
  <ul class="dropdown-menu">
    <li><a class="dropdown-item" href="services.html">Services</a></li>
    <li><a class="dropdown-item" href="services2.html">Service Details</a></li>
    <li><a class="dropdown-item" href="404error.html">404 error</a></li>
  </ul>
</li>

<li class="nav-item"><a class="nav-link-main" href="contactus.html">Contact Us</a></li>

<!-- MOBILE THEME TOGGLE -->
<div class="mobile-theme-toggle d-lg-none">
  <button class="theme-toggle-btn" id="mobileThemeToggle">
    <span class="icon">🌙</span>
  </button>
</div>

</ul>

<!-- DESKTOP RIGHT -->
<div class="navbar-right-section d-none d-lg-flex">

<button class="theme-toggle-btn" id="themeToggle">
  <span class="icon">🌙</span>
</button>

<a href="register.html" 
class="btn btn-outline-light px-4 py-2 d-inline-flex align-items-center justify-content-center" style="font-size: 18px;">
Register
</a>

</div>

</div>
</div>
</nav>
</header>
`;

// Insert header
document.getElementById("site-header").innerHTML = header;

document.addEventListener('DOMContentLoaded', function () {
  initializeTheme();
  initializeMobileMenu();
  initializeBootstrapDropdowns();
});

/* ===============================
   THEME TOGGLE
================================ */
function initializeTheme() {
  const htmlEl = document.documentElement;
  const themeToggle = document.getElementById("themeToggle");
  const mobileThemeToggle = document.getElementById("mobileThemeToggle");

  const savedTheme = localStorage.getItem("theme") || "light";
  htmlEl.setAttribute("data-theme", savedTheme);

  function updateIcons() {
    const isDark = htmlEl.getAttribute("data-theme") === "dark";
    document.querySelectorAll('.theme-toggle-btn .icon').forEach(icon => {
      icon.textContent = isDark ? '☀️' : '🌙';
    });
  }

  function toggleTheme() {
    const currentTheme = htmlEl.getAttribute("data-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";

    htmlEl.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateIcons();
  }

  if (themeToggle) themeToggle.addEventListener("click", toggleTheme);
  if (mobileThemeToggle) mobileThemeToggle.addEventListener("click", toggleTheme);

  updateIcons();
}

/* ===============================
   BOOTSTRAP DROPDOWNS
================================ */
function initializeBootstrapDropdowns() {
  document.querySelectorAll('.dropdown').forEach(dropdown => {
    dropdown.addEventListener('show.bs.dropdown', function () {
      const arrow = this.querySelector('.dropdown-icon-model');
      if (arrow) arrow.style.transform = 'rotate(180deg)';
    });

    dropdown.addEventListener('hide.bs.dropdown', function () {
      const arrow = this.querySelector('.dropdown-icon-model');
      if (arrow) arrow.style.transform = 'rotate(0deg)';
    });
  });
}

/* ===============================
   MOBILE MENU
================================ */
function initializeMobileMenu() {
  const toggler = document.querySelector(".navbar-toggler-custom");
  const navbarCollapse = document.getElementById("navbarContent");

  if (toggler && navbarCollapse) {

    navbarCollapse.addEventListener('show.bs.collapse', function () {
      toggler.classList.add("active");
    });

    navbarCollapse.addEventListener('hide.bs.collapse', function () {
      toggler.classList.remove("active");
    });

    handleMobileDropdowns();
  }
}

/* ===============================
   MOBILE DROPDOWNS
================================ */
function handleMobileDropdowns() {
  const dropdownToggles = document.querySelectorAll('.nav-item.dropdown > .nav-link-main');

  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', function (e) {
      if (window.innerWidth <= 991) {
        e.preventDefault();

        const parent = this.parentElement;
        const dropdownMenu = this.nextElementSibling;

        parent.classList.toggle('show');
        dropdownMenu.classList.toggle('show');
      }
    });
  });
}