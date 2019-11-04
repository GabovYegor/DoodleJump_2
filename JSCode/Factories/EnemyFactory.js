class EnemyFactory {
    createEnemy(enemyType = 'FlyingEnemy', enemyID = 0, enemyWidth = 0,
                enemyHeight = 0, xEnemyLocation = 0, yEnemyLocation = 0){
        switch (enemyType) {
            case "FlyingEnemy": {
                return new FlyingEnemy(enemyID, enemyWidth, enemyHeight, xEnemyLocation, yEnemyLocation);
            }

            case 'BigEnemy' : {
                return new BigEnemy(enemyID, enemyWidth, enemyHeight, xEnemyLocation, yEnemyLocation);
            }

            default: {
                throw Error;
            }
        }
    }
}