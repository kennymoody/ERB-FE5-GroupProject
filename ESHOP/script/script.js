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

  cart_count.textContent = document.querySelectorAll(".cart_item").length;
  const values = document.querySelectorAll(".value");
  //  console.log(value);
  let totalvalue = 0;
  values.forEach((value) => {
    totalvalue += Number(value.textContent);
  });
  //  console.log(totalvalue);
  document.getElementById("total").textContent = totalvalue;
  // document.getElementById("navbar_cart_count").textContent = cart_count.textContent;

  updateTotal();
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

function removeItem(id) {
  // Get Item by Id
  const item = document.getElementById(id);
  // Get Above HR Line
  const hr = item.previousElementSibling;
  // Get Current Cart Count and Minus 1
  let cart_count = document.getElementById("cart_count");
  cart_count.textContent = cart_count.textContent - 1;
  // Get Current Cart Count in Navbar and Minus 1
  let navbar_cart_count = document.getElementById("navbar_cart_count");
  navbar_cart_count.textContent = cart_count.textContent;
  // Get This Item Value and Minus From Total
  let currentvalue = document
    .getElementById(id)
    .querySelector(".value").textContent;
  // console.log(currentvalue);
  let totalvalue = Number(document.getElementById("total").textContent);
  totalvalue = totalvalue - currentvalue;
  document.getElementById("total").textContent = totalvalue;
  item.remove();
  if (hr && hr.tagName === "HR") {
    hr.remove();
  }
  updateTotal();
}

function updateTotal() {
  const items = document.querySelectorAll(".cart_item");
  let totalAll = 0;
  const summaryList = document.querySelector(".list-group-flush");
  let summaryHtml = "";
  // console.log(items);
  items.forEach((item) => {
    const orivalue = item.querySelector(".orivalue").value;
    let item_quantity = item.querySelector(".item-quantity").value;
    let item_totalvalue = Number(orivalue) * Number(item_quantity);
    item.querySelector(".value").textContent = item_totalvalue;
    totalAll += item_totalvalue;
    const name = item.querySelector(".item-name").textContent;
    const qty = item.querySelector(".item-quantity").value;
    const price = item.querySelector(".value").textContent;
    summaryHtml += `
      <li class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-2">
        <span>${name}</span>
        <span>x${qty}</span>
        <span>$${price}</span>
      </li>`;
    summaryList.innerHTML = summaryHtml;
  });
  const totalElement = document.getElementById("total");
  if (totalElement) {
    totalElement.textContent = totalAll;
  }
}
