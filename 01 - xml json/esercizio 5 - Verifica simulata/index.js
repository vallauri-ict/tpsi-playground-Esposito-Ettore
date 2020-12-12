"use strict"

window.onload = function()
{
    let drink = cocktails["drinks"];
    let ingr = ingredients["ingredients"];
    let _slt = document.getElementById("lstIngredienti");
    let optSelected = "";
    console.log(drink);
    console.log(ingr);

    //inizializzo pagina
    CreaTabella();
    CreaSlt();
    MettiOpt();

    //elenco funzioni

    //funzioni di creazione
    function CreaTabella()
    {
        let _table = document.getElementById("table");
        let _tr, campi = ["", "id", "name", "alcohlic", "main ingridient", "Dettagli"];
        let dims = [40, 40, 60, 70, 70, 40];
        _table.innerHTML = "";
        _tr = document.createElement("tr");
        _table.appendChild(_tr);

        for(let i = 0; i < campi.length; i++)
        {
            let _th = document.createElement("th");
            _th.innerHTML = campi[i];
            _th.style.width = dims[i] + "px";
            _tr.appendChild(_th);
        }

        for (let i = 0; i < drink.length; i++)
        {
            if((optSelected == "" || drink[i].strAlcoholic == optSelected) &&
               (_slt.value == "" || drink[i].strIngredient1 == _slt.value))
            {
                _tr = document.createElement("tr");
                _table.appendChild(_tr);

                let _td = document.createElement("td");
                let _img = document.createElement("img");
                _img.src = drink[i].strDrinkThumb;
                _img.style.width = "40px";
                _tr.appendChild(_td);
                _td.appendChild(_img);

                _td = document.createElement("td");
                _td.innerHTML = drink[i].idDrink;
                _tr.appendChild(_td);

                _td = document.createElement("td");
                _td.innerHTML = drink[i].strDrink;
                _tr.appendChild(_td);

                _td = document.createElement("td");
                _td.innerHTML = drink[i].strAlcoholic;
                _tr.appendChild(_td);

                _td = document.createElement("td");
                _td.innerHTML = drink[i].strIngredient1;
                _tr.appendChild(_td);

                _td = document.createElement("td");
                _tr.appendChild(_td);
                let _a = document.createElement("a");
                _a.href = "#";
                _a.innerHTML = "Dettagli";
                _a.addEventListener("click", function () { VisualizzaDettagli(i) });
                _td.appendChild(_a);
            }
        }
    }

    function CreaSlt()
    {
       ingr.sort(function(a, b) {
            let str1 = a.strIngredient1.toUpperCase();
            let str2 = b.strIngredient1.toUpperCase();
            if (str1 < str2)
                return -1;
            else if (str1 > str2)
                return 1;
            else return 0;
        });
        let _op = document.createElement("option");
        _op.innerHTML = "";
        _slt.appendChild(_op);
        for (let i = 0; i < ingr.length; i++)
        {
            let _op = document.createElement("option");
            _op.innerHTML = ingr[i].strIngredient1;
            _slt.appendChild(_op);
        }
        _slt.addEventListener("change", CreaTabella);

        /*let list = [];
        for(let i = 0; i < ingr.length; i++)
        {
            let ch = ingr[i].strIngredient1[0].toUpperCase();
            list[i] = ch + ingr[i].strIngredient1.substring(1);
        }
        list.sort();
        let _op = document.createElement("option");
        _op.innerHTML = "";
        _slt.appendChild(_op);
        for (let item of list)
        {
            let _op = document.createElement("option");
            _op.innerHTML = item;
            _slt.appendChild(_op);
        }*/
    }
    
    function MettiOpt() 
    {
        let _opt = document.getElementsByName("optGroup");
        for (let i = 0; i < _opt.length; i++)
        {
            _opt[i].addEventListener("click", function () { FiltraOpt(i); });
        }
    }

    //funzoni utility
    function FiltraOpt(pos)
    {
        switch (pos)
        {
            case 1:
                optSelected = "Alcoholic";
                break;
            case 2:
                optSelected = "Non alcoholic";
                break;
            default:
                optSelected = "";
                break;
        }
        CreaTabella();
    }

    function VisualizzaDettagli(pos)
    {
        let _div = document.getElementById("dettagli");
        _div.innerHTML = "";

        let _h3 = document.createElement("h3");
        _h3.innerHTML = drink[pos].strDrink;
        _div.appendChild(_h3)

        let _p = document.createElement("p");
        _p.innerHTML = "Ingredienti: ";
        _p.innerHTML += drink[pos]["strIngredient1"];
        for (let i = 2; i <= 5 && drink[pos]["strIngredient" + i] != null; i++)
            _p.innerHTML += " - " + drink[pos]["strIngredient" + i];
        _div.appendChild(_p);

        let _img = document.createElement("img");
        _img.src = drink[pos].strDrinkThumb;
        _img.style.width = "140px";
        _div.appendChild(_img);
    }
}

function GeneraNumero(min, max)
{
    return Math.floor((max - min + 1 ) * Math.random() + min);
}