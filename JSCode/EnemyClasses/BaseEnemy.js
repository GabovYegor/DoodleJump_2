class BaseEnemy {
    constructor(enemyID = 0, enemyWidth = 0, enemyHeight = 0, xEnemyLocation = 0, yEnemyLocation = 0){
        this.enemyID = enemyID;
        this.enemyWidth = enemyWidth;
        this.enemyHeight = enemyHeight;
        this.xEnemyLocation = xEnemyLocation;
        this.yEnemyLocation = yEnemyLocation;
        this.speedFromEnemy = 20;
    }

    enemyAction() {}
}