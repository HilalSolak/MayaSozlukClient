import React, {useState} from "react";
import "../App.css"
import WordAdd from "./WordAdd";
import WordList from "./WordList";

function Tabs() {
    const [toggleState, setToggleState] = useState(1);

    const toggleTab = (index) => {
        setToggleState(index);
    };

    return (
        <div className="container">
            <div className="bloc-tabs" >
                <button
                    className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
                    onClick={() => toggleTab(1)}
                >
                    Word List
                </button>
                <button
                    className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
                    onClick={() => toggleTab(2)}
                >
                    Word Add
                </button>
            </div>

            <div className="content-tabs">
                <div
                    className={toggleState === 1 ? "content  active-content" : "content"}
                    style={{ overflowY: "auto", maxHeight: "600px" }}
                >
                    {toggleState == 1 ? <WordList/> : ""}
                </div>

                <div
                    className={toggleState === 2 ? "content  active-content" : "content"}
                >
                    {toggleState == 2 ? <WordAdd/> : ""}
                </div>
            </div>
        </div>
    );
}

export default Tabs;