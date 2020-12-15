"use strict"

 $(document).ready(function(){
     const time = 121000;
     let min=2, sec=0;
     let _wrapper = $("#wrapper"), _timer = $("#timer");
     let domande = elencoDomande;
     let timerTot, timerSec;
     console.log(domande);
     $("#header").animate({ "height" : parseInt($("#header").css("height"))*15, "width" : parseInt($("#header").css("width"))*15, "lineHeight" : parseInt($("#header").css("lineHeight"))*15, "fontSize" : parseInt($("#header").css("fontSize"))*15 }, 1500, CreaElementi);


     //elenco funzioni
     function CreaElementi() {

         //fieldset e domande
         for (let i=0; i<domande.length; i++)
         {
             let _field = $("<fieldset>", {
                 "appendTo" : _wrapper,
                 "append" : [
                     $(`<legend>`,{
                         "html" : domande[i].argomento,
                         "css" : {
                             "color" : "blue",
                             "fontSize" : "12pt"
                         }
                     })
                 ]
             });
             for (let j=0; j<domande[i].domande.length; j++)
             {
                 $("<div>",{
                     "appendTo" : _field,
                     "append" :[
                         $("<p> " +  + " </p>",{
                             "html" : domande[i].domande[j].domanda
                         }),
                         $("<input>",{
                             "prop" : {
                                 "type" : "radio",
                                 "value" : "T",
                                 "name" : domande[i].argomento + "-" + j
                             }
                         }),
                         $("<label>", {
                             "html" : "T"
                         }),
                         $("<input>",{
                             "prop" : {
                                 "type" : "radio",
                                 "value" : "F",
                                 "name" : domande[i].argomento + "-" + j
                             }
                         }),
                         $("<label>", {
                             "html" : "F"
                         }),
                         $("<bt/>")
                     ]
                 });
             }
         }

         //bottone invia
         $("<input>",{
             "val" : "invia",
             "appendTo" : _wrapper,
             "addClass" : "invia",
             "prop" : {
                 "type" : "button"
             },
             "on" : {
                 "click" : Invia
             }
         });

         //timer
         $("<span>",{
             "appendTo" : _timer,
             "id" : "min",
             "html" : "02"
         });
         $("<span>",{
             "appendTo" : _timer,
             "html" : " : "
         });
         $("<span>",{
             "appendTo" : _timer,
             "id" : "sec",
             "html" : "00"
         });
         AvviaTimer();
     }

     function Invia() {
        let _fieldset = _wrapper.children("fieldset");
        let punti = 0, tot = 0;
        $(this).off("click").css({ "backgroundColor": "#ccc", "color" : "#999" });
        clearTimeout(timerTot);
        clearInterval(timerSec);
        _wrapper.find("input[type=radio]").prop("disabled", true);
        for(let i=0; i<_fieldset.length; i++)
        {
            let _children = _fieldset.eq(i).children("div");
            for(let j=0; j<_children.length; j++, tot++)
            {
                let _risposta = _children.eq(j).find("input[type=radio]:checked");
                if(_risposta.length != 0)
                {
                    if(_risposta.val() == domande[i].domande[j].risposta)
                    {
                        punti+=1;
                        _risposta.parent().css("color", "green");
                    }
                    else
                    {
                        punti-=0.25;
                        _risposta.parent().css("color", "red");
                    }
                }
            }
        }
        alert(`punteggio ottenuto ${punti} / ${tot}`);
     }

     function AvviaTimer() {
        timerTot = setTimeout(Invia, time);
        timerSec = setInterval(RemSec, 1000);
     }

     function RemSec() {
        if(sec==0)
        {
            sec = 59;
            min--;
        }
        else
            sec--;
        _timer.children("#min").html(pad(min));
        _timer.children("#sec").html(pad(sec));
     }
 });


 
// Una semplice funzione per aggiungere uno 0 davanti ad un numero < 10
function pad(number) {
     return (number < 10 ? '0' : '') + number;
}
