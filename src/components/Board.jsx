import React from 'react';

const boardSize = { width: 800, height: 800 };
const cell_size = 20;
const rows = boardSize.height / cell_size;   
const cols = boardSize.width / cell_size;

class Board extends React.Component {
    constructor(props) {
        super(props)
        this.game = props.game;
        this.boardRef = null;
        this.state = {cells: [], board: new Array(boardSize.height*boardSize.width).fill(null), lastMove: -1};
    }
    
    handleClick = (evt) => {
        // TODO: check if already clicked?
        const rect = this.boardRef.getBoundingClientRect();
        let offsetX = evt.clientX - rect.left; //x position within the element.
        let offsetY = evt.clientY - rect.top;  //y position within the element.
        const x = Math.floor(offsetX / cell_size);    
        const y = Math.floor(offsetY / cell_size);
        const index = y * rows + x;
        console.log("Clicked", {x, y}, index)
        if (this.state.board[index]) {
            return;
        }
        let boardAfterMove = this.game.makeUserMove(y, x);
        let cells = this.createCells(boardAfterMove)
        this.setState({cells:cells, board: boardAfterMove})
        this.game.makeOpponentMove().then((moveResult)=> {
            console.log("Opponent moved", moveResult.chosen)
            this.setState({board: moveResult.board, cells: this.createCells(moveResult.board), lastMove: moveResult.chosen})
        });
    }

    createCells = (board) => {
        let cells = board
            .map((val,i) => {return {val:val, idx: i}})
            .filter(v => v.val != null);
        return cells;
    }

    render() {
        return <div
            className="Board"
            style={{ width: boardSize.width, height: boardSize.height, backgroundSize: `${cell_size}px ${cell_size}px` }}
            onClick={this.handleClick}
            ref={r => { this.boardRef = r; }}>
                {
                    this.state.cells.map(val=> {
                        let x = val.idx % cols;
                        let y = Math.floor(val.idx / cols)
                        let chosen = this.state.lastMove === val.idx;
                        return <Cell x={x} y={y} val={val.val} chosen={chosen} key={`${JSON.stringify(val)}`}/>
                        })}
        </div>
    }
}

const Cell = (props) => {  
        const { x, y, val, chosen } = props;
        let className = (val == 1 ? 'BlueCell' : 'RedCell')
        if (chosen) {
            className += val == 1 ? ' ChosenBlueCell' : ' ChosenRedCell'
        }
        return (
        <div className={className} style={{left: `${ 20 * x + 1}px`, top: `${20 * y + 1}px`, width: `${20 - 1}px`, height: `${20 - 1}px`}} />
        );  
}
export default Board;