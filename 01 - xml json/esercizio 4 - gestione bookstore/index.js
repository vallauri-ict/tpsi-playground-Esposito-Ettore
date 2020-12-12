"use strict"

window.onload = function()
{
    //prendo il json
    let jsonStr = localStorage.getItem("bookstore_json");
    //alert(jsonStr);
    let BookStore = JSON.parse(jsonStr);
    console.log(BookStore);

    //tabella
    let _table = document.createElement("table"), _body = document.getElementsByTagName("body")[0];
    _body.appendChild(_table);
    CreaIntestazione();
    CaricaTabella();

    //div
    let CurBook = 0;
    let _div = document.createElement("div");
    _div.classList.toggle("dettagli", true);
    CaricaLibroDiv();
    _body.appendChild(_div);

    //buttons
    CreaBottoni();
    let _btmNav = document.getElementsByName("btmNav");
    _btmNav[2].disabled = true;


    //elenco funzioni
    function CreaIntestazione()
    {

        let intestazioni = ["Title", "Authors", "Category", "Price", "Delete"];
        let _th, _tr = document.createElement("tr");
        _table.appendChild(_tr);
        for(let i = 0; i < intestazioni.length; i++)
        {
            _th = document.createElement("th");
            _th.innerHTML = intestazioni[i];
            _tr.appendChild(_th);
        }
    }

    function CaricaTabella()
    {
        for(let i = 0; i < BookStore.length; i++)
        {
            let item = BookStore[i];
            let _tr = document.createElement("tr");
            _table.appendChild(_tr);

            let _td=document.createElement("td");
            if(item.hasOwnProperty("Title"))
                _td.innerHTML = item.Title;
            _tr.appendChild(_td);

            _td=document.createElement("td");
            if(item.hasOwnProperty("Authors"))
                _td.innerHTML = item.Authors.join('<br/>');
            _tr.appendChild(_td);

            _td=document.createElement("td");
            if(item.hasOwnProperty("Category"))
                _td.innerHTML = item.Category;
            _tr.appendChild(_td);

            _td=document.createElement("td");
            if(item.hasOwnProperty("Price"))
                _td.innerHTML = item.Price;
            _tr.appendChild(_td);

            _td = document.createElement("td");
            let _btm = document.createElement("Button");
            _btm.innerHTML = "DELETE";
            _btm.setAttribute("pos", i.toString());
            _btm.addEventListener("click", EliminaLibro);
            _tr.appendChild(_td);
            _td.appendChild(_btm);
        }
    }

    function CaricaLibroDiv()
    {
        _div.innerHTML = "";
        for (let key in BookStore[CurBook])
        {
            let _p = document.createElement("p");
            _p.innerHTML = key + ": ";
            _p.style.textAlign = "Right";
            _p.style.fontWeight = "Bold";
            _div.appendChild(_p);

            _p = document.createElement("p");
            _p.style.overflow = "Auto";

            _p.innerHTML = BookStore[CurBook][key];
            _div.appendChild(_p);
        }
    }

    function CreaBottoni()
    {
        let _divNav = document.createElement("div");
        _divNav.classList.toggle("pusantiNavigazione", true);
        _body.appendChild(_divNav);
        let testi = ["inizio", "avanti", "indietro", "fine", "Aggiungi", "Elimina per categoria"];
        for(let item of testi)
        {
            let _btm = document.createElement("button");
            _btm.innerHTML = item;
            _btm.addEventListener("click", gestioneButton);
            _btm.name = "btmNav";
            _divNav.appendChild(_btm);
        }
    }

    function gestioneButton()
    {
        switch (this.innerHTML)
        {
            case "inizio":
                CurBook = 0;
                _btmNav[2].disabled = true;
                _btmNav[1].disabled = false;
                break;
            case "avanti":
                CurBook++;
                if(CurBook == BookStore.length - 1)
                    this.disabled = true;
                _btmNav[2].disabled = false;
                break;
            case "indietro":
                CurBook--;
                if(CurBook == 0)
                    this.disabled = true;
                _btmNav[1].disabled = false;
                break;
            case "fine":
                CurBook = BookStore.length - 1;
                _btmNav[1].disabled = true;
                _btmNav[2].disabled = false;
                break;
            case "Aggiungi":
                window.location.href = "pagina2.html";
                break;
            case "Elimina per categoria":
                let cat = prompt("Inserisci la categoria da eliminare:");
                let found = 0;
                for (let i = BookStore.length - 1; i >= 0 ; i--)
                    if (BookStore[i].Category == cat)
                    {
                        BookStore.splice(i, 1);
                        found++;
                    }
                if(found != 0)
                {
                    localStorage.setItem("bookstore_json", JSON.stringify(BookStore));
                    if(found == 1)
                        alert("Eliminato un libro");
                    else
                        alert("Eliminati " + found + " libri");
                    window.location.reload();
                }
                else
                    alert("Categoria non esistente");
                break;
            default:
                break;
        }
        CaricaLibroDiv();
    }

    function EliminaLibro()
    {
        let pos = parseInt(this.getAttribute("pos"));
        BookStore.splice(pos, 1);
        localStorage.setItem("bookstore_json", JSON.stringify(BookStore));
        window.location.reload();
    }
}

function GeneraNumero(min, max)
{
    return Math.floor((max - min + 1 ) * Math.random() + min);
}