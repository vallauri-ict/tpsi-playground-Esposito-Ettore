"use strict"

$(document).ready(function()
{	
	let _calciatore = $("#calciatore");
	let _palla = $("#palla");
	let _btmEntra=$("#btnEntra")
	let _btmEsci = $("#btnEsci")
	let _btmVisualizzaPalla = $("#btnVisualizzaPalla")
	let _btmNascondiPalla = $("#btnNascondiPalla")
	let _btmTira = $("#btnTira")
	
	_calciatore.hide();	
	_palla.hide();
	_btmEsci.css("visibility", "hidden");
	_btmNascondiPalla.css("visibility", "hidden");
	_btmTira.css("visibility", "hidden");

	_btmEntra.on("click", function (){
		$(this).css("visibility", "hidden");
		_calciatore.show(2000, function (){
			_btmEsci.css("visibility", "visible");
			if(_palla.is(":visible"))
				_btmTira.css("visibility", "visible");
		});
	});
	_btmEsci.on("click", function (){
		$(this).css("visibility", "hidden");
		_btmTira.css("visibility", "hidden");
		_calciatore.hide(2000, function (){
			_btmEntra.css("visibility", "visible");
		});
	});
	_btmVisualizzaPalla.on("click", function (){
		$(this).css("visibility", "hidden");
		_palla.fadeIn(2000, function (){
			_btmNascondiPalla.css("visibility", "visible");
			if(_calciatore.is(":visible"))
				_btmTira.css("visibility", "visible");
		});
	});
	_btmNascondiPalla.on("click", function (){
		$(this).css("visibility", "hidden");
		_btmTira.css("visibility", "hidden");
		_palla.fadeOut(2000, function (){
			_btmVisualizzaPalla.css("visibility", "visible");
			if($(this).prop("goal"))
			{
				let pos = {
					"width" : "",
					"height" : "",
					"top" : "",
					"left" : ""
				};
				$(this).hide();
				$(this).prop("goal", false);
				$(this).css(pos);
			}
		});
	});

	_btmTira.on("click", function (){
		$(this).css("visibility", "hidden");
		let pos = {
			"top" : "300px",
			"left" : "1025px",
			"width" : "50px",
			"height" : "50px"
		};
		_palla.animate(pos, 500, function (){
			_palla.prop("goal", true);
			_btmNascondiPalla.trigger("click");
		});
	});

	$("#btnRosso").on("click", function (){
		_palla.prop("src", "img/PalloneRosso.jpg");
	});
	$("#btnBianco").on("click", function (){
		_palla.prop("src", "img/palla.jpg");
	});
});