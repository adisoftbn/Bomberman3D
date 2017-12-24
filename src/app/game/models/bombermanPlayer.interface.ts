
export enum EPlayerCharacterType {
  Current = 'CURRENT',
  Network = 'NETWORK',
  ComputerEasy = 'COMPUTER_EASY',
  ComputerMedium = 'COMPUTER_MEDIUM',
  ComputerHard = 'COMPUTER_HARD'
}

interface ICharacterPosition {
  x: number;
  y: number;
}

export interface IBombermanPlayer {
  name: string;
  playerType: EPlayerCharacterType;
  characterName: string;
  initialPosition: ICharacterPosition;
  characterModel: string;
}
