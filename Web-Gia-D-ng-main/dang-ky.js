document.addEventListener("DOMContentLoaded", function () {
  // ==================== ĐĂNG KÝ ====================
  const signupForm = document.querySelector("#dang-ky.html form");
  if (window.location.pathname.includes("dang-ky.html")) {
    const form = document.querySelector("form");
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        const inputs = form.querySelectorAll("input");
        const fullName = inputs[0].value.trim();
        const email = inputs[1].value.trim();
        const password = inputs[2].value;
        const confirmPassword = inputs[3].value;

        if (!fullName || !email || !password || !confirmPassword) {
          alert("Vui lòng điền đầy đủ thông tin!");
          return;
        }

        if (password.length < 6) {
          alert("Mật khẩu phải có ít nhất 6 ký tự!");
          return;
        }

        if (password !== confirmPassword) {
          alert("Mật khẩu xác nhận không khớp!");
          return;
        }

        let users = JSON.parse(localStorage.getItem("users")) || [];
        if (users.some((user) => user.email === email)) {
          alert("Email này đã được đăng ký!");
          return;
        }

        users.push({ fullName, email, password });
        localStorage.setItem("users", JSON.stringify(users));
        alert("Đăng ký thành công! Chuyển hướng đến trang đăng nhập.");
        window.location.href = "./dang-nhap.html";
      });
    }
  }

  // ==================== ĐĂNG NHẬP ====================
  if (window.location.pathname.includes("dang-nhap.html")) {
    const form = document.querySelector("form");
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        const inputs = form.querySelectorAll("input");
        const email = inputs[0].value.trim();
        const password = inputs[1].value;

        if (!email || !password) {
          alert("Vui lòng nhập email và mật khẩu!");
          return;
        }

        const users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find(
          (u) => u.email === email && u.password === password,
        );

        if (user) {
          localStorage.setItem("currentUser", JSON.stringify(user));
          alert("Đăng nhập thành công! Chào mừng " + user.fullName);
          window.location.href = "./index.html";
        } else {
          alert("Email hoặc mật khẩu không đúng!");
        }
      });
    }

    const forgotBtn = document.querySelector(".forgot");
    if (forgotBtn) {
      forgotBtn.addEventListener("click", function () {
        const emailInput = document.querySelector("input[type='email']");
        const email = emailInput.value.trim();
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
  }

  // ==================== MẠNG XÃ HỘI ====================
  const allSocialBtns = document.querySelectorAll(".mxh button");
  allSocialBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      alert("Tính năng đang phát triển!");
    });
  });
});
