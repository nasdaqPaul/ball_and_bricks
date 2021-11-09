import Game, {GameObject} from "./game";

export class Paddle implements GameObject{
    public static readonly WIDTH = 50;
    public static readonly HEIGHT = 5;

    private readonly gameWidth: number;
    public position: {x: number, y: number };
    public speed: number = 0;
    private maxSpeed: number = 7;

    constructor(game: Game) {
        this.gameWidth = game.GAME_WIDTH;
        this.position = {
            x: game.GAME_WIDTH / 2 - Paddle.WIDTH / 2,
            y: game.GAME_HEIGHT - Paddle.HEIGHT - 10
        }
    }

    draw(context: CanvasRenderingContext2D) {
        context.fillStyle = '#0ff'
        context.fillRect(this.position.x, this.position.y, Paddle.WIDTH, Paddle.HEIGHT)
    }

    update(deltaTime: number) {
        this.position.x += this.speed;

        if (this.position.x < 0) this.position.x = 0;
        if (this.position.x + Paddle.WIDTH > this.gameWidth) this.position.x = this.gameWidth - Paddle.WIDTH;

    }
    getWidth(): number {
        return Paddle.WIDTH
    }

    moveLeft() {
        this.speed = -this.maxSpeed;
    }

    moveRight() {
        this.speed = this.maxSpeed;
    }

    stop() {
        this.speed = 0;
    }
}
