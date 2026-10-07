/**
 * DHANU H M - PERSONAL PORTFOLIO INTERACTION ENGINE
 * Pure Vanilla JavaScript (Clean, Modern, Robust)
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initTypingEffect();
  initNavigation();
  initScrollEffects();
  initSkillsFilter();
  initVideoPlayer();
  initModals();
  initContactForm();
  initClipboardButtons();
  initYear();
});

/* ===================================================================
   1. THEME TOGGLE & PERSISTENCE
   =================================================================== */
function initTheme() {
  const themeToggle = document.getElementById('themeToggle');
  if (!themeToggle) return;

  const savedTheme = localStorage.getItem('dhanu_theme') || 'dark';
  document.body.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  themeToggle.addEventListener('click', () => {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('dhanu_theme', newTheme);
    updateThemeIcon(newTheme);
    showToast(`Switched to ${newTheme === 'dark' ? 'Dark' : 'Light'} Mode`);
  });
}

function updateThemeIcon(theme) {
  const themeToggle = document.getElementById('themeToggle');
  if (!themeToggle) return;
  const icon = themeToggle.querySelector('i');
  if (!icon) return;

  if (theme === 'light') {
    icon.className = 'fa-solid fa-sun';
  } else {
    icon.className = 'fa-solid fa-moon';
  }
}

/* ===================================================================
   2. TYPING EFFECT FOR HERO SECTION
   =================================================================== */
function initTypingEffect() {
  const typedTarget = document.getElementById('typedText');
  if (!typedTarget) return;

  const phrases = [
    'Technology & Innovation',
    'Algorithmic Programming',
    'Data Science & Analytics',
    'Continuous Learning & Growth',
    'Building Intelligent Systems'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeLoop() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typedTarget.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typedTarget.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 110;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true;
      typingSpeed = 1800; // Pause at end of phrase
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 400; // Pause before typing new phrase
    }

    setTimeout(typeLoop, typingSpeed);
  }

  typeLoop();
}

/* ===================================================================
   3. NAVIGATION, SCROLL-SPY & MOBILE MENU
   =================================================================== */
function initNavigation() {
  const header = document.getElementById('header');
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Mobile menu toggle
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      menuToggle.classList.toggle('active');
      menuToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !menuToggle.contains(e.target) && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Scrollspy & Header styling
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    // Sticky header shadow
    if (header) {
      if (scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Scroll spy
    const scrollPos = scrollY + 120;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });
}

/* ===================================================================
   4. READING PROGRESS BAR & SCROLL-TO-TOP
   =================================================================== */
function initScrollEffects() {
  const progressBar = document.getElementById('progressBar');
  const scrollToTopBtn = document.getElementById('scrollToTopBtn');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    
    // Progress bar width
    if (progressBar && scrollHeight > 0) {
      const progress = (scrollTop / scrollHeight) * 100;
      progressBar.style.width = `${progress}%`;
    }

    // Back to top visibility
    if (scrollToTopBtn) {
      if (scrollTop > 350) {
        scrollToTopBtn.classList.add('show');
      } else {
        scrollToTopBtn.classList.remove('show');
      }
    }
  });

  if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

/* ===================================================================
   5. SKILLS CATEGORY FILTER
   =================================================================== */
function initSkillsFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Set active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const categories = card.getAttribute('data-category') || '';
        
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

/* ===================================================================
   6. CUSTOM VIDEO RESUME PLAYER CONTROLS
   =================================================================== */
