// =======================
// GIỎ HÀNG (LOCAL STORAGE)
// =======================

// Lấy giỏ hàng từ localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Lấy icon số lượng
const cartIcon = document.querySelector(".cart-count");

// =======================
// UPDATE UI
// =======================
function updateCartUI() {
  if (cartIcon) {
    cartIcon.textContent = cart.length;
  }
}

// =======================
// LƯU GIỎ HÀNG
// =======================
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// =======================
// THÊM SẢN PHẨM
// =======================
function addToCart(product) {
  cart.push(product);
  saveCart();
  updateCartUI();
}

// =======================
// LẤY DATA TỪ CARD
// =======================
function getProductData(btn) {
  const card = btn.closest(".product-card");

  return {
    name: card.querySelector(".product-title").textContent.trim(),
    price: card.querySelector(".product-price").childNodes[0].textContent.trim(),
    img: card.querySelector("img").src
  };
}

// =======================
// HIỆU ỨNG BUTTON
// =======================
function buttonEffect(btn) {
  const originalText = btn.textContent;
  const originalBg = btn.style.background;

  btn.textContent = "Đã thêm ✓";
  btn.style.background = "#10b981";

  setTimeout(() => {
    btn.textContent = originalText;
    btn.style.background = originalBg || "";
  }, 1200);
}

// =======================
// HIỆU ỨNG ICON GIỎ HÀNG
// =======================
function cartEffect() {
  if (!cartIcon) return;

  cartIcon.style.transform = "scale(1.3)";
  setTimeout(() => {
    cartIcon.style.transform = "scale(1)";
  }, 200);
}

// =======================
// EVENT CLICK
// =======================
function initAddToCart() {
  const buttons = document.querySelectorAll(".btn-add");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const product = getProductData(btn);

      addToCart(product);
      buttonEffect(btn);
      cartEffect();
    });
  });
}

// =======================
// INIT
// =======================
document.addEventListener("DOMContentLoaded", () => {
  updateCartUI();
  initAddToCart();
});