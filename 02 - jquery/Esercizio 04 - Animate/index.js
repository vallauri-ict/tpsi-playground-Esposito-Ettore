"use strict"

$(document).ready(function () {
    let _btm = $("#btnAvvia");
    let _pedina = $("#pedina");
    let first = true, lampeggio = true;
    _btm.on("click", Animazione);
    lamp();

    //funzioni
    function Animazione() {
        lampeggio = false;
        _btm.off()
        .stop(true)
        .css({"opacity" : "0", "cursor" : "default"});
        if (!first) {
            _pedina
            .animate({left: "10px", top: "260px", width: "15px", height: "15px"}, 1300)
            .delay(100);
        }
        first = false;
        _pedina
        .animate({left: "+=60px", width: "8px", height: "8px"}, 1300)
        .animate({top: "+=38px", width: "15px", height: "15px"}, 1300)
        .animate({left: "+=116px", width: "8px", height: "8px"}, 1300)
        .animate({top: "+=77px", width: "15px", height: "15px"}, 1300)
        .animate({left: "+=250px", width: "8px", height: "8px"}, 1300, function (){
            lampeggio = true;
            _btm.css({"opacity" : "1", "cursor" : "pointer"});
            _btm.on("click", Animazione);
            lamp();
        });
    }

    function lamp()
    {
        if(lampeggio)
        {
            _btm
                .animate({"opacity" : "0"}, 450)
                .animate({"opacity" : "1"}, 450, function (){
                    lamp();
                });
        }
    }
});