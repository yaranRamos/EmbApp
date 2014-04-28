Lungo.init({
	name: 'Lungo',
	version: '1.0'
});

var array_citas = new Array();

Lungo.ready(function(){
	if (localStorage.getItem("nombre")) {
		datos_pamtalla_inicial();
		Lungo.Router.section('main');
	} else {
		Lungo.Router.section('login');
	}
});