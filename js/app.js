var bucle_background;
function onload() {
	document.addEventListener("deviceready", onDeviceReady, false);	
}

function onDeviceReady() {
    document.addEventListener("pause", onPause, false);
    document.addEventListener("resume", onResume, false);
}
 
function onPause() {
	bucle_background = setInterval(function(){
		db.transaction(function(tx){
			tx.executeSql("SELECT * FROM cita;", [], function(tx, result){
				var fecha = new Date();
				var diaActual = fecha.getDate();
				var mesActual = fecha.getMonth()+1;
				var anoActual = fecha.getFullYear();
				var hora = fecha.getHours();
				var min = fecha.getMinutes();
				var horario = "";
				if(mesActual >= 1 && mesActual <= 9) {
					mesActual = "0"+mesActual;
				}
				if(hora > 12){
					horario = "pm";
				} else{
					horario = "am";
				}
				if(hora == 13){
					hora = 01;
				} else if(hora == 14){
					hora = 02;
				} else if(hora == 15){
					hora = 03;
				} else if(hora == 16){
					hora = 04;
				} else if(hora == 17){
					hora = 05;
				} else if(hora == 18){
					hora = 06;
				} else if(hora == 19){
					hora = 07;
				} else if(hora == 20){
					hora = 08;
				} else if(hora == 21){
					hora = 09;
				} else if(hora == 22){
					hora = 10;
				} else if(hora == 23){
					hora = 11;
				} else if(hora == 24){
					hora = 12;
				}
				var hora_actual = hora+":"+min+":"+horario;
				var fecha_actual = diaActual+"/"+mesActual+"/"+anoActual;
				for(var i=0; i<result.rows.length; i++){
					var row = result.rows.item(i);
					var fecha_alarma = row.fecha;
					var hora_alarma = row.hora;
					var alarma = row.alarma;
					if(alarma == "true"){
						if(fecha_alarma == fecha_actual){
							if(hora_alarma == hora_actual){
								navigator.notification.beep(3);
							}
						}
					}
				}
			});
		}, error_log);
	},30000);
}

function onResume() {
	clearInterval(bucle_background);
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