"use strict"

$(document).ready(function () {
    const row = 6, col = 7;
    let _header = $("#header"), _wrapper = $("#wrapper");
    let dim, padd;
    let rossi = false;

    CreaElementi();
    dim = parseInt($(".pedina").css("height")) + (parseInt($(".pedina").css("margin")) * 2);
    padd = parseInt(_wrapper.css("padding"));
    _wrapper.css({ "height" : (row * dim) + "px" });

    //elenco funzioni
    function CreaElementi()
    {
        _header.on("mouseover", ".pedina", function () {
            $(this).addClass(rossi ? "rosso" : "giallo");
        });
        _header.on("mouseout", ".pedina", function () {
            $(this).removeClass("rosso giallo");
        });
        _header.on("click", ".pedina", Metti);

        //header
        for(let i=0; i<col; i++)
            $("<div>",{
                "appendTo" : _header,
                "addClass" : "pedina",
                "prop" : {
                    "id" : "met-" + i
                }
            });

        //wrapper
        for(let i=0; i<row; i++)
            for(let j=0; j<col; j++)
                $("<div>",{
                    "appendTo" : _wrapper,
                    "addClass" : "pedina",
                    "prop" : {
                        "id" : "tab-" + i + "-" + j
                    }
                });
    }

    function Metti()
    {
        _header.off("click", ".pedina");

        let _sender = $(this);
        let aus = _sender.prop("id").split("-");
        let posx = parseInt(aus[1]), posy = row-1;

        while ($(`#tab-${posy}-${posx}`).is(".rosso, .giallo") && posy >= 0)
            posy--;

        if(posy>=0)
        {
            let _new = $("<div>",{
                "appendTo" : _wrapper,
                "addClass" : [
                    "pedina",
                    rossi ? "rosso" : "giallo"
                ],
                "css" : {
                    "position" : "absolute",
                    "top" : `-${dim + padd}px`,
                    "left" : ((dim * posx) + padd) + "px",
                }
            });
            _new.animate({ "top" : `+=${((dim + (padd * 2)) + (dim * posy))}px` }, 200 * (posy + 1), function (){
                _new.css({ "position" : "" });
                $(`#tab-${posy}-${posx}`).before(_new).remove();
                _new.prop("id", `tab-${posy}-${posx}`);
                if(!Vittoria(_new))
                    _header.on("click", ".pedina", Metti);
                else
                    _header.off("mouseover mouseout", ".pedina");
            });
            rossi = !rossi;
        }
        else
        {
            alert("La colonna è già piena");
            _header.on("click", ".pedina", Metti);
        }
    }

    function Vittoria(_new)
    {
        let aus = _new.prop("id").split("-");
        let posy = parseInt(aus[1]), posx = parseInt(aus[2]);
        let colore = _new.is(".rosso") ? ".rosso" : ".giallo";
        let cont, i, j;

        //riga
        for(j=0, cont=0; j<col && cont<4; j++)
            if($(`#tab-${posy}-${j}`).is(colore))
                cont++;
            else
                cont = 0;

        //colonna
        if(cont < 4)
        {
            for(i=0, cont=0; i<row && cont<4; i++)
                if($(`#tab-${i}-${posx}`).is(colore))
                    cont++;
                else
                    cont = 0;

            //diagonale sinistra-alto
            if(cont < 4)
            {
                i = posy;
                j = posx;
                while (i!=0 && j!=0)
                {
                    i--;
                    j--;
                }

                for(cont=0; i<row && j<col && cont<4; i++, j++)
                    if($(`#tab-${i}-${j}`).is(colore))
                        cont++;
                    else
                        cont = 0;

                //diagonale destra-alto
                if(cont < 4)
                {
                    i = posy;
                    j = posx;
                    while (i!=0 && j!=col)
                    {
                        i--;
                        j++;
                    }

                    for(cont=0; i<row && j<col && cont<4; i++, j--)
                        if($(`#tab-${i}-${j}`).is(colore))
                            cont++;
                        else
                            cont = 0;
                }
            }
        }

        if(cont >= 4)
        {
            alert("La vittoria va al " + colore.substring(1));
            return true;
        }
        else
            return false;
    }
});