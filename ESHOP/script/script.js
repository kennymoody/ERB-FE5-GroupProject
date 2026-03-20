document.addEventListener("DOMContentLoaded", function () {
  // load navbar and footer
  fetch("navbar.html")
    .then((res) => res.text())
    .then((data) => {
      document.getElementById("navbar-placeholder").innerHTML = data;

      // find current page and add active class
      setActiveLink();
    });

  fetch("footer.html")
    .then((res) => res.text())
    .then((data) => {
      document.getElementById("footer-placeholder").innerHTML = data;
    });
});

function setActiveLink() {
  // get current path
  let currentPath = window.location.pathname.split("/").pop();

  if (currentPath === "") currentPath = "index.html";

  // find all nav links
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

  navLinks.forEach((link) => {
    link.parentElement.classList.remove("active");
    if (link.getAttribute("href") === currentPath) {
      link.parentElement.classList.add("active");
    }
  });
}