function initVideoPlayer() {
  const video = document.getElementById('resumeVideo');
  if (!video) return;

  const overlay = document.getElementById('videoOverlay');
  const overlayPlayBtn = document.getElementById('overlayPlayBtn');
  const playPauseBtn = document.getElementById('playPauseBtn');
  const timeDisplay = document.getElementById('timeDisplay');
  const seekBar = document.getElementById('seekBar');
  const muteBtn = document.getElementById('muteBtn');
  const volumeBar = document.getElementById('volumeBar');
  const speedBtn = document.getElementById('speedBtn');
  const fullscreenBtn = document.getElementById('fullscreenBtn');
  const chapterItems = document.querySelectorAll('.chapter-item');

  const speeds = [1.0, 1.25, 1.5, 2.0];
  let speedIndex = 0;

  // Format seconds to mm:ss
  function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  // Play / Pause toggle
  function togglePlay() {
    if (video.paused || video.ended) {
      video.play().then(() => {
        if (overlay) overlay.classList.add('hidden');
        if (playPauseBtn) playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
      }).catch(err => {
        console.warn('Playback error:', err);
      });
    } else {
      video.pause();
      if (playPauseBtn) playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
    }
  }

  if (overlay) {
    overlay.addEventListener('click', togglePlay);
  }
  if (overlayPlayBtn) {
    overlayPlayBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      togglePlay();
    });
  }
  if (playPauseBtn) {
    playPauseBtn.addEventListener('click', togglePlay);
  }

  // Clicking directly on video screen toggles play
  video.addEventListener('click', togglePlay);

  // Update time and progress bar
  video.addEventListener('timeupdate', () => {
    if (video.duration) {
      const progress = (video.currentTime / video.duration) * 100;
      if (seekBar) seekBar.value = progress;
      if (timeDisplay) {
        timeDisplay.textContent = `${formatTime(video.currentTime)} / ${formatTime(video.duration)}`;
      }

      // Highlight active chapter
      chapterItems.forEach(item => {
        const itemTime = parseFloat(item.getAttribute('data-time') || '0');
        if (video.currentTime >= itemTime && video.currentTime < itemTime + 15) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
    }
  });

  // Loaded metadata
  video.addEventListener('loadedmetadata', () => {
    if (timeDisplay) {
      timeDisplay.textContent = `0:00 / ${formatTime(video.duration)}`;
    }
  });

  // Seek bar scrub
  if (seekBar) {
    seekBar.addEventListener('input', () => {
      if (video.duration) {
        video.currentTime = (seekBar.value / 100) * video.duration;
      }
    });
  }

  // Volume & Mute
  if (muteBtn) {
    muteBtn.addEventListener('click', () => {
      video.muted = !video.muted;
      updateMuteIcon();
    });
  }

  if (volumeBar) {
    volumeBar.addEventListener('input', () => {
      video.volume = volumeBar.value;
      video.muted = (volumeBar.value === '0');
      updateMuteIcon();
    });
  }

  function updateMuteIcon() {
    if (!muteBtn) return;
    if (video.muted || video.volume === 0) {
      muteBtn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
    } else if (video.volume < 0.5) {
      muteBtn.innerHTML = '<i class="fa-solid fa-volume-low"></i>';
    } else {
      muteBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
    }
  }

  // Playback Speed
  if (speedBtn) {
    speedBtn.addEventListener('click', () => {
      speedIndex = (speedIndex + 1) % speeds.length;
      video.playbackRate = speeds[speedIndex];
      speedBtn.textContent = `${speeds[speedIndex]}x`;
    });
  }

  // Fullscreen
  if (fullscreenBtn) {
    fullscreenBtn.addEventListener('click', () => {
      const container = video.closest('.video-player-container');
      if (!document.fullscreenElement) {
        if (container && container.requestFullscreen) {
          container.requestFullscreen();
        } else if (video.requestFullscreen) {
          video.requestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
    });
  }

  // Chapter buttons jump to time
  chapterItems.forEach(item => {
    item.addEventListener('click', () => {
      const targetTime = parseFloat(item.getAttribute('data-time') || '0');
      video.currentTime = targetTime;
      if (video.paused) {
        togglePlay();
      }
      showToast(`Jumped to chapter at ${formatTime(targetTime)}`);
    });
  });
}

/* ===================================================================
   7. MODALS (PROJECT & CASE STUDY POPUPS)
   =================================================================== */
function initModals() {
  const openButtons = document.querySelectorAll('.open-modal-btn');
  const closeButtons = document.querySelectorAll('.modal-close-btn, .modal-dismiss');
  const modals = document.querySelectorAll('.modal-backdrop');

  openButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.getAttribute('data-modal');
      const targetModal = document.getElementById(modalId);
      if (targetModal) {
        targetModal.classList.add('active');
        targetModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeModal(modal) {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal-backdrop');
      if (modal) closeModal(modal);
    });
  });

  modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(modal);
      }
    });
  });

  // ESC key listener
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      modals.forEach(modal => {
        if (modal.classList.contains('active')) {
          closeModal(modal);
        }
      });
    }
  });
}

