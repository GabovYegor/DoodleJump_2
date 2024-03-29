class GameManager {
    static currentLevel;
    constructor(gameLoopInterval = 20, levelNumber = 0) {
        this.actor = new ActorClass();
        this.highScoreTable = new HighScoreTableManager();
        this.mapManager = new MapManager(this.actor);
        this.physicsManager = new PhysicsManager(this.actor);
        this.collisionManager = new CollisionManager(this.actor, this.mapManager);

        this.levelNumber = levelNumber;
        document.getElementById('currentLevelNumberDiv').style.visibility = 'visible';
        document.getElementById('gameScoreDiv').style.visibility = 'visible';
        this.finishStatusHTML = document.getElementById('finishStatus');
        document.getElementById('currentLevelNumber').innerText = GameManager.currentLevel;
        this.gameScore = 0;
        this.isMoveRight = false;
        this.isMoveLeft = false;
        this.timerDescriptionGameLoop = 0;
        this.gameLoopInterval = gameLoopInterval;
        this.actorScrollHeight = canvas.height / 2;

        let currentLevelLet = GameManager.currentLevel;
        loadMap('Map/JsonLevels/level_' + currentLevelLet + '.json', this.mapManager);
        initEventListeners(this)
    }

    startGameLoop(){
        this.timerDescriptionGameLoop = setInterval(this.gameLoop.bind(this), this.gameLoopInterval);
    }

    gameLoop(){
        this.physicsManager.jumpCalculatePosition();

        if(this.actor.bullet.isBulletFired) {
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
            this.actor.yActorLocation = this.actorScrollHeight;
            this.mapManager.scrollMap(actorHeightDiff);
        }

        let collisionBlock = this.collisionManager.checkActorCollisionWithBlocks();
        if(collisionBlock) {
            collisionBlock.blockCollisionWithActorAction();
            this.actor.yActorSpeed = collisionBlock.speedFromBlock;
        }

        let collisionEnemy = this.collisionManager.checkActorCollisionWithEnemy();
        if(collisionEnemy) {
            if(collisionEnemy.yEnemyLocation > this.actor.yActorLocation) {
                collisionEnemy.enemyCollisionWithActorAction(true);
            }
            else {
                collisionEnemy.enemyCollisionWithActorAction(false);
                this.finishStatusHTML.innerText = 'Died from the enemy';
                this.gameOver();
            }
        }

        let collisionUnit = this.collisionManager.checkActorCollisionWithGameUnit();
        if(collisionUnit) {
            if(collisionUnit.yUnitLocation > this.actor.yActorLocation) {
                collisionUnit.gameUnitCollisionAction(true);
            }
            else {
                collisionUnit.gameUnitCollisionAction(false);
            }

            if(collisionUnit.gameUnitType === 'Spring') {
                this.actor.yActorSpeed = collisionUnit.speedFromSpring;
            }

            if(collisionUnit.gameUnitType === 'Portal') {
                console.log(GameManager.currentLevel, this.levelNumber);
                if(GameManager.currentLevel === this.levelNumber){
                    this.finishStatusHTML.innerText = 'Passed the game';
                    this.gameOver()
                }
                else {
                    GameManager.currentLevel++;
                    new GameManager(15, this.levelNumber).startGameLoop();
                    this.levelOver()
                }
            }
        }

        if(this.actor.yActorLocation >= canvas.height){
            this.finishStatusHTML.innerText = 'Died in the void';
            this.gameOver();
        }

        for(let block of this.mapManager.blockMasInCurrentField) {
            block.blockAction();
        }

        for(let enemy of this.mapManager.enemyMasInCurrentField) {
            enemy.enemyAction();
        }

        for(let unit of this.mapManager.gameUnitMasInCurrentField) {
            unit.gameUnitAction();
        }

        this.mapManager.drawMap();
    }

    levelOver() {
        clearInterval(this.timerDescriptionGameLoop);
        return;
    }
    gameOver() {
        clearInterval(this.timerDescriptionGameLoop);
        canvas.style.visibility = "hidden";
        let highScoreTable = document.getElementById('highScoreTableOl');
        document.getElementById('highScoreTableDiv').style.visibility = 'visible';
        this.highScoreTable.addRecordToHighScoreTable(
            {'name': document.getElementById('RegistrationName').value,
                       'level': GameManager.currentLevel, 'score': this.gameScore});
        for(let record of this.highScoreTable.getHighScoreTable()) {
            let recordHTML = document.createElement('li');
            recordHTML.innerText = "Name: " + record.name +" Level: " + record.level + "  Score: " + record.score;
            highScoreTable.append(recordHTML)
        }
        return;
    }
}

function initEventListeners(game) {
    addEventListener('keydown', function (e) {
        if (e.code === 'ArrowRight') {
            game.isMoveRight = true;
            if(game.actor.actorCurrentStateImage !== game.actor.actorShootStateImage) {
                game.actor.actorCurrentStateImage = game.actor.actorRightStateImage;
            }
        }

        if (e.code === 'ArrowLeft') {
            game.isMoveLeft = true;
            if(game.actor.actorCurrentStateImage !== game.actor.actorShootStateImage) {
                game.actor.actorCurrentStateImage = game.actor.actorLeftStateImage;
            }
        }

        if(e.code === 'Space') {
            game.actor.actorCurrentStateImage = game.actor.actorShootStateImage;
            game.actor.bullet.isBulletFired = true;
            if(game.actor.bullet.yBulletLocation < 0) {
                game.actor.bullet.xBulletLocation = game.actor.xActorLocation + game.actor.actorWidth / 2;
                game.actor.bullet.yBulletLocation = game.actor.yActorLocation;
                game.actor.actorShootSound.play();
            }
        }
    });

    addEventListener('keyup', function (e) {
        if(e.code === 'ArrowRight'){
            game.isMoveRight = false;
        }

        if(e.code === 'ArrowLeft'){
            game.isMoveLeft = false;
        }

        if (e.code === 'Space') {
            game.actor.actorCurrentStateImage = game.actor.actorLeftStateImage;
        }
    });
}