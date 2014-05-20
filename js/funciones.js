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

	function modificar_cita(id){
		db.transaction(function(tx){
			tx.executeSql("SELECT * FROM cita WHERE id='"+id+"';", [], function(tx, result){
				var fecha = result.rows.item(0).fecha.split("/");
				var hora = result.rows.item(0).hora.split(":");
				var alarma = result.rows.item(0).alarma;
				$$('#etiqueta_modificar_cita').val(result.rows.item(0).etiqueta);
				$$('#dia_modificar_cita').val(fecha[0]);
				$$('#mes_modificar_cita').val(fecha[1]);
				$$('#ano_modificar_cita').val(fecha[2]);
				$$('#hora_modificar_cita').val(hora[0]);
				$$('#min_modificar_cita').val(hora[1]);
				$$('#horario_modificar_cita').val(hora[2]);
				$$('#descripcion_modificar_cita').val(result.rows.item(0).descripcion);
				if(alarma == "true"){
					$$('#alarma_modificar_cita').attr("checked",true);
				}
				if(alarma == "false"){
					$$('#alarma_modificar_cita').removeAttr("checked");
				}
				$$('#id_modificar_cita').val("'"+result.rows.item(0).id+"'");
			});
		});
		Lungo.Router.section('modificar_cita');
	}

	function modificar_medicamento(id){
		db.transaction(function(tx){
			tx.executeSql("SELECT * FROM medicamento WHERE id='"+id+"';", [], function(tx, result){
				var fecha_inicio = result.rows.item(0).fecha_inicio.split("/");
				var fecha_final = result.rows.item(0).fecha_final.split("/");
				var hora = result.rows.item(0).hora_ingesta.split(":");
				var alarma = result.rows.item(0).alarma;
				$$('#medicamento_modificar_medicamento').val(result.rows.item(0).medicamento);
				$$('#diaInicio_modificar_medicamento').val(fecha_inicio[0]);
				$$('#mesInicia_modificar_medicamento').val(fecha_inicio[1]);
				$$('#anoInicia_modificar_medicamento').val(fecha_inicio[2]);
				$$('#diaFinal_modificar_medicamento').val(fecha_inicio[0]);
				$$('#mesFinal_modificar_medicamento').val(fecha_inicio[1]);
				$$('#anoFinal_modificar_medicamento').val(fecha_inicio[2]);
				$$('#hora_modificar_medicamento').val(hora[0]);
				$$('#min_modificar_medicamento').val(hora[1]);
				$$('#horario_modificar_medicamento').val(hora[2]);
				$$('#frecuencia_modificar_medicamento').val(result.rows.item(0).frecuencia);
				$$('#docificacion_modificar_medicamento').val(result.rows.item(0).docificacion);
				if(alarma == "true"){
					$$('#alarma_modificar_cita').attr("checked",true);
				}
				if(alarma == "false"){
					$$('#alarma_modificar_cita').removeAttr("checked");
				}
				$$('#id_modificar_medicamento').val("'"+result.rows.item(0).id+"'");
			});
		});
		Lungo.Router.section('modificar_medicamento');
	}
	
	function cargar_lista_citas(){
		db.transaction(function(tx){
			tx.executeSql("SELECT * FROM cita;", [], function(tx, result){
				var cadena = "<ul>";
				for(var i=0; i<result.rows.length; i++){
					var row = result.rows.item(i);
					if(row.alarma == "true"){
						cadena += "<li class='arrow selectable' onclick='modificar_cita("+row.id+")'><span class='icon bell'></span>";
					} else{
						cadena += "<li class='arrow selectable' onclick='modificar_cita("+row.id+")'><span class='icon circle-blank'></span>";
					}
					cadena += "<div class='on-right'>"+row.fecha+"</div><strong>"+row.etiqueta+" - "+row.hora+"</strong><small>"+row.descripcion+"</small></li>";
				}
				cadena += "</ul>";
				$$('#lista_citas').html(cadena);
			});
		}, error_log);
	}

	function cargar_lista_medicamentos(){
		db.transaction(function(tx){
			tx.executeSql("SELECT * FROM medicamento", [], function(tx, result){
				var cadena = "<ul>";
				for(var i=0; i<result.rows.length; i++){
					var row = result.rows.item(i);
					if(row.alarma == "true"){
						cadena += "<li class='arrow selectable' onclick='modificar_medicamento("+row.id+")'><span class='icon bell'></span>";
					} else{
						cadena += "<li class='arrow selectable' onclick='modificar_medicamento("+row.id+")'><span class='icon circle-blank'></span>";
					}
				cadena += "<div class='on-right'>"+row.fecha_final+"</div><strong>"+row.medicamento+"</strong><small>Frecuencia: "+row.frecuencia+" Docificacion: "+row.docificacion+"</small></li>";
				}
				cadena += "</ul>";
				$$('#lista_medicamentos').html(cadena);
			});
		}, error_log);
	}

	$$('#guardar_datos').tap(function () {
		var nombre = $$('#nombre').val();
		var dia = $$('#dia_fecha').val();
		var mes = $$('#mes_fecha').val();
		var ano = $$('#ano_fecha').val();
		var pin = $$('#pin_seguridad').val();
		if (nombre == "" || dia == "" || mes == "" || ano == "" || pin == "") {
			Lungo.Notification.error(
				"Error",
				"Todos los datos son requeridos",
				"warning-sign",
				3);
		} else {
			if(pin.length == 4){
				var fecha = dia+"/"+mes+"/"+ano;
				db.transaction(function(tx){
					tx.executeSql("INSERT INTO usuario (nombre, fecha, pin) VALUES ('"+nombre+"', '"+fecha+"', '"+pin+"');");
					localStorage["nombre"] = nombre;
					localStorage["fecha"] = fecha;
					datos_pamtalla_inicial();
				}, error_log);
				Lungo.Router.section('main');// redirige a una seccion
			} else{
				Lungo.Notification.error(
					"Error",
					"El pin debe ser de 4 caracteres",
					"warning-sign",
					3);
			}
		}
	});

	$$('#eliminar_cuenta').tap(function() {
		Lungo.Notification.html('<div class="form"><br><p>Ingresa tu pin</p><input type="password" class="border" style="width:80%" id="pin_eliminar"><br><button class="anchor" style="width:100%" id="btn_eliminar_cuenta">Aceptar</button><button class="anchor" style="width:100%" data-action="close">Cancelar</button></div>');
	});

	$$('#btn_eliminar_cuenta').tap(function(){
		var pin = $$('#pin_eliminar').val();
		db.transaction(function(tx){
			tx.executeSql("SELECT pin FROM usuario WHERE nombre='"+localStorage["nombre"]+"';", [], function(tx, result){
				if(result.rows.item(0).pin == pin){
					localStorage.clear();
					db.transaction(function(tx){
						tx.executeSql("DROP TABLE usuario;");
						tx.executeSql("DROP TABLE cita;");
						tx.executeSql("DROP TABLE medicamento;");
					}, error_log);
					location.reload();
				} else{
					Lungo.Notification.error(
						"Error",
						"PIN incorrecto",
						"warning-sign",
						3);
				}
			});
		}, error_log);
	});

	$$('#ir_configuracion').tap(function(){
		db.transaction(function(tx){
			tx.executeSql("SELECT * FROM usuario;", [], function(tx, result){
				var fecha = result.rows.item(0).fecha.split("/");
				Lungo.Router.section('configuracion');
				$$('#nombre_usuario').val(result.rows.item(0).nombre);
				$$('#dia_fecha_conf').val(fecha[0]);
				$$('#mes_fecha_conf').val(fecha[1]);
				$$('#ano_fecha_conf').val(fecha[2]);
			});
		}, error_log);
		
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
			var fecha = dia+"/"+mes+"/"+ano;
			db.transaction(function(tx){
				tx.executeSql("UPDATE usuario SET nombre='"+nombre+"', fecha='"+fecha+"' WHERE nombre='"+localStorage["nombre"]+"';");
				localStorage["nombre"] = nombre;
				localStorage["fecha"] = fecha;
				datos_pamtalla_inicial();
			}, error_log);
			Lungo.Router.section('main');
		}
	});

	$$('#ir_citas').tap(function(){
		cargar_lista_citas();
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
			cargar_lista_citas();
			Lungo.Router.back();
		}
	});

	$$('#guardar_modificar_cita').tap(function(){
		var etiqueta = $$('#etiqueta_modificar_cita').val();
		var dia = $$('#dia_modificar_cita').val();
		var mes = $$('#mes_modificar_cita').val();
		var ano = $$('#ano_modificar_cita').val();
		var hr = $$('#hora_modificar_cita').val();
		var min = $$('#min_modificar_cita').val();
		var horario = $$('#horario_modificar_cita').val();
		var descripcion = $$('#descripcion_modificar_cita').val();
		var alarma = $$('#alarma_modificar_cita')[0].checked;
		if (nombre == "" || dia == "" || mes == "" || ano == "" || hr == "" || min == "" || horario == "") {
			Lungo.Notification.error(
				"Error",
				"Todos los datos son requeridos",
				"warning-sign",
				3);
			return;
		} else {
			var fecha;
			var hora;
			fecha = dia+"/"+mes+"/"+ano;
			hora = hr+":"+min+":"+horario;
			db.transaction(function(tx){
				tx.executeSql("UPDATE cita SET etiqueta='"+etiqueta+"', fecha='"+fecha+"', hora='"+hora+"', descripcion='"+descripcion+"', alarma='"+alarma+"' WHERE id="+$$('#id_modificar_cita').val()+";");
			}, error_log);
			Lungo.Notification.success(
				"Datos guardados",
				"Los datos se an guardado correctamente",
				"check",
				3);
			cargar_lista_citas();
			Lungo.Router.back();
		}
	});

	$$('#eliminar_modificar_cita').tap(function(){
		Lungo.Notification.confirm({
			icon: 'remove',
			title: 'Eliminar',
			description: '¿Desea eliminar el registro?',
			accept: {
				icon: 'ok',
				label: 'Si',
				callback: function(){
					db.transaction(function(tx){
						tx.executeSql("DELETE FROM cita WHERE id="+$$('#id_modificar_cita').val()+";");
					}, error_log);
				cargar_lista_citas();
				Lungo.Router.back();
				}
			},
			cancel: {
				icon: 'remove',
				label: 'No'
			}
		});
	});

	$$('#ir_medicamento').tap(function(){
		cargar_lista_medicamentos();
		Lungo.Router.section('medicamentos');
	});

	$$('#btn_nuevo_medicamento').tap(function(){
		$$('#nombre_nuevo_medicamento').val("");
		$$('#dia_fecha_inicion_nuevo_medicamento').val("");
		$$('#mes_fecha_inicion_nuevo_medicamento').val("");
		$$('#ano_fecha_inicion_nuevo_medicamento').val("");
		$$('#dia_fecha_final_nuevo_medicamento').val("");
		$$('#mes_fecha_final_nuevo_medicamento').val("");
		$$('#ano_fecha_final_nuevo_medicamento').val("");
		$$('#hora_nuevo_medicamento').val("");
		$$('#min_nuevo_medicamento').val("");
		$$('#horario_nuevo_medicamento').val("");
		$$('#frecuencia_nuevo_medicamento').val("");
		$$('#docificacion_nuevo_medicamento').val("");
		Lungo.Router.section('nuevo_medicamento');
	});

	$$('#btn_guardar_nuevo_medicamento').tap(function(){
		var nombre = $$('#nombre_nuevo_medicamento').val();
		var dia_inicio = $$('#dia_fecha_inicion_nuevo_medicamento').val();
		var mes_inicio = $$('#mes_fecha_inicion_nuevo_medicamento').val();
		var ano_inicio = $$('#ano_fecha_inicion_nuevo_medicamento').val();
		var dia_final = $$('#dia_fecha_final_nuevo_medicamento').val();
		var mes_final = $$('#mes_fecha_final_nuevo_medicamento').val();
		var ano_final = $$('#ano_fecha_final_nuevo_medicamento').val();
		var hr = $$('#hora_nuevo_medicamento').val();
		var min = $$('#min_nuevo_medicamento').val();
		var horario = $$('#horario_nuevo_medicamento').val();
		var frecuencia = $$('#frecuencia_nuevo_medicamento').val();
		var docificacion = $$('#docificacion_nuevo_medicamento').val();
		var alarma = $$('#alarma_nuevo_medicamento')[0].checked;
		if (nombre == "" || dia_inicio == "" || mes_inicio == "" || ano_inicio == "" || dia_final == "" || mes_final == "" || ano_final == "" || hr == "" || min == "" || horario == "" || frecuencia == "" || docificacion == "") {
			Lungo.Notification.error(
				"Error",
				"Todos los datos son requeridos",
				"warning-sign",
				3);
			return;
		} else {
			var id;
			var fecha_inicio;
			var fecha_final;
			var hora;
			id = hr+min+dia_inicio+mes_inicio+ano_inicio;
			fecha_inicio = dia_inicio+"/"+mes_inicio+"/"+ano_inicio;
			fecha_final = dia_final+"/"+mes_final+"/"+ano_final;
			hora = hr+":"+min+":"+horario;
			db.transaction(function(tx){
				tx.executeSql("INSERT INTO medicamento (id, medicamento, fecha_inicio, fecha_final, hora_ingesta, frecuencia, docificacion, alarma) VALUES ("+id+", '"+nombre+"', '"+fecha_inicio+"', '"+fecha_final+"', '"+hora+"', '"+frecuencia+"', '"+docificacion+"', '"+alarma+"');");
			}, error_log);
			Lungo.Notification.success(
				"Datos guardados",
				"Los datos se an guardado correctamente",
				"check",
				3);
			cargar_lista_medicamentos();
			Lungo.Router.back();
		}
	});
	
	$$('#guardar_medicamento_modificar').tap(function(){
		var nombre = $$('#medicamento_modificar_medicamento').val();
		var dia_inicio = $$('#diaInicio_modificar_medicamento').val();
		var mes_inicio = $$('#mesInicia_modificar_medicamento').val();
		var ano_inicio = $$('#anoInicia_modificar_medicamento').val();
		var dia_final = $$('#diaFinal_modificar_medicamento').val();
		var mes_final = $$('#mesFinal_modificar_medicamento').val();
		var ano_final = $$('#anoFinal_modificar_medicamento').val();
		var hr = $$('#hora_modificar_medicamento').val();
		var min = $$('#min_modificar_medicamento').val();
		var horario = $$('#horario_modificar_medicamento').val();
		var frecuencia = $$('#frecuencia_modificar_medicamento').val();
		var docificacion = $$('#docificacion_modificar_medicamento').val();
		var alarma = $$('#alarma_modificar_medicamento')[0].checked;
		if (nombre == "" || dia_inicio == "" || mes_inicio == "" || ano_inicio == "" || dia_final == "" || mes_final == "" || ano_final == "" || hr == "" || min == "" || horario == "" || frecuencia == "" || docificacion == "") {
			Lungo.Notification.error(
				"Error",
				"Todos los datos son requeridos",
				"warning-sign",
				3);
			return;
		} else {
			var id;
			var fecha_inicio;
			var fecha_final;
			var hora;
			id = hr+min+dia_inicio+mes_inicio+ano_inicio;
			fecha_inicio = dia_inicio+"/"+mes_inicio+"/"+ano_inicio;
			fecha_final = dia_final+"/"+mes_final+"/"+ano_final;
			hora = hr+":"+min+":"+horario;
			db.transaction(function(tx){
				tx.executeSql("UPDATE medicamento SET medicamento='"+nombre+"', fecha_inicio='"+fecha_inicio+"', fecha_final='"+fecha_final+"', hora_ingesta='"+hora+"', frecuencia='"+frecuencia+"', docificacion='"+docificacion+"', alarma='"+alarma+"' WHERE id="+$$('#id_modificar_medicamento').val()+";");
			}, error_log);
			Lungo.Notification.success(
				"Datos guardados",
				"Los datos se an guardado correctamente",
				"check",
				3);
			cargar_lista_medicamentos();
			Lungo.Router.back();
		}
	});

	$$('#eliminar_medicamento_modificar').tap(function(){
		Lungo.Notification.confirm({
			icon: 'remove',
			title: 'Eliminar',
			description: '¿Desea eliminar el registro?',
			accept: {
				icon: 'ok',
				label: 'Si',
				callback: function(){
					db.transaction(function(tx){
						tx.executeSql("DELETE FROM medicamento WHERE id="+$$('#id_modificar_medicamento').val()+";");
					}, error_log);
				cargar_lista_medicamentos();
				Lungo.Router.back();
				}
			},
			cancel: {
				icon: 'remove',
				label: 'No'
			}
		});
	});

	function muestra_alimentos(categoria){
		db.transaction(function(tx){
			tx.executeSql("SELECT * FROM alimento WHERE categoria='"+categoria+"';", [], function(tx, result){
				var cadena = "<ul>";
				for(var i=0; i<result.rows.length; i++){
					var row = result.rows.item(i);
					cadena += "<li><strong>"+row.nombre+"</strong><span class='text small'>"+row.descripcion+"</span></li>"
				}
				cadena += "</ul>";
				$$('#lista_de_alimentos').html(cadena);
			});
		}, error_log);
	}

	var ejercicio = 1;
	$$('#ir_ejercicio').tap(function(){
		db.transaction(function(tx){
			tx.executeSql("SELECT * FROM ejercicio WHERE id='"+ejercicio+"';", [], function(tx, result){
				$$('#nombre_ejercicio').html(result.rows.item(0).nombre);
				$$('#descripcion_ejercicio').html(result.rows.item(0).descripcion);
				Lungo.Router.section('ejercicios');
			});
		}, error_log);
	});

	$$('#siguiente_ejercicio').tap(function(){
		ejercicio = ejercicio + 1;
		if(ejercicio == 4){
			ejercicio = 3;
			return;
		} else{
			db.transaction(function(tx){
				tx.executeSql("SELECT * FROM ejercicio WHERE id='"+ejercicio+"';", [], function(tx, result){
					$$('#nombre_ejercicio').html(result.rows.item(0).nombre);
					$$('#descripcion_ejercicio').html(result.rows.item(0).descripcion);
					Lungo.Router.section('ejercicios');
				});
			}, error_log);
		}
	});

	$$('#anterior_ejercicio').tap(function(){
		ejercicio = ejercicio - 1;
		if(ejercicio == 0){
			ejercicio = 1;
			return;
		} else{
			db.transaction(function(tx){
				tx.executeSql("SELECT * FROM ejercicio WHERE id='"+ejercicio+"';", [], function(tx, result){
					$$('#nombre_ejercicio').html(result.rows.item(0).nombre);
					$$('#descripcion_ejercicio').html(result.rows.item(0).descripcion);
					Lungo.Router.section('ejercicios');
				});
			}, error_log);
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