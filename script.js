
/* =====================================
   ABROR ASSIDIQ - PORTFOLIO JAVASCRIPT
===================================== */

// MENU NAVIGASI MOBILE
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");

function closeMenu() {
  navMenu.classList.remove("is-open");
  menuToggle.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Buka menu navigasi");
}

menuToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("is-open");

  menuToggle.classList.toggle("is-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Tutup menu navigasi" : "Buka menu navigasi"
  );
});

// Tutup menu setelah salah satu tautan dipilih
navLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

// Tutup menu jika pengguna menekan Escape
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
  }
});

// TUTUP MENU JIKA LAYAR KEMBALI KE UKURAN DESKTOP
window.addEventListener("resize", () => {
  if (window.innerWidth > 760) {
    closeMenu();
  }
});

// EFEK TEKS BERGANTI PADA BAGIAN HERO
const typingText = document.getElementById("typingText");

const phrases = [
  "IT Support",
  "Web Development",
  "Computer Troubleshooting",
  "Data Management"
];

let phraseIndex = 0;
let characterIndex = 0;
let deleting = false;

function animateTyping() {
  // Hormati pengaturan pengurangan animasi pengguna
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    typingText.textContent = phrases[0];
    return;
  }

  const currentPhrase = phrases[phraseIndex];

  if (deleting) {
    characterIndex--;
  } else {
    characterIndex++;
  }

  typingText.textContent = currentPhrase.substring(0, characterIndex);

  let delay = deleting ? 35 : 70;

  if (!deleting && characterIndex === currentPhrase.length) {
    deleting = true;
    delay = 1500;
  } else if (deleting && characterIndex === 0) {
    deleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    delay = 350;
  }

  window.setTimeout(animateTyping, delay);
}

animateTyping();

// ANIMASI KARTU SAAT MASUK KE AREA LAYAR
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
} else {
  // Cadangan untuk browser lama
  revealElements.forEach((element) => {
    element.classList.add("visible");
  });
}

// NAVIGASI AKTIF BERDASARKAN BAGIAN HALAMAN
const sections = document.querySelectorAll("main section[id]");

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const currentId = entry.target.id;

        navLinks.forEach((link) => {
          const isActive = link.getAttribute("href") === `#${currentId}`;

          link.classList.toggle("active", isActive);
        });
      });
    },
    {
      rootMargin: "-30% 0px -55% 0px"
    }
  );

  sections.forEach((section) => {
    sectionObserver.observe(section);
  });
}

// TAHUN OTOMATIS DI FOOTER
document.getElementById("currentYear").textContent =
  new Date().getFullYear();
