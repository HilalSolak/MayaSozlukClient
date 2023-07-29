import React, { useState } from 'react';
import axios from 'axios';
import './HomePage.css';

async function getFilteredWords(searchText) {
    const filteredWords = await axios.get(`http://localhost:8080/api/words/screen/filter?filter=${searchText}`)
        .then(res => res.data);
    return filteredWords;
}

function addWordToUl(data, onWordClick) {
    const wordListElement = document.getElementById("wordList");
    wordListElement.innerHTML = "";
    console.log(data)
    for (let i = 0; i < data.length; i++) {
                const word = data[i];

                const listItem = document.createElement("li");
                listItem.innerHTML = `<button class="word-btn" > ${word.mayaWord}</button>`;

                listItem.querySelector(".word-btn ").addEventListener("click", () => {
                    async function increaseWordSearchCount(mayaWord) {
                        try {
                            await axios.put(`http://localhost:8080/api/words/screen/increase/${(mayaWord)}`);
                        } catch (error) {
                            console.error("Error:", error);
                        }
                    }
                    onWordClick(word.meaning);
                    increaseWordSearchCount(word.mayaWord);

                });

                wordListElement.appendChild(listItem);
            }


}


function WordList() {
    const [wordMeaning, setWordMeaning] = useState("");

    async function showWords(event) {
        event.preventDefault();
        const searchText = event.target.searchWord.value;
        const data = await getFilteredWords(searchText);

        if (data.length === 0) {
            const wordListElement = document.getElementById("wordList");
            wordListElement.innerHTML = "Kelime mevcut değildir.";
        } else {
            addWordToUl(data, handleWordClick);
        }

        setWordMeaning("");

    }

    function handleWordClick(meaning) {
        setWordMeaning(meaning);
    }

    return (
        <>
            <div>
                <h1>Kelime Listele</h1>
                <form onSubmit={showWords}>
                    <label>ARA: </label>
                    <input type="text" name="searchWord" />
                    <input type="submit" value="ara" />
                </form>
            </div>

            <div>
                <h2 style={{textAlign:'left'}}>Words</h2>

                <ul id="wordList"></ul>
            </div>
            <div className="container1"> {/* Ana konteyner */}
            <div>
                <p className="word-meaning">{wordMeaning}</p>
            </div></div>
        </>
    );
}

export default WordList;
