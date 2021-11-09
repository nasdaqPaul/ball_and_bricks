import {Paddle} from "./paddle";
import {InputHandler} from "./input";
import {builtLevel, leve1} from "./level";
import Ball from "./ball";

export interface GameObject {
    // TODO: This is a really poor interface, should be refactored
    position: { x: number, y: number };
    SIZE?: number;
    WIDTH?: number;
    HEIGHT?: number;
    markedForDeletion?: boolean


    draw(context: CanvasRenderingContext2D): void;

    update(timeDelta: number): void;

    getWidth?(): number;
}

enum GameState {
    PAUSED,
    RUNNING,
    MENU,
    GAMEOVER
}

export default class Game {
    public ball!: Ball;
    public paddle!: Paddle;
    public gameState!: GameState
    private gameObjects: Array<GameObject> = [];

    constructor(public readonly GAME_WIDTH: number, public readonly GAME_HEIGHT: number) {
        this.gameState = GameState.MENU;
        this.ball = new Ball(this);
        this.paddle = new Paddle(this);
        new InputHandler(this.paddle, this);
    }

    start() {
        let bricks = builtLevel(this, leve1);
        this.gameObjects = [this.paddle, this.ball, ...bricks];
        this.gameState = GameState.RUNNING;
    }

    update(timeDelta: number) {
        if (this.gameState == GameState.PAUSED || this.gameState == GameState.MENU) return;

        this.gameObjects.forEach(item => item.update(timeDelta));
        this.gameObjects = this.gameObjects.filter((item) => !item?.markedForDeletion);
    }

    draw(context: CanvasRenderingContext2D) {
        this.gameObjects.forEach(item => item.draw(context));

        if (this.gameState == GameState.PAUSED) {
            context.rect(0, 0, this.GAME_WIDTH, this.GAME_HEIGHT);
            context.fillStyle = "rgba(0,0,0,0.5)";
            context.fill();

            context.font = "10px Arial";
            context.fillStyle = 'white';
            context.textAlign = 'center';
            context.fillText("Game Paused", this.GAME_WIDTH / 2, this.GAME_HEIGHT / 2);
        }
        if (this.gameState == GameState.MENU) {
            context.rect(0, 0, this.GAME_WIDTH, this.GAME_HEIGHT);
            context.fillStyle = "rgba(0,0,0,1)";
            context.fill();

            context.font = "10px Arial";
            context.fillStyle = 'white';
            context.textAlign = 'center';
            context.fillText("Press SPACEBAR to start", this.GAME_WIDTH / 2, this.GAME_HEIGHT / 2);
        }
    }

    togglePause() {
        if (this.gameState == GameState.PAUSED) {
            this.gameState = GameState.RUNNING;
        } else {
            this.gameState = GameState.PAUSED;
        }
    }
}