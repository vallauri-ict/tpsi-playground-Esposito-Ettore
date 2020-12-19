"use strict";
 
$(document).ready(function () {
	let _wrapper = $('#elencoArticoli');
	let _details = $(".details");
	let _carrello = $("#carrello");
	let articoli;

	$.ajax({
		url: "http://localhost:3000/camere",
		success: function (data) {
			articoli = data;
			console.log(articoli);
			CreaElementi();
		},
		error: Errore
	})


	//elenco funzioni

	function CreaElementi() {
		//eventi
		_wrapper.on("mouseover", ".article .image", MostraNome);
		_wrapper.on("mouseout", ".article .image", NascondiNome);
		_wrapper.on("click", ".article", MostraDettagli);
		_details.hide();

		//immagini articoli
		for(let i=0; i<articoli.length; i++)
		{
			$("<div>", {
				"appendTo" : _wrapper,
				"addClass" : "article",
				"prop" : {
					"id" : "article-" + i,
				},
				"append" : [
					$("<img/>", {
						"addClass" : "image",
						"prop" : {
							"title" : "Aggiungi al carrello",
							"src" : "img/" + articoli[i].src + ".jpg"
						},
					}),
					$("<div>", {
						"addClass" : "name",
						"html" : articoli[i].nome,
						"css" : {
							"visibility" : "hidden"
						}
					})
				]
			});
		}

		//carrello
		$("#btnCarrello").on("click", MostraCarrello);
	}

	//carrello
	function MostraCarrello() {
		let _sender = $(this);
		_sender.off("click");
		_carrello.slideDown(1000, function () {
			_sender.html("&#708 Chiudi carrello");
			_sender.on("click", NascondiCarrello);
		});
	}

	function NascondiCarrello() {
		let _sender = $(this);
		_sender.off("click");
		_carrello.slideUp(1000, function () {
			_sender.html("&#709 Apri carrello ");
			_sender.on("click", MostraCarrello);
		});
	}

	function AggiungiCarrello(pos) {
		let _table = _carrello.find("tbody");
		let i, trovato = false, dettagli = articoli[pos];
		for(i=1; i<_table.children().length && !trovato; i++)
		{
			let _riga = _table.children().eq(i);
			if(_riga.children().eq(0).html() == dettagli.nome)
			{
				trovato = true;
				break;
			}
		}
		if(trovato)
		{
			let _quantita = _table.children().eq(i).children().eq(2);
			let quan = parseInt(_quantita.html());
			_quantita.html((quan + 1));
		}
		else
		{
			$("<tr>", {
				"appendTo" : _table,
				"append" : [
					$("<td>", { "html" : dettagli.nome }),
					$("<td>", { "html" : dettagli.prezzo + "$" }),
					$("<td>", { "html" : "1" }),
					$("<td>", {
						"append" : [
							$("<img/>", {
								"prop" : {
									"src" : "img/_cestino.png"
								},
								"on" : {
									"click" : RimuoviCarrello
								}
							})
						]
					})
				]
			});
		}
	}

	function RimuoviCarrello() {
		$(this).parent().parent().remove();
	}

	//dettagli
	function MostraDettagli() {
		_details.html("");
		_wrapper.off("click", ".article");
		let pos = parseInt($(this).prop("id").split("-")[1]);
		let details = articoli[pos];
		$("<div>", {
			"addClass" : "detail-close",
			"appendTo" : _details,
			"append" : [
				$("<span>", {
					"html" : "X",
					"on" : {
						"click" : NascondiDettagli
					}
				})
			]
		});
		$("<div>", {
			"addClass" : "detail-img",
			"appendTo" : _details,
			"append" : [
				$("<img/>", {
					"prop" : {
						"src" : "img/" + details.src + ".jpg"
					}
				})
			]
		});
		$("<div>", {
			"addClass" : "detail-info",
			"appendTo" : _details,
			"append" : [
				$("<h4>", { "addClass" : "item-title", "html" : details.nome }),
				$("<p>", { "html" : details.descrizione }),
				$("<p>", { "html" : details.prezzo + "$" }),
				$("<button>", {
					"addClass" : "item-add",
					"html" : "Aggiungi al carrello",
					"on" : {
						"click" : function () {
							AggiungiCarrello(pos);
						}
					}
				})
			]
		});

		_details.slideDown(1000, function () {
			_wrapper.on("click", ".article", MostraDettagli);
		});
	}

	function NascondiDettagli() {
		_wrapper.off("click", ".article");
		_details.slideUp(1000, function () {
			_details.html("");
			_wrapper.on("click", ".article", MostraDettagli);
		});
	}

	//articoli
	function MostraNome(pos) {
		$(this).parent().children(".name").css("visibility", "visible");
	}

	function NascondiNome() {
		$(this).parent().children(".name").css("visibility", "hidden");
	}
	
	//errore
	function Errore(jqXHR, textStatus, str_error) {
		if(jqXHR.status==0)
			alert("connection refused or server timeout");
		else if (jqXHR.status == 200)
			alert("Errore Formattazione dati\n" + jqXHR.responseText);
		else
			alert("Server Error: "+jqXHR.status+ " - " +jqXHR.responseText);

	}
});
