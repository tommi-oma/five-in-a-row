import Game from "./Game";
import React from "react";
import Board from "./components/Board";

const App = function () {
    const ai = new Game(40, 40)
    return <div className="App">
        <Board game={ai}/>
    </div>
}

export default App
