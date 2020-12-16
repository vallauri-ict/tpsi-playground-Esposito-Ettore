"use strict"

$(document).ready(function () {
    let _wrapper = $("#wrapper"), _shape;
    let blue;
    let liv = 1, livRow = 2, livCol = 2, livBlue = 2;
    CreaElementi(livRow, livCol, livBlue);

    //elenco funzioni
    function CreaElementi(rows, cols, blues) {
        _wrapper.css({ "height" : rows*50, "width" : cols*50 }).html("");
        for (let i=0; i<rows; i++)
            for(let j=0; j<cols; j++)
                $("<div>",{
                   "appendTo" : _wrapper,
                   "addClass" : "shape"
                });
        _shape = _wrapper.children(".shape");
        blue = [];
        for(let i=0; i<blues; i++)
        {
            let pos;
            do
                pos = GeneraNumero(0, _shape.length - 1)
            while (_shape.eq(pos).is(".blue"));
            _shape.eq(pos).addClass("blue");
            blue.push(pos);
        }
        setTimeout(Copri, 1500);
        console.log(blue);
    }

    function Copri() {
        for(let pos of blue)
            _shape.eq(pos).removeClass("blue");
        _wrapper.on("click", ".shape", Scopri);
    }

    function Scopri() {
        let _sender = $(this);
        let giusto = false, pos;
        _sender.off("click");
        for (pos=0; pos<blue.length && !giusto; pos++)
            if(_sender.is(`:nth-of-type(${blue[pos]+1})`))
                giusto = true;
        if(giusto)
        {
            _sender.addClass("blue");
            blue.splice(pos-1, 1);
            if(blue.length == 0)
            {
                _wrapper.off("click", ".shape");
                AumentaLivello();
                alert("Le hai trovate tutte, prossimo livello - " + liv);
                setTimeout(function () { CreaElementi(livRow, livCol, livBlue); }, 2000);

            }
        }
        else
        {
            _wrapper.off("click", ".shape");
            _sender.addClass("red");
            alert("pedina sbagliata, ripetere livello - " + liv);
            setTimeout(function () { CreaElementi(livRow, livCol, livBlue); }, 2000);
        }
    }

    function AumentaLivello() {
        liv++;
        livBlue++;
        if(liv%2==0)
            livCol++;
        else
            livRow++;
    }

    function GeneraNumero(min, max)
    {
        return Math.floor((max - min + 1 ) * Math.random() + min);
    }
});