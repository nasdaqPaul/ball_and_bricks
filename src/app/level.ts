import Game from "./game";
import Brick from "./brick";

type Level = Array<number[]>

export const leve1: Level = [
    [1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],

]

export function builtLevel(game: Game, level: Level) {
    let bricks: Brick[] = [];
    level.forEach((row, rowIndex) => {
        row.forEach((brick, brickIndex) => {
            let position = {x: Brick.WIDTH * brickIndex, y: 20 + Brick.HEIGHT * rowIndex};
            if (brick === 1) {
                bricks.push(new Brick(game, position))
            }
        })
    });

    return bricks;
}