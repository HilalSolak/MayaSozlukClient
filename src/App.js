import React from 'react';
import Tabs from "./view/Tabs";
import './view/bootstrap/dist/css/bootstrap.css'
import Background from './images/login-mobileheader-bg.jpg'

function App() {
    return (
        <>
            <nav style={{paddingTop:0,paddingBottom:0}} className="navbar bg-body-tertiary">
                <div style={{backgroundImage:`url(${Background})`,height:80}} className="container-fluid">
                    <a style={{fontSize:38,fontFamily:'American Typewriter'}} className="navbar-brand" href="#">
                            MAYA-DICT
                    </a>
                </div>
            </nav>
            <div className="App">
                <Tabs/>
            </div>
        </>

    );
}

export default App;

