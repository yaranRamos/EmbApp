function onload() {
	document.addEventListener("deviceready", onDeviceReady, false);	
}

function onDeviceReady() {
    document.addEventListener("pause", onPause, false);
    document.addEventListener("resume", onResume, false);
}
 
function onPause() {
	setInterval(function(){
		location.reload();
		navigator.notification.alert("Notificacion de Cita", alertCallback, 'Notificacion', 'Aceptar');
		navigator.notification.beep(3);
	},30000);
}

function onResume() {
}

function alertCallback() {

}

function play(){
	navigator.notification.beep(3);
}

Lungo.init({
	name: 'Lungo',
	version: '1.0'
});

Lungo.ready(function(){
	if (localStorage.getItem("nombre")) {
		datos_pamtalla_inicial();
		Lungo.Router.section('main');
	} else {
		Lungo.Router.section('login');
		$("#ano_fecha").val("");
	}
});