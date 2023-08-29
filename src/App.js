import "./App.css";

import { useState } from "react";

import ATM from "./components/ATM";

function App() {
    const [showATM, setShowATM] = useState(false);
    return (
        <div>
            <h1>Bank</h1>

            <button onClick={() => setShowATM((prevState) => !prevState)}>
                {showATM ? "Hide" : "Show"} ATM
            </button>
            {showATM && <ATM />}
        </div>
    );
}

export default App;
