class BlockFactory {
    createBlock(blockType = 'CommonBlock', blockID = 0, blockWidth = 0,
                blockHeight = 0, xBlockLocation = 0, yBlockLocation = 0){
        switch (blockType) {
            case "CommonBlock": {
                return new CommonBlock(blockID, blockWidth, blockHeight, xBlockLocation, yBlockLocation)
            }

            case "MoveBlock": {
                return new XMoveBlock(blockID, blockWidth, blockHeight, xBlockLocation, yBlockLocation)
            }

            default: {
                throw Error
            }
        }
    }
}