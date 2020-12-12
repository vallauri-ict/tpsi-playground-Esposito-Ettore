"use strict"
let utenti = [ {"user":"pippo",  "pwd":"pwdPippo1"},
               {"user":"pluto",  "pwd":"pwdPluto1"},
			   {"user":"minnie", "pwd":"pwdMinnie1"} ];

			   
$(document).ready(function() {
    let _txtNome = $("#txtUser");
    let _txtPwd = $("#txtPwd");
    let userOk = false, pwdOk = false, posUser = -1;
    _txtNome.on("change", checkNome);
    _txtPwd.on("change", checkPassword);
    $("input[type=button]").on("click", function () {
       if(pwdOk && userOk)
           alert("Accesso effettuato");
       else
           alert("Accesso negato")
    });
    $("input:not([type=button])").on("mouseover", function () {
        $(this).addClass("over");
    }).on("mouseout", function () {
        $(this).removeClass("over");
    });

    //elenco funzioni
    function checkNome() {
        let i;
        for(i=0; i<utenti.lenght && utenti[i].user != _txtNome.val(); i++);
        if(utenti[i].user == _txtNome.val())
        {
            messaggio($("#msgUser"), "Utente corretto", true);
            _txtNome.addClass("ok");
            _txtNome.removeClass("nok");
            posUser = i;
            userOk = true;
        }
        else
        {
            messaggio($("#msgUser"), _txtNome.val() == "" ? "Inserire un utente" : "Utente non valido", false);
            _txtNome.addClass("nok");
            _txtNome.removeClass("ok");
            posUser = -1;
            userOk = false;
        }
    }

    function checkPassword() {
        if(posUser == -1)
        {
            messaggio($("#msgPwd"), "Utente non valido", false);
            _txtPwd.addClass("nok");
            _txtPwd.removeClass("ok");
            pwdOk = false;
        }
        else
        {
            let num = false, lett = false;
            let pwd = _txtPwd.val();
            if(pwd.length >= 8)
                for(let i=0; i<pwd.length && (!lett || !num); i++)
                {
                    let c = pwd.charAt(i);
                    if($.isNumeric(c))
                        num = true;
                    else if(c.toUpperCase() != c.toLowerCase())
                        lett = true;
                }

            if(num && lett)
            {
                if(utenti[posUser].pwd == pwd)
                {
                    messaggio($("#msgPwd"), "Password corretta", true);
                    _txtPwd.addClass("ok");
                    _txtPwd.removeClass("nok");
                    pwdOk = true;
                }
                else
                {
                    messaggio($("#msgPwd"), "Password errata", false);
                    _txtPwd.addClass("nok");
                    _txtPwd.removeClass("ok");
                    pwdOk = false;
                }
            }
            else
            {
                messaggio($("#msgPwd"), "Password non conforme", false);
                _txtPwd.addClass("nok");
                _txtPwd.removeClass("ok");
                pwdOk = false;
            }
        }
    }

    function messaggio(_msg, text, good)
    {
        _msg.hide();
        _msg.html(text);
        _msg.css("color", good ? "green" : "red");
        _msg.fadeIn(500);
    }
});