/* ===================================================================
   8. INTERACTIVE CONTACT FORM WITH CLIENT VALIDATION
   =================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const nameInput = document.getElementById('senderName');
  const emailInput = document.getElementById('senderEmail');
  const subjectInput = document.getElementById('messageSubject');
  const messageInput = document.getElementById('messageBody');
  const submitBtn = document.getElementById('submitBtn');

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;

    // Reset error messages
    document.getElementById('nameError').textContent = '';
    document.getElementById('emailError').textContent = '';
    document.getElementById('subjectError').textContent = '';
    document.getElementById('messageError').textContent = '';

    // Validate Name
    if (!nameInput.value.trim()) {
      document.getElementById('nameError').textContent = 'Please enter your name.';
      isValid = false;
    }

    // Validate Email
    if (!emailInput.value.trim()) {
      document.getElementById('emailError').textContent = 'Please enter your email.';
      isValid = false;
    } else if (!validateEmail(emailInput.value.trim())) {
      document.getElementById('emailError').textContent = 'Please enter a valid email address.';
      isValid = false;
    }

    // Validate Subject
    if (!subjectInput.value.trim()) {
      document.getElementById('subjectError').textContent = 'Please provide a subject.';
      isValid = false;
    }

    // Validate Message
    if (!messageInput.value.trim()) {
      document.getElementById('messageError').textContent = 'Please enter your message.';
      isValid = false;
    } else if (messageInput.value.trim().length < 10) {
      document.getElementById('messageError').textContent = 'Message should be at least 10 characters long.';
      isValid = false;
    }

    if (!isValid) return;

    // Simulate sending with loading state
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> <span>Sending...</span>';
    submitBtn.disabled = true;

    setTimeout(() => {
      // Create mailto fallback link for real dispatch
      const mailtoUrl = `mailto:dhanuhm16@gmail.com?subject=${encodeURIComponent(subjectInput.value)}&body=${encodeURIComponent(
        `From: ${nameInput.value} (${emailInput.value})\n\n${messageInput.value}`
      )}`;

      submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> <span>Message Sent!</span>';
      showToast('Thank you! Opening your email app to finalize sending...');

      // Open mailto link
      window.location.href = mailtoUrl;

      setTimeout(() => {
        form.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }, 2500);
    }, 900);
  });
}

/* ===================================================================
   9. 1-CLICK CLIPBOARD COPY UTILITY
   =================================================================== */
function initClipboardButtons() {
  const copyButtons = document.querySelectorAll('.copy-btn');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied to clipboard: ${textToCopy}`);
          btn.innerHTML = '<i class="fa-solid fa-check"></i>';
          setTimeout(() => {
            btn.innerHTML = '<i class="fa-regular fa-copy"></i>';
          }, 2000);
        }).catch(() => {
          fallbackCopyText(textToCopy, btn);
        });
      } else {
        fallbackCopyText(textToCopy, btn);
      }
    });
  });
}

function fallbackCopyText(text, btn) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();
  try {
    document.execCommand('copy');
    showToast(`Copied to clipboard: ${text}`);
    if (btn) {
      btn.innerHTML = '<i class="fa-solid fa-check"></i>';
      setTimeout(() => {
        btn.innerHTML = '<i class="fa-regular fa-copy"></i>';
      }, 2000);
    }
  } catch (err) {
    showToast(`Failed to copy: ${text}`);
  }
  document.body.removeChild(textArea);
}

/* ===================================================================
   10. TOAST NOTIFICATION UTILITY
   =================================================================== */
let toastTimeout;
function showToast(message) {
  const toast = document.getElementById('toastNotification');
  const toastMessage = document.getElementById('toastMessage');
  if (!toast || !toastMessage) return;

  toastMessage.textContent = message;
  toast.classList.add('show');

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

/* ===================================================================
   11. DYNAMIC CURRENT YEAR
   =================================================================== */
function initYear() {
  const yearSpan = document.getElementById('currentYear');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
}
