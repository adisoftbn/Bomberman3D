import { BombermanGameMap } from './gameMap';
import { BombermanGameTheme } from './model';

function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

export module DefaultAlgs {
  export function defaultIndestructibleWallPlacementAlgorithm(gameMap: BombermanGameMap): any {
    const walls = [];
    const xDiff = (gameMap.getWidth() % 2);
    const yDiff = (gameMap.getHeight() % 2);
    for (let i = 1 + xDiff; i <= gameMap.getWidth(); i = i + 2) {
      for (let j = 1 + xDiff; j <= gameMap.getHeight(); j = j + 2) {
        walls.push([i, j]);
      }
    }
    return walls;
  }

  export function defaultDestructibleWallPlacementAlgorithm(gameMap: BombermanGameMap): any {
    const output = [];
    for (let i = 1; i <= gameMap.getWidth(); i++) {
      for (let j = 1; j <= gameMap.getHeight(); j++) {
        if (gameMap.getCell(i, j) === null) {
          output.push([i, j]);
        }
      }
    }
    return output;
  }

  export function defaultPlayerPlacementAlgorithm(gameMap: BombermanGameMap, playersCount: number): any {
    let positions = [
      [1, 1],
      [1, gameMap.getHeight()],
      [gameMap.getWidth(), 1],
      [gameMap.getWidth(), gameMap.getHeight()],
    ];
    if (playersCount >= 5) {
      positions.push([
        Math.floor(gameMap.getWidth() / 2), Math.ceil(gameMap.getHeight() / 2)
      ]);
    }
    if (playersCount >= 6) {
      positions.push([
        Math.ceil(gameMap.getWidth() / 2), 0
      ]);
    }
    if (playersCount >= 7) {
      positions.push([
        0, Math.floor(gameMap.getHeight() / 2)
      ]);
    }

    if (playersCount >= 8) {
      positions.push([
        gameMap.getWidth() / 2, Math.floor(gameMap.getHeight() / 2)
      ]);
    }
    positions = shuffle(positions);
    return positions;

  }
}
