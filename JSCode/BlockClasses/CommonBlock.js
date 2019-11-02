class CommonBlock extends BaseBlock {
    constructor(blockID = 0, blockWidth = 0, blockHeight = 0, xBlockLocation = 0, yBlockLocation = 0) {
        super(blockID, blockWidth, blockHeight, xBlockLocation, yBlockLocation);
        this.speedFromBlock = 20;
        this.blockType = 'CommonBlock';
        this.blockImage = new Image();
        this.blockImage.src = 'images/Blocks/CommonBlock.png';
    }
}