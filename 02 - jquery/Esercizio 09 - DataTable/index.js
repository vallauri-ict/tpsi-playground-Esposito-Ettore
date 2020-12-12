"use strict"

$(document).ready(function () {
    const _table = $("table");
    $.ajax({
        "url" : "https://randomuser.me/api/?results=50&noinfo",
        "success" : function(data) {
            console.log(data);
            for(let user of data.results)
                $("<tr>", {
                    "appendTo" : _table.children("tbody"),
                    "append" : [
                        $("<td>", { "html" : (user.name.first + " " + user.name.last) }),
                        $("<td>", { "html" : user.nat }),
                        $("<td>", { "html" : user.location.country }),
                        $("<td>", { "html" : user.location.state }),
                        $("<td>", { "html" : user.cell }),
                        $("<td>", { "append" : [ $("<img>", { "src" : user.picture.thumbnail }) ] })
                    ]
                });

            //la datatable deve essere usato dopo il caricamento della tabella, altrimenti mette un errore all'inizio della tabella
            _table.DataTable({
                "bPaginate": true, // paginazione dei record da visualizzare
                "bLengthChange": true, // n. di record per pagina
                "bFilter": true, // ricerca della voce impostata
                "bSort": true, // ordinamento dei record sul click on the header
            })
        },
        "error" : errore
    });

    function errore(jqXHR, text_status, string_error) {
        if (jqXHR.status == 0)
            alert("Connection Refused or Server timeout");
        else if (jqXHR.status == 200)
            alert("Incorrect data format : " + jqXHR.responseText);
        else
            alert("Server Error: " + jqXHR.status + " - " + jqXHR.responseText);
    }
});