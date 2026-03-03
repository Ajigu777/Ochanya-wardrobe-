/* ═══════════════════════════════════════════
   OCHANYA WARDROBE — script.js
═══════════════════════════════════════════ */


/* ─────────────────────────────────────────
   1. NAVBAR — solid on scroll
───────────────────────────────────────── */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});


/* ─────────────────────────────────────────
   2. HAMBURGER / MOBILE MENU
───────────────────────────────────────── */
const hamburger   = document.getElementById('hamburger');
const mobileMenu  = document.getElementById('mobileMenu');
const mobileClose = document.getElementById('mobileClose');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});

mobileClose.addEventListener('click', closeMobile);

function closeMobile() {
  hamburger.classList.remove('open');
  mobileMenu.classList.remove('open');
  document.body.style.overflow = '';
}


/* ─────────────────────────────────────────
   3. HERO SLIDER
───────────────────────────────────────── */
(function initHeroSlider() {
  const slides   = document.querySelectorAll('.slide');
  const dotsWrap = document.getElementById('slideDots');
  let current    = 0;
  let heroTimer;

  // Build dot buttons
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
    dot.addEventListener('click', () => goSlide(i));
    dotsWrap.appendChild(dot);
  });

  function goSlide(n) {
    slides[current].classList.remove('active');
    dotsWrap.children[current].classList.remove('active');
    current = n;
    slides[current].classList.add('active');
    dotsWrap.children[current].classList.add('active');
  }

  function autoAdvance() {
    heroTimer = setInterval(() => {
      goSlide((current + 1) % slides.length);
    }, 5500);
  }

  // Pause on hover
  const heroSection = document.querySelector('.hero-section');
  heroSection.addEventListener('mouseenter', () => clearInterval(heroTimer));
  heroSection.addEventListener('mouseleave', autoAdvance);

  autoAdvance();
})();


/* ─────────────────────────────────────────
   4. SCROLL REVEAL
───────────────────────────────────────── */
(function initReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // fire once
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
})();


/* ─────────────────────────────────────────
   5. CATALOGUE — drag to scroll
───────────────────────────────────────── */
(function initDragScroll() {
  document.querySelectorAll('.scroll-strip').forEach(strip => {
    let isDown = false;
    let startX, scrollLeft;

    strip.addEventListener('mousedown', e => {
      isDown     = true;
      startX     = e.pageX - strip.offsetLeft;
      scrollLeft = strip.scrollLeft;
      strip.classList.add('grabbing');
    });

    strip.addEventListener('mouseleave', () => {
      isDown = false;
      strip.classList.remove('grabbing');
    });

    strip.addEventListener('mouseup', () => {
      isDown = false;
      strip.classList.remove('grabbing');
    });

    strip.addEventListener('mousemove', e => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - strip.offsetLeft;
      strip.scrollLeft = scrollLeft - (x - startX) * 1.3;
    });
  });
})();


/* ─────────────────────────────────────────
   6. CATALOGUE — WhatsApp order links
───────────────────────────────────────── */
document.querySelectorAll('.wa-order').forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    const style = btn.getAttribute('data-style');
    const msg   = `Hello Ochanya Wardrobe! 🌸\n\nI'm interested in ordering:\n✨ *${style}*\n\nPlease share more details, pricing, and available fabrics. Thank you!`;
    window.open(`https://wa.me/2349035669249?text=${encodeURIComponent(msg)}`, '_blank');
  });
});


/* ─────────────────────────────────────────
   7. ORDER FORM — compile & send to WhatsApp
───────────────────────────────────────── */
function sendWhatsApp() {
  const name     = document.getElementById('fname').value.trim();
  const occasion = document.getElementById('occasion').value;
  const style    = document.getElementById('pstyle').value.trim();
  const fabric   = document.getElementById('fabric').value.trim();
  const edate    = document.getElementById('edate').value;
  const phone    = document.getElementById('phone').value.trim();
  const idea     = document.getElementById('idea').value.trim();

  if (!name || !occasion || !idea) {
    alert('Please fill in your name, occasion, and idea before sending. 💕');
    return;
  }

  const msg =
`Hello Ochanya Wardrobe! 🌸

*✨ Custom Order Request ✨*

👤 *Name:* ${name}
🎉 *Occasion:* ${occasion}
✨ *Preferred Style:* ${style  || 'Not specified'}
🎨 *Fabric / Colour:* ${fabric || 'Not specified'}
📅 *Event Date:* ${edate  || 'Not specified'}
📱 *WhatsApp:* ${phone   || 'Not provided'}

💡 *My Idea:*
${idea}

Looking forward to working with you!`;

  window.open(`https://wa.me/2349035669249?text=${encodeURIComponent(msg)}`, '_blank');
}


