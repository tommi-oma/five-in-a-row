import React from "react";


const App = function() {
    const [text, setText] = React.useState("Smooth Sailing");

    return <div className="App">
        <p>{text}</p>
    </div>
}

export default App
