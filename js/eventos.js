	$$('#main').swipeRight(function(){
		Lungo.Aside.show("menu");
	});
	$$('#menu').swipeLeft(function(){
		Lungo.Aside.hide();
	});
	$$('#citas').swipeRight(function(){
		Lungo.Router.back();
	});
	$$('#medicamentos').swipeRight(function(){
		Lungo.Router.back();
	});
	$$('#alimentos').swipeRight(function(){
		Lungo.Router.back();
	});
	$$('#ejercicios').swipeRight(function(){
		Lungo.Router.back();
	});
	$$('#configuracion').swipeRight(function(){
		Lungo.Router.back();
	});
	$$('#acerca').swipeRight(function(){
		Lungo.Router.back();
	});
	$$('#modificar_cita').swipeRight(function(){
		Lungo.Router.back();
	});
	$$('#nueva_cita').swipeRight(function(){
		Lungo.Router.back();
	});
	$$('#nuevo_medicamento').swipeRight(function(){
		Lungo.Router.back();
	});
	$$('#modificar_medicamento').swipeRight(function(){
		Lungo.Router.back();
	});
	document.addEventListener("backbutton", onBackKeyDown, false);
	
	function onBackKeyDown() {
		if($$('#main').hasClass('show')){
			navigator.app.exitApp();
		} else {
			Lungo.Router.back();
		}
	}