import Ball from "./ball";
import {GameObject} from "./game";

export function detectCollusion(ball: Ball, gameObject: GameObject) {

    let bottomOfBall = ball.position.y + Ball.SIZE;
    let topOfBall = ball.position.y;

    let topOfObject = gameObject.position.y;
    let bottomOfObject = gameObject.position.y;

    let leftSideOfObject = gameObject.position.x
    let rightSideOfObject = gameObject.position.x + gameObject.getWidth!();

    if (bottomOfBall >= topOfObject && topOfBall <= bottomOfObject && ball.position.x >= leftSideOfObject && ball.position.x + Ball.SIZE <= rightSideOfObject) {
        return true;
    } else return false
}