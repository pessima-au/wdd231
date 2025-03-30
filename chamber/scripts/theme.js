// Dark Mode Toggle (Add this to home.js)
const themeToggle = document.querySelector("#theme");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
  themeToggle.classList.toggle("active");
});
