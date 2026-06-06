/* SparkTech Lab IoT Course Main Application Script */
//test
// =========================================================================
// WEBSITE CONFIGURATION
// =========================================================================
// Update this count as you receive payments (0 to 5+).
// The website will automatically:
// 1. Show the ₹499 early bird discount if the count is less than 5 (e.g. 0, 1, 2, 3, 4).
// 2. Automatically switch the price to ₹799 for everyone once it reaches 5 or more.
// 3. Update the visual progress bar (e.g. "3 / 5 Seats Filled").
const CURRENT_REGISTRATION_COUNT =5;
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
    if (localStorage.getItem('sparktech-banner-dismissed') === 'true' || localStorage.getItem('spaektech-banner-dismissed') === 'true') {
      document.body.classList.add('no-banner');
    }

    bannerCloseBtn.addEventListener('click', () => {
      document.body.classList.add('no-banner');
      localStorage.setItem('sparktech-banner-dismissed', 'true');
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
  const revealElements = document.querySelectorAll('.timeline-node, .trainer-card, .audience-card, .step-card, .ticket-card, .section-header, .verify-card, .certificate-preview-card');
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
  const TARGET_UNLOCK_TIME = new Date('2026-06-20T10:00:00+05:30').getTime();
  
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

  /* --- 3. Certificate Local Database Initialization --- */
  const defaultCertificates = [
    { id: "SPK-IOT-2026-01/100001", name: "Rahul S.", project: "Smart Energy Meter node", site: "https://energy.sparktech.com" },
    { id: "SPK-IOT-2026-01/100002", name: "Aravind K.", project: "ESP32 Conic Web Controller", site: "https://control.sparktech.com" },
    { id: "SPK-IOT-2026-01/100003", name: "Sneha R.", project: "MQTT Telemetry Weather Node", site: "https://weather.sparktech.com" },
    { id: "SPK-IOT-2026-01/100004", name: "Karan Patel", project: "Smart Relays Alexa Home Control", site: "https://relays.sparktech.com" },
    { id: "SPK-IOT-2026-01/100005", name: "Priyanka Verma", project: "FreeRTOS Smart Security Alarm", site: "https://alarm.sparktech.com" }
  ];

  // Initialize and migrate DB if needed
  if (!localStorage.getItem('sparktech-certificates')) {
    const oldDB = localStorage.getItem('spaektech-certificates');
    if (oldDB) {
      localStorage.setItem('sparktech-certificates', oldDB);
    } else {
      localStorage.setItem('sparktech-certificates', JSON.stringify(defaultCertificates));
    }
  }

  // Load database helper
  const getCertificatesDB = () => {
    return JSON.parse(localStorage.getItem('sparktech-certificates')) || [];
  };

  /* --- 4. Certificate Verification Logic --- */
  const certInput = document.getElementById('certificate-id-input');
  const certVerifyBtn = document.getElementById('certificate-verify-btn');
  const certResultContainer = document.getElementById('verify-result-container');
  const certPreviewCard = document.getElementById('cert-preview-card');

  // Interactive 3D Tilt Effect for Certificate Preview (custom for horizontal orientation)
  if (certPreviewCard) {
    certPreviewCard.addEventListener('mousemove', (e) => {
      const rect = certPreviewCard.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const xc = rect.width / 2;
      const yc = rect.height / 2;
      
      const angleX = (yc - y) / 30; // slightly less tilt for larger card
      const angleY = (x - xc) / 30;
      
      certPreviewCard.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateY(-4px)`;
    });
    
    certPreviewCard.addEventListener('mouseleave', () => {
      certPreviewCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  }

  const handleVerifyCertificate = () => {
    if (!certInput || !certResultContainer) return;
    
    const certIdRaw = certInput.value.trim();
    if (!certIdRaw) {
      certResultContainer.style.display = 'block';
      certResultContainer.innerHTML = `
        <div class="result-card error">
          <div class="result-header">
            <span class="status-badge"><span class="status-led"></span>Error</span>
          </div>
          <p class="result-error-msg">Please enter a Certificate ID to verify.</p>
        </div>
      `;
      return;
    }

    // Format check: SPK-IOT-2026-01/ followed by numbers
    const formatRegex = /^SPK-IOT-2026-01\/(\d+)$/i;
    const match = certIdRaw.match(formatRegex);

    if (!match) {
      certResultContainer.style.display = 'block';
      certResultContainer.innerHTML = `
        <div class="result-card error">
          <div class="result-header">
            <span class="status-badge"><span class="status-led"></span>Invalid Format</span>
          </div>
          <p class="result-error-msg">The ID format entered is incorrect. Example format: <strong>SPK-IOT-2026-01/100001</strong> (case-insensitive).</p>
        </div>
      `;
      return;
    }

    // Fetch database
    const currentDB = getCertificatesDB();
    const uppercaseId = certIdRaw.toUpperCase();
    const matchedRecord = currentDB.find(item => item.id.toUpperCase() === uppercaseId);

    if (!matchedRecord) {
      certResultContainer.style.display = 'block';
      certResultContainer.innerHTML = `
        <div class="result-card error">
          <div class="result-header">
            <span class="status-badge"><span class="status-led"></span>Verification Failed</span>
          </div>
          <p class="result-error-msg">This Certificate ID is not registered in our student database. Please verify the ID or contact administration.</p>
        </div>
      `;
      return;
    }

    // Success state
    const hasProject = matchedRecord.project && matchedRecord.project.trim() !== "";
    const hasSite = matchedRecord.site && matchedRecord.site.trim() !== "";
    
    let detailsHtml = `
      <div class="result-row">
        <span class="result-lbl">Certificate ID:</span>
        <span class="result-val highlight">${matchedRecord.id}</span>
      </div>
      <div class="result-row">
        <span class="result-lbl">Student Name:</span>
        <span class="result-val verified-name">${matchedRecord.name}</span>
      </div>
      <div class="result-row">
        <span class="result-lbl">Course Completed:</span>
        <span class="result-val">30-Hour Industrial IoT Training by SparkTech Lab</span>
      </div>
    `;

    if (hasProject) {
      detailsHtml += `
        <div class="result-row">
          <span class="result-lbl">Project Contributed:</span>
          <span class="result-val">${matchedRecord.project}</span>
        </div>
      `;
    }

    if (hasSite) {
      detailsHtml += `
        <div class="result-row">
          <span class="result-lbl">Project Location:</span>
          <span class="result-val highlight">${matchedRecord.site}</span>
        </div>
      `;
    }

    detailsHtml += `
      <div class="result-row">
        <span class="result-lbl">Verification Status:</span>
        <span class="result-val" style="color: var(--success-green); font-weight: 700;">ACTIVE &amp; VALID</span>
      </div>
    `;

    certResultContainer.style.display = 'block';
    certResultContainer.innerHTML = `
      <div class="result-card success">
        <div class="result-header">
          <span class="status-badge"><span class="status-led"></span>Verified Credential</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#34c759" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </div>
        <div class="result-details">
          ${detailsHtml}
        </div>
      </div>
    `;
  };

  if (certVerifyBtn) {
    certVerifyBtn.addEventListener('click', handleVerifyCertificate);
  }
  
  if (certInput) {
    certInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleVerifyCertificate();
    });
  }

  // Verification Modal controls
  const verificationModal = document.getElementById('verification-modal');
  const verificationCloseBtn = document.getElementById('verification-close-btn');
  const navVerifyCert = document.getElementById('nav-verify-cert');
  const footerVerifyCert = document.getElementById('footer-verify-cert');
  const openVerificationModalBtn = document.getElementById('open-verification-modal-btn');

  const openVerificationModal = (e) => {
    if (e) e.preventDefault();
    if (!verificationModal) return;
    verificationModal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Lock background scroll
    
    // Clear input and previous results when modal opens
    if (certInput) {
      certInput.value = '';
      certInput.focus();
    }
    if (certResultContainer) {
      certResultContainer.style.display = 'none';
      certResultContainer.innerHTML = '';
    }
  };

  const closeVerificationModal = () => {
    if (!verificationModal) return;
    verificationModal.style.display = 'none';
    document.body.style.overflow = ''; // Restore scroll
  };

  if (navVerifyCert) navVerifyCert.addEventListener('click', openVerificationModal);
  if (footerVerifyCert) footerVerifyCert.addEventListener('click', openVerificationModal);
  if (openVerificationModalBtn) openVerificationModalBtn.addEventListener('click', openVerificationModal);
  if (verificationCloseBtn) verificationCloseBtn.addEventListener('click', closeVerificationModal);

  if (verificationModal) {
    verificationModal.addEventListener('click', (e) => {
      if (e.target === verificationModal) closeVerificationModal();
    });
  }

  /* --- 5. Admin Panel Logic --- */
  const brandLogo = document.getElementById('brand-logo');
  const adminModal = document.getElementById('admin-modal');
  
  const adminAuthView = document.getElementById('admin-auth-view');
  const adminPanelView = document.getElementById('admin-panel-view');
  
  const adminAuthCloseBtn = document.getElementById('admin-auth-close-btn');
  const adminPanelCloseBtn = document.getElementById('admin-panel-close-btn');
  
  const adminPasscodeField = document.getElementById('admin-passcode-input');
  const adminAuthBtn = document.getElementById('admin-auth-btn');
  const adminAuthError = document.getElementById('admin-auth-error');

  const adminDbCount = document.getElementById('admin-db-count');
  const adminDbSearch = document.getElementById('admin-db-search');
  const adminDbTableBody = document.getElementById('admin-db-table-body');
  
  const adminAddId = document.getElementById('admin-add-id');
  const adminAddName = document.getElementById('admin-add-name');
  const adminAddProject = document.getElementById('admin-add-project');
  const adminAddLink = document.getElementById('admin-add-link');
  const adminAddBtn = document.getElementById('admin-add-student-btn');

  const adminClearDbBtn = document.getElementById('admin-clear-db-btn');
  const adminExportDbBtn = document.getElementById('admin-export-db-btn');
  
  const adminExcelZone = document.getElementById('admin-excel-zone');
  const adminExcelFileInput = document.getElementById('admin-excel-file-input');
  const adminUploadStatus = document.getElementById('admin-upload-status');

  let logoClicks = 0;
  let logoClickTimeout;

  // Track clicks on logo to trigger admin panel
  if (brandLogo) {
    brandLogo.addEventListener('click', (e) => {
      e.preventDefault(); // prevent navigation
      logoClicks++;
      clearTimeout(logoClickTimeout);
      
      if (logoClicks >= 5) {
        logoClicks = 0;
        openAdminModal();
      } else {
        logoClickTimeout = setTimeout(() => {
          logoClicks = 0;
        }, 3000);
      }
    });
  }

  const openAdminModal = () => {
    if (!adminModal) return;
    adminModal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Lock background scroll
    
    // Reset view states
    adminAuthView.style.display = 'block';
    adminPanelView.style.display = 'none';
    adminAuthError.style.display = 'none';
    
    if (adminPasscodeField) {
      adminPasscodeField.value = '';
      adminPasscodeField.focus();
    }
  };

  const closeAdminModal = () => {
    if (!adminModal) return;
    adminModal.style.display = 'none';
    document.body.style.overflow = ''; // Restore scroll
  };

  if (adminAuthCloseBtn) adminAuthCloseBtn.addEventListener('click', closeAdminModal);
  if (adminPanelCloseBtn) adminPanelCloseBtn.addEventListener('click', closeAdminModal);

  // Close modal when clicking outside card
  if (adminModal) {
    adminModal.addEventListener('click', (e) => {
      if (e.target === adminModal) closeAdminModal();
    });
  }

  // Handle Passcode verification
  const handleAdminAuth = () => {
    if (!adminPasscodeField) return;
    const passcode = adminPasscodeField.value;
    
    // Passcode validation
    if (passcode === 'sparktechadmin26') {
      adminAuthView.style.display = 'none';
      adminPanelView.style.display = 'block';
      renderAdminTable();
    } else {
      adminAuthError.style.display = 'block';
      adminPasscodeField.focus();
    }
  };

  if (adminAuthBtn) adminAuthBtn.addEventListener('click', handleAdminAuth);
  if (adminPasscodeField) {
    adminPasscodeField.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleAdminAuth();
    });
  }

  // Render Table rows
  const renderAdminTable = () => {
    if (!adminDbTableBody) return;
    adminDbTableBody.innerHTML = '';
    
    const currentDB = getCertificatesDB();
    const searchQuery = adminDbSearch ? adminDbSearch.value.trim().toLowerCase() : '';
    
    let filteredDB = currentDB;
    if (searchQuery) {
      filteredDB = currentDB.filter(item => 
        item.name.toLowerCase().includes(searchQuery) || 
        item.id.toLowerCase().includes(searchQuery) ||
        (item.project && item.project.toLowerCase().includes(searchQuery))
      );
    }

    if (adminDbCount) {
      adminDbCount.textContent = filteredDB.length;
    }

    if (filteredDB.length === 0) {
      adminDbTableBody.innerHTML = `
        <tr>
          <td colspan="4" style="text-align: center; color: var(--text-dark); padding: 20px;">No student records found.</td>
        </tr>
      `;
      return;
    }

    filteredDB.forEach(item => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><code>${item.id}</code></td>
        <td>${item.name}</td>
        <td>${item.project || '<span style="color:var(--text-dark)">None</span>'}</td>
        <td>
          <button class="btn-delete" data-id="${item.id}" title="Delete Record">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
          </button>
        </td>
      `;
      adminDbTableBody.appendChild(tr);
    });

    // Bind delete buttons
    const deleteBtns = adminDbTableBody.querySelectorAll('.btn-delete');
    deleteBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idToDelete = btn.getAttribute('data-id');
        deleteStudent(idToDelete);
      });
    });
  };

  const deleteStudent = (id) => {
    let currentDB = getCertificatesDB();
    currentDB = currentDB.filter(item => item.id !== id);
    localStorage.setItem('sparktech-certificates', JSON.stringify(currentDB));
    renderAdminTable();
  };

  // Bind Search Filter
  if (adminDbSearch) {
    adminDbSearch.addEventListener('input', renderAdminTable);
  }

  // Handle Manual Student Add
  const handleAddStudent = () => {
    if (!adminAddId || !adminAddName) return;
    const certId = adminAddId.value.trim().toUpperCase();
    const name = adminAddName.value.trim();
    const project = adminAddProject ? adminAddProject.value.trim() : '';
    const site = adminAddLink ? adminAddLink.value.trim() : '';

    if (!certId || !name) {
      alert("Certificate ID and Student Name are required.");
      return;
    }

    // Format validation
    const formatRegex = /^SPK-IOT-2026-01\/(\d+)$/;
    if (!certId.match(formatRegex)) {
      alert("Certificate ID format must match: SPK-IOT-2026-01/100001");
      return;
    }

    let currentDB = getCertificatesDB();
    const existingIndex = currentDB.findIndex(item => item.id.toUpperCase() === certId);

    const record = { id: certId, name, project, site };

    if (existingIndex > -1) {
      if (!confirm("Certificate ID already exists. Overwrite student details?")) return;
      currentDB[existingIndex] = record;
    } else {
      currentDB.push(record);
    }

    localStorage.setItem('sparktech-certificates', JSON.stringify(currentDB));
    renderAdminTable();

    // Clear inputs
    adminAddId.value = '';
    adminAddName.value = '';
    if (adminAddProject) adminAddProject.value = '';
    if (adminAddLink) adminAddLink.value = '';
  };

  if (adminAddBtn) adminAddBtn.addEventListener('click', handleAddStudent);

  // Clear Database Handler
  if (adminClearDbBtn) {
    adminClearDbBtn.addEventListener('click', () => {
      if (confirm("WARNING: Are you sure you want to delete ALL certificate records? This cannot be undone.")) {
        localStorage.setItem('sparktech-certificates', JSON.stringify([]));
        renderAdminTable();
      }
    });
  }

  // Export JSON Database Handler
  if (adminExportDbBtn) {
    adminExportDbBtn.addEventListener('click', () => {
      const currentDB = getCertificatesDB();
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(currentDB, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", "sparktech-certificates.json");
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    });
  }

  // Excel File Upload Handlers
  const handleExcelUpload = (files) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    
    // Check file extension
    const extension = file.name.split('.').pop().toLowerCase();
    if (!['xlsx', 'xls', 'csv'].includes(extension)) {
      if (adminUploadStatus) {
        adminUploadStatus.textContent = "Unsupported file type. Please upload an Excel (.xlsx, .xls) or CSV (.csv) file.";
        adminUploadStatus.style.color = "var(--danger-red)";
      }
      return;
    }
    
    // Parse using SheetJS
    const reader = new FileReader();
    
    if (adminUploadStatus) {
      adminUploadStatus.textContent = "Reading sheet...";
      adminUploadStatus.style.color = "var(--accent-cyan)";
    }
    
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        
        // Convert sheet to json
        const rows = XLSX.utils.sheet_to_json(worksheet, { defval: "" });
        
        if (!rows || rows.length === 0) {
          throw new Error("No data rows found in the sheet.");
        }
        
        let currentDB = []; // Clear existing database to override it with the new Excel upload
        let importedCount = 0;
        let errorsCount = 0;
        
        rows.forEach(row => {
          let certId = "";
          let studentName = "";
          let projectName = "";
          let siteLink = "";
          
          // Header-insensitive normalization
          Object.keys(row).forEach(key => {
            const normalizedKey = key.trim().toLowerCase();
            
            if (normalizedKey.includes('certificate') || normalizedKey === 'id' || normalizedKey.includes('certificate id') || normalizedKey.includes('cert id')) {
              certId = String(row[key]).trim();
            } else if (normalizedKey.includes('site') || normalizedKey.includes('link') || normalizedKey.includes('url') || normalizedKey.includes('location') || normalizedKey.includes('deploy')) {
              siteLink = String(row[key]).trim();
            } else if (normalizedKey.includes('project')) {
              projectName = String(row[key]).trim();
            } else if (normalizedKey.includes('student') || normalizedKey === 'name' || normalizedKey.includes('student name')) {
              studentName = String(row[key]).trim();
            }
          });
          
          const formatRegex = /^SPK-IOT-2026-01\/(\d+)$/i;
          if (certId && certId.match(formatRegex) && studentName) {
            const uppercaseId = certId.toUpperCase();
            const existingIndex = currentDB.findIndex(item => item.id.toUpperCase() === uppercaseId);
            
            const record = {
              id: uppercaseId,
              name: studentName,
              project: projectName,
              site: siteLink
            };
            
            if (existingIndex > -1) {
              currentDB[existingIndex] = record;
            } else {
              currentDB.push(record);
            }
            importedCount++;
          } else {
            errorsCount++;
          }
        });
        
        localStorage.setItem('sparktech-certificates', JSON.stringify(currentDB));
        renderAdminTable();
        
        if (adminUploadStatus) {
          adminUploadStatus.innerHTML = `Successfully loaded <strong>${importedCount}</strong> records.`;
          if (errorsCount > 0) {
            adminUploadStatus.innerHTML += ` <span style="color:var(--danger-red)">(${errorsCount} empty/invalid rows skipped)</span>`;
          }
          adminUploadStatus.style.color = "var(--success-green)";
        }
      } catch (err) {
        console.error(err);
        if (adminUploadStatus) {
          adminUploadStatus.textContent = "Error parsing file: " + err.message;
          adminUploadStatus.style.color = "var(--danger-red)";
        }
      }
    };
    
    reader.readAsArrayBuffer(file);
  };

  // Uploader Drop/Click Events
  if (adminExcelZone && adminExcelFileInput) {
    adminExcelZone.addEventListener('click', () => {
      adminExcelFileInput.click();
    });

    adminExcelFileInput.addEventListener('change', (e) => {
      handleExcelUpload(e.target.files);
    });

    adminExcelZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      adminExcelZone.classList.add('dragover');
    });

    adminExcelZone.addEventListener('dragleave', () => {
      adminExcelZone.classList.remove('dragover');
    });

    adminExcelZone.addEventListener('drop', (e) => {
      e.preventDefault();
      adminExcelZone.classList.remove('dragover');
      handleExcelUpload(e.dataTransfer.files);
    });
  }

  // Download Excel Template inside Admin Panel
  const adminDownloadTemplateBtn = document.getElementById('admin-download-template-btn');

  if (adminDownloadTemplateBtn) {
    adminDownloadTemplateBtn.addEventListener('click', () => {
      // Define columns
      const headers = [["Certificate ID", "Student Name", "Project Name", "Project Location"]];
      
      // Sample data
      const sampleRows = [
        ["SPK-IOT-2026-01/100001", "Rahul S.", "Smart Energy Meter node", "https://energy.sparktech.com"],
        ["SPK-IOT-2026-01/100002", "Aravind K.", "ESP32 Conic Web Controller", "https://control.sparktech.com"]
      ];
      
      const sheetData = headers.concat(sampleRows);
      
      // Create worksheet
      const worksheet = XLSX.utils.aoa_to_sheet(sheetData);
      
      // Create workbook
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Template");
      
      // Save/Write file
      XLSX.writeFile(workbook, "sparktech-import-template.xlsx");
    });
  }

  // Set Interval Timer loop
  const clockInterval = setInterval(updateCountdownClock, 1000);
  updateCountdownClock(); // initial evaluation
});
