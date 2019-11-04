class BigEnemy extends BaseEnemy{
    constructor(enemyID = 0, enemyWidth = 0, enemyHeight = 0, xEnemyLocation = 0, yEnemyLocation = 0){
        super(enemyID, enemyWidth, enemyHeight, xEnemyLocation, yEnemyLocation);

        this.speedFromEnemy = 40;
        this.enemyType = 'BigEnemy';
        this.enemyImage = new Image();
        this.enemyImage.src = 'images/Enemies/BigEnemy.png';
        this.enemySound = new Audio('sounds/EnemySounds/killBigEnemySound.mp3');
    }
}