// gameLoopInterval, XActorSpeed, YActorSpeed, BackGroundColor, AccelarationOfGravity, ActorStyle (Abstract Factory)
class GameManager {
    constructor(gameLoopInterval = 50) {
        this.actor = new ActorClass();
        this.mapManager = new MapManager(this.actor);
        this.physicsManager = new PhysicsManager(this.actor);
        this.collisionManager = new CollisionManager(this.actor, this.mapManager);

        this.gameScore = 0;
        this.isMoveRight = false;
        this.isMoveLeft = false;
        this.timerDescriptionGameLoop = 0;
        this.gameLoopInterval = gameLoopInterval;
        this.actorScrollHeight = canvas.height / 2;

        loadMap('map/newMap.json', this.mapManager);
        initEventListeners(this)
    }

    startGameLoop(){
        this.timerDescriptionGameLoop = setInterval(this.gameLoop.bind(this), this.gameLoopInterval);
    }

    gameLoop(){
        this.physicsManager.jumpCalculatePosition();

        if(this.actor.bullet.isBulletFired) {
            console.log('fired')
            this.physicsManager.bulletCalculatePosition();
            this.collisionManager.checkEnemyCollisionWithBullet();
        }

        if(this.isMoveLeft) {
            this.physicsManager.moveLeft();
        }

        if(this.isMoveRight) {
            this.physicsManager.moveRight();
        }

        if(this.actor.yActorLocation < this.actorScrollHeight) {
            let actorHeightDiff = Math.floor(Math.abs(this.actor.yActorLocation - this.actorScrollHeight));
            this.gameScore += actorHeightDiff;
            document.getElementById('score').innerText  = this.gameScore;
            this.actor.yActorLocation = this.actorScrollHeight
            this.mapManager.scrollMap(actorHeightDiff);
        }

        let currentBlock = this.collisionManager.checkActorCollisionWithBlocks();
        if(currentBlock) {
            this.actor.yActorSpeed = currentBlock.speedFromBlock;
        }

        if(this.collisionManager.checkActorCollisionWithEnemy() || this.actor.yActorLocation >= canvas.height){
            this.gameOver()
        }

        for(let block of this.mapManager.blockMasInCurrentField) {
            block.blockAction();
        }

        for(let enemy of this.mapManager.enemyMasInCurrentField) {
            enemy.enemyAction();
        }

        this.mapManager.drawMap();
    }

    gameOver(){
        clearInterval(this.timerDescriptionGameLoop);
        canvas.style.visibility = "hidden";
    }
}