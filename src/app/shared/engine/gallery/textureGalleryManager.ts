import { GameRenderer } from '../';
import { ITextureGalleryItem, TextureGalleryItem } from '../model/';

export class TextureGalleryManager {
  private _gameRenderer: GameRenderer;
  private _textures = {
    grass: {
      hq: 'ground/grass-hq.jpg',
      mq: 'ground/grass-mq.jpg',
      lq: 'ground/grass-lq.jpg',
    },
    metal: {
      hq: 'ground/metal-hq.jpg',
      mq: 'ground/metal-mq.jpg',
      lq: 'ground/metal-lq.jpg',
    },
    pavement: {
      hq: 'ground/pavement-hq.jpg',
      mq: 'ground/pavement-mq.jpg',
      lq: 'ground/pavement-lq.jpg',
    },
    pavement2: {
      hq: 'ground/pavement2-hq.jpg',
      mq: 'ground/pavement2-mq.jpg',
      lq: 'ground/pavement2-lq.jpg',
    },
  };

  constructor(gameRenderer: GameRenderer) {
    this._gameRenderer = gameRenderer;
  }

  getTextureUrlByName(textureName: string): string {
    if (this._textures[textureName]) {
      if (this._gameRenderer.texturesQuality === 'hq') {
        return `assets/textures/${this._textures[textureName].hq}`;
      } else if (this._gameRenderer.texturesQuality === 'mq') {
        return `assets/textures/${this._textures[textureName].mq}`;
      } else {
        return `assets/textures/${this._textures[textureName].lq}`;
      }
    } else {
      throw new Error(`Cannot find texture ${textureName}!`);
    }
  }
}
