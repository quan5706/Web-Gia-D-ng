let cartCount = 0;
const cartIcon = document.querySelector('.cart-count');

document.querySelectorAll('.btn-add').forEach(btn => {
  btn.addEventListener('click', () => {
    cartCount++;
    cartIcon.textContent = cartCount;

    // Hiệu ứng nút
    const originalText = btn.textContent;
    const originalBg = btn.style.background;

    btn.textContent = "Đã thêm ✓";
    btn.style.background = "#10b981";

    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = originalBg || "";
    }, 1400);
  });
});