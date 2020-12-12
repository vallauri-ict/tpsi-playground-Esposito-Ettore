"use strict"

let _wrapper;

$(document).ready(function () {
    _wrapper = $("#wrapper");

    $("#btn1").on("click", function (){
        alert("Ci sono " + _wrapper.children().length + " elementi");
    });

    $("#btn2").on("click", function (){
        let output = "";
        let _list = _wrapper.children();
        /*
        for (let i = 0; i < _list.length; i++)
            output+="\n" + _list.eq(i).html();
        */
        /*
        for(let item of _list)
            output+="\n" + $(item).html();
        */
        _list.each(function (i, ref){
            output+="\n" + $(this).html();
            //output+="\n" + $(ref).html();
            //output+="\n" + _list.eq(i).html();
        });
        alert("lista messaggi:" + output);
    });

    $("#btn3").on("click", function (){
        evidenzia('li:nth-of-type(even)');
    });

    $("#btn4").on("click", function (){
       _wrapper.children().css({"backgroundColor" : ""}).filter('li:nth-child(odd)').each(function (i, ref){
           let colore = 50 * (i + 1);
           $(ref).css({"backgroundColor" : `rgb(0, ${colore}, 0)`});
       });
    });
});

function evidenzia(sel)
{
    _wrapper.children().css({"backgroundColor" : ""}).filter(sel).css({"backgroundColor" : "yellow"});
}