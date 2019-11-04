class Portal extends BaseGameUnit {
    constructor(unitID = 0, unitWidth = 0, unitHeight = 0, xUnitLocation = 0, yUnitLocation = 0) {
        super(unitID, unitWidth, unitHeight, xUnitLocation, yUnitLocation);

        this.gameUnitType = 'Portal';
        this.gameUnitImageCurrentState = new Image();
        this.gameUnitImageCurrentState.src = 'images/GameUnits/Portal.png';
    }
}