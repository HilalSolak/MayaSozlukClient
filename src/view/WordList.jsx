import React, {useState} from 'react';
import axios from 'axios';
import './HomePage.css';
import './bootstrap/dist/css/bootstrap.css'

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
        listItem.innerHTML = `<button class="btn btn-outline-warning" > ${word.mayaWord}</button>`;

        listItem.querySelector(".btn-outline-warning ").addEventListener("click", () => {
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
                    <input type="text" className="form-control" name="searchWord" placeholder="Kelime ara"
                           aria-describedby="basic-addon1"/>
                    <button style={{marginTop:10}} type="submit" className="btn btn-primary" value="ara">ARA</button>
                </form>
            </div>

            <div style={{height:120}}>
                <h2 style={{textAlign: 'left'}}>Kelimeler</h2>

                <ul id="wordList"></ul>
            </div>
            <div className="container1">
                <div className="word-break">
                    <p className="word-meaning">{wordMeaning}</p>
                </div>
            </div>
        </>
);
}
export default WordList;
