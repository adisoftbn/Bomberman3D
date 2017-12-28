import { GameRenderer } from './engine';
import {
  IBombermanGraphicsOptions, BombermanVeryLowGraphicsOptions, BombermanLowGraphicsOptions,
  BombermanMediumGraphicsOptions, BombermanHighGraphicsOptions
} from '../game/model/options';

class BombermanGameMemoryStorage {
  gameRenderer: GameRenderer = null;
  graphicsOptions: IBombermanGraphicsOptions;
}


export const gameMemoryStorage = new BombermanGameMemoryStorage();
