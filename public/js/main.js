// ===============================
// GLOBAL MOBILE CHECK
// ===============================
const isMobile = window.innerWidth < 768;

// ===============================
// MOBILE NAV TOGGLE
// ===============================
const toggleBtn = document.querySelector(".custom-toggler");
const mobileMenu = document.querySelector(".mobile-menu");

if (toggleBtn && mobileMenu) {
  toggleBtn.addEventListener("click", () => {
    toggleBtn.classList.toggle("active");
    mobileMenu.classList.toggle("open");
  });
}

document.addEventListener("DOMContentLoaded", () => {

  // ===============================
  // GSAP SETUP
  // ===============================
  gsap.registerPlugin(ScrollTrigger);

  // ===============================
  // HERO IMAGE
  // ===============================
  const heroImg = document.querySelector(".hero-wrapper img");
  if (heroImg) {
    gsap.from(heroImg, {
      opacity: 0,
      y: 40,
      duration: 1.3,
      ease: "power3.out"
    });
  }

  // ===============================
  // ABOUT TEXT ANIMATION
  // ===============================
  if (document.querySelector(".about-section")) {
    gsap.timeline({
      scrollTrigger: {
        trigger: ".about-section",
        start: "top 85%",
        toggleActions: "play reverse play reverse"
      }
    }).from(".about-animate", {
      opacity: 0,
      y: 30,
      duration: 0.7,
      stagger: 0.15,
      ease: "power2.out"
    });
  }

  // ===============================
  // ABOUT IMAGE (GSAP ONLY – FIXED)
  // ===============================
  const aboutImg = document.querySelector(".about-img");
  if (aboutImg) {
    gsap.from(aboutImg, {
      scrollTrigger: {
        trigger: ".about-section",
        start: "top 80%"
      },
      opacity: 0,
      y: 40,
      duration: 1,
      ease: "power3.out"
    });
  }

  // ===============================
  // ABOUT COUNTERS (FIXED)
  // ===============================
  let countersPlayed = false;

ScrollTrigger.create({
  trigger: ".about-section",
  start: "top 75%",
  once: true,
  onEnter: () => {
    if (countersPlayed) return;
    countersPlayed = true;

    document.querySelectorAll("[data-target]").forEach(counter => {
      const target = +counter.dataset.target;
      const symbol = counter.dataset.symbol || "";
      let count = 0;

      const speed = target > 50 ? 20 : 60;

      const updateCount = () => {
        count++;
        counter.textContent = count + symbol;

        if (count < target) {
          setTimeout(updateCount, speed);
        } else {
          counter.textContent = target + symbol;
        }
      };

      updateCount();
    });
  }
});

  // ===============================
  // HERO TECH BADGES
  // ===============================
  if (document.querySelector(".tech-badge")) {
    gsap.from(".tech-badge", {
      opacity: 0,
      y: 20,
      stagger: 0.15,
      duration: 1,
      delay: 0.3,
      ease: "power2.out"
    });
  }

  // ===============================
  // SERVICES – SCROLL
  // ===============================
  gsap.utils.toArray(".service-card").forEach(card => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: isMobile ? "top 95%" : "top 90%"
      },
      opacity: 0,
      y: isMobile ? 15 : 25,
      duration: 0.6,
      ease: "power2.out"
    });
  });

  // ===============================
  // SERVICE CARD HOVER (DESKTOP)
  // ===============================
  if (!isMobile) {
    document.querySelectorAll(".service-card").forEach(card => {
      card.addEventListener("mouseenter", () => {
        gsap.to(card, {
          y: -10,
          rotateX: 8,
          rotateY: -8,
          duration: 0.4,
          boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
          ease: "power3.out"
        });
      });

      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          y: 0,
          rotateX: 0,
          rotateY: 0,
          duration: 0.5,
          boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
          ease: "power3.out"
        });
      });
    });
  }

  // ===============================
  // PROJECT SECTION
  // ===============================
  gsap.from(".projects-title, .projects-sub", {
    scrollTrigger: {
      trigger: ".projects-section",
      start: "top 90%"
    },
    opacity: 0,
    y: 20,
    duration: 0.6,
    stagger: 0.15,
    ease: "power2.out"
  });

  gsap.utils.toArray(".project-img-box img").forEach(img => {
    gsap.from(img, {
      scrollTrigger: {
        trigger: img,
        start: "top 92%"
      },
      opacity: 0,
      scale: 0.95,
      duration: 0.6,
      ease: "power2.out"
    });
  });

  gsap.utils.toArray(".project-card").forEach(card => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 90%"
      },
      opacity: 0,
      y: isMobile ? 20 : 40,
      duration: 0.8,
      ease: "power3.out"
    });
  });


  // ===============================
// HOW I WORK – SCROLL FIXED
// ===============================
if (document.querySelector(".process-section")) {

  // Animate cards one by one when they enter view
  gsap.utils.toArray(".process-card").forEach((card, index) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        toggleActions: "play none none none"
      },
      opacity: 0,
      y: 30,
      duration: 0.6,
      ease: "power2.out"
    });
  });

  // Animate CTA slightly later
  const processCTA = document.querySelector(".process-cta");
  if (processCTA) {
    gsap.from(processCTA, {
      scrollTrigger: {
        trigger: processCTA,
        start: "top 90%",
        toggleActions: "play none none none"
      },
      opacity: 0,
      y: 20,
      duration: 0.5,
      ease: "power2.out"
    });
  }
}

// ===============================
// PRICING – GSAP
// ===============================
if (document.querySelector(".pricing-section")) {
  gsap.from(".pricing-section .container > *", {
    scrollTrigger: {
      trigger: ".pricing-section",
      start: "top 85%"
    },
    opacity: 0,
    y: 20,
    duration: 0.5,
    stagger: 0.1,
    ease: "power2.out"
  });
}

  // ===============================
  // CONTACT SECTION
  // ===============================
  gsap.from(".contact-animate", {
    scrollTrigger: {
      trigger: ".contact-section",
      start: "top 85%"
    },
    opacity: 0,
    y: 30,
    duration: 0.7,
    stagger: 0.15,
    ease: "power2.out"
  });

  // ===============================
  // FOOTER
  // ===============================
  gsap.from(".footer-animate", {
    scrollTrigger: {
      trigger: ".footer-animate",
      start: "top 90%"
    },
    opacity: 0,
    y: 40,
    duration: 0.9,
    ease: "power3.out"
  });

  gsap.from(".footer-items > div", {
    scrollTrigger: {
      trigger: ".footer-animate",
      start: "top 90%"
    },
    opacity: 0,
    y: 30,
    duration: 0.7,
    stagger: 0.2,
    ease: "power2.out"
  });

  document.querySelectorAll(".footer-social a").forEach(icon => {
    icon.addEventListener("mouseenter", () => {
      gsap.to(icon, { scale: 1.15, y: -4, duration: 0.25 });
    });
    icon.addEventListener("mouseleave", () => {
      gsap.to(icon, { scale: 1, y: 0, duration: 0.25 });
    });
  });

  // ===============================
  // REFRESH
  // ===============================
  window.addEventListener("load", () => {
    ScrollTrigger.refresh();
  });

});
