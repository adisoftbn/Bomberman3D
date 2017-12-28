import { IBombermanGameRules } from './gameRules.interface';

export class BombermanGameRules implements IBombermanGameRules {
  bombCascadeDestroy = true;
  destroyIndestructible = false;
  destroyIndestructibleLives = 10;
  destroyDestructubleLives = 1;

  initialBombTimeout = 5000;
  initialPlayerSpeed = 1;

}
