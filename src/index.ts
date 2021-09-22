import Game from "./game.js";

let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('game-screen');
let context = canvas.getContext('2d');

const GAME_WIDTH = canvas.width;
const GAME_HEIGHT = canvas.height;

const game = new Game(GAME_WIDTH, GAME_HEIGHT);
// game.start();

let lastTime = 0;

function gameLoop(timestamp: number) {
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    context!.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    game.update(deltaTime);
    game.draw(context!);
    requestAnimationFrame(gameLoop)
}

requestAnimationFrame(gameLoop)
