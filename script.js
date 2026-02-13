// ---------- Smooth scroll (with sticky header offset) ----------
const OFFSET = 120; // must match your sticky nav spacing

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const id = link.getAttribute("href");
    const target = document.querySelector(id);
    if (!target) return;

    e.preventDefault();

    const top = target.getBoundingClientRect().top + window.scrollY - OFFSET;
    window.scrollTo({ top, behavior: "smooth" });
  });
});

// ---------- Active nav highlighting (bulletproof) ----------
// IMPORTANT: only links that start with # should be in the active system
const navLinks = Array.from(document.querySelectorAll('.pill-link[href^="#"]'));
const sections = Array.from(document.querySelectorAll("section[id]"));

function setActive(id) {
  navLinks.forEach((a) => {
    a.classList.toggle("active", a.getAttribute("href") === `#${id}`);
  });
}

function getActiveSectionId() {
  // This is our "scan line": 35% down the viewport is a sweet spot
  const scanY = window.innerHeight * 0.35;

  // If you're at the very bottom, force "connect"
  const atBottom =
    window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
  if (atBottom) return "connect";

  // Find section whose rect contains the scan line
  for (const sec of sections) {
    const r = sec.getBoundingClientRect();
    if (r.top <= scanY && r.bottom >= scanY) return sec.id;
  }

  // Fallback: choose the section whose top is closest above the scan line
  let bestId = sections[0]?.id || "home";
  let bestDist = Infinity;

  for (const sec of sections) {
    const r = sec.getBoundingClientRect();
    const dist = Math.abs(r.top - scanY);
    if (r.top <= scanY && dist < bestDist) {
      bestDist = dist;
      bestId = sec.id;
    }
  }

  return bestId;
}

// Throttle scroll work so it’s smooth
let ticking = false;

function onScroll() {
  if (ticking) return;
  ticking = true;

  requestAnimationFrame(() => {
    setActive(getActiveSectionId());
    ticking = false;
  });
}

window.addEventListener("scroll", onScroll);
window.addEventListener("resize", onScroll);

// initial
setActive(getActiveSectionId());


