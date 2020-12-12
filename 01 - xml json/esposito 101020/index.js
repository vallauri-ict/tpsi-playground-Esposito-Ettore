"use strict"

let intestazioni = ["idMeal", "strMeal", "img", "", ""];
let larghezze = ["50px", "310px", "60px", "40px", "40px"];

window.onload=function()
{
    let meals = details["meals"];
    let category = categoryList;
    let _opt;
    let _table = document.getElementById("table");
    let _first = document.getElementById("first");
    let _prev = document.getElementById("prevPage");
    let _next = document.getElementById("nextPage");
    let _last = document.getElementById("last");
    let _npag = document.getElementById("nPagina");
    let page = 0;
    console.log(meals);
    console.log(category);

    CaricaOpt();
    CaricaTabella();
    ImpostaBottoni();

    //elenco funzioni
    function CaricaOpt()
    {
        let _div = document.getElementById("radioWrapper");
        for(let key in category)
        {
            let _opt = document.createElement("input");
            _opt.type = "radio";
            _opt.name = "category";
            _opt.value = key;
            _opt.addEventListener("click", ImpostaBottoni);
            _div.appendChild(_opt);

            let _span = document.createElement("span");
            _span.innerHTML = key;
            _div.appendChild(_span);

            let _br = document.createElement("br");
            _div.appendChild(_br);
        }
        _opt = document.getElementsByName("category");
        _opt[0].checked = true;
    }

    function CaricaIntestazione()
    {
        let _tr, _th;
        _tr = document.createElement("tr");
        _table.appendChild(_tr);

        for(let item in intestazioni)
        {
            _th = document.createElement("th");
            _th.innerHTML = intestazioni[item];
            _th.style.width = larghezze[item];
            _tr.appendChild(_th);
        }
    }

    function CaricaTabella()
    {
        let _tr, _td, _img;
        let pos;

        _table.innerHTML = "";
        CaricaIntestazione();

        for(pos = 0; !_opt[pos].checked; pos++);
        let cat = _opt[pos].value;
        let cont = 0;
        for(let key in category[cat])
        {
            if(cont >= page)
            {
                let _tr = document.createElement("tr");
                _table.appendChild(_tr);

                _td = document.createElement("td");
                _td.innerHTML = category[cat][key].idMeal;
                _tr.appendChild(_td);

                _td = document.createElement("td");
                _td.innerHTML = category[cat][key].strMeal;
                _tr.appendChild(_td);

                _td = document.createElement("td");
                _tr.appendChild(_td);
                _img = document.createElement("img");
                _img.src = category[cat][key].strMealThumb;
                _img.style.width = "55px";
                _img.addEventListener("click", function () { ApriFilmato(category[cat][key].idMeal) });
                _td.appendChild(_img);

                _td = document.createElement("td");
                _tr.appendChild(_td);
                _img = document.createElement("img");
                _img.src = "img/lente.jpg";
                _img.style.width = "30px";
                _img.addEventListener("click", function () { VisualizzaDettagli(category[cat][key].idMeal) });
                _td.appendChild(_img);

                _td = document.createElement("td");
                _tr.appendChild(_td);
                _img = document.createElement("img");
                _img.src = "img/delete.png";
                _img.style.width = "30px";
                _img.addEventListener("click", function () { Elimina(cat, key, category[cat][key].idMeal) });
                _td.appendChild(_img);
            }
            if(cont + 1 == page + 7)
                break;
            cont++;
        }

    }

    function ImpostaBottoni()
    {
        let pos;
        for(pos = 0; !_opt[pos].checked; pos++);
        let cat = _opt[pos].value;

        page = 0;
        if(category[cat].length <= 7)
        {
            _first.disabled = true;
            _next.disabled = true;
            _prev.disabled = true;
            _last.disabled = true;
            _npag.innerHTML = "1/1";
        }
        else
        {
            _first.disabled = true;
            _next.disabled = false;
            _prev.disabled = true;
            _last.disabled = false;

            let limitpage = (Math.floor(category[cat].length / 7) + 1);
            if(category[cat].length % 7 == 0)
                limitpage--;
            _npag.innerHTML = "1/" + limitpage;

            _first.addEventListener("click", Bottoni);
            _next.addEventListener("click", Bottoni);
            _prev.addEventListener("click", Bottoni);
            _last.addEventListener("click", Bottoni);
        }
        CaricaTabella();
    }

    function Bottoni()
    {
        let pos;
        for(pos = 0; !_opt[pos].checked; pos++);
        let cat = _opt[pos].value;
        let curPage

        let text = this.innerHTML.split(' ')[1];
        let limitPages = (Math.floor(category[cat].length / 7) + 1);
        if(category[cat].length % 7 == 0)
            limitPages--;
        switch (text)
        {
            case "first":
                _npag.innerHTML = "1/" + limitPages;
                page = 0;
                _first.disabled = true;
                _prev.disabled = true;
                _last.disabled = false;
                _next.disabled = false;
                break;
            case "prevPage":
                page -= 7;
                curPage = (Math.floor(page / 7) + 1);
                _npag.innerHTML = curPage + "/" + limitPages;
                //_npag.innerHTML = (parseInt(_npag.innerHTML) - 1).toString();
                if(curPage == 1)
                {
                    _first.disabled = true;
                    _prev.disabled = true;
                }
                _last.disabled = false;
                _next.disabled = false;
                break;
            case "nextPage":
                page += 7;
                curPage = (Math.floor(page / 7) + 1);
                _npag.innerHTML = curPage + "/" + limitPages;
                //_npag.innerHTML = (parseInt(_npag.innerHTML) + 1).toString();
                if(curPage == limitPages)
                {
                    _last.disabled = true;
                    _next.disabled = true;
                }
                _first.disabled = false;
                _prev.disabled = false;
                break;
            case "last":
                page = Math.floor(category[cat].length / 7);
                if(category[cat].length % 7 == 0)
                    page--;
                _npag.innerHTML = limitPages + "/" + limitPages;
                page = (page * 7);
                _last.disabled = true;
                _next.disabled = true;
                _first.disabled = false;
                _prev.disabled = false;
                break;
            default:
                break;
        }
        CaricaTabella();
    }

    function VisualizzaDettagli(id)
    {
        let i;
        for(i = 0; meals[i].meals[0].idMeal != id; i++);
        let det = meals[i].meals[0]
        console.log(det);
        let _div = document.getElementById("dettagliWrapper");
        _div.innerHTML = "";
        let _p = document.createElement("a");
        _p.innerHTML = det.strMeal;
        _p.style.fontWeight = "bold";
        _div.appendChild(_p);
        _div.innerHTML += ": " + det.strInstructions;
    }

    function Elimina(cat, key, id)
    {
        let i;
        for(i = 0; meals[i].meals[0].idMeal != id; i++);
        meals.splice(i, 1)
        category[cat].splice(key, 1);
        CaricaTabella();
        console.log(meals);
        console.log(category);
    }

    function ApriFilmato(id)
    {
        let i;
        for(i = 0; meals[i].meals[0].idMeal != id; i++);
        let link = meals[i].meals[0].strYoutube;
        window.open(link, "_blanc");
    }
}