import Game, {GameObject} from "./game";
import {detectCollusion} from "./collutionDetection";

export default class Brick implements GameObject{
    public static readonly WIDTH = 30;
    public static readonly HEIGHT = 10;
    private readonly brickImage: HTMLImageElement;
    public markedForDeletion = false;

    constructor(private game: Game, public position: { x: number, y: number }) {
        this.brickImage = <HTMLImageElement>document.getElementById('image_brick');

    }

    update() {
        if(detectCollusion(this.game.ball, this)) {
            this.game.ball.speed.y = - this.game.ball.speed.y;
            this.markedForDeletion = true;
        }
    }

    draw(context: CanvasRenderingContext2D) {
        context.drawImage(this.brickImage, this.position.x, this.position.y, Brick.WIDTH, Brick.HEIGHT)
    }

    getWidth() {
        return Brick.WIDTH;
    }
}