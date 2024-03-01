const canvas = document.getElementById('myCanvas');
// Pobieramy kontekst rysowania 2D
const ctx = canvas.getContext('2d');
// Inicjalizujemy pustą tablicę na przechowywanie kul
let balls = [];
// Określamy liczbę kulek
let ballCount = 20;
// Określamy minimalną odległość między kulkami, przy której zostanie narysowana linia
let minDistance = 50;

// Funkcja rozpoczynająca animację
function startAnimation() {
    // Czyścimy tablicę kulek
    balls = [];
    // Tworzymy nowe kule na podstawie liczby ballCount
    for (let i = 0; i < ballCount; i++) {
        // Dodajemy nową kulkę do tablicy balls
        balls.push(new Ball(
            Math.random() * canvas.width, // Losowa pozycja X
            Math.random() * canvas.height, // Losowa pozycja Y
            Math.random() * 5 - 2.5, // Losowa prędkość w osi X
            Math.random() * 5 - 2.5, // Losowa prędkość w osi Y
            Math.random() * 10 + 5, // Losowy promień
            `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})` // Losowy kolor w formacie RGB
        ));
    }
    // Rozpoczynamy animację
    requestAnimationFrame(draw);
}

// Funkcja resetująca animację
function resetAnimation() {
    // Czyścimy tablicę kulek
    balls = [];
    // Czyścimy obszar rysowania canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Konstruktor obiektu Ball (kulka)
function Ball(x, y, dx, dy, radius, color) {
    // Właściwości kulki: pozycja (x, y), prędkość (dx, dy), promień, kolor
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
}

// Funkcja rysująca animację
function draw() {
    // Czyścimy obszar rysowania canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Iterujemy po wszystkich kulkach
    for (let i = 0; i < balls.length; i++) {
        // Rysujemy kulki
        ctx.beginPath();
        ctx.arc(balls[i].x, balls[i].y, balls[i].radius, 0, Math.PI * 2);
        ctx.fillStyle = balls[i].color;
        ctx.fill();

        // Aktualizujemy pozycję każdej kuli (x, y)
        balls[i].x += balls[i].dx;
        balls[i].y += balls[i].dy;

        // Sprawdzamy kolizje z krawędziami canvasa i odbijamy kule
        if (balls[i].x + balls[i].radius > canvas.width || balls[i].x - balls[i].radius < 0) {
            balls[i].dx = -balls[i].dx;
        }
        if (balls[i].y + balls[i].radius > canvas.height || balls[i].y - balls[i].radius < 0) {
            balls[i].dy = -balls[i].dy;
        }

        // Sprawdzamy odległość między kulkami i rysujemy linie
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
    // Wywołujemy rekurencyjnie funkcję draw w celu ciągłego renderowania animacji
    requestAnimationFrame(draw);
}


startAnimation();

