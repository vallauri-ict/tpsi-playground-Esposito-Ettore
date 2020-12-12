"use strict"

let _form;

$(document).ready(function () {
    _form = $("#form > fieldset");
});

function visualizza(id) {
    let output = "";
    switch (id)
    {
        case 1: //contenuto del textbox
            output = _form.find("input[type=text]:first-of-type").val();
            break;
        case 2: //valore del select
            output = _form.find("select").eq(0).val();
            break;
        case 3: //valore di tutti i checkbox
            _form.find("fieldset:first-of-type").find("input[type=checkbox]").each(function (){
                output += "\n" + $(this).prop("name") + " - " + $(this).val();
            });
            break;
        case 4: //valore di tutti i checkbox selezionati
            _form.find("fieldset:first-of-type").find("input[type=checkbox]:checked").each(function (){
                output += "\n" + $(this).prop("name") + " - " + $(this).val();
            });
            if(output == "")
                output = "Nessun checkbox selezionato";
            break;
        case 5: //valore di tutti i checkbox non selezionati
            _form.find("fieldset:first-of-type").find("input[type=checkbox]").not(":checked").each(function (){
                output += "\n" + $(this).prop("name") + " - " + $(this).val();
            });
            if(output == "")
                output = "Tutti i textbox sono selezionati";
            break;
        case 6: //valore di tutti i radio button selezionati
            output = _form.find("fieldset:nth-of-type(2)").find("input[type=radio]:checked").val();
            if(output == undefined)
                output = "Nessun radio button selezionato";
            break;
        case 7: //valore di tutti i radio button non selezionati
            _form.find("fieldset:nth-of-type(2)").find("input[type=radio]:not(:checked)").each(function (){
                output += "\n" + $(this).val();
            });
            break;
        case 8: //valore di tutte le opzioni selezionate nel select multiplo
            _form.children("select").children("option:selected").each(function (){
                output += "\n" + $(this).val();
            });
            /*let val = _form.children("select").val(); //essendo il select multiplo, .val() da un vettore
            for(let item of val)
                output += "\n" + item;*/
            if(output == "")
                output = "Nessuna voce selezionata";
            break;
        default:
            output = "errore";
            break;
    }
    alert(output);
}

function imposta(id){
    switch (id)
    {
        case 1: //textbox
            _form.find("input[type=text]").first().val("Ciao");
            break;
        case 2: //select
            _form.find("select").eq(0).val("1");
            //_form.find("select").eq(0).prop("selectedIndex", 1);
            break;
        case 3: //checkbox
            //_form.find("fieldset:first-of-type").find("input[type=checkbox]").eq(1).prop("checked", true);
            //_form.find("fieldset:first-of-type").find("input[type=checkbox]").eq(3).prop("checked", true);
            _form.find("fieldset:first-of-type").find("input[type=checkbox]").val(["opzione 1", "opzione 3"]);
            break;
        case 4: //radio button
            //_form.find("fieldset:nth-of-type(2)").find("input[type=radio]").last().prop("checked", true);
            _form.find("fieldset:nth-of-type(2)").find("input[type=radio]").val(["no"]);
            break;
        case 5: //select multiplo
            _form.children("select").val(["2", "3"]);
            break;
        default:
            alert("Errore");
            break;
    }
}