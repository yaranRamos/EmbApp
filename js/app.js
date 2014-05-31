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
				var mesActual = fecha.getMonth()+1;
				var diaActual = fecha.getDate();
				var hora = fecha.getHours();
				var horario = "";
				if(mesActual >= 1 && mesActual <= 9) {
					mesActual = "0"+mesActual;
				}
				if(diaActual >= 1 && diaActual <= 9) {
					diaActual = "0"+diaActual;
				}
				var fecha_actual = diaActual+"/"+mesActual+"/"+fecha.getFullYear();
				if(hora >= 12){
					horario = "pm";
				} else{
					horario = "am";
				}

				if(hora == 1){
					hora = "01";
				} else if(hora == 2){
					hora = "02";
				} else if(hora == 3){
					hora = "03";
				} else if(hora == 4){
					hora = "04";
				} else if(hora == 5){
					hora = "05";
				} else if(hora == 6){
					hora = "06";
				} else if(hora == 7){
					hora = "07";
				} else if(hora == 8){
					hora = "08";
				} else if(hora == 9){
					hora = "09";
				} else if(hora == 13){
					hora = "01";
				} else if(hora == 14){
					hora = "02";
				} else if(hora == 15){
					hora = "03";
				} else if(hora == 16){
					hora = "04";
				} else if(hora == 17){
					hora = "05";
				} else if(hora == 18){
					hora = "06";
				} else if(hora == 19){
					hora = "07";
				} else if(hora == 20){
					hora = "08";
				} else if(hora == 21){
					hora = "09";
				} else if(hora == 22){
					hora = "10";
				} else if(hora == 23){
					hora = "11";
				} else if(hora == 24){
					hora = "12";
				}
				var hora_actual = hora+":"+fecha.getMinutes()+":"+horario;
				for(var i=0; i<result.rows.length; i++){
					var row = result.rows.item(i);
					if(row.alarma == "true"){
						if(row.fecha == fecha_actual){
							if(row.hora == hora_actual){
								window.plugin.notification.local.add({
									id: row.id,
									message: row.descripcion,
									title: row.etiqueta
								});
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

$$('#reproducir').tap(function(){
	navigator.notification.beep(3);
});
$$('#notificacion').tap(function(){
	window.plugin.notification.local.add({
		id: 0,
		message: "Notificacion",
		title: "Notificacion"
	});
});