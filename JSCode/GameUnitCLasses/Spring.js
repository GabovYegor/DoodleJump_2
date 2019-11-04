class Spring  extends BaseGameUnit {
    constructor(unitID = 0, unitWidth = 0, unitHeight = 0, xUnitLocation = 0, yUnitLocation = 0) {
        super(unitID, unitWidth, unitHeight, xUnitLocation, yUnitLocation + 15);

        this.speedFromSpring = 40;
        this.gameUnitType = 'Spring';
        this.gameUnitImageCurrentState = new Image();
        this.gameUnitImageCurrentState.src = 'images/GameUnits/SpringOff.png';
        this.gameUnitImageOffState = new Image();
        this.gameUnitImageOffState.src = 'images/GameUnits/SpringOff.png';
        this.gameUnitImageOnState = new Image();
        this.gameUnitImageOnState.src = 'images/GameUnits/SpringOn.png';
        this.gameUnitSound = new Audio('sounds/GameUnitSounds/SpringSound.mp3');
    }

    gameUnitCollisionAction(isActorAbove) {
        if(isActorAbove) {
            this.gameUnitImageCurrentState = this.gameUnitImageOnState;
            this.yUnitLocation -= this.unitHeight;
            this.unitHeight *= 2;
        }
        this.gameUnitSound.play();
    }
}