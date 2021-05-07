var snake = [{ x: 150, y: 50 }, { x: 140, y: 50 }, { x: 130, y: 50 }, { x: 120, y: 50 }, { x: 110, y: 50 },];
document.addEventListener("keydown", changeDirection);
var direction = 0;
var food = generateFood();
var points = 0;
var lost = false;
var movable = false;

function changeDirection(event) {
    if (movable) {
        if (event.keyCode == 37 && direction != 0) { //left arrow
            direction = 2;
        }
        if (event.keyCode == 38 && direction != 1) { //up arrow
            direction = 3;
        }
        if (event.keyCode == 39 && direction != 2) { // right arrow
            direction = 0;
        }
        if (event.keyCode == 40 && direction != 3) { //down arrow
            direction = 1;
        }
        movable = false;
    }
}

$(document).ready(() => {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 500, 500);
    main();
});

function main() {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");

    setTimeout(() => {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 500, 500);
        handleFood();
        drawSnake();
        moveSnake();
        checkLost();
        generateFood();
        movable = true;
        if (!lost)
            main();
    }, 150)
}

function moveSnake() {
    for (i = snake.length - 1; i > 0; i--) {
        snake[i].x = snake[i - 1].x;
        snake[i].y = snake[i - 1].y;
    }

    switch (direction) {
        case 0:
            if (snake[0].x != 490)
                snake[0].x += 10;
            else
                snake[0].x = 0;
            break;
        case 1:
            if (snake[0].y != 490)
                snake[0].y += 10;
            else
                snake[0].y = 0;
            break;
        case 2:
            if (snake[0].x != 0)
                snake[0].x -= 10;
            else
                snake[0].x = 490;
            break;
        case 3:
            if (snake[0].y != 0)
                snake[0].y -= 10;
            else
                snake[0].y = 490;
            break;
    }
}

function drawSnake() {
    snake.forEach(drawSnakePart)
}

function drawSnakePart(snakePart) {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "yellow";
    ctx.strokestyle = "black";
    ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
    ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

function handleFood() {
    if (snake[0].x == food.x && snake[0].y == food.y) {
        points += 10;
        $("#pointsDiv").html("<br/><br/>Points: " + points);
        addLength();
        food = generateFood();
    }
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, 10, 10);
}

function generateFood() {
    let max = 490;
    let min = 0;
    point = { x: Math.round((Math.random() * (max - min) + min) / 10) * 10, y: Math.round((Math.random() * (max - min) + min) / 10) * 10 };
    for (i = 0; i < snake.length; i++) {
        if (snake[i].x == point.x && snake[i].y == point.y) {
            i = 0;
            point = { x: Math.round((Math.random() * (max - min) + min) / 10) * 10, y: Math.round((Math.random() * (max - min) + min) / 10) * 10 };
        }
    }
    return point;
}

function addLength() {
    if (snake[snake.length - 2].x == snake[snake.length - 1].x + 10) {
        let add = { x: snake[snake.length - 1].x - 10, y: snake[snake.length - 1].y };
        snake.push(add);
    } else if (snake[snake.length - 2].y == snake[snake.length - 1].y + 10) {
        let add = { x: snake[snake.length - 1].x, y: snake[snake.length - 1].y - 10 };
        snake.push(add);
    } else if (snake[snake.length - 2].x == snake[snake.length - 1].x - 10) {
        let add = { x: snake[snake.length - 1].x + 10, y: snake[snake.length - 1].y };
        snake.push(add);
    } else if (snake[snake.length - 2].y == snake[snake.length - 1].y - 10) {
        let add = { x: snake[snake.length - 1].x, y: snake[snake.length - 1].y + 10 };
        snake.push(add);
    }
}

function checkLost() {
    for (i = 1; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            lost = true;
            $("#pointsDiv").html("You have lost<br/> Your score: " + points + "<br/>Press F5 to retry");
        }
    }
}