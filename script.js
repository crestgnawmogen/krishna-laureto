const typingElement = document.querySelector("#typing");
const themeToggle = document.querySelector("#theme-toggle");
const typingText = "Building practical and data-driven web solutions.";
const savedTheme = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function setTheme(theme) {
  const isDark = theme === "dark";

  document.body.classList.toggle("dark", isDark);
  themeToggle.setAttribute("aria-pressed", String(isDark));
  themeToggle.textContent = isDark ? "Use Light Mode" : "Use Dark Mode";
  localStorage.setItem("theme", theme);
}

function startTypingEffect() {
  if (!typingElement) {
    return;
  }

  if (reduceMotion) {
    typingElement.textContent = typingText;
    return;
  }

  let index = 0;

  function typeNextCharacter() {
    typingElement.textContent += typingText.charAt(index);
    index += 1;

    if (index < typingText.length) {
      window.setTimeout(typeNextCharacter, 55);
    }
  }

  typeNextCharacter();
}

themeToggle.addEventListener("click", () => {
  const nextTheme = document.body.classList.contains("dark") ? "light" : "dark";
  setTheme(nextTheme);
});

setTheme(savedTheme || (prefersDark ? "dark" : "light"));
startTypingEffect();
