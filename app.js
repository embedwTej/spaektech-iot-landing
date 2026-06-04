/* Spaektech IoT Course Main Application Script */

// =========================================================================
// WEBSITE CONFIGURATION
// =========================================================================
// Update this count as you receive payments (0 to 5+).
// The website will automatically:
// 1. Show the ₹499 early bird discount if the count is less than 5 (e.g. 0, 1, 2, 3, 4).
// 2. Automatically switch the price to ₹799 for everyone once it reaches 5 or more.
// 3. Update the visual progress bar (e.g. "0 / 5 Seats Filled").
const CURRENT_REGISTRATION_COUNT = 2;
// =========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // Navigation & DOM Elements
  const header = document.getElementById('header');
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  /* --- Navigation Controls --- */

  // Change header appearance on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scroll Spy: Active Nav Link Highlight
    let current = '';
    const sections = document.querySelectorAll('section, header');

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= (sectionTop - 150)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').slice(1) === current) {
        link.classList.add('active');
      }
    });
  });

  // Mobile Menu Toggle
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Close Mobile Menu on Nav link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  /* --- Dynamic Price & Seats Adjuster --- */

  const updatePriceUI = () => {
    const priceValElements = document.querySelectorAll('.price-val');
    const statPriceVal = document.getElementById('stat-price-val');
    const statPriceLbl = document.getElementById('stat-price-lbl');
    const step1Title = document.getElementById('step-1-title');
    const ticketBadge = document.getElementById('ticket-badge');
    const ticketPriceSub = document.getElementById('ticket-price-sub');
    const ticketNewPriceVal = document.getElementById('ticket-new-price-val');
    const seatStatusLbl = document.getElementById('seat-status-lbl');
    const seatPctLbl = document.getElementById('seat-pct-lbl');
    const seatProgressFill = document.getElementById('seat-progress-fill');

    const limit = 5;
    const isEarlyBirdActive = CURRENT_REGISTRATION_COUNT < limit;

    if (!isEarlyBirdActive) {
      // Switch elements to standard/regular price (₹799)
      priceValElements.forEach(el => el.textContent = '₹799');

      if (statPriceVal) statPriceVal.textContent = '₹799';
      if (statPriceLbl) statPriceLbl.textContent = 'Regular Fee';

      if (step1Title) step1Title.textContent = 'Scan & Pay Course Fee';

      if (ticketBadge) {
        ticketBadge.textContent = 'Standard Admission';
        ticketBadge.style.background = 'rgba(138, 43, 226, 0.1)';
        ticketBadge.style.color = 'var(--accent-purple)';
      }

      if (ticketPriceSub) ticketPriceSub.textContent = 'Scan to pay course fee: ₹799';
      if (ticketNewPriceVal) ticketNewPriceVal.textContent = '₹799';

      if (seatStatusLbl) seatStatusLbl.textContent = 'Discount Seats';
      if (seatPctLbl) seatPctLbl.textContent = '5 / 5 Filled (Early Bird Closed)';
      if (seatProgressFill) {
        seatProgressFill.style.width = '100%';
        seatProgressFill.style.background = 'var(--accent-purple)';
      }
    } else {
      // Switch elements to early bird price (₹499)
      priceValElements.forEach(el => el.textContent = '₹499');

      if (statPriceVal) statPriceVal.textContent = '₹499';
      if (statPriceLbl) statPriceLbl.textContent = 'Early Bird Fee';

      if (step1Title) step1Title.textContent = 'Scan & Pay Early Bird Fee';

      if (ticketBadge) {
        ticketBadge.textContent = 'Official GPay QR';
        ticketBadge.style.background = 'rgba(0, 240, 255, 0.1)';
        ticketBadge.style.color = 'var(--accent-cyan)';
      }

      if (ticketPriceSub) ticketPriceSub.textContent = 'Scan to pay Early Bird fee: ₹499';
      if (ticketNewPriceVal) ticketNewPriceVal.textContent = '₹499';

      // Calculate active seats percentage
      const percentage = Math.min(100, Math.max(0, (CURRENT_REGISTRATION_COUNT / limit) * 100));

      if (seatStatusLbl) seatStatusLbl.textContent = 'Early Bird Offer';
      if (seatPctLbl) seatPctLbl.textContent = `${CURRENT_REGISTRATION_COUNT} / ${limit} Seats Filled`;
      if (seatProgressFill) {
        seatProgressFill.style.width = `${percentage}%`;
        seatProgressFill.style.background = 'var(--primary-gradient)';
      }
    }
  };

  // Render prices based on the configuration
  updatePriceUI();
});




