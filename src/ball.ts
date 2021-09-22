import Game, {GameObject} from "./game.js";
import {Paddle} from "./paddle.js";
import {detectCollusion} from "./collutionDetection.js";

export default class Ball implements GameObject {
    private readonly ballImage;
    public static readonly SIZE = 8;
    private readonly gameWidth;
    private readonly gameHeight;
    public readonly position = {
        x: 5,
        y: 100
    }
    public speed = {
        x: 1,
        y: 1
    }


    constructor(private readonly game: Game) {
        this.ballImage = <HTMLImageElement>document.getElementById('imag_ball');
        this.gameWidth = game.GAME_WIDTH;
        this.gameHeight = game.GAME_HEIGHT;
    }

    draw(context: CanvasRenderingContext2D) {
        context.drawImage(this.ballImage, this.position.x, this.position.y, Ball.SIZE, Ball.SIZE);
    }

    getWidth() {
        return Ball.SIZE;
    }
    update(deltaTime: number) {
        //Update the position of the ball
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;

        // Check left and right borders collisions
        if (this.position.x + Ball.SIZE > this.gameWidth || this.position.x < 0) {
            this.speed.x = -this.speed.x;
        }
        // Check top and bottom border collisions
        if (this.position.y + Ball.SIZE > this.gameHeight || this.position.y < 0) {
            this.speed.y = -this.speed.y;
        }
        // Check collision with paddle
        if (detectCollusion(this, this.game.paddle)){
            this.speed.y = - this.speed.y;
            this.position.y = this.game.paddle.position.y -  Ball.SIZE;
        }
    }

}