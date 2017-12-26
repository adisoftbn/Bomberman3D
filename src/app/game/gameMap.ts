export class BombermanGameMap {
  private _map = [];
  private _width = 1;
  private _height = 1;
  constructor() {

  }

  getWidth() {
    return this._width;
  }

  getHeight() {
    return this._height;
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

  public getCell(x: number, y: number) {
    return this._map[x][y];
  }

  public emptyBetween(x1, y1, x2, y2) {
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

}
