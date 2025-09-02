
// ------------------- CART SYSTEM -------------------
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}
function addToCart(product) {
  let cart = getCart();
  cart.push(product);
  saveCart(cart);
  alert(`🛒 Added to cart: ${product.title}`);
}

// ------------------- SEARCH BAR -------------------
const searchBtn = document.querySelector(".search-box button");
if (searchBtn) {
  searchBtn.addEventListener("click", () => {
    let query = document.querySelector(".search-box input").value.trim();
    let category = document.querySelector(".search-box select").value;
    alert(`🔍 Searching for "${query}" in category: ${category}`);
  });
}

// ------------------- FILTERS (Listing Page) -------------------
document.querySelectorAll(".checkbox-label input, .radio-label input").forEach(input => {
  input.addEventListener("change", () => {
    console.log(`Filter applied: ${input.name} = ${input.value}`);
  });
});

// Price filter
const priceBtn = document.querySelector(".btn-apply");
if (priceBtn) {
  priceBtn.addEventListener("click", () => {
    const inputs = document.querySelectorAll(".price-inputs input");
    const minPrice = inputs[0].value || 0;
    const maxPrice = inputs[1].value || "∞";
    alert(`💲 Price range applied: ${minPrice} - ${maxPrice} $`);
  });
}

// ------------------- SORTING & VIEW MODE -------------------
const sortSelect = document.getElementById("sort");
if (sortSelect) {
  sortSelect.addEventListener("change", () => {
    console.log(`Sorting by: ${sortSelect.value}`);
  });
}

const viewBtn = document.querySelector(".view-modes");
if (viewBtn) {
  viewBtn.addEventListener("click", () => {
    document.querySelector(".main-product").classList.toggle("list-view");
    viewBtn.textContent = viewBtn.textContent.includes("List") ? "Grid View" : "List View";
  });
}

// ------------------- ADD TO CART (Listing & Details) -------------------
document.querySelectorAll(".add-to-cart").forEach(btn => {
  btn.addEventListener("click", () => {
    const productCard = btn.closest(".product-card, .R1");
    if (!productCard) return;

    const title = productCard.querySelector("h3")?.textContent || "Unknown Product";
    const price = productCard.querySelector(".price")?.textContent || "N/A";
    const img = productCard.querySelector("img")?.src || "";

    addToCart({ title, price, img });
  });
});

// ------------------- PRODUCT GALLERY (Details Page) -------------------
const mainImage = document.querySelector(".R11 img");
const thumbnails = document.querySelectorAll(".thumbnail img");
if (mainImage && thumbnails.length) {
  thumbnails.forEach((thumb) => {
    thumb.addEventListener("click", () => {
      mainImage.src = thumb.src;
      thumbnails.forEach(t => t.parentElement.classList.remove("active"));
      thumb.parentElement.classList.add("active");
    });
  });
}

// ------------------- PRODUCT TABS (Details Page) -------------------
const tabButtons = document.querySelectorAll(".tab-button2");
const tabContents = document.querySelectorAll(".tab-content");
if (tabButtons.length) {
  tabButtons.forEach(button => {
    button.addEventListener("click", () => {
      let target = button.dataset.tab;
      tabButtons.forEach(btn => btn.classList.remove("active"));
      tabContents.forEach(content => content.classList.remove("active"));
      button.classList.add("active");
      document.getElementById(target).classList.add("active");
    });
  });
}

// ------------------- PAGINATION -------------------
document.querySelectorAll(".pages a").forEach(page => {
  page.addEventListener("click", (e) => {
    e.preventDefault();
    console.log(`Go to page: ${page.textContent}`);
  });
});

// ------------------- SHOW PER PAGE -------------------
const showPerPage = document.querySelector(".show-ten select");
if (showPerPage) {
  showPerPage.addEventListener("change", (e) => {
    console.log(`Showing ${e.target.value} items per page`);
  });
}

// ------------------- NEWSLETTER -------------------
const newsletterForm = document.querySelector(".newsletter form, .newsletter-form");
if (newsletterForm) {
  newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = newsletterForm.querySelector("input[type='email'], .form-input").value;
    if (email && email.includes("@")) {
      alert(`✅ Subscribed with: ${email}`);
    } else {
      alert("❌ Enter a valid email address.");
    }
  });
}

// ------------------- CART PAGE (cart.html) -------------------
const cartContainer = document.querySelector(".cart-items");
if (cartContainer) {
  function renderCart() {
    const cart = getCart();
    cartContainer.innerHTML = "";

    if (!cart.length) {
      cartContainer.innerHTML = "<p>Your cart is empty 🛒</p>";
      return;
    }

    cart.forEach((item, index) => {
      const div = document.createElement("div");
      div.classList.add("cart-item");
      div.innerHTML = `
        <img src="${item.img}" alt="">
        <h4>${item.title}</h4>
        <p>${item.price}</p>
        <button data-index="${index}" class="remove-btn">❌ Remove</button>
      `;
      cartContainer.appendChild(div);
    });

    document.querySelectorAll(".remove-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        let cart = getCart();
        cart.splice(btn.dataset.index, 1);
        saveCart(cart);
        renderCart();
      });
    });
  }

  renderCart();
}

window.addEventListener("hashchange", () => {
  let page = location.hash.replace("#", "") || "listing";
  showPage(page);
});

function showPage(pageId) {
  document.querySelectorAll("section").forEach(sec => sec.style.display = "none");
  document.getElementById(pageId).style.display = "block";
}


