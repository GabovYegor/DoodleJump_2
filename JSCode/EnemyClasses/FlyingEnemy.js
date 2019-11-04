class FlyingEnemy extends BaseEnemy{
    constructor(enemyID = 0, enemyWidth = 0, enemyHeight = 0, xEnemyLocation = 0, yEnemyLocation = 0){
        super(enemyID, enemyWidth, enemyHeight, xEnemyLocation, yEnemyLocation);
        this.moveInterval = 10;
        this.moveDirection = false;
        this.centerPoint = yEnemyLocation;
        this.enemyType = 'FlyingEnemy';
        this.enemyImage = new Image();
        this.enemyImage.src = 'images/Enemies/FlyingEnemy.png';
        this.enemySound = new Audio('sounds/EnemySounds/killFlyingEnemySound.mp3');
    }

    enemyAction() {
        super.enemyAction();
        if(this.moveDirection) {
            this.yEnemyLocation++;
        }
        else {
            this.yEnemyLocation--;
        }

        if(this.yEnemyLocation >= this.centerPoint + this.moveInterval) {
            this.moveDirection = false;
        }

        if(this.yEnemyLocation <= this.centerPoint - this.moveInterval) {
            this.moveDirection = true;
        }
    }
}