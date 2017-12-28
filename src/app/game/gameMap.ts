export class BombermanGameMap {
  private _map = [];
  private _width = 1;
  private _height = 1;

  public bombsCache = 0;
  constructor() {

  }

  public getWidth() {
    return this._width;
  }

  public getHeight() {
    return this._height;
  }

  public fixPosition(x: number, y: number) {
    return {
      cellX: Math.ceil(x),
      cellY: Math.ceil(y),
      x: Math.floor(x) + 0.5,
      y: Math.floor(y) + 0.5
    }
  }

  public createMap(width: number, height: number) {
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

  public addIndestructibleWall(x: number, y: number, object) {
    this._map[x][y] = {
      type: 'indestructible-wall',
      object
    };
  }

  public addDestructibleWall(x: number, y: number, object, reward) {
    this._map[x][y] = {
      type: 'destructible-wall',
      object,
      reward
    };
  }

  public removeDestructibleWall(x: number, y: number) {
    if (this._map[x][y] && this._map[x][y].type === 'destructible-wall') {
      this._map[x][y] = null;
      this.bombsCache--;
      return true;
    }
    return false;
  }



  public addPlayerPosition(x: number, y: number) {
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

  findBetterPlayerPosition(position: number[]): number[] {
    const radius = 2;
    const positions = [];
    let foundPosition = position;
    for (let i = position[0] - radius; i < position[0] + radius; i++) {
      for (let j = position[1] - radius; j < position[1] + radius; j++) {
        if (i >= 1 && i <= this._width && j >= 1 && j <= this._height && !this._map[i][j]) {
          positions.push([i, j]);
        }
      }
    }
    if (positions.length > 0) {
      this.shuffle(positions);
      foundPosition = positions[Math.floor(Math.random() * positions.length)];
    }
    return foundPosition;
  }

  public addBomb(x: number, y: number) {
    if (!this._map[x][y]) {
      this._map[x][y] = {
        type: 'bomb',
      };
      this.bombsCache++;
      return true;
    }
    return false;
  }

  public setBomb(x: number, y: number, object) {
    if (this._map[x][y] && this._map[x][y].type === 'bomb') {
      this._map[x][y].object = object;
      return true;
    }
    return false;
  }

  public removeBomb(x: number, y: number) {
    if (this._map[x][y] && this._map[x][y].type === 'bomb') {
      this._map[x][y] = null;
      this.bombsCache--;
      return true;
    }
    return false;
  }

  public makeMapReady() {
    for (let i = 1; i <= this._width; i++) {
      for (let j = 1; j <= this._height; j++) {
        if (this._map[i][j] && (this._map[i][j].type === 'initial-player-position' || this._map[i][j].type === 'reserved')) {
          this._map[i][j] = null;
        }
      }
    }
  }

  public clearMapCell(x: number, y: number) {
    if (this._map[x][y] && this._map[x][y].type === 'destructible-wall') {
      this._map[x][y] = null;
    }
  }

  public getCell(x: number, y: number) {
    return this._map[x][y];
  }

  public canFireCell(x: number, y: number) {
    return !this._map[x][y] || (this._map[x][y] && this._map[x][y].type === 'bomb');
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

  public getFlareDirections(x: number, y: number, flareWidth: number) {
    const result = {
      x1: 0,
      x2: 0,
      y1: 0,
      y2: 0
    };
    for (let i = 1; i <= flareWidth; i++) {
      result.x1++;
      if (x + i >= this._width || !this.canFireCell(x + i, y)) {
        break;
      }
    }
    for (let i = 1; i <= flareWidth; i++) {
      result.x2++;
      if (x - i <= 1 || !this.canFireCell(x - i, y)) {
        break;
      }
    }
    for (let j = 1; j <= flareWidth; j++) {
      result.y1++;
      if (y + j >= this._height || !this.canFireCell(x, y + j)) {
        break;
      }
    }
    for (let j = 1; j <= flareWidth; j++) {
      result.y2++;
      if (y - j <= 1 || !this.canFireCell(x, y - j)) {
        break;
      }
    }
    return result;
  }

  getFlareAffectedCells(x: number, y: number, directions) {
    const result = {
      emptyByHash: {
      },
      walls: []
    };
    result.emptyByHash['cell_' + x + '_' + y] = true;
    for (let i = 1; i <= directions.x1; i++) {
      if (x + i <= this._width) {
        if (this._map[x + i][y]) {
          result.walls.push({
            x: x + i,
            y: y,
            contents: this._map[x + i][y]
          });
        } else {
          /* result.empty.push({
            x: x + i,
            y: y,
            contents: null
          });*/
          result.emptyByHash['cell_' + (x + i) + '_' + y] = true;
        }
      }
    }
    for (let i = 1; i <= directions.x2; i++) {
      if (x - i >= 1) {
        if (this._map[x - i][y]) {
          result.walls.push({
            x: x - i,
            y: y,
            contents: this._map[x - i][y]
          });
        } else {
          /* result.empty.push({
            x: x - i,
            y: y,
            contents: null
          });*/
          result.emptyByHash['cell_' + (x + i) + '_' + y] = true;
        }
      }
    }
    for (let j = 1; j <= directions.y1; j++) {
      if (y + j <= this._height) {
        if (this._map[x][y + j]) {
          result.walls.push({
            x: x,
            y: y + j,
            contents: this._map[x][y + j]
          });
        } else {
          /* result.empty.push({
            x: x,
            y: y + j,
            contents: null
          });*/
          result.emptyByHash['cell_' + x + '_' + (y + j)] = true;
        }
      }
    }
    for (let j = 1; j <= directions.y2; j++) {
      if (y - j >= 1) {
        if (this._map[x][y - j]) {
          result.walls.push({
            x: x,
            y: y - j,
            contents: this._map[x][y - j]
          });
        } else {
          /* result.empty.push({
            x: x,
            y: y - j,
            contents: null
          });*/
          result.emptyByHash['cell_' + x + '_' + (y - j)] = true;
        }
      }
    }
    return result;
  }

  shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

}
