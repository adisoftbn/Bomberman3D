export class BombermanGameMap {
  private _map = [];
  private _width = 1;
  private _height = 1;
  constructor() {

  }
  createMap(width: number, height: number) {
    this._width = width;
    this._height = height;
    this._map = [];
    for (let i = 1; i <= width; i++) {
      this._map[i] = [];
      for (let j = 1; j <= height; j++) {
        this._map[i][j] = null;
      }
    }
  }

  addIndestructibleWall(x: number, y: number, object) {
    this._map[x][y] = {
      type: 'indestructible-wall',
      object
    };
  }

  addDestructibleWall(x: number, y: number, object, reward) {
    this._map[x][y] = {
      type: 'destructible-wall',
      object,
      reward
    };
  }

  addPlayerPosition(x: number, y: number) {
    this._map[x][y] = {
      type: 'initial-player-position'
    };
    const delta = 3;
    const distance = 2;
    for (let i = x - 3; i < x + 3; i++) {
      for (let j = y - 3; j < y + 3; j++) {
        if (i > 0 && i <= this._width && j > 0 && j <= this._height) {
          const dist = Math.ceil(Math.sqrt(Math.pow(x - i, 2) + Math.pow(y - j, 2)));
          if (this._map[i][j] === null && !(x === i && y === j) && dist <= distance && this.emptyBetween(x, y, i, j)) {
            this._map[i][j] = {
              type: 'reserved'
            };
          }
        }
      }
    }
  }

  emptyBetween(x1, y1, x2, y2) {
    if (x1 === x2) {
      for (let j = Math.min(y1, y2); j <= Math.max(y1, y2); j++) {
        if (this._map[x1][j] !== null && this._map[x1][j].type === 'indestructible-wall') {
          return false;
        }
      }
    }
    if (y1 === y2) {
      for (let i = Math.min(x1, x2); i <= Math.max(x1, x2); i++) {
        if (this._map[i][y1] !== null && this._map[i][y1].type === 'indestructible-wall') {
          return false;
        }
      }
    }
    return true;
  }

  fillMapWithDestructive() {
    const output = [];
    for (let i = 1; i <= this._width; i++) {
      for (let j = 1; j <= this._height; j++) {
        if (this._map[i][j] === null) {
          output.push([i, j]);
        }
      }
    }
    return output;
  }

  computePlayersPositions(playersCount: number) {
    let positions = [
      [1, 1],
      [1, this._height],
      [this._width, 1],
      [this._width, this._height],
    ];
    if (playersCount >= 5) {
      positions.push([
        Math.floor(this._width / 2), Math.ceil(this._height / 2)
      ]);
    }
    if (playersCount >= 6) {
      positions.push([
        Math.ceil(this._width / 2), 0
      ]);
    }
    if (playersCount >= 7) {
      positions.push([
        0, Math.floor(this._height / 2)
      ]);
    }

    if (playersCount >= 8) {
      positions.push([
        this._width / 2, Math.floor(this._height / 2)
      ]);
    }
    positions = this.shuffle(positions);
    return positions;
  }

  shuffle(array) {
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

}
