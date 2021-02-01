const USER = 1
const AI = 2
const EASY = 1;
const NORMAL = 2;
const DIFFICULT = 3;

export default class Game {
    constructor(rows, cols, useAI=true) {
        this.rows = rows ? rows : 40
        this.cols = cols ? cols : 40
        this.board = new Array(rows*cols).fill(null)
        this.useAI = useAI;
        this.difficulty = NORMAL;
        this.whoWon = 0;
    }

    makeUserMove = (row, col) => {
        this.board[this._PositionToIndex(row, col)] = USER;
        return [...this.board];
    }

    makeOpponentMove = () => {
        if (this.useAI) {
            return new Promise((resolve) => resolve(this.makeAIMove()))
        } else {
            return null;
        }
    }

    makeAIMove = () => {
        let chosen;
        if (this.board.filter(v=>v==null).length===(this.cols*this.rows)) {
            chosen = this._PositionToIndex(Math.floor(this.rows/2), Math.floor(this.cols/2));
            this.board[chosen] = AI;
        } else {
            if (this.difficulty === DIFFICULT) {
                
            } else {
                let priorities = this.calculatePriorities(this.board);
                chosen = this.chooseMove(priorities);
                this.board[chosen] = AI
            }
        }
        return {board: [...this.board], chosen: chosen};
    }

    chooseMove = (priorities) => {
        if (this.difficulty === NORMAL) {
            let highest;
            for (let i = priorities.length - 1 ; i >= 0 ; --i) {
                if (priorities[i].length > 0) {
                    highest = i;
                    break;
                }
            }
            return priorities[highest][getRandomInt(priorities[highest].length)];
        }
    }

    calculatePriorities(board) {
        let table = [];
        for(let i = 0 ; i <= 15 ; ++i) {
            table.push([])
        }
        for (let i = 0 ; i < board.length ; ++i) {
            table[this.calculateCellPriority(board, i)].push(i)
                
            
        }
        return table;
    }

    calculateCellPriority = (board, index) => {
        let horizontalAICells, verticalAICells;
        let horizontalUserCells, verticalUserCells;
        
        return board[index] ? 0 : Math.floor(Math.random()*15);
    }

    _PositionToIndex = (row, col) => {
        return row*this.cols + col
    }
}

const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max))
}

/*
 * Priorities
 15 immediate win
 14 block immediate win
 13 open four
 12 block open four
 11 open double three
 10 block open double three
 9 closed four
 8 open three
 7 block closed four
 6 block open three
 5 open 2+2
 4 closed 3
 3 block 2+2
 2 open 2
 1 others
 */