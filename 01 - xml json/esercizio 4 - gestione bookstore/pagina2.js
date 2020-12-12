"use strict"

let _txtTit, _txtAut, _txtCat, _txtLang, _txtYear, _txtPrice;

window.onload = function()
{
    _txtTit = document.getElementById("txtTitolo");
    _txtAut = document.getElementById("txtAutore");
    _txtCat = document.getElementById("txtCategoria");
    _txtLang = document.getElementById("txtLingua");
    _txtYear = document.getElementById("txtAnno");
    _txtPrice = document.getElementById("txtPrezzo");
}

function salva()
{
    if (_txtTit.value == "" ||
        _txtAut.value == "" ||
        _txtCat.value == "" ||
        _txtLang.value == "" ||
        _txtYear.value == "" ||
        _txtPrice.value == "")
    {
        alert("Compilare tutti i campi");
    }
    else
    {
        let aut = _txtAut.value.split(" - ");
        let newBook =
            {
                "Authors" : aut,
                "Category" : _txtCat.value,
                "Lang" : _txtLang.value,
                "Price" : _txtPrice.value,
                "Title" : _txtTit.value,
                "Year" : _txtYear.value
            };
        let BookStore = JSON.parse(localStorage.getItem("bookstore_json"));
        BookStore.push(newBook);
        let stringStore = JSON.stringify(BookStore);
        localStorage.setItem("bookstore_json", stringStore);
        window.location.href = "index.html";
    }
}

function ritorna()
{
    window.location.href = "index.html";
}

function GeneraNumero(min, max)
{
    return Math.floor((max - min + 1 ) * Math.random() + min);
}