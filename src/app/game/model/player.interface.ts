export enum EPlayerCharacterType {
  current = 'CURRENT',
  network = 'NETWORK',
  computerEasy = 'COMPUTER_EASY',
  computerMedium = 'COMPUTER_MEDIUM',
  computerHard = 'COMPUTER_HARD'
}

export interface IBombermanPlayerModel {
  name: string;
  playerType: EPlayerCharacterType;
  characterName: string;
  characterModel: string;
}