/* ─────────────────────────────────────────
   8. TESTIMONIALS — cinematic slider
   
   Sequence per slide:
     1. Background image fades in under full dark overlay
     2. 900ms pause — image is fully visible, content hidden
     3. Overlay lightens → header + card fade up into view
     4. 600ms later → typing animation begins on the quote
     5. After typing finishes → 4.5s pause → advance to next
───────────────────────────────────────── */
(function initTestimonials() {

  const slides  = document.querySelectorAll('.testi-cinematic-slide');
  const dotsEl  = document.getElementById('testiDots');
  const prevBtn = document.getElementById('testiPrev');
  const nextBtn = document.getElementById('testiNext');

  const testimonials = [
  "I liked how patient she was during my fitting. She made adjustments until everything sat properly.",
  
  "My outfit came out neat and exactly my size. No unnecessary drama, just good work.",
  
  "She delivered on time and the finishing was clean. I’ve already recommended her to my friends.",
  
  "What I appreciate most is how she listens. The final dress looked like what we discussed.",
  
  "The material she suggested actually worked better than what I had in mind.",
  
  "I felt comfortable all through my event. The outfit wasn’t just fine, it was easy to wear.",
  
  "The stitching is tidy and the fitting process was organised. I’ll definitely order again."
];

  let current     = 0;
  let autoTimer   = null;
  let typingTimer = null;
  let isAnimating = false;

  /* Build dots */
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'testi-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Testimonial ${i + 1}`);
    dot.addEventListener('click', () => { if (!isAnimating) goTo(i); });
    dotsEl.appendChild(dot);
  });

  function setActiveDot(n) {
    document.querySelectorAll('.testi-dot').forEach((d, i) => {
      d.classList.toggle('active', i === n);
    });
  }

  /* Typing effect */
  function typeText(quoteEl, text, onDone) {
    quoteEl.textContent = '';
    quoteEl.classList.add('typing');
    let i = 0;
    clearInterval(typingTimer);
    typingTimer = setInterval(() => {
      if (i < text.length) {
        quoteEl.textContent += text[i++];
      } else {
        clearInterval(typingTimer);
        quoteEl.classList.remove('typing');
        if (onDone) setTimeout(onDone, 4500);
      }
    }, 26);
  }

  /* Run the full cinematic sequence for slide n */
  function showSlide(n) {
    isAnimating = true;

    const prevSlide = slides[current];
    const nextSlide = slides[n];
    const quoteEl   = document.getElementById(`tq-${n}`);

    // Hide prev, bring in next under full dark overlay
    prevSlide.classList.remove('active', 'phase-reveal', 'phase-dark');
    nextSlide.classList.add('active', 'phase-dark');

    current = n;
    setActiveDot(n);

    // Step 2 — after 2000ms lighten overlay and reveal content
    setTimeout(() => {
      nextSlide.classList.remove('phase-dark');
      nextSlide.classList.add('phase-reveal');

      // Step 3 — start typing 600ms into the reveal transition
      setTimeout(() => {
        typeText(quoteEl, testimonials[n], () => {
          isAnimating = false;
          scheduleAuto();
        });
      }, 600);
    }, 2000);
  }

  /* Navigate manually to slide n */
  function goTo(n) {
    clearTimeout(autoTimer);
    clearInterval(typingTimer);
    isAnimating = false;

    slides[current].classList.remove('active', 'phase-dark', 'phase-reveal');
    showSlide(n);
  }

  /* Schedule the next auto-advance */
  function scheduleAuto() {
    clearTimeout(autoTimer);
    autoTimer = setTimeout(() => {
      if (!isAnimating) goTo((current + 1) % slides.length);
    }, 1000);
  }

  /* Arrow buttons */
  prevBtn.addEventListener('click', () => {
    if (!isAnimating) goTo((current - 1 + slides.length) % slides.length);
  });

  nextBtn.addEventListener('click', () => {
    if (!isAnimating) goTo((current + 1) % slides.length);
  });

  /* Keyboard navigation */
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft')  prevBtn.click();
    if (e.key === 'ArrowRight') nextBtn.click();
  });

  /* Start when testimonials section enters the viewport */
  const section = document.getElementById('testimonials');
  let started   = false;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !started) {
        started = true;

        // Init first slide: bg visible → dark overlay → reveal → type
        slides[0].classList.add('active', 'phase-dark');

        setTimeout(() => {
          slides[0].classList.remove('phase-dark');
          slides[0].classList.add('phase-reveal');

          setTimeout(() => {
            const quoteEl = document.getElementById('tq-0');
            typeText(quoteEl, testimonials[0], () => {
              isAnimating = false;
              scheduleAuto();
            });
          }, 600);
        }, 2000);
      }
    });
  }, { threshold: 0.2 });

  observer.observe(section);

})();
