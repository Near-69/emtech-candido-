// Get the canvas and context
const canvas = document.getElementById("batsCanvas");
const ctx = canvas.getContext("2d");

// Set canvas size to full window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const bats = [];
const batEmoji = "😝"; // Bat emoji
const batCount = 30;

class Bat {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.speedX = (Math.random() - 0.5) * 5;
        this.speedY = (Math.random() - 0.5) * 5;
        this.size = Math.random() * 30 + 20;
    }

    draw() {
        ctx.font = `${this.size}px Arial`;
        ctx.fillText(batEmoji, this.x, this.y);
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
        if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
    }
}

function initBats() {
    for (let i = 0; i < batCount; i++) {
        bats.push(new Bat());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bats.forEach(bat => {
        bat.update();
        bat.draw();
    });
    requestAnimationFrame(animate);
}

// Resize canvas when window is resized
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Initialize bats and start animation
initBats();
animate();

// Flashlight cursor effect
const cursorLight = document.createElement('div');
cursorLight.style.position = 'absolute';
cursorLight.style.borderRadius = '50%';
cursorLight.style.pointerEvents = 'none';
cursorLight.style.transition = 'width 0.2s ease, height 0.2s ease';
cursorLight.style.mixBlendMode = 'difference';
cursorLight.style.opacity = '0.5';
document.body.appendChild(cursorLight);

document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;

    cursorLight.style.left = `${x - 50}px`;  // Adjust for center of the circle
    cursorLight.style.top = `${y - 50}px`;

    const size = 100;
    cursorLight.style.width = `${size}px`;
    cursorLight.style.height = `${size}px`;

    const red = Math.round((x / window.innerWidth) * 255);
    const green = Math.round((y / window.innerHeight) * 255);
    const blue = Math.round((Math.abs(x - y) / window.innerWidth) * 255);

    cursorLight.style.background = `radial-gradient(circle, rgba(${red}, ${green}, ${blue}, 0.8) 0%, rgba(${red}, ${green}, ${blue}, 0) 70%)`;
});
