"use strict"

$(document).ready(function () {
    let _wrapper = $("#wrapper");
    CreaElementi();

    //elenco funzioni
    function CreaElementi() {
        _wrapper.on("click", "div", Sposta);
        let numeri = [];
        numeri.push("");
        for(let i=1; i<=15; i++)
            numeri.push(i.toString());
        for(let i=0; i<4; i++)
            for(let j=0; j<4; j++)
            {
                let pos = GeneraNumero(0, numeri.length - 1);
                let nuovo = $("<div>", {
                    "appendTo" : _wrapper,
                    "addClass" : "pedina",
                    "html" : numeri[pos].toString(),
                    "css" : {
                        "top" : (36 * i) + "px",
                        "left" : (36 * j) + "px"
                    },
                    "prop" : {
                        "id" : i + "-" + j
                    }
                });
                if(nuovo.html() != "")
                    nuovo.addClass("grigio");
                numeri.splice(pos, 1);
            }
        console.log($(".pedina"));
    }

    function Sposta() {
        let _sender = $(this), aus = _sender.prop("id").toString().split("-");
        let i = parseInt(aus[0]), j = parseInt(aus[1]);
        let empty = undefined;
        if(i!=0 && $(`#${i-1}-${j}`).html() == "")
            empty = $(`#${i-1}-${j}`);
        else if(i!=3 && $(`#${i+1}-${j}`).html() == "")
            empty = $(`#${i+1}-${j}`);
        else if(j!=0 && $(`#${i}-${j-1}`).html() == "")
            empty = $(`#${i}-${j-1}`);
        else if(j!=3 && $(`#${i}-${j+1}`).html() == "")
            empty = $(`#${i}-${j+1}`);
        if(empty!=undefined)
        {
            Animazione(_sender, empty);

        }
    }

    function Animazione(div1, div2) {
        _wrapper.off("click", "div");
        let ausi = div1.css("top"), ausj = div1.css("left"), ausId = div1.prop("id");
        div1.animate({
            "top" : div2.css("top"),
            "left" : div2.css("left")
        }, 500);
        div2.animate({
            "top" : ausi,
            "left" : ausj
        }, 500, function () {
            div1.prop("id", div2.prop("id"));
            div2.prop("id", ausId);
            if(!Controllo())
                _wrapper.on("click", "div", Sposta);
            else
                alert("Hai vinto!");
        });
    }

    function Controllo() {
        let well = true;
        for(let i=0, cont = 1; i<4 && well; i++)
            for(let j=0; j<4 && well; j++, cont++)
                if(cont != 16 && $(`#${i}-${j}`).html()!=cont.toString())
                    return false;
                else if(cont == 16 && $(`#${i}-${j}`).html()!="")
                    return false;

    }

    function GeneraNumero(min, max) {
        return Math.floor((max-min+1)*Math.random())+ min;
    }
});