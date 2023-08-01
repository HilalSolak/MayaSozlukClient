import axios from 'axios';
import React, { useState } from "react";

function addWordToDb(event, setWarning) {
    event.preventDefault();
    const mayaWord = event.target.mayaWord.value.trim();

    if (mayaWord === "") {
        setWarning("Kelime girmediniz!");
        return;
    }


    axios.post("http://localhost:8080/api/words/screen/meaning", { mayaWord: mayaWord ,title:"BI"})
        .then(res => {
            console.log(res.data);
            if (res.status === 201) {
                setWarning("Açıklama talebi başarıyla eklendi.");
            }
            else{
                setWarning("Kelime zaten mevcut.");
            }
        });
}

function MeaningRequest() {
    const [warning, setWarning] = useState("");

    return (
        <>
            <div>
                <form onSubmit={(event) => addWordToDb(event, setWarning)}>
                    <label>
                        <input type="text" className="form-control" name="mayaWord" placeholder="Kelime"
                               aria-describedby="basic-addon1"/>
                    </label>
                    <button style={{marginLeft:20, marginBottom:5}} type="submit" className="btn btn-primary" value="Ekle">EKLE</button>
                </form>
                {warning && <p>{warning}</p>}
            </div>
        </>
    );
}

export default MeaningRequest;