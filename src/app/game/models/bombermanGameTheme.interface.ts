import { BombermanGameMap } from '../gameMap';

export interface IBombermanGameWallTextures {
  indestructibleWalls: string[];
  destructibleWalls: string[];
}
export type BombermanGameMapFunction = (gameMap: BombermanGameMap) => void;

export interface IBombermanGameTheme {
  name: string;
  title?: string;
  description?: string,
  groundTextures: string[];
  wallTextures: IBombermanGameWallTextures;
  avilableCharacters: string[];
  indestructibleWallPlacementAlgorithm?: BombermanGameMapFunction;
  destructibleWallPlacementAlgorithm?: BombermanGameMapFunction;
  playerPlacementAlgorithm?: BombermanGameMapFunction;
}
