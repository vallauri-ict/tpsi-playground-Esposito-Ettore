"use strict"

$(document).ready(function() {
    let _wrapper = $("#wrapper").css({
        "float" : "left",
        "backgroundColor" : "#ff9"
    });
    let _btm = $("#btnOk"), _msg = $("#lblMsg") , _txtPos = $("#txtPosizione"), _txtColore = $("#txtColore");
    CreaElementi();

    //elenco funzioni
    function CreaElementi()
    {
        _wrapper.on("mouseover", "#grey", function () {
            $(this).children("#val").stop().animate({ "opacity" : "1" }, 1000);
        });
        _wrapper.on("mouseout", "#grey", function () {
            $(this).children("#val").stop().animate({ "opacity" : "0" }, 1000);
        });

        for (let i=1; i<=9; i++)
        {
            let grey = GeneraNumero(0, 255);
            let _new = $("<div>",{
                "appendTo" : _wrapper,
                "html" : i.toString(),
                "addClass" : "box",
                "css" : {
                    "backgroundColor" : `rgb(${grey},${grey},${grey})`
                },
                "prop" : {
                    "id" : "grey",
                    "enabled" : true
                }
            });

            $("<p>",{
                "appendTo" : _new,
                "html" : grey.toString(),
                "css" : {
                    "opacity" : "0"
                },
                "prop" : {
                    "id" : "val"
                }
            });
        }

        _btm.on("click", Controlla)
    }

    function Controlla()
    {
        let text;
        if(_txtPos.val() != "" && _txtColore.val() != "" )
        {
            let pos = parseInt(_txtPos.val()) - 1, tentativo = parseInt(_txtColore.val());
            let _ogg = $("#grey").eq(pos), grey = parseInt(_ogg.css("backgroundColor").toString().split(",")[1]);
            if(_ogg.prop("enabled"))
            {
                if(tentativo > grey)
                {
                    text = "ALTO";
                    _txtColore.css({
                        "backgroundColor" : "blue",
                        "color" : "white"
                    });
                }
                else if(tentativo < grey)
                {
                    text = "BASSO";
                    _txtColore.css({
                        "backgroundColor" : "red",
                        "color" : "white"
                    });
                }
                else
                {
                    text = "GIUSTO";
                    _txtPos.html("");
                    _txtColore.html("");
                    _txtColore.css({
                        "backgroundColor" : "white",
                        "color" : "black"
                    });
                    _ogg.prop("enabled", false).css({
                        "borderWidth" : "0",
                        "backgroundColor" : _wrapper.css("backgroundColor")
                    });
                }
            }
            else
                text = "Quel grigio è già stato indovinato";
        }
        else
            text = "Compilare entrambi i campi";
        _msg.html(text);
    }

    function GeneraNumero(min, max)
    {
        return Math.floor((max - min + 1 ) * Math.random() + min);
    }
});