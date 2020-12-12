"use strict"

let _ul;

$(document).ready(function () {
    _ul = $("#contenitore ul");
});

function aggiungi(pos)
{
    let _menu = _ul.eq(pos-1);
    let _voce = $("<li>");
    _voce.html(`menu ${pos} voce ${(_menu.children().length + 1)}`);
    _voce.appendTo(_menu);
}

function sposta(pos)
{
    let _menu = _ul.eq(_ul.length-pos);
    let _voci = _ul.eq(pos-1).children().last();
    _menu.append(_voci);
}

function nuovoprima(pos)
{
    let _voci = _ul.eq(pos-1).children();
    let _voce = $("<li>");
    _voce.html(`menu ${pos} voce ${(_voci.length + 1)}`);
    _voci.first().before(_voce);
}

function nuovodopo(pos)
{
    let _voci = _ul.eq(pos-1).children();
    let _voce = $("<li>");
    _voce.html(`menu ${pos} voce ${(_voci.length + 1)}`);
    _voci.last().after(_voce);
}

function replica(pos)
{
    let _voci = _ul.eq(pos-1).children();
    let _voce = $(`<li> menu ${pos} voce ${(_voci.length + 1)} </li>`);
    _voci.before(_voce);
}

function costruttore(pos)
{
    let _menu = _ul.eq(pos-1);
    $("<li>", {
        "css" : {
            "backgroundColor" : "#ddd",
            "color" : "blue"
        },
        "text" : "hello world",
        "appendTo" : _menu,
        "append" : [
            $("<br/>"),
            $("<label>", {"text" : "hi"}),
            $("<div>", {"text" : "goodbye"})
        ]
    });
}