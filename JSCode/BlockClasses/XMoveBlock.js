class XMoveBlock extends BaseBlock {
    constructor(blockID = 0, blockWidth = 0, blockHeight = 0, xBlockLocation = 0, yBlockLocation = 0) {
        super(blockID, blockWidth, blockHeight, xBlockLocation, yBlockLocation);
        this.moveDirection = false;
        this.speedFromBlock = 20;
        this.moveBlockSpeed = 3
        this.blockType = 'XMoveBlock';
        this.blockImage = new Image();
        this.blockImage.src = 'images/Blocks/XMoveBlock.png';
    }

    blockAction() {
        if(this.moveDirection){
            this.xBlockLocation += this.moveBlockSpeed;
        }
        else {
            this.xBlockLocation -= this.moveBlockSpeed;
        }

        if(this.xBlockLocation <= 0) {
            this.moveDirection = true
        }

        if(this.xBlockLocation >= canvas.width - this.blockWidth) {
            this.moveDirection = false
        }
    }
}
