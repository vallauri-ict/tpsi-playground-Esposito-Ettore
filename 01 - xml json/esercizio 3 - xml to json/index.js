"use strict"

window.onload = function()
{
    let _btm = document.getElementById("btmConverti");
    _btm.addEventListener("click", Converti);

    function Converti()
    {
        let xml = localStorage.getItem("bookstore_xml");
        let parser = new DOMParser();
        let xmldoc = parser.parseFromString(xml,"text/xml");
        let root = xmldoc.documentElement;
        let json = [];

        //scandire albero xml
        for (let i = 0; i < root.children.length; i++)
        {
            let book = root.children[i];
            let tit, aut = [], cat, lang, year, price;

            //prendo tutto
            if(book.hasAttribute("category"))
                cat = book.getAttribute("category");
            for (let j = 0; j < book.children.length; j++)
            {
                let campo = book.children[j];
                switch (campo.nodeName)
                {
                    case  "title":
                        tit = campo.textContent;
                        if(campo.hasAttribute("lang"))
                            lang = campo.getAttribute("lang");
                        break;
                    case  "author":
                        aut.push(campo.textContent);
                        break;
                    case  "year":
                        year = campo.textContent;
                        break;
                    case  "price":
                        price = campo.textContent;
                        break;
                    default:
                        console.log("Non funge il campo " + campo.nodeName);
                        break;
                }
            }
            /*console.log("Book: " +  tit);
            console.log("Category: " +  cat);
            console.log("Authors: " +  aut);
            console.log("Lang: " +  lang);
            console.log("Year: " +  year);
            console.log("Price: " +  price);*/

            //metto nel json
            let bookJson = {
                "Title" : tit,
                "Category" : cat,
                "Authors" : aut,
                "Lang" : lang,
                "Year" : year,
                "Price" : price
            };
            //console.log(bookJson);
            json.push(bookJson);
        }
        console.log(json);
        alert(JSON.stringify(json));
        localStorage.setItem("bookstore_json", JSON.stringify(json));
    }
}

function GeneraNumero(min, max)
{
    return Math.floor((max - min + 1 ) * Math.random() + min);
}