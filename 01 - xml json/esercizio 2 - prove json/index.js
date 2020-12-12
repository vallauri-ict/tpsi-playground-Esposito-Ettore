"use strict"



window.onload = function()
{
    let studente =
        {
            "nome" : "mario",
            "cognome" : "rossi",
            "eta" : 16,
            "studente" : true,
            "images" : ["smile.gif", "grim.gif", "frown.gif", "bomb.gif"],
            "hobbies" : [], // vettore al momento vuoto
            "pos": { "x": 40, "y": 300 }, // oggetto annidato
            "stampa" : function () { alert("Hello " + this.nome); },
            "fullName" : function () { return this.nome + " " + this.cognome; }
        }

    //stampe
    console.log(studente["eta"] + 1);
    console.log(studente.fullName());
    //console.log(studente["fullName"]());

    //aggiunta campi
    studente["residenza"] = "Fossano";
    console.log(studente["residenza"]);

    //controlli di esistenza
    if("classe" in studente) //if (studente.hasOwnProperty("classe"))
        console.log(studente["classe"]);
    else
        console.log("Non ha classe")

    //dichiiarazione di un nuovo object
    let studente2 = [];
    studente2["nome"] = "Pluto";
    studente2["residenza"] = "Albero";

    //scansione proprietà di un oggetto
    console.log("Studente: ");
    for (let key in studente)
        if(typeof(studente[key]) != "function")
             console.log(key + ": " + studente[key]);

    console.log("Studente2: ");
    for (let key in studente2)
        if(!studente2[key].toString().includes("function"))
            console.log(key + ": " + studente2[key]);

    //visualizzazione di un oggetto
    console.log(studente);
    //alert(studente); non serializza in automatico
    alert(JSON.stringify(studente));

    //vettore enumerativo delle chiavi
    let chiavi = Object.keys(studente);
    for(let i of chiavi)
        console.log(i);
}

function GeneraNumero(min, max)
{
    return Math.floor((max - min + 1 ) * Math.random() + min);
}