import React from 'react';
import {Routes, Route } from 'react-router-dom';
import HomePage from './view/HomePage';
import Navbar from "./view/NavBar"
import WordAdd from "./view/WordAdd";
import WordList from "./view/WordList";

function App() {
    return (
        <>
            <Navbar />
            <div className="container">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/add-word" element={<WordAdd />} />
                    <Route path="/show-list" element={<WordList/>} />

                </Routes>
            </div>

        </>

    );
}

export default App;

