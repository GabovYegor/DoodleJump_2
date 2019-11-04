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