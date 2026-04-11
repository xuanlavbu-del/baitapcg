// tạo nền để các quả bóng xuất hiện bằng canvas
let frame = document.getElementById('canvas');
let drawTool = frame.getContext('2d');

// khung full màn hình
frame.width = window.innerWidth;
frame.height = window.innerHeight;
frame.style.backgroundColor = 'skyblue';

let beginX = 40;
let beginY = 40;

let moveX = 5;
let moveY = 1;

// function draw() {
//     if (beginX > frame.width - 40 || beginX < 40 || beginY > frame.height - 40 || beginY < 40) {
//         moveX = - moveX;
//         moveY = - moveY;
//     }
//     if (beginX >= frame.width - 40 || beginY >= frame.height - 40) {
//         return;
//     }
//
//     beginX += moveX;
//     beginY += moveY;
//     requestAnimationFrame(draw);
//     // vẽ hình tròn
//     drawTool.clearRect(0, 0, frame.width, frame.height);
//     drawTool.beginPath();
//     drawTool.arc(beginX, beginY, 40, 0, 2 * Math.PI);
//     drawTool.stroke();
// }
//
// draw();
let FULL_CIRCLE = 2 * Math.PI;
// ================= RANDOM =================
function random(min, max) {
    return Math.random() * (max - min) + min;
}

function randomSpeed(min, max) {
    let speed = random(min, max);
    return Math.random() < 0.5 ? speed : -speed;
}

class Ball {
    constructor(x, y, radius, moveX, moveY, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.moveX = moveX;
        this.moveY = moveY;
        this.color = color;
    }

    move() {
        this.attackWall();
        this.x += this.moveX;
        this.y += this.moveY;
        this.draw();
    }

    attackWall() {
        let attackWallX = this.x + this.radius > frame.width || this.x - this.radius < 0;
        let attackWallY = this.y + this.radius > frame.height || this.y - this.radius < 0;
        if (attackWallX) {
            this.moveX = -this.moveX;
        }

        if (attackWallY) {
            this.moveY = -this.moveY;
        }

    }

    draw() {
        drawTool.beginPath();
        drawTool.arc(this.x, this.y, this.radius, 0, FULL_CIRCLE);
        drawTool.fill();

        drawTool.fillStyle = this.color;

        drawTool.strokeStyle = 'black';
        drawTool.closePath();
    }
}


function randomColor() {
    return `hsl(${Math.random() * 360}, 100%, 50%)`;
}


// ================= TẠO BÓNG RANDOM =================
function createRandomBall(minSpeed, maxSpeed) {
    let radius = random(20, 40);

    let x = random(radius, frame.width - radius);
    let y = random(radius, frame.height - radius);

    let moveX = randomSpeed(minSpeed, maxSpeed);
    let moveY = randomSpeed(minSpeed, maxSpeed);
    let color = randomColor(); // 🎨 mỗi bóng 1 màu
    return new Ball(x, y, radius, moveX, moveY, color);
}

let balls = [];

// tạo 20 bóng
for (let i = 0; i < 20;i++) {
    balls.push(createRandomBall(2, 6));
}

// ================= LOOP =================

function start() {
    drawTool.clearRect(0, 0, frame.width, frame.height);

    // di chuyển
    balls.forEach(ball => ball.move());

    // kiểm tra va chạm từng cặp
    for (let i = 0; i < balls.length; i++) {
        for (let j = i + 1; j < balls.length; j++) {
            handleCollision(balls[i], balls[j]);
        }
    }

    requestAnimationFrame(start);
}
 // hàm va chạm
function handleCollision(ball1, ball2) {
    let dx = ball2.x - ball1.x;
    let dy = ball2.y - ball1.y;
    let distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < ball1.radius + ball2.radius) {

        // đổi vận tốc (simple physics)
        let tempX = ball1.moveX;
        let tempY = ball1.moveY;

        ball1.moveX = ball2.moveX;
        ball1.moveY = ball2.moveY;

        ball2.moveX = tempX;
        ball2.moveY = tempY;

        // đẩy bóng ra khỏi nhau (tránh dính)
        let overlap = ball1.radius + ball2.radius - distance;
        let angle = Math.atan2(dy, dx);

        ball1.x -= Math.cos(angle) * overlap / 2;
        ball1.y -= Math.sin(angle) * overlap / 2;

        ball2.x += Math.cos(angle) * overlap / 2;
        ball2.y += Math.sin(angle) * overlap / 2;
    }
}
start();
