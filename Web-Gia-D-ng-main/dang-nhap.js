document.addEventListener("DOMContentLoaded", function () {
  // ==================== ĐĂNG KÝ ====================
  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const fullName = document.getElementById("fullName").value.trim();
      const email = document.getElementById("signupEmail").value.trim();
      const password = document.getElementById("signupPassword").value;
      const confirmPassword = document.getElementById("confirmPassword").value;
      const errorDiv = document.getElementById("signupError");
      const successDiv = document.getElementById("signupSuccess");

      // Xóa thông báo cũ
      errorDiv.innerText = "";
      successDiv.innerText = "";

      // Validation
      if (!fullName || !email || !password || !confirmPassword) {
        errorDiv.innerText = "Vui lòng điền đầy đủ thông tin!";
        return;
      }

      if (password.length < 6) {
        errorDiv.innerText = "Mật khẩu phải có ít nhất 6 ký tự!";
        return;
      }

      if (password !== confirmPassword) {
        errorDiv.innerText = "Mật khẩu xác nhận không khớp!";
        return;
      }

      // Kiểm tra email đã tồn tại
      let users = JSON.parse(localStorage.getItem("users")) || [];
      if (users.some((user) => user.email === email)) {
        errorDiv.innerText = "Email này đã được đăng ký!";
        return;
      }

      // Lưu user mới
      users.push({ fullName, email, password });
      localStorage.setItem("users", JSON.stringify(users));

      // Hiển thị thành công và CHUYỂN HƯỚNG VỀ ĐĂNG NHẬP sau 1.5 giây
      successDiv.innerText =
        "Đăng ký thành công! Đang chuyển hướng về trang đăng nhập...";
      setTimeout(() => {
        window.location.href = "./dang-nhap.html";
      }, 1500);
    });
  }

  // ==================== ĐĂNG NHẬP ====================
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = document.getElementById("loginEmail").value.trim();
      const password = document.getElementById("loginPassword").value;
      const errorDiv = document.getElementById("loginError");

      errorDiv.innerText = "";

      if (!email || !password) {
        errorDiv.innerText = "Vui lòng nhập email và mật khẩu!";
        return;
      }

      const users = JSON.parse(localStorage.getItem("users")) || [];
      const user = users.find(
        (u) => u.email === email && u.password === password,
      );

      if (user) {
        localStorage.setItem(
          "currentUser",
          JSON.stringify({ fullName: user.fullName, email: user.email }),
        );
        alert("Đăng nhập thành công! Chào mừng " + user.fullName);
        window.location.href = "./index.html";
      } else {
        errorDiv.innerText = "Email hoặc mật khẩu không đúng!";
      }
    });
  }

  // ==================== QUÊN MẬT KHẨU ====================
  const forgotBtn = document.getElementById("forgotBtn");
  if (forgotBtn) {
    forgotBtn.addEventListener("click", function () {
      const email = document.getElementById("loginEmail").value.trim();
      if (!email) {
        alert("Vui lòng nhập email để lấy lại mật khẩu!");
        return;
      }

      const users = JSON.parse(localStorage.getItem("users")) || [];
      const user = users.find((u) => u.email === email);

      if (user) {
        alert(`Mật khẩu của bạn là: ${user.password}`);
      } else {
        alert("Email không tồn tại trong hệ thống!");
      }
    });
  }

  // ==================== MẠNG XÃ HỘI ====================
  const socialBtns = document.querySelectorAll(".mxh button");
  socialBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      alert("Tính năng đang phát triển!");
    });
  });
});
