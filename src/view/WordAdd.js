import axios from 'axios';
import React, { useState } from "react";

function addWordToDb(event, setWarning) {
    event.preventDefault();
    const mayaWord = event.target.mayaWord.value.trim();
    const meaning = event.target.meaning.value.trim();

    if (mayaWord === "") {
        setWarning("Kelime adı boş olamaz.");
        return;
    }

    axios.post("http://localhost:8080/api/words/screen", { mayaWord: mayaWord ,meaning: meaning})
        .then(res => {
            console.log(res.data);
            if (res.status === 201) {
                setWarning("Kelime başarıyla eklendi.");
            }
            else{
                setWarning("Kelime zaten mevcut.");

            }
        });
}

function WordAdd() {
    const [warning, setWarning] = useState("");

    return (
        <>
            <div>
                <h1>Kelime Ekle</h1>
                <form onSubmit={(event) => addWordToDb(event, setWarning)}>
                    <label>
                        Kelime adı:
                        <input type="text" name="mayaWord" />
                    </label>
                    <label>
                        Anlamı:
                        <input type="text" name="meaning" />
                    </label>
                    <input type="submit" value="Ekle" />
                </form>
                {warning && <p>{warning}</p>}
            </div>
        </>
    );
}

export default WordAdd;

