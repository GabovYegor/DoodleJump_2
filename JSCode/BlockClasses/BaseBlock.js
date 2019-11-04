class BaseBlock {
    constructor(blockID = 0, blockWidth = 0, blockHeight = 0, xBlockLocation = 0, yBlockLocation = 0) {
        this.blockID = blockID;
        this.blockWidth = blockWidth;
        this.blockHeight = blockHeight;
        this.xBlockLocation = xBlockLocation;
        this.yBlockLocation = yBlockLocation;
        this.blockSound = new Audio('sounds/BlockSounds/commonBlockSound.mp3');
    }

    blockAction() {}

    blockCollisionWithActorAction() {
        this.blockSound.play();
    }
}