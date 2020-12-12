"use strict"

$(document).ready(function () {
    let _wrapper = $("#wrapper");
    for(let i=0; i<6; i++)
        for(let j=0; j<6; j++)
            $("<div>", {
                "addClass" : "box",
                "appendTo" : _wrapper
            });
    setInterval(function () {
        $(".box").eq(GeneraNumero(0, 35)).animate({ "opacity" : "0.3" }, 400).animate({ "opacity" : "0.6" }, 400).animate({ "opacity" : "0.1" }, 400);
    }, 32);
});

function GeneraNumero(min, max)
{
    return Math.floor((max - min + 1 ) * Math.random() + min);
}