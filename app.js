/* Spaektech IoT Course Main Application Script */
//test
// =========================================================================
// WEBSITE CONFIGURATION
// =========================================================================
// Update this count as you receive payments (0 to 5+).
// The website will automatically:
// 1. Show the ₹499 early bird discount if the count is less than 5 (e.g. 0, 1, 2, 3, 4).
// 2. Automatically switch the price to ₹799 for everyone once it reaches 5 or more.
// 3. Update the visual progress bar (e.g. "3 / 5 Seats Filled").
const CURRENT_REGISTRATION_COUNT =3;
// =========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // Navigation & DOM Elements
  const header = document.getElementById('header');
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  /* --- Navigation Controls (rAF-throttled scroll) --- */
  let scrollTicking = false;
  window.addEventListener('scroll', () => {
    if (!scrollTicking) {
      requestAnimationFrame(() => {
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
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  }, { passive: true });

  // Mobile Menu Toggle
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

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

    const heroBadgePulse = document.querySelector('.hero-badge-pulse');
    const bannerText = document.querySelector('.banner-text');

    if (!isEarlyBirdActive) {
      // Switch elements to standard/regular price (₹799)
      priceValElements.forEach(el => el.textContent = '₹799');

      if (statPriceVal) {
        statPriceVal.setAttribute('data-target', '799');
        statPriceVal.textContent = '₹799';
      }
      if (statPriceLbl) statPriceLbl.textContent = 'Regular Fee';

      if (step1Title) step1Title.textContent = 'Scan & Pay Course Fee';

      if (ticketBadge) {
        ticketBadge.textContent = 'Standard Admission';
        ticketBadge.style.background = 'rgba(138, 43, 226, 0.1)';
        ticketBadge.style.color = 'var(--accent-purple)';
      }

      if (ticketPriceSub) ticketPriceSub.textContent = 'Scan to pay course fee: ₹799';
      if (ticketNewPriceVal) ticketNewPriceVal.textContent = '₹799';

      if (seatStatusLbl) seatStatusLbl.textContent = 'Standard Admission';
      if (seatPctLbl) seatPctLbl.textContent = '5 / 5 Filled (Early Bird Closed)';
      if (seatProgressFill) {
        seatProgressFill.style.width = '100%';
        seatProgressFill.style.background = 'var(--accent-purple)';
      }

      if (heroBadgePulse) {
        heroBadgePulse.textContent = 'Regular Admission';
        heroBadgePulse.classList.add('closed');
      }

      if (bannerText) {
        bannerText.innerHTML = 'Live classes starting on <strong>June 20</strong>! Standard admission open.';
      }
    } else {
      // Switch elements to early bird price (₹499)
      priceValElements.forEach(el => el.textContent = '₹499');

      if (statPriceVal) {
        statPriceVal.setAttribute('data-target', '499');
        statPriceVal.textContent = '₹499';
      }
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

      if (heroBadgePulse) {
        heroBadgePulse.textContent = 'Early Bird Active';
        heroBadgePulse.classList.remove('closed');
      }

      if (bannerText) {
        bannerText.innerHTML = 'Live classes starting on <strong>June 20</strong>! Hurry up, limited seats left.';
      }
    }
  };

  updatePriceUI();

  /* --- Announcement Banner Controls --- */
  const banner = document.getElementById('announcement-banner');
  const bannerCloseBtn = document.getElementById('banner-close-btn');

  if (banner && bannerCloseBtn) {
    if (localStorage.getItem('spaektech-banner-dismissed') === 'true') {
      document.body.classList.add('no-banner');
    }

    bannerCloseBtn.addEventListener('click', () => {
      document.body.classList.add('no-banner');
      localStorage.setItem('spaektech-banner-dismissed', 'true');
    });
  }

  /* --- Interactive Particle System (Canvas Backdrop) --- */
  const canvas = document.getElementById('particle-canvas');
  // Skip particles on mobile to save battery & CPU
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  if (canvas && !isMobile) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    const maxParticles = 35; // reduced from 60
    let animating = true;
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize, { passive: true });
    resize();
    
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.radius = Math.random() * 1.5 + 0.5;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 240, 255, 0.15)';
        ctx.fill();
      }
    }
    
    for (let i = 0; i < maxParticles; i++) {
      particles.push(new Particle());
    }
    
    // Pause animation when tab is not visible
    document.addEventListener('visibilitychange', () => {
      animating = !document.hidden;
      if (animating) animate();
    });
    
    const animate = () => {
      if (!animating) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      
      // O(n²) line connections - only draw if within threshold
      ctx.strokeStyle = 'rgba(138, 43, 226, 0.05)';
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy); // faster than Math.hypot
          if (dist < 100) {
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
          }
        }
      }
      ctx.stroke();
      requestAnimationFrame(animate);
    };
    animate();
  }

  /* --- Mouse Glow effect (rAF-throttled, transform-based for GPU perf) --- */
  const cursorGlow = document.getElementById('cursor-glow');
  if (cursorGlow) {
    let glowTicking = false;
    window.addEventListener('mousemove', (e) => {
      if (!glowTicking) {
        requestAnimationFrame(() => {
          // translate() keeps on compositor thread — no layout/paint recalc
          cursorGlow.style.transform = `translate(${e.clientX - 175}px, ${e.clientY - 175}px)`;
          glowTicking = false;
        });
        glowTicking = true;
      }
    }, { passive: true });
  }

  /* --- Typewriter / Tagline Rotator --- */
  const rotateText = document.getElementById('rotate-text');
  if (rotateText) {
    const words = ["ESP32 FIRMWARE", "MQTT NETWORKS", "SMART RELAYS", "CLOUD TELEMETRY", "WEB SERVERS"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 100;
    
    const type = () => {
      const currentWord = words[wordIndex];
      if (isDeleting) {
        rotateText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typingDelay = 40;
      } else {
        rotateText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typingDelay = 120;
      }
      
      if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        typingDelay = 2000;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typingDelay = 300;
      }
      
      setTimeout(type, typingDelay);
    };
    
    setTimeout(type, 1000);
  }

  /* --- Scroll Reveal Observer --- */
  const revealElements = document.querySelectorAll('.timeline-node, .trainer-card, .audience-card, .step-card, .ticket-card, .section-header');
  revealElements.forEach(el => el.classList.add('reveal'));
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.1 });
  
  revealElements.forEach(el => revealObserver.observe(el));

  /* --- 3D Tilt Effect on Cards --- */
  const tiltCards = document.querySelectorAll('.timeline-card, .ticket-card, .trainer-card, .audience-card');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const xc = rect.width / 2;
      const yc = rect.height / 2;
      
      const angleX = (yc - y) / 20;
      const angleY = (x - xc) / 20;
      
      card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateY(-8px)`;
    });
    
    card.style.transition = 'transform 0.1s ease, box-shadow 0.3s ease, border-color 0.3s ease';
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });

  /* --- Animated stats/counters (Count Up) --- */
  const counters = document.querySelectorAll('.count-up');
  
  const countUpObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = +counter.getAttribute('data-target');
        const prefix = counter.getAttribute('data-prefix') || '';
        const suffix = counter.getAttribute('data-suffix') || '';
        let current = 0;
        const increment = Math.max(1, Math.floor(target / 40));
        const duration = 1200;
        const stepTime = duration / (target / increment);
        
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            counter.textContent = prefix + target + suffix;
            clearInterval(timer);
          } else {
            counter.textContent = prefix + current + suffix;
          }
        }, stepTime);
        
        countUpObserver.unobserve(counter);
      }
    });
  }, { threshold: 0.5 });
  
  counters.forEach(c => countUpObserver.observe(c));


  // =========================================================================
  // NEW REDESIGN SIMULATORS: IoT Lab & Live Portal Countdowns
  // =========================================================================

  /* --- 1. IoT Hardware Simulator logic --- */
  const oledTemp = document.getElementById('oled-temp');
  const oledHumid = document.getElementById('oled-humid');
  const oledCanvas = document.getElementById('oled-chart');
  const serialLines = document.getElementById('serial-lines');

  // Toggle buttons
  const ledSwitch = document.getElementById('gpio-led-switch');
  const acSwitch = document.getElementById('gpio-ac-switch');
  const alarmSwitch = document.getElementById('gpio-alarm-switch');

  // LEDs
  const ledIndicator = document.getElementById('gpio-led-indicator');
  const acIndicator = document.getElementById('gpio-ac-indicator');
  const alarmIndicator = document.getElementById('gpio-alarm-indicator');

  const printSerialLog = (type, message) => {
    if (!serialLines) return;
    const line = document.createElement('div');
    line.className = `c-line ${type}`;
    const timestamp = new Date().toLocaleTimeString().split(' ')[0];
    line.innerHTML = `[${timestamp}] <span class="tag">[${type.toUpperCase()}]</span> ${message}`;
    
    // Remove blink line temporarily and append new line
    const blinkLine = serialLines.querySelector('.blink');
    if (blinkLine) serialLines.removeChild(blinkLine);
    
    serialLines.appendChild(line);
    
    // Maintain maximum lines scroll
    while (serialLines.children.length > 6) {
      serialLines.removeChild(serialLines.firstElementChild);
    }
    
    // Re-add blink line
    if (blinkLine) serialLines.appendChild(blinkLine);
    serialLines.scrollTop = serialLines.scrollHeight;
  };

  // Bind Switches
  if (ledSwitch) {
    ledSwitch.addEventListener('change', () => {
      const active = ledSwitch.checked;
      ledIndicator.classList.toggle('active', active);
      printSerialLog(active ? 'success' : 'sys', active ? 'GPIO_02 (Built-in LED) set to HIGH' : 'GPIO_02 set to LOW');
    });
  }

  if (acSwitch) {
    acSwitch.addEventListener('change', () => {
      const active = acSwitch.checked;
      acIndicator.classList.toggle('active', active);
      printSerialLog('mqtt', active ? 'MQTT Published: "office/ac" -> 1' : 'MQTT Published: "office/ac" -> 0');
    });
  }

  if (alarmSwitch) {
    alarmSwitch.addEventListener('change', () => {
      const active = alarmSwitch.checked;
      alarmIndicator.classList.toggle('active', active);
      printSerialLog(active ? 'danger' : 'sys', active ? 'INTRUDER SIREN ACTIVATED!' : 'Siren manually cleared');
    });
  }

  // Draw simulated dynamic graph in OLED Display
  if (oledCanvas) {
    const octx = oledCanvas.getContext('2d');
    let graphPoints = [30, 35, 42, 38, 45, 52, 48, 50, 42, 38, 46, 52];
    
    const drawOledGraph = () => {
      octx.clearRect(0, 0, oledCanvas.width, oledCanvas.height);
      octx.strokeStyle = '#00f0ff';
      octx.lineWidth = 1.5;
      octx.beginPath();
      
      const widthStep = oledCanvas.width / (graphPoints.length - 1);
      
      for (let i = 0; i < graphPoints.length; i++) {
        // Map points to fit height constraints
        const y = oledCanvas.height - (graphPoints[i] / 80) * oledCanvas.height;
        const x = i * widthStep;
        if (i === 0) octx.moveTo(x, y);
        else octx.lineTo(x, y);
      }
      octx.stroke();
      
      // Draw gridlines
      octx.strokeStyle = 'rgba(0, 240, 255, 0.1)';
      octx.lineWidth = 0.5;
      octx.beginPath();
      for (let y = 10; y < oledCanvas.height; y += 15) {
        octx.moveTo(0, y);
        octx.lineTo(oledCanvas.width, y);
      }
      octx.stroke();
    };
    
    // Loop updates
    setInterval(() => {
      const newTemp = (24 + Math.random() * 2).toFixed(1);
      const newHumid = (60 + Math.random() * 5).toFixed(1);
      
      if (oledTemp) oledTemp.textContent = `${newTemp}°C`;
      if (oledHumid) oledHumid.textContent = `${newHumid}%`;
      
      // Shift graph
      graphPoints.shift();
      graphPoints.push(Math.floor(40 + Math.random() * 25));
      drawOledGraph();
      
      if (Math.random() > 0.6) {
        printSerialLog('info', `Sensor node payload published (temp=${newTemp})`);
      }
    }, 2500);
    
    drawOledGraph();
  }


  /* --- 2. Live Class Portal Timer & Unlock logic --- */
  // Date target: June 20, 2026 10:00 AM IST
  const TARGET_UNLOCK_TIME = new Date('2026-06-20T10:00:00').getTime();
  
  const lockedOverlay = document.getElementById('portal-locked-overlay');
  const unlockedPlayer = document.getElementById('portal-unlocked-player');
  const batchStatusLbl = document.getElementById('batch-status-text');
  
  // Clock DOMs
  const dayVal = document.getElementById('countdown-days');
  const hrVal = document.getElementById('countdown-hours');
  const minVal = document.getElementById('countdown-minutes');
  const secVal = document.getElementById('countdown-seconds');

  // Chat panel components
  const chatMessages = document.getElementById('chat-messages-container');
  const chatInput = document.getElementById('chat-input-box');
  const chatSend = document.getElementById('chat-send-btn');

  const appendChatMessage = (sender, message, isSystem = false) => {
    if (!chatMessages) return;
    const msgDiv = document.createElement('div');
    if (isSystem) {
      msgDiv.className = 'chat-msg system';
      msgDiv.textContent = message;
    } else {
      msgDiv.className = 'chat-msg';
      msgDiv.innerHTML = `<span>${sender}:</span> ${message}`;
    }
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  };

  const startLiveChatSimulator = () => {
    const studentNames = ["Rahul S.", "Aravind K.", "Sneha R.", "Karan Patel", "Priyanka Verma", "Yash G."];
    const mockMessages = [
      "Wow, ESP32 has dual cores? That's powerful.",
      "Is the certificate shareable on LinkedIn?",
      "I got the Early Bird offer! Stoked to learn.",
      "Mr. Yogesh Mene, what MQTT brokers do you recommend?",
      "Are we going to implement local web servers too?",
      "How is MQTT better than HTTP for sensor data?",
      "Yes, the audio and screen feed are perfectly clear.",
      "Will we receive copies of the session wiring diagrams?"
    ];
    
    setInterval(() => {
      const randomName = studentNames[Math.floor(Math.random() * studentNames.length)];
      const randomMsg = mockMessages[Math.floor(Math.random() * mockMessages.length)];
      appendChatMessage(randomName, randomMsg);
    }, 6000);
  };

  const unlockClassPortal = () => {
    if (lockedOverlay) lockedOverlay.style.display = 'none';
    if (unlockedPlayer) unlockedPlayer.style.display = 'block';
    if (batchStatusLbl) batchStatusLbl.textContent = 'Live Session Active';
    
    // Enable Chat input
    if (chatInput) chatInput.removeAttribute('disabled');
    if (chatSend) chatSend.removeAttribute('disabled');
    
    if (chatMessages) {
      chatMessages.innerHTML = '';
      appendChatMessage(null, 'Live class feed active. Welcome to Batch #01!', true);
    }
    
    // Start dynamic chat simulation
    startLiveChatSimulator();
  };

  const updateCountdownClock = () => {
    const now = new Date().getTime();
    const distance = TARGET_UNLOCK_TIME - now;
    
    if (distance <= 0) {
      clearInterval(clockInterval);
      unlockClassPortal();
      return;
    }
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    if (dayVal) dayVal.textContent = days.toString().padStart(2, '0');
    if (hrVal) hrVal.textContent = hours.toString().padStart(2, '0');
    if (minVal) minVal.textContent = minutes.toString().padStart(2, '0');
    if (secVal) secVal.textContent = seconds.toString().padStart(2, '0');
  };

  // Bind Send Button in Chat
  if (chatSend && chatInput) {
    const sendMessage = () => {
      const msg = chatInput.value.trim();
      if (!msg) return;
      appendChatMessage('You', msg);
      chatInput.value = '';
      
      // Simulate instructor answer
      setTimeout(() => {
        appendChatMessage('Yogesh Mene (Trainer)', 'Excellent question! I will cover this in detail in 5 minutes.', false);
      }, 1500);
    };
    
    chatSend.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') sendMessage();
    });
  }

  // Set Interval Timer loop
  const clockInterval = setInterval(updateCountdownClock, 1000);
  updateCountdownClock(); // initial evaluation
});
