import { BombermanGameMap } from '../gameMap';

export interface IBombermanGameWallTextures {
  borderWalls: string[];
  indestructibleWalls: string[];
  destructibleWalls: string[];
}

export interface IBombermanGameWallTypes {
  borderWalls: string[];
  indestructibleWalls: string[];
  destructibleWalls: string[];
}

export type TBombermanGameMapFunction = (gameMap: BombermanGameMap) => any[];
export type TBombermanGameMapPlayersFunction = (gameMap: BombermanGameMap, playersCount: number) => any[];

export interface IBombermanGameTheme {
  name: string;
  title?: string;
  description?: string,
  groundTextures: string[];
  wallTextures: IBombermanGameWallTextures;
  wallTypes: IBombermanGameWallTypes;
  avilableCharacters: string[];
  bombTexture1: string;
  bombTexture2: string;
  fireColor1: number[];
  fireColor2: number[];
  fireColor3: number[];
  fireParticlesTexture: string;
  backgroundColor: number[];
  indestructibleWallPlacementAlgorithm?: TBombermanGameMapFunction;
  destructibleWallPlacementAlgorithm?: TBombermanGameMapFunction;
  playerPlacementAlgorithm?: TBombermanGameMapPlayersFunction;
}
