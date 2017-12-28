export interface IBombermanGameRules {
  bombCascadeDestroy: boolean;
  destroyIndestructible: boolean;
  destroyIndestructibleLives: number;
  destroyDestructubleLives: number;

  initialBombTimeout: number;
  initialPlayerSpeed: number;
}
