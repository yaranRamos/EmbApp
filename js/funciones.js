	function datos_pamtalla_inicial(){
		var fechaActual = new Date();
		var diaActual = fechaActual.getDate();
		var mesActual = fechaActual.getMonth()+1;
		var anoActual = fechaActual.getFullYear();
		var fechaUsuario = localStorage.getItem("fecha").split("/");
		var diaUsuario = fechaUsuario[0];
		var mesUsuario = fechaUsuario[1];
		var anoUsuario = fechaUsuario[2];
		var diaAproximado = parseInt(diaUsuario) + 7;
		var mesAproximado = parseInt(mesUsuario) - 3;
		var anoAproximado = anoUsuario;
		var mes = "";
		var semanasAproximadas = (parseInt(mesActual) - parseInt(mesUsuario)) / 7;
		if(diaAproximado > 30){
			diaAproximado = parseInt(diaAproximado) - 30;
		}
		if(mesAproximado < 0){
			mesAproximado = parseInt(mesAproximado) - 12;
			anoAproximado = parseInt(anoAproximado) +1;
		}
		if(mesUsuario >= 4){
			anoAproximado = parseInt(anoAproximado) +1;
		}
		if(mesAproximado == 1){
			mes = "Enero";
		} else if(mesAproximado == 2){
			mes = "Febrero";
		} else if(mesAproximado == 3){
			mes = "Marzo";
		} else if(mesAproximado == 4){
			mes = "Abril";
		} else if(mesAproximado == 5){
			mes = "Mayo";
		} else if(mesAproximado == 6){
			mes = "Junio";
		} else if(mesAproximado == 7){
			mes = "Julio";
		} else if(mesAproximado == 8){
			mes = "Agosto";
		} else if(mesAproximado == 9){
			mes = "Septiembre";
		} else if(mesAproximado == 10){
			mes = "Octubre";
		} else if(mesAproximado == 11){
			mes = "Noviembre";
		} else if(mesAproximado == 12){
			mes = "Diciembre";
		}
		var fechaAproximada = diaAproximado+"/"+mes+"/"+anoAproximado;
		$$('#bienvenido').html("Bienvenida "+localStorage.getItem("nombre")+" tu bebe tiene aproximadamente "+0+" semanas, y la fecha de parto aproximada es: ");
	}
	$$('#guardar_datos').tap(function () {
		var nombre = $$('#nombre').val();
		var dia = $$('#dia_fecha').val();
		var mes = $$('#mes_fecha').val();
		var ano = $$('#ano_fecha').val();
		if (nombre == "" || dia == "" || mes == "" || ano == "") {
			Lungo.Notification.error(
				"Error",
				"Todos los datos son requeridos",
				"warning-sign",
				3);
			return;
		} else {
			localStorage["nombre"] = nombre;
			localStorage["fecha"] = dia+"/"+mes+"/"+ano;
			datos_pamtalla_inicial();
			Lungo.Router.section('main');
		}
	});

	$$('#eliminar_cuenta').tap(function() {
		Lungo.Notification.confirm({
			icon: 'remove',
			title: 'Borrar',
			description: '¿Desea elimiar sus datos?',
			accept: {
				icon: 'ok',
				label: 'Si',
				callback: function(){
					localStorage.clear();
					db.transaction(function(tx){
						tx.executeSql("DROP TABLE cita");
					}, error_log);
					location.reload();
				}
			},
			cancel: {
				icon: 'remove',
				label: 'No'
			}
		});
	});

	$$('#ir_configuracion').tap(function(){
		Lungo.Router.section('configuracion');
		$$('#nombre_usuario').val(localStorage.getItem("nombre"));
		var fecha = localStorage.getItem("fecha").split("/");
		$$('#dia_fecha_conf').val(fecha[0]);
		$$('#mes_fecha_conf').val(fecha[1]);
		$$('#ano_fecha_conf').val(fecha[2]);
	});

	$$('#guardar_datos_conf').tap(function(){
		var nombre = $$('#nombre_usuario').val();
		var dia = $$('#dia_fecha_conf').val();
		var mes = $$('#mes_fecha_conf').val();
		var ano = $$('#ano_fecha_conf').val();
		if (nombre == "" && dia == "" && mes == "" && ano == "") {
			Lungo.Notification.error(
				"Error",
				"Todos los datos son requeridos",
				"warning-sign",
				3);
			return;
		} else {
			localStorage["nombre"] = nombre;
			localStorage["fecha"] = dia+"/"+mes+"/"+ano;
			datos_pamtalla_inicial();
			Lungo.Router.section('main');
		}
	});

	$$('#ir_citas').tap(function(){
		db.transaction(function(tx){
			tx.executeSql("SELECT * FROM cita", [], function(tx, result){
				var cadena = "<ul>";
				for(var i=0; i<result.rows.length; i++){
					var row = result.rows.item(i);
					cadena += "<li class='arrow selectable' data-view-section='modificar_cita'><div class='on-right'>"+row.fecha+"</div><strong>"+row.etiqueta+" - "+row.hora+"</strong><small>"+row.descripcion+"</small></li>";
				}
				cadena += "</ul>";
				$$('#lista_citas').html(cadena);
			});
		}, error_log);

		Lungo.Router.section('citas');
	});

	$$('#btn_nueva_cita').tap(function(){
		$$('#etiqueta_cita_nueva').val("");
		$$('#dia_form_nueva_cita').val("");
		$$('#mes_form_nueva_cita').val("");
		$$('#ano_form_nueva_cita').val("");
		$$('#hora_form_nueva_cita').val("");
		$$('#min_form_nueva_cita').val("");
		$$('#horario_form_nueva_cita').val("");
		$$('#descripcion_cita_nueva').val("");
		$$('#alarma_cita_nueva').val("");
		Lungo.Router.section('nueva_cita');
	});
	$$('#guardar_cita_nueva').tap(function(){
		var etiqueta = $$('#etiqueta_cita_nueva').val();
		var dia = $$('#dia_form_nueva_cita').val();
		var mes = $$('#mes_form_nueva_cita').val();
		var ano = $$('#ano_form_nueva_cita').val();
		var hr = $$('#hora_form_nueva_cita').val();
		var min = $$('#min_form_nueva_cita').val();
		var horario = $$('#horario_form_nueva_cita').val();
		var descripcion = $$('#descripcion_cita_nueva').val();
		var alarma = $$('#alarma_cita_nueva')[0].checked;
		if (nombre == "" || dia == "" || mes == "" || ano == "" || hr == "" || min == "" || horario == "") {
			Lungo.Notification.error(
				"Error",
				"Todos los datos son requeridos",
				"warning-sign",
				3);
			return;
		} else {
			var array_datos = new Array();
			var id;
			var fecha;
			var hora;
			id = hr+min+dia+mes+ano;
			fecha = dia+"/"+mes+"/"+ano;
			hora = hr+":"+min+":"+horario;
			db.transaction(function(tx){
				tx.executeSql("INSERT INTO cita (id, etiqueta, fecha, hora, descripcion, alarma) VALUES ("+id+", '"+etiqueta+"', '"+fecha+"', '"+hora+"', '"+descripcion+"', '"+alarma+"');");
			}, error_log);
			Lungo.Notification.success(
				"Datos guardados",
				"Los datos se an guardado correctamente",
				"check",
				3);
			db.transaction(function(tx){
				tx.executeSql("SELECT * FROM cita", [], function(tx, result){
					var cadena = "<ul>";
					for(var i=0; i<result.rows.length; i++){
						var row = result.rows.item(i);
						cadena += "<li class='arrow selectable' data-view-section='modificar_cita'><div class='on-right'>"+row.fecha+"</div><strong>"+row.etiqueta+" - "+row.hora+"</strong><small>"+row.descripcion+"</small></li>";
					}
					cadena += "</ul>";
					$$('#lista_citas').html(cadena);
				});
			}, error_log);
			Lungo.Router.back();
		}
	});

	$$('#salir').tap(function(){
		Lungo.Notification.confirm({
			icon: 'signout',
			title: 'Salir',
			description: '¿Desea salir de EmbApp?',
			accept: {
				icon: 'ok',
				label: 'Si',
				callback: function(){navigator.app.exitApp();}
			},
			cancel: {
				icon: 'remove',
				label: 'No'
			}
		});
	});
	
	$$('#salir_inicio').tap(function(){
		Lungo.Notification.confirm({
			icon: 'signout',
			title: 'Salir',
			description: '¿Desea salir de EmbApp?',
			accept: {
				icon: 'ok',
				label: 'Si',
				callback: function(){navigator.app.exitApp();}
			},
			cancel: {
				icon: 'remove',
				label: 'No'
			}
		});
	});