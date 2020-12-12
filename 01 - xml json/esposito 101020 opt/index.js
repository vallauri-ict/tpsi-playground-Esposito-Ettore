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
    let page = 0, limitPages;
    console.log(meals);
    console.log(category);

    CaricaOpt();
    ImpostaBottoni(_opt[0].value);

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
            _opt.addEventListener("click", function () { ImpostaBottoni(this.value) });
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

    function CaricaTabella(cat)
    {
        let _tr, _td, _img;
        _table.innerHTML = "";

        _tr = document.createElement("tr");
        _table.appendChild(_tr);
        for(let item in intestazioni)
        {
            _td = document.createElement("th");
            _td.innerHTML = intestazioni[item];
            _td.style.width = larghezze[item];
            _tr.appendChild(_td);
        }

        for(let key = page; key < category[cat].length && key != page + 7; key++)
        {
            _tr = document.createElement("tr");
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
    }

    function ImpostaBottoni(cat)
    {
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

            limitPages = (Math.floor(category[cat].length / 7) + 1);
            if(category[cat].length % 7 == 0)
                limitPages--;
            _npag.innerHTML = "1/" + limitPages;

            _first.addEventListener("click", function () { Bottoni(cat, this.innerHTML) });
            _next.addEventListener("click", function () { Bottoni(cat, this.innerHTML) });
            _prev.addEventListener("click", function () { Bottoni(cat, this.innerHTML) });
            _last.addEventListener("click", function () { Bottoni(cat, this.innerHTML) });
        }
        CaricaTabella(cat);
    }

    function Bottoni(cat, text)
    {
        let curPage;
        text = text.split(' ')[1];
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
        CaricaTabella(cat);
    }

    function CercaMeals(id)
    {
        let i;
        for(i = 0; meals[i].meals[0].idMeal != id; i++);
        return i;
    }

    function VisualizzaDettagli(id)
    {
        let i = CercaMeals(id);
        let det = meals[i].meals[0];
        console.log(det);
        let _div = document.getElementById("dettagliWrapper");
        _div.innerHTML = "";
        let _p = document.createElement("b");
        _p.innerHTML = det.strMeal;
        _div.appendChild(_p);
        _div.innerHTML += ": " + det.strInstructions;
    }

    function Elimina(cat, key, id)
    {
        let i = CercaMeals(id);
        meals.splice(i, 1);
        category[cat].splice(key, 1);
        CaricaTabella(cat);
        console.log(meals);
        console.log(category);
    }

    function ApriFilmato(id)
    {
        let i = CercaMeals(id);
        let link = meals[i].meals[0].strYoutube;
        window.open(link, "_blank");
    }
}