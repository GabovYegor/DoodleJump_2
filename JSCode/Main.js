const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

GameManager.currentLevel = 1;
new GameManager(15, 2).startGameLoop();
