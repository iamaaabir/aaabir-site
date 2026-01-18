// Smooth scroll with offset for sticky pill navbar
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const id = link.getAttribute("href");
    const target = document.querySelector(id);
    if (!target) return;

    e.preventDefault();
    const offset = 120;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  });
});

// Optional: highlight active nav item while scrolling
const sections = document.querySelectorAll("section[id]");
const links = document.querySelectorAll(".pill-link");

function setActiveLink() {
  let current = "home";
  sections.forEach((sec) => {
    const top = sec.offsetTop - 150;
    if (window.scrollY >= top) current = sec.id;
  });

  links.forEach((a) => {
    a.classList.toggle("active", a.getAttribute("href") === `#${current}`);
  });
}

window.addEventListener("scroll", setActiveLink);
setActiveLink();


