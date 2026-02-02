const aboutText = `I began my journey with a BSc in Biochemistry and Microbiology, which gave me a strong analytical foundation and a natural curiosity for problem-solving.

Over time, I became more curious about the data behind digital experiences — what drives behaviour, performance, and decision-making.

Today, I work at the intersection of science, front-end thinking, and data, continuously growing as a data professional.`;

const aboutElement = document.getElementById("about-typewriter");
let index = 0;
let hasTyped = false;

function typeAboutText() {
  if (hasTyped) return;
  hasTyped = true;

  function type() {
    if (index < aboutText.length) {
      aboutElement.textContent += aboutText.charAt(index);
      index++;
      setTimeout(type, 25);
    } else {
      aboutElement.style.borderRight = "none";
    }
  }
  type();
}

const aboutObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        typeAboutText();
        aboutObserver.disconnect();
      }
    });
  },
  { threshold: 0.3 }
);

aboutObserver.observe(document.getElementById("about"));

// Reveal animations
document.addEventListener("scroll", () => {
  document.querySelectorAll(".reveal").forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 100) {
      el.classList.add("active");
    }
  });
});

// Theme toggle
document.getElementById("themeToggle").onclick = () =>
  document.body.classList.toggle("dark");
