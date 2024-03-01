const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
let balls = [];
let ballCount = 20;
let minDistance = 50;

function startAnimation() {
    balls = [];
    for (let i = 0; i < ballCount; i++) {
        balls.push(new Ball(
            Math.random() * canvas.width,
            Math.random() * canvas.height,
            Math.random() * 5 - 2.5,
            Math.random() * 5 - 2.5,
            Math.random() * 10 + 5,
            `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`
        ));
    }
    requestAnimationFrame(draw);
}

function resetAnimation() {
    balls = [];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function Ball(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < balls.length; i++) {
        ctx.beginPath();
        ctx.arc(balls[i].x, balls[i].y, balls[i].radius, 0, Math.PI * 2);
        ctx.fillStyle = balls[i].color;
        ctx.fill();

        balls[i].x += balls[i].dx;
        balls[i].y += balls[i].dy;

        // Odbicie od krawędzi
        if (balls[i].x + balls[i].radius > canvas.width || balls[i].x - balls[i].radius < 0) {
            balls[i].dx = -balls[i].dx;
        }
        if (balls[i].y + balls[i].radius > canvas.height || balls[i].y - balls[i].radius < 0) {
            balls[i].dy = -balls[i].dy;
        }

        // Rysowanie linii między kulami
        for (let j = i + 1; j < balls.length; j++) {
            let distance = Math.sqrt(Math.pow(balls[i].x - balls[j].x, 2) + Math.pow(balls[i].y - balls[j].y, 2));
            if (distance < minDistance) {
                ctx.beginPath();
                ctx.moveTo(balls[i].x, balls[i].y);
                ctx.lineTo(balls[j].x, balls[j].y);
                ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(draw);
}

startAnimation();
