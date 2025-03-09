

  // Wayfinding
  const navLinks = document.querySelectorAll(".nav-links a");
  navLinks.forEach((link) => {
    if (link.href === window.location.href) {
      link.classList.add("active");
    }
  });

document.addEventListener("DOMContentLoaded", function () {
  const menuButton = document.getElementById("menu");
  const navigation = document.querySelector(".navigation");

  menuButton.addEventListener("click", function (event) {
    event.preventDefault(); 
    navigation.classList.toggle("show");
    menuButton.classList.toggle("show"); 
  });
});
