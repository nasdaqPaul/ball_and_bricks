import {Paddle} from "./paddle";
import Game from "./game";

export class InputHandler {
    private paddle: Paddle;

    constructor(paddle: Paddle, private game: Game) {
        this.paddle = paddle;
        document.addEventListener('keydown', ev => {
            switch (ev.key){
                case 'ArrowLeft':
                    this.paddle.moveLeft();
                    break
                case 'ArrowRight':
                    this.paddle.moveRight();
                    break;
                case 'Escape':
                    game.togglePause();
                    break;
                case ' ':
                    game.start();
            }
        });

        document.addEventListener('keyup', ev => {
            switch (ev.key){
                case 'ArrowLeft':
                    if(paddle.speed < 0)
                    this.paddle.stop();
                    break
                case 'ArrowRight':
                    if(paddle.speed > 0)
                    this.paddle.stop();
                    break;
            }
        });
    }

    // todo: Find out why eventhandler as method does not work
    private keyHandler(event: KeyboardEvent) {
        switch (event.key) {
            case 'ArrowLeft':
                console.log('move left');
                this.paddle.moveLeft();
                break;
            case 'ArrowRight':
                console.log('move right');
                break;
        }
    }
}