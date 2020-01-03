export default class cell {
    private lineIndex: number;
    private columnIndex: number;
    private playedByPlayerNumber: number;

    constructor(lineIndex: number, columnIndex: number, playedByPlayerNumber: number) {
        this.lineIndex = lineIndex;
        this.columnIndex = columnIndex;
        this.playedByPlayerNumber = playedByPlayerNumber;
    }

    setLineIndex(lineIndex: number) {
        this.lineIndex = lineIndex;
    }

    getLineIndex() {
        return this.lineIndex;
    }

    setColumnIndex(columnIndex: number) {
        this.columnIndex = columnIndex;
    }

    getColumnIndex() {
        return this.columnIndex;
    }

    setPlayedByPlayerNumber(playerNumber: number) {
        this.playedByPlayerNumber = playerNumber;
    }

    getPlayedByPlayerNumber() {
        return this.playedByPlayerNumber;
    }
}