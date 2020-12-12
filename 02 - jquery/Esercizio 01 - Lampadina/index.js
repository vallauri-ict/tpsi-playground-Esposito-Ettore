"use strict"

$(document).ready(function ()
{
    let _bulb = $("#lampadina");
    let _on = $("#btnAccendi");
    let _off = $("#btnSpegni");
    let _desc = $("#descrizione");
    let _cont = $("#contenuto");

    _bulb.hide();
    _off.hide();

    _on.on("click", function ()
    {
        _bulb.addClass("accesa");
        _bulb.fadeIn(2000, function ()
        {
            _on.hide();
            _off.show();
        });
    });
    _off.on("click", function ()
    {
        _bulb.fadeOut(2000, function ()
        {

            _on.show();
            _off.hide();
        });
        _bulb.removeClass("accesa");
    });

    let descrzione =
        {
            "width" : "160px",
            "height" : "40px",
            "tet-align" : "center",
            "lineHeight" : "40px",
            "background-color" : "#aaa",
            "text-decoration" : "underline",
            "fontSize" : "14pt",
            "cursor" : "pointer",
            "borderRadius" : "10px",
            "margin-left" : "10px"
        };
    _desc.css(descrzione);
    _cont.hide();
    _desc.on("mouseover", function ()
    {
        _cont.slideDown(1000);
    });
    _desc.on("mouseout", function ()
    {
        _cont.slideUp(1000);
    });
});