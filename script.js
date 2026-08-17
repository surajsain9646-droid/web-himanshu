const canvas = document.createElement("canvas");
document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");

let particles = [];
let mouse = {
  x: null,
  y: null
};

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);

window.addEventListener("mousemove", (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

class Particle {

  constructor() {

    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;

    this.size = Math.random() * 2 + 0.5;

    this.speedX = (Math.random() - 0.5) * 0.5;
    this.speedY = (Math.random() - 0.5) * 0.5;

  }

  update() {

    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > canvas.width) {
      this.speedX *= -1;
    }

    if (this.y < 0 || this.y > canvas.height) {
      this.speedY *= -1;
    }

    if (mouse.x !== null) {

      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;

      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 120) {

        this.x -= dx * 0.002;
        this.y -= dy * 0.002;

      }

    }

  }

  draw() {

    ctx.beginPath();

    ctx.arc(
      this.x,
      this.y,
      this.size,
      0,
      Math.PI * 2
    );

    ctx.fillStyle = "rgba(0,255,255,0.8)";

    ctx.fill();

  }

}

for (let i = 0; i < 120; i++) {

  particles.push(new Particle());

}

function connectParticles() {

  for (let a = 0; a < particles.length; a++) {

    for (let b = a + 1; b < particles.length; b++) {

      const dx =
        particles[a].x -
        particles[b].x;

      const dy =
        particles[a].y -
        particles[b].y;

      const distance =
        Math.sqrt(dx * dx + dy * dy);

      if (distance < 100) {

        ctx.beginPath();

        ctx.moveTo(
          particles[a].x,
          particles[a].y
        );

        ctx.lineTo(
          particles[b].x,
          particles[b].y
        );

        ctx.strokeStyle =
          "rgba(0,255,255,0.08)";

        ctx.stroke();

      }

    }

  }

}

function animate() {

  ctx.clearRect(
    0,
    0,
    canvas.width,
    canvas.height
  );

  particles.forEach((particle) => {

    particle.update();
    particle.draw();

  });

  connectParticles();

  requestAnimationFrame(animate);

}

animate();
const heroCard = document.querySelector(".hero-content");

if (heroCard) {

  document.addEventListener("touchmove", (event) => {

    const touch = event.touches[0];

    const x = touch.clientX;
    const y = touch.clientY;

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const rotateY = (x - centerX) / 35;
    const rotateX = -(y - centerY) / 35;

    heroCard.style.transform =
      `perspective(1200px)
       rotateX(${rotateX}deg)
       rotateY(${rotateY}deg)
       translateY(-5px)`;

  });

  document.addEventListener("touchend", () => {

    heroCard.style.transform =
      "perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0)";

  });

}
// =========================
// TYPING ANIMATION
// =========================

const typingElement =
  document.getElementById("typing-text");

const typingWords = [
  "Teacher",
  "Student",
  "Aspiring Web Developer",
  "Learner",
  "Creator"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typingEffect() {

  if (!typingElement) return;

  const currentWord =
    typingWords[wordIndex];

  if (!deleting) {

    typingElement.textContent =
      currentWord.substring(0, charIndex + 1);

    charIndex++;

    if (charIndex === currentWord.length) {

      deleting = true;

      setTimeout(typingEffect, 1400);

      return;
    }

  } else {

    typingElement.textContent =
      currentWord.substring(0, charIndex - 1);

    charIndex--;

    if (charIndex === 0) {

      deleting = false;

      wordIndex =
        (wordIndex + 1) %
        typingWords.length;

    }

  }

  setTimeout(
    typingEffect,
    deleting ? 50 : 100
  );
}

typingEffect();
// =========================
// SCROLL REVEAL
// =========================

const revealElements =
  document.querySelectorAll(".reveal");

const revealObserver =
  new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          entry.target.classList.add("show");

        }

      });

    },
    {
      threshold: 0.15
    }
  );

revealElements.forEach((element) => {

  revealObserver.observe(element);

});
