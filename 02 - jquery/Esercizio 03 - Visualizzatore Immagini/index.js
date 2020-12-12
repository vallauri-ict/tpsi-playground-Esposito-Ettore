"use strict"

const time = 15, maxImg = 7;

$(document).ready(function () {
    let _ind = $("#btnIndietro");
    let _ava = $("#btnAvanti");
    let _img = $("#img");
    let numImg = 1;
    let btmCss = {
        "width" : "140px",
        "height" : "40px",
        "fontWeight" : "bold",
        "borderRadius" : "50%",
        "backgroundColor" : "orange",
        "position" : "relative"
    };
    _ind.css(btmCss);
    _ava.css(btmCss);
    _ind.prop("disabled", true);
    _img.width("400px");
    _img.prop("src", "img/img1.jpg");
    setTimeout(CambiaAltezza, time);

    _ava.on("click", function () {
        numImg++;
        _img.prop("src", "img/img" + numImg + ".jpg");
        if(numImg == maxImg)
            _ava.prop("disabled", true);
        _ind.prop("disabled", false);
        setTimeout(CambiaAltezza, time);
    });
    _ind.on("click", function () {
        numImg--;
        _img.prop("src", "img/img" + numImg + ".jpg");
        if(numImg == 1)
            _ind.prop("disabled", true);
        _ava.prop("disabled", false);
        setTimeout(CambiaAltezza, time);
    });

    //funzioni
    function CambiaAltezza() {
        let top = "-" + (_img.height() / 2) + "px";
        _ava.css("top", top);
        _ind.css("top", top);
    }
});