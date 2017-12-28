export enum EPlayerCharacterType {
  current = 'current',
  network = 'network',
  computerEasy = 'computerEasy',
  computerMedium = 'computerMedium',
  computerHard = 'computerHard'
}

export interface IBombermanPlayerModel {
  name: string;
  playerType: EPlayerCharacterType;
  characterName: string;
  characterModel: string;
}
