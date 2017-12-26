export enum EPlayerCharacterType {
  current = 'CURRENT',
  network = 'NETWORK',
  computerEasy = 'COMPUTER_EASY',
  computerMedium = 'COMPUTER_MEDIUM',
  computerHard = 'COMPUTER_HARD'
}

export interface IBombermanPlayer {
  name: string;
  playerType: EPlayerCharacterType;
  characterName: string;
  characterModel: string;
}
