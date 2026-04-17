const container = document.getElementById("container");
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");

registerBtn.addEventListener("click", () => {
  container.classList.add("active");
});

loginBtn.addEventListener("click", () => {
  container.classList.remove("active");
});

const canvas = document.getElementById("sakuraCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// ===== CLASS HOA =====
class Petal {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * -canvas.height;

    this.size = Math.random() * 6 + 6;

    this.speedY = Math.random() * 1.5 + 1.5; // tốc độ rơi
    this.speedX = Math.random() * 1 - 0.5; // bay ngang

    this.angle = Math.random() * Math.PI * 2;
    this.spin = Math.random() * 0.02;

    this.opacity = Math.random() * 0.5 + 0.5;
  }

  update() {
    this.y += this.speedY;
    this.x += this.speedX + Math.sin(this.angle) * 0.5;
    this.angle += this.spin;

    if (this.y > canvas.height) {
      this.reset();
      this.y = -10;
    }
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);

    ctx.globalAlpha = this.opacity;

    // vẽ cánh hoa đẹp hơn
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(
      this.size / 2,
      -this.size,
      this.size,
      this.size / 2,
      0,
      this.size,
    );
    ctx.bezierCurveTo(
      -this.size,
      this.size / 2,
      -this.size / 2,
      -this.size,
      0,
      0,
    );

    ctx.fillStyle = "#ff9bb3";
    ctx.fill();

    ctx.restore();
  }
}

// ===== TẠO HOA =====
const petals = [];
const PETAL_COUNT = 40; // số lượng (tối ưu mượt)

for (let i = 0; i < PETAL_COUNT; i++) {
  petals.push(new Petal());
}

// ===== ANIMATION =====
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  petals.forEach((p) => {
    p.update();
    p.draw();
  });

  requestAnimationFrame(animate);
}

animate();