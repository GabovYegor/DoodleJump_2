class BaseGameUnit {
    constructor(unitID = 0, unitWidth = 0, unitHeight = 0, xUnitLocation = 0, yUnitLocation = 0) {
        this.blocunitIDkID = unitID;
        this.gameUnitType = 'Base';
        this.unitWidth = unitWidth;
        this.unitHeight = unitHeight;
        this.xUnitLocation = xUnitLocation;
        this.yUnitLocation = yUnitLocation;
    }

    gameUnitAction() {}
    gameUnitCollisionAction(isActorAbove) {}
}