class GameUnitFactory {
    createGameUnit(unitType = 'SpringOff', unitID = 0, unitWidth = 0,
                   unitHeight = 0, xUnitLocation = 0, yUnitLocation = 0) {
        switch (unitType) {
            case "SpringOff": {
                return new Spring(unitID, unitWidth, unitHeight, xUnitLocation, yUnitLocation);
            }

            case "Portal": {
                return new Portal(unitID, unitWidth, unitHeight, xUnitLocation, yUnitLocation);
            }
        }
    }
}