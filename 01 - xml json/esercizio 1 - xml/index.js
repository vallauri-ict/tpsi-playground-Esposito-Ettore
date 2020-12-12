"use strict"
window.onload = function inizializza()
{

}

function crea()
{
    localStorage.setItem("bookstore_xml", bookstore);
    alert("Successo!");
}

function visualizza()
{
    let xml = localStorage.getItem("bookstore_xml"); //prende la stringa dal local storage
    let parser = new DOMParser(); //crea un parser per xml
    let xmldoc = parser.parseFromString(xml,"text/xml"); //trasformo la stringa in xml

    //righe per vedere se è tutto ok
    let serializer = new XMLSerializer();
    let aus = serializer.serializeToString(xmldoc);
    console.log(aus);

    //accedo alla radice dell'albero
    let root = xmldoc.documentElement;
    let nLibri = root.children.length;
    let _table = document.getElementById("tabLibri");
    _table.innerHTML = "";
    for (let i = 0; i < nLibri; i++)
    {
        let book = root.children[i];
        let _tr = document.createElement("tr");
        _table.appendChild(_tr);
        let campi = new Array(6);
        let childs = book.children;

        for(let j = 0; j < campi.length; j++)
            campi[j] = "";
        if(book.hasAttribute("category"))
            campi[1] += book.getAttribute("category");
        for (let j = 0; j < childs.length; j++)
            switch (childs[j].tagName)
            {
                case "title":
                    campi[0] += childs[j].textContent;
                    if(childs[j].hasAttribute("lang"))
                        campi[2] += childs[j].getAttribute("lang");
                    break;
                case "author":
                    campi[3] += childs[j].textContent + "<br/>";
                    break;
                case "year":
                    campi[4] += childs[j].textContent + "<br/>";
                    break;
                case "price":
                    campi[5] += childs[j].textContent + "€";
                    break;
                default:
                    console.error("tag " + childs[j].tagName + " " + i + ", " + j + " non riconosciuto");
                    break;
            }

        for(let j = 0; j < campi.length; j++)
        {
            let _td = document.createElement("td");
            _td.innerHTML = campi[j];
            _tr.appendChild(_td);
        }
    }
}

function GeneraNumero(min, max)
{
    return Math.floor((max - min + 1 ) * Math.random() + min);
}