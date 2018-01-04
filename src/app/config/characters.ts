export const charactersData = [
  {
    name: 'female-mage',
    title: 'Female Mage',
    enabled: true,
    modelPath: 'assets/models/FemaleMage/',
    modelFileName: 'FemaleMage.babylon',
    modelFileType: 'babylon',
    animations: {
      idle: [130, 151],
      walk: [161, 186],
      run: [161, 186],
      moveLeft: [161, 186], // missing
      moveRight: [161, 186], // missing
      die: [66, 111],
      hitReceived: [112, 126],
      attack: [1, 65]
    },
    transform: {
      scale: [0.5, 0.5, 0.5],
      position: [0, 0.45, 0],
      rotate: [0, 180, 0]
    }
  },
  {
    name: 'mage',
    title: 'Mage',
    enabled: true,
    modelPath: 'assets/models/Mage/',
    modelFileName: 'Mage.babylon',
    modelFileType: 'babylon',
    animations: {
      idle: [71, 96],
      walk: [101, 126],
      run: [101, 126],
      moveLeft: [101, 126], // missing
      moveRight: [101, 126], // missing
      die: [18, 41],
      hitReceived: [51, 63],
      attack: [1, 15]
    },
    transform: {
      scale: [0.5, 0.5, 0.5],
      position: [0, -0.2, 0],
      rotate: [0, 180, 0]
    }
  },
  {
    name: 'rabbit',
    title: 'Rabbit',
    enabled: true,
    modelPath: 'assets/models/Rabbit/',
    modelFileName: 'Rabbit.babylon',
    modelFileType: 'babylon',
    animations: {
      idle: [0, 30],
      walk: [31, 54],
      run: [31, 54],
      moveLeft: [31, 54], // missing
      moveRight: [31, 54], // missing
      die: [70, 100],
      hitReceived: [0, 30],
      attack: [0, 30]
    },
    transform: {
      scale: [0.1, 0.1, 0.1],
      position: [0, -5.2, 0],
      rotate: [0, 0, 0]
    }
  },
  {
    name: 'archer',
    title: 'Archer',
    enabled: true,
    modelPath: 'assets/models/Archer/',
    modelFileName: 'Archer.babylon',
    modelFileType: 'babylon',
    animations: {
      idle: [104, 125],
      walk: [151, 184],
      run: [151, 184],
      moveLeft: [151, 184], // missing
      moveRight: [151, 184], // missing
      die: [63, 91],
      hitReceived: [92, 103],
      attack: [15, 58]
    },
    transform: {
      scale: [0.5, 0.5, 0.5],
      position: [0, -0.2, 0],
      rotate: [0, 180, 0]
    }
  },
  {
    name: 'diablous',
    title: 'Diablous',
    enabled: true,
    modelPath: 'assets/models/Diablous/',
    modelFileName: 'Diablous.babylon',
    modelFileType: 'babylon',
    animations: {
      idle: [151, 172],
      idle2: [177, 230],
      walk: [263, 288],
      run: [231, 248],
      moveLeft: [263, 288], // missing
      moveRight: [263, 288], // missing
      die: [67, 112],
      hitReceived: [121, 144],
      attack: [1, 51]
    },
    transform: {
      scale: [0.5, 0.5, 0.5],
      position: [0, -0.2, 0],
      rotate: [0, 180, 0]
    }
  }
];
