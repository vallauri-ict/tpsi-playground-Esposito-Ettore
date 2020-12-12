"use strict"

window.onload = function()
{
    let users = json.results;
    let naz = [];
    let _slt = document.getElementById("lstNazioni");
    let _div = document.getElementById("dettagli");
    console.log(users);
    CaricaNazionalità();
    CaricaIntestazione();
    CaricaTabella();

    //elenco funzioni

    function CaricaNazionalità()
    {
        for(let i = 0; i < users.length; i++)
            if(!naz.includes(users[i].nat))
            {
                let _option = document.createElement("option");
                _option.innerHTML = users[i].nat;
                _option.name = "naz";
                _slt.appendChild(_option);
                naz.push(users[i].nat);
            }
        _slt.addEventListener("change", CaricaTabella);
    }

    function CaricaIntestazione()
    {
        let _thead = document.getElementById("thead");
        let _tr = document.createElement("tr"), _th;
        let campi = ["name", "username", "state", "nat", "img"];
        _thead.appendChild(_tr);
        for(let item of campi)
        {
            _th = document.createElement("th");
            _th.innerHTML = item;
            _tr.appendChild(_th);
        }
    }

    function CaricaTabella()
    {
        let _tbody = document.getElementById("tbody");
        let _tr, _td;
        _tbody.innerHTML = "";
        _div.innerHTML = "";
        for(let i = 0; i < users.length; i++)
        {
            let item = users[i];
            if(_slt.value == "tutti" || _slt.value == item.nat)
            {
                _tr = document.createElement("tr");
                _tbody.appendChild(_tr);

                _td = document.createElement("td");
                _td.innerHTML = item.name.first + " " + item.name.last;
                _tr.appendChild(_td);

                _td = document.createElement("td");
                _td.innerHTML = item.login.username;
                _tr.appendChild(_td);

                _td = document.createElement("td");
                _td.innerHTML = item.location.state;
                _tr.appendChild(_td);

                _td = document.createElement("td");
                _td.innerHTML = item.nat;
                _tr.appendChild(_td);

                _td = document.createElement("td");
                _tr.appendChild(_td);
                let _img = document.createElement("img");
                _img.src = item.picture.thumbnail;
                _img.style.width = "50px";
                _img.style.height = "50px";
                _img.addEventListener("click", function () { VisualizzaDettagli(i) });
                _td.appendChild(_img);
            }
        }
    }

    function VisualizzaDettagli(pos)
    {
        let user = users[pos];
        _div.innerHTML = "";

        let _img = document.createElement("img");
        _img.src = user.picture.large;
        _div.appendChild(_img);

        let _p = document.createElement("p");
        _p.innerHTML = user.name.first + " " + user.name.last;
        _div.appendChild(_p);

        _p = document.createElement("p");
        _p.innerHTML = user.email;
        _div.appendChild(_p);

        _p = document.createElement("p");
        _p.innerHTML = user.phone;
        _div.appendChild(_p);

        _p = document.createElement("p");
        _p.innerHTML = user.cell;
        _div.appendChild(_p);

        let _btm = document.createElement("button");
        _btm.innerHTML = "ELIMINA";
        _btm.addEventListener("click", function () { EliminaRecord(pos) });
        _div.appendChild(_btm);
    }

    function EliminaRecord(pos)
    {
        let nat = users[pos].nat;
        users.splice(pos, 1);
        _div.innerHTML = "";

        let i;
        for(i = 0; i < users.length - 1 && users[i].nat != nat; i++);
        if(nat != users[i].nat)
        {
            i = naz.indexOf(nat) + 1;
            let _options = document.getElementsByTagName("option");
            _slt.removeChild(_options[i]);
            naz.splice(i, 1);
        }
        CaricaTabella();
    }
}

function GeneraNumero(min, max)
{
    return Math.floor((max - min + 1 ) * Math.random() + min);
}