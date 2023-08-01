import axios from 'axios';
import React, { useState } from "react";

function addWordToDb(event, setWarning) {
    event.preventDefault();
    const mayaWord = event.target.mayaWord.value.trim();
    const meaning = event.target.meaning.value.trim();

    if (mayaWord === "" && meaning === "") {
        setWarning("Kelime ve açıklama kısmını doldurunuz!");
        return;
    }
    if (mayaWord === "") {
        setWarning("Kelime girmediniz!");
        return;
    }
    if (meaning === "") {
        setWarning("Kelime açıklaması boş olamaz!");
        return;
    }


    axios.post("http://localhost:8080/api/words/screen", { mayaWord: mayaWord ,meaning: meaning ,title:"BI"})
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
                <form onSubmit={(event) => addWordToDb(event, setWarning)}>
                    <label>
                        <input type="text" className="form-control" name="mayaWord" placeholder="Kelime"
                               aria-describedby="basic-addon1"/>
                    </label>
                    <label>
                        <input style={{marginLeft:10}} type="text" className="form-control" name="meaning" placeholder="Açıklama"
                               aria-describedby="basic-addon2"/>
                    </label>
                    <button style={{marginLeft:20, marginBottom:5}} type="submit" className="btn btn-primary" value="Ekle">EKLE</button>
                </form>
                {warning && <p>{warning}</p>}
            </div>
        </>
    );
}

export default WordAdd;

