class HighScoreTableManager {
    addRecordToHighScoreTable(newRecord) {
        let currentHighScoreTable = this.getHighScoreTable();
        if(currentHighScoreTable) {
            currentHighScoreTable.push(newRecord);
        }
        else {
            let currentHighScoreTable = [];
            currentHighScoreTable[0] = newRecord;
        }
        currentHighScoreTable.sort(function (lhs, rhs) {
            if(lhs.level === rhs.level) {
                return rhs.score - lhs.score;
            }
            else {
                return rhs.level - lhs.level;
            }
        });
        localStorage.setItem('HighScoreTable', JSON.stringify(currentHighScoreTable));
    }

    getHighScoreTable() {
        let currentHighScoreTable = JSON.parse(localStorage.getItem('HighScoreTable'));
        if(currentHighScoreTable) {
            return currentHighScoreTable
        }
        else {
            return []
        }
    }
}