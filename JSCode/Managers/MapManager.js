class MapManager {
    constructor(actor = new ActorClass()) {
        this.tilesData = 0;
        this.mapHeight = 0;
        this.mapWidth = 0;
        this.tileHeight = 0;
        this.tileWidth = 0;
        this.enemyMas = [];
        this.enemyMasInCurrentField = [];
        this.blockMas = [];
        this.blockMasInCurrentField = [];
        this.gameUnitMas = [];
        this.gameUnitMasInCurrentField = [];
        this.actor = actor;
        canvas.height = window.innerHeight - 30;
        canvas.style.backgroundImage = 'url("images/GameUnits/Background.png")'
    }

    parseMapProperties(map) {
        let objMap = JSON.parse(map);
        this.tileHeight = objMap.tileheight;
        this.tileWidth = objMap.tilewidth;
        this.mapHeight = objMap.height;
        this.mapWidth = objMap.width;
        canvas.width = this.mapWidth * this.tileWidth;
        this.setUpObjects(objMap.layers[0].data, objMap.layers[1].objects);
        this.updateBlockMasInCurrentField();
        this.updateEnemyMasInCurrentField();
        this.updateGameUnitMasInCurrentField();
    }

    getObjectByID(objMas, ID) {
        for(let obj of objMas){
            if(obj.gid === ID) {
                return obj;
            }
        }
        return false
    }

    setUpObjects(tilesData, objMas) {
        let blockFactory = new BlockFactory();
        let enemyFactory = new EnemyFactory();
        let gameUnitFactory = new GameUnitFactory();
        for(let i = 0; i < this.mapHeight; ++i){
            for(let j = 0; j < this.mapWidth; ++j) {
                let currentObj = this.getObjectByID(objMas, tilesData[this.mapWidth * i + j]);
                if(currentObj) {
                    let yOffset = this.mapHeight * this.tileHeight - canvas.height;
                    if(currentObj.type === 'Block') {
                        this.blockMas.push(
                            blockFactory.createBlock(currentObj.name, currentObj.gid,
                                currentObj.width, currentObj.height,
                                j * this.tileWidth, i * this.tileHeight - yOffset));
                    }

                    if(currentObj.type === 'Enemy') {
                        this.enemyMas.push(
                            enemyFactory.createEnemy(currentObj.name, currentObj.gid,
                                currentObj.width, currentObj.height,
                                j * this.tileWidth, i * this.tileHeight - yOffset));
                    }

                    if(currentObj.type === 'GameUnit') {
                        this.gameUnitMas.push(
                            gameUnitFactory.createGameUnit(currentObj.name, currentObj.gid,
                                currentObj.width, currentObj.height,
                                j * this.tileWidth, i * this.tileHeight - yOffset));
                    }
                }
            }
        }
    }

    updateBlockMasInCurrentField() {
        this.blockMasInCurrentField = this.blockMas.filter(function (el) {
            return ( el.yBlockLocation > 0 && el.yBlockLocation < canvas.height )
        })
    }

    updateEnemyMasInCurrentField() {
        this.enemyMasInCurrentField = this.enemyMas.filter(function (el) {
            return ( el.yEnemyLocation > 0 && el.yEnemyLocation < canvas.height )
        })
    }

    updateGameUnitMasInCurrentField() {
        this.gameUnitMasInCurrentField = this.gameUnitMas.filter(function (el) {
            return ( el.yUnitLocation > 0 && el.yUnitLocation < canvas.height )
        })
    }

    pushDownGameUnits(actorHeightDiff) {
        for(let unit of this.gameUnitMas) {
            unit.yUnitLocation += actorHeightDiff;
        }
    }

    pushDownBlocks(actorHeightDiff) {
        for(let block of this.blockMas) {
            block.yBlockLocation += actorHeightDiff;
        }
    }

    pushDownEnemies(actorHeightDiff) {
        for(let enemy of this.enemyMas) {
            enemy.yEnemyLocation += actorHeightDiff;
            if(enemy.centerPoint) {
                enemy.centerPoint += actorHeightDiff
            }
        }
    }

    scrollMap(actorHeightDiff) {
        this.pushDownGameUnits(actorHeightDiff);
        this.pushDownBlocks(actorHeightDiff);
        this.pushDownEnemies(actorHeightDiff);
        this.updateEnemyMasInCurrentField();
        this.updateBlockMasInCurrentField();
        this.updateGameUnitMasInCurrentField();
    }

    drawBlocks() {
        for(let block of this.blockMasInCurrentField) {
            ctx.drawImage(block.blockImage, block.xBlockLocation, block.yBlockLocation,
                          block.blockWidth, block.blockHeight)
        }
    }

    drawEnemies() {
        for(let enemy of this.enemyMasInCurrentField) {
            ctx.drawImage(enemy.enemyImage, enemy.xEnemyLocation, enemy.yEnemyLocation,
                          enemy.enemyWidth, enemy.enemyHeight)
        }
    }

    drawGameUnits(){
        for(let unit of this.gameUnitMasInCurrentField) {
            ctx.drawImage(unit.gameUnitImageCurrentState, unit.xUnitLocation, unit.yUnitLocation,
                          unit.unitWidth, unit.unitHeight)
        }
    }

    drawActor() {
        ctx.drawImage(this.actor.actorCurrentStateImage, this.actor.xActorLocation, this.actor.yActorLocation,
            this.actor.actorWidth, this.actor.actorHeight)
    }

    drawBullet() {
        ctx.drawImage(this.actor.bullet.bulletImage, this.actor.bullet.xBulletLocation, this.actor.bullet.yBulletLocation,
            this.actor.bullet.bulletWidth, this.actor.bullet.bulletHeight)
    }

    drawMap() {
        ctx.clearRect(0, 0, this.mapWidth * this.tileWidth, this.mapHeight * this.tileHeight);
        this.drawBlocks();
        this.drawEnemies();
        this.drawGameUnits();
        this.drawActor();
        if(this.actor.bullet.isBulletFired) {
            this.drawBullet();
        }
    }
}

function loadMap(path, map) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            map.parseMapProperties(request.responseText)
        }
    };
    request.open("GET", path, false);
    request.send();
}