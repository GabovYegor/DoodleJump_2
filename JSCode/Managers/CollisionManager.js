class CollisionManager {
    constructor( actor = new ActorClass(), mapManager = new MapManager()) {
        this.actor = actor;
        this.mapManager = mapManager;
    }

    checkActorCollisionWithBlocks() {
        for(let block of this.mapManager.blockMasInCurrentField) {
            if (this.actor.actorDirection === false &&
                block.yBlockLocation >= this.actor.yActorLocation + this.actor.actorHeight &&
                block.yBlockLocation <= this.actor.yActorLocation + this.actor.actorHeight + block.blockHeight &&
                block.xBlockLocation <= this.actor.xActorLocation + this.actor.actorWidth &&
                block.xBlockLocation + block.blockWidth >= this.actor.xActorLocation) {

                this.actor.yActorLocation = block.yBlockLocation - this.actor.actorHeight;
                return block
            }
        }
        return false
    }

    checkActorCollisionWithEnemy() {
        for(let enemy of this.mapManager.enemyMasInCurrentField) {
            if( enemy.xEnemyLocation <= this.actor.xActorLocation + this.actor.actorWidth &&
                enemy.xEnemyLocation + enemy.enemyWidth >= this.actor.xActorLocation) {

                if (this.actor.actorDirection === true &&
                    enemy.yEnemyLocation + enemy.enemyHeight >= this.actor.yActorLocation &&
                    enemy.yEnemyLocation <= this.actor.yActorLocation) {
                    return enemy;
                }

                if (this.actor.actorDirection === false &&
                    enemy.yEnemyLocation >= this.actor.yActorLocation + this.actor.actorHeight &&
                    enemy.yEnemyLocation <= this.actor.yActorLocation + this.actor.actorHeight + enemy.enemyHeight) {

                    this.actor.yActorLocation = enemy.yEnemyLocation - this.actor.actorHeight;
                    this.actor.yActorSpeed = enemy.speedFromEnemy;
                    this.mapManager.enemyMas = this.mapManager.enemyMas.filter(function (el) {
                        return el !== enemy;
                    });
                    this.mapManager.updateEnemyMasInCurrentField();
                    return enemy;
                }
            }
        }

        return false
    }

    checkActorCollisionWithGameUnit(){
        for(let unit of this.mapManager.gameUnitMas) {
            if( unit.xUnitLocation <= this.actor.xActorLocation + this.actor.actorWidth &&
                unit.xUnitLocation + unit.unitWidth >= this.actor.xActorLocation) {

                if (this.actor.actorDirection === true &&
                    unit.yUnitLocation + unit.unitHeight >= this.actor.yActorLocation &&
                    unit.yUnitLocation <= this.actor.yActorLocation) {
                    return unit;
                }

                if (this.actor.actorDirection === false &&
                    unit.yUnitLocation >= this.actor.yActorLocation + this.actor.actorHeight &&
                    unit.yUnitLocation <= this.actor.yActorLocation + this.actor.actorHeight + unit.unitHeight) {
                    return unit;
                }
            }
        }
    }

    checkEnemyCollisionWithBullet(){
        for(let enemy of this.mapManager.enemyMas) {
            if(enemy.yEnemyLocation + enemy.enemyHeight + this.actor.bullet.bulletHeight >= this.actor.bullet.yBulletLocation &&
                enemy.yEnemyLocation <= this.actor.bullet.yBulletLocation &&
                enemy.xEnemyLocation +  enemy.enemyWidth + this.actor.bullet.bulletWidth >= this.actor.bullet.xBulletLocation &&
                enemy.xEnemyLocation <= this.actor.bullet.xBulletLocation ){

                this.mapManager.enemyMas = this.mapManager.enemyMas.filter(function (el) {
                    return el !== enemy;
                });
                this.mapManager.updateEnemyMasInCurrentField();
            }
        }
    }
}