const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function startPlay() {
    document.getElementById('RegistrationDiv').style.visibility = 'hidden';
    GameManager.currentLevel = 1;
    new GameManager(15, 2).startGameLoop();
}