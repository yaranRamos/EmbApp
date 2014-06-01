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
		var hora = fechaActual.getHours()+":"+fechaActual.getMinutes();
		var mes = "";
		var semanasAproximadas = (parseInt(mesActual) - parseInt(mesUsuario)) * 4;
		var meses_feto = parseInt(mesActual) - parseInt(mesUsuario);
		if(diaAproximado > 30){
			diaAproximado = parseInt(diaAproximado) - 30;
		}
		if(mesAproximado <= 0){
			mesAproximado = parseInt(mesAproximado) + 12;
		}
		if(mesUsuario > 3){
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
		$$('#bienvenido').html("Bienvenida <b>"+localStorage.getItem("nombre")+"</b> tu bebe tiene aproximadamente <strong>"+semanasAproximadas+"</strong> semanas, y la fecha aproximada de parto es: <b>"+fechaAproximada+"</b>");
		if (meses_feto == 0) {
			$$('#img_feto').attr('src', 'media/fetos/feto1.png');
		} else if (meses_feto == 1) {
			$$('#img_feto').attr('src', 'media/fetos/feto1.png');
		} else if (meses_feto == 2) {
			$$('#img_feto').attr('src', 'media/fetos/feto2.png');
		} else if (meses_feto == 3) {
			$$('#img_feto').attr('src', 'media/fetos/feto3.png');
		} else if (meses_feto == 4) {
			$$('#img_feto').attr('src', 'media/fetos/feto4.png');
		} else if (meses_feto == 5) {
			$$('#img_feto').attr('src', 'media/fetos/feto5.png');
		} else if (meses_feto == 6) {
			$$('#img_feto').attr('src', 'media/fetos/feto6.png');
		} else if (meses_feto == 7) {
			$$('#img_feto').attr('src', 'media/fetos/feto7.png');
		} else if (meses_feto == 8) {
			$$('#img_feto').attr('src', 'media/fetos/feto8.png');
		} else if (meses_feto == 9) {
			$$('#img_feto').attr('src', 'media/fetos/feto9.png');
		}

		var progreso = (semanasAproximadas / 40) * 100;
		$$('#lbl_proceso').html("Progreso: "+progreso+"%")
		Lungo.Element.progress('#progress-normal', progreso, true);
	}

	function modificar_cita(id){
		// Cargamos los dias 
		// -- DIAS --
		var dia_mod_cita = $$("#dia_modificar_cita");
        for(i=1; i<=31; i++){
        	if(i<10){
        	dia_mod_cita.append('<option value ="0'+i+'">0'+i+'</option>');
        	}else{
        	dia_mod_cita.append('<option value ="'+i+'">'+i+'</option>');
        	}
        }
        // cargamos las horas
        // -- HORAS --
        var hora_mod_cita = $$("#hora_modificar_cita");
        for(i=1;i<=12;i++){
        	if(i<10){
        	hora_mod_cita.append('<option value ="0'+i+'">0'+i+'</option>');
        	}else{
        	hora_mod_cita.append('<option value ="'+i+'">'+i+'</option>');	
        	}
        }

        // cargamos los minutos
        // -- MINUTOS --
        var minuto_mod_cita = $$("#min_modificar_cita");
        for(i=0;i<=60;i++){
        	if(i<10){
        		minuto_mod_cita.append('<option value ="0'+i+'">0'+i+'</option>');
        	}else{
        		minuto_mod_cita.append('<option value ="'+i+'">'+i+'</option>');
        	}
        }
        // Realizamos la consulta
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
       // cargamos los dias
        var mod_dia_med = $$('#diaInicio_modificar_medicamento');
        for(i=1; i<=31; i++){
        	if(i<10){
        	mod_dia_med.append('<option value = "0'+i+'">0'+i+'</option>');
        	}else{
        	mod_dia_med.append('<option value = "'+i+'">'+i+'</option>');
        	}
        }

        // cargamos las horas 
        var mod_horas_med = $$("#hora_modificar_medicamento");
        for(i=1; i<=12;i++){
        	if(i<10){
        		mod_horas_med.append('<option value="0'+i+'">0'+i+'</option>');
        	}else{
        		mod_horas_med.append('<option value="'+i+'">'+i+'</option>');
        	}
        }

        // cargamos los minutos
        var mod_min_med = $$("#min_modificar_medicamento");
        for(i=0;i<=60;i++){
        	if(i<10){
        		mod_min_med.append('<option value="0'+i+'">0'+i+'</option>');
        	}else{
        		mod_min_med.append('<option value= "'+i+'">'+i+'</option>');
        	}
        }

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
		var expRegNombre = /^\s*$/;//expRegular valida no vacio
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
				return;
		}else if(expRegNombre.test(nombre)){
			Lungo.Notification.error(
				"Error",
				"Todos los datos son requeridos",
				"warning-sign",
				3);
			return;
		} else {
			if(pin.length == 4){
				var fecha = dia+"/"+mes+"/"+ano;
				db.transaction(function(tx){
					tx.executeSql("INSERT INTO usuario (nombre, fecha, pin) VALUES ('"+nombre+"', '"+fecha+"', '"+pin+"');");
					localStorage["nombre"] = nombre;
					localStorage["fecha"] = fecha;
					localStorage["pin"] = pin;
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
		if(localStorage["pin"] == pin){
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
		var expRegNombre = /^\s*$/;//expRegular valida no vacio
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
		}else if(expRegNombre.test(nombre)){
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
		var expRegNombre = /^\s*$/;//expRegular valida no vacio
		var etiqueta = $$('#etiqueta_cita_nueva').val();
		var dia = $$('#dia_form_nueva_cita').val();
		var mes = $$('#mes_form_nueva_cita').val();
		var ano = $$('#ano_form_nueva_cita').val();
		var hr = $$('#hora_form_nueva_cita').val();
		var min = $$('#min_form_nueva_cita').val();
		var horario = $$('#horario_form_nueva_cita').val();
		var descripcion = $$('#descripcion_cita_nueva').val();
		var alarma = $$('#alarma_cita_nueva')[0].checked;
		if (etiqueta == "" || dia == "" || mes == "" || ano == "" || hr == "" || min == "" || horario == "") {
			Lungo.Notification.error(
				"Error",
				"Todos los datos son requeridos",
				"warning-sign",
				3);
			return;
			//Que valla almenos un caracter
		}else if(expRegNombre.test(etiqueta) || expRegNombre.test(dia) || expRegNombre.test(mes) || expRegNombre.test(ano) || expRegNombre.test(hr) || expRegNombre.test(min) || expRegNombre.test(horario)){
			Lungo.Notification.error(
				"Error",
				"Todos los campos son requeridos",
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
		var expRegNombre = /^\s*$/;//expRegular valida no vacio
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
		}else if(expRegNombre.test(etiqueta) || expRegNombre.test(dia) || expRegNombre.test(mes) || expRegNombre.test(ano) || expRegNombre.test(hr) || expRegNombre.test(min) || expRegNombre.test(horario)){
			Lungo.Notification.error(
				"Error",
				"Todos los campos son requeridos",
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
		var expRegNombre = /^\s*$/;//expRegular valida no vacio
		var nombre = $$('#nombre_nuevo_medicamento').val();
		var dia_inicio = $$('#dia_fecha_inicion_nuevo_medicamento').val();
		var mes_inicio = $$('#mes_fecha_inicion_nuevo_medicamento').val();
		var ano_inicio = $$('#ano_fecha_inicion_nuevo_medicamento').val();
		//var dia_final = $$('#dia_fecha_final_nuevo_medicamento').val();
		//var mes_final = $$('#mes_fecha_final_nuevo_medicamento').val();
		//var ano_final = $$('#ano_fecha_final_nuevo_medicamento').val();
		var hr = $$('#hora_nuevo_medicamento').val();
		var min = $$('#min_nuevo_medicamento').val();
		var horario = $$('#horario_nuevo_medicamento').val();
		var frecuencia = $$('#frecuencia_nuevo_medicamento').val();
		var docificacion = $$('#docificacion_nuevo_medicamento').val();
		var alarma = $$('#alarma_nuevo_medicamento')[0].checked;
		if (nombre == "" || dia_inicio == "" || mes_inicio == "" || ano_inicio == "" || /*dia_final == "" || mes_final == "" || ano_final == "" ||*/ hr == "" || min == "" || horario == "" || frecuencia == "" || docificacion == "") {
			Lungo.Notification.error(
				"Error",
				"Todos los datos son requeridos",
				"warning-sign",
				3);
			return;
		}else if(expRegNombre.test(nombre) || expRegNombre.test(dia_inicio) || expRegNombre.test(mes_inicio) || expRegNombre.test(ano_inicio) || expRegNombre.test(dia_final) || expRegNombre.test(mes_final) || expRegNombre.test(ano_final) || expRegNombre.test(hr) || expRegNombre.test(min) || expRegNombre.test(horario) || expRegNombre.test(frecuencia) || expRegNombre.test(docificacion)){
			Lungo.Notification.error(
				"Error",
				"Todos los campos son requeridos",
				"warning-sign",
				3);
			return;
		} else {
			var id;
			var fecha_inicio;
			//var fecha_final;
			var hora;
			id = hr+min+dia_inicio+mes_inicio+ano_inicio;
			fecha_inicio = dia_inicio+"/"+mes_inicio+"/"+ano_inicio;
			//fecha_final = dia_final+"/"+mes_final+"/"+ano_final;
			hora = hr+":"+min+":"+horario;
			db.transaction(function(tx){
				tx.executeSql("INSERT INTO medicamento (id, medicamento, fecha_inicio, hora_ingesta, frecuencia, docificacion, alarma) VALUES ("+id+", '"+nombre+"', '"+fecha_inicio+"', '"+fecha_final+"', '"+hora+"', '"+frecuencia+"', '"+docificacion+"', '"+alarma+"');");
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
		/*var dia_final = $$('#diaFinal_modificar_medicamento').val();
		var mes_final = $$('#mesFinal_modificar_medicamento').val();
		var ano_final = $$('#anoFinal_modificar_medicamento').val();*/
		var hr = $$('#hora_modificar_medicamento').val();
		var min = $$('#min_modificar_medicamento').val();
		var horario = $$('#horario_modificar_medicamento').val();
		var frecuencia = $$('#frecuencia_modificar_medicamento').val();
		var docificacion = $$('#docificacion_modificar_medicamento').val();
		var alarma = $$('#alarma_modificar_medicamento')[0].checked;
		if (nombre == "" || dia_inicio == "" || mes_inicio == "" || ano_inicio == "" || /*dia_final == "" || mes_final == "" || ano_final == "" ||*/ hr == "" || min == "" || horario == "" || frecuencia == "" || docificacion == "") {
			Lungo.Notification.error(
				"Error",
				"Todos los datos son requeridos",
				"warning-sign",
				3);
			return;
		}else if(expRegNombre.test(nombre) || expRegNombre.test(dia_inicio) || expRegNombre.test(mes_inicio) || expRegNombre.test(ano_inicio) || expRegNombre.test(dia_final) || expRegNombre.test(mes_final) || expRegNombre.test(ano_final) || expRegNombre.test(hr) || expRegNombre.test(min) || expRegNombre.test(horario) || expRegNombre.test(frecuencia) || expRegNombre.test(docificacion)){
			Lungo.Notification.error(
				"Error",
				"Todos los campos son requeridos",
				"warning-sign",
				3);
			return;
		} else {
			var id;
			var fecha_inicio;
			//var fecha_final;
			var hora;
			id = hr+min+dia_inicio+mes_inicio+ano_inicio;
			fecha_inicio = dia_inicio+"/"+mes_inicio+"/"+ano_inicio;
			//fecha_final = dia_final+"/"+mes_final+"/"+ano_final;
			hora = hr+":"+min+":"+horario;
			db.transaction(function(tx){
				tx.executeSql("UPDATE medicamento SET medicamento='"+nombre+"', fecha_inicio='"+fecha_inicio+"', hora_ingesta='"+hora+"', frecuencia='"+frecuencia+"', docificacion='"+docificacion+"', alarma='"+alarma+"' WHERE id="+$$('#id_modificar_medicamento').val()+";");
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

function meses(){
	//limpio los dias del select
	document.getElementById("dia_fecha").options.length = 0;
	var dias = 0;
	var mes = $$("#mes_fecha").val();
	var ano = $$("#ano_fecha").val();
	var dia = $$("#dia_fecha");

	// obtenemos el mes actual y comparamos con mes ingresado
	var f = new Date();
	var m = f.getMonth();// mes actual
	var m = m+1; // este lo puse por que el mes me lo estaba regresando como abril
	var a = f.getFullYear(); // año actual

	dia.append('<option value ="">Día</option>');

	if(!ano){
		Lungo.Notification.error(
				"Error",
				"Ingresa el año",
				"warning-sign",
				2);
				document.getElementById('mes_fecha').value = '0';//pongo en 0 los meses 
			return;
	}else if(mes > m && a == ano){// La fecha de ultimo dia de mestruacion no puede ser mayor a la fecha actual
		Lungo.Notification.error(
				"Error",
				"El Mes ingresado no es válido",
				"warning-sign",
				2);
			return;
	}
	else{
	// Obtenemos los dias del mes y el año
		if((mes == 1)||(mes == 3)||(mes == 5)||(mes == 7)||(mes == 8)||(mes == 10)||(mes == 12)){
       		dias=31;
    	}
   		else if((mes == 4)||(mes == 6)||(mes == 9)||(mes == 11)){
       		dias=30;
    	}
    	else if(mes == 02)
    	{
        	if((ano % 4 == 0)&&(ano % 100 != 0)||(ano % 400 == 0)){
           		 dias=29;
        	}
        	else{
            	dias=28;
        	}
    	}
    }
    for (var i=1; i<=dias; i++) {
    	dia.append('<option value = "'+ i + '">'+ i + '</option>');
	}
}

function meses_nueva_cita(){
	//limpio los dias del select
	document.getElementById("dia_form_nueva_cita").options.length = 0;
	var dias = 0;
	var mes = $$("#mes_form_nueva_cita").val();
	var ano = $$("#ano_form_nueva_cita").val();
	var dia = $$("#dia_form_nueva_cita");
	var mes2 = $$("#mes_form_nueva_cita");

	// obtenemos el mes actual y comparamos con mes y día ingresado
	var f = new Date();
	var m = f.getMonth();// mes actual
	var m = m+1; // este lo puse por que el mes me lo estaba regresando como abril
	var a = f.getFullYear(); // año actual

	dia.append('<option value ="">Día</option>');

	if(!ano){
		Lungo.Notification.error(
				"Error",
				"Ingresa el año",
				"warning-sign",
				2);
			$$("#mes_form_nueva_cita").val("");
			return;
	}else if(ano == a && mes < m){
		Lungo.Notification.error(
				"Error",
				"El mes ingreado no puede ser menor al mes actual!",
				"warning-sign",
				3);
		$$("#mes_form_nueva_cita").val("");
		return;
	}else{
	// Obtenemos los dias del mes y el año
		if((mes == 01)||(mes == 03)||(mes == 05)||(mes == 07)||(mes == 08)||(mes == 10)||(mes == 12)){
       		dias=31;
    	}
   		else if((mes == 04)||(mes == 06)||(mes == 09)||(mes == 11)){
       		dias=30;
    	}
    	else if(mes == 02)
    	{
        	if((ano % 4 == 0)&&(ano % 100 != 0)||(ano % 400 == 0)){
           		 dias=29;
        	}
        	else{
            	dias=28;
        	}
    	}
    }
    for (var i=1; i<=dias; i++) {
    	dia.append('<option value = "'+ i + '">'+ i + '</option>');
	}
}

function verifica_dia(dia_form){
	var dia_form = dia_form;
	//document.getElementById("dia_form_nueva_cita").options.length = 0;
	var dias = 0;
	var mes = $$("#mes_form_nueva_cita").val();
	var ano = $$("#ano_form_nueva_cita").val();
	var dia = $$("#dia_form_nueva_cita");

	// obtenemos el mes actual y comparamos con mes y día ingresado
	var f = new Date();
	var m = f.getMonth();// mes actual
	var m = m+1; // este lo puse por que el mes me lo estaba regresando como abril
	var a = f.getFullYear(); // año actual
	var d = f.getDate(); // dia actual	

	 if(ano == a && mes == m && dia_form < d){
	 	Lungo.Notification.error(
				"Error",
				"El dia ingreado no puede ser menor al dia actual!",
				"warning-sign",
				3);
	 	//volvemos a llenar los dias
	 	// Obtenemos los dias del mes y el año
		$$("#dia_form_nueva_cita").val("");
	 	return;
	 }
}

function get_dias_med(mes){
	document.getElementById("dia_fecha_inicion_nuevo_medicamento").options.length = 0;
	//Variables de mi seccion
	ano = $$("#ano_fecha_inicion_nuevo_medicamento").val();
	mes = mes;
	dia = $$("#dia_fecha_inicion_nuevo_medicamento");

	//Obtengo fechas actuales
	var f = new Date();
	var m = f.getMonth();// mes actual
	var m = m+1; // este lo puse por que el mes me lo estaba regresando como abril
	var a = f.getFullYear(); // año actual
	var d = f.getDate(); // dia actual

	dia.append('<option value ="">Día</option>');

	if(!ano){
		Lungo.Notification.error(
				"Error",
				"Ingresa el año!",
				"warning-sign",
				3);
		$$("#mes_fecha_inicion_nuevo_medicamento").val("");
		return;
	}else if(mes < m && ano == a){
		Lungo.Notification.error(
				"Error",
				"El mes ingreado no puede ser menor al mes actual!",
				"warning-sign",
				3);
		$$("#mes_fecha_inicion_nuevo_medicamento").val("");
		return;
	}else{
		// Obtenemos los dias del mes y el año
		if((mes == 01)||(mes == 03)||(mes == 05)||(mes == 07)||(mes == 08)||(mes == 10)||(mes == 12)){
       		dias=31;
    	}
   		else if((mes == 04)||(mes == 06)||(mes == 09)||(mes == 11)){
       		dias=30;
    	}
    	else if(mes == 02)
    	{
        	if((ano % 4 == 0)&&(ano % 100 != 0)||(ano % 400 == 0)){
           		 dias=29;
        	}
        	else{
            	dias=28;
        	}
    	}
	}

	for (var i=1; i<=dias; i++) {
		if(i < 10){
		dia.append('<option value = "0'+ i + '">0'+ i + '</option>');
		}else{
    	dia.append('<option value = "'+ i + '">'+ i + '</option>');
		}
	}
}

 function update_mes_conf(mes){
	document.getElementById("dia_fecha_conf").options.length = 0;
	//Variables de mi seccion
	ano = $$("#ano_fecha_conf").val();
	mes = mes;
	dia = $$("#dia_fecha_conf");

	//Obtengo fechas actuales
	var f = new Date();
	var m = f.getMonth();// mes actual
	var m = m+1; // este lo puse por que el mes me lo estaba regresando como abril
	var a = f.getFullYear(); // año actual
	var d = f.getDate(); // dia actual

	dia.append('<option value ="">Día</option>');

	if(!ano){
		Lungo.Notification.error(
				"Error",
				"Ingresa el año!",
				"warning-sign",
				3);
		$$("#mes_fecha_conf").val("");
		return;
	}else{
		// Obtenemos los dias del mes y el año
		if((mes == 01)||(mes == 03)||(mes == 05)||(mes == 07)||(mes == 08)||(mes == 10)||(mes == 12)){
       		dias=31;
    	}
   		else if((mes == 04)||(mes == 06)||(mes == 09)||(mes == 11)){
       		dias=30;
    	}
    	else if(mes == 02)
    	{
        	if((ano % 4 == 0)&&(ano % 100 != 0)||(ano % 400 == 0)){
           		 dias=29;
        	}
        	else{
            	dias=28;
        	}
    	}
	}

	for (var i=1; i<=dias; i++) {
		if(i < 10){
		dia.append('<option value = "0'+ i + '">0'+ i + '</option>');
		}else{
    	dia.append('<option value = "'+ i + '">'+ i + '</option>');
		}
	}
}

function valida_dia_newMed(dia){
	var dia_form = dia;
	//document.getElementById("dia_form_nueva_cita").options.length = 0;
	var dias = 0;
	var mes = $$("#mes_fecha_inicion_nuevo_medicamento").val();
	var ano = $$("#ano_fecha_inicion_nuevo_medicamento").val();
	var dia = $$("#dia_fecha_inicion_nuevo_medicamento");

	// obtenemos el mes actual y comparamos con mes y día ingresado
	var f = new Date();
	var m = f.getMonth();// mes actual
	var m = m+1; // este lo puse por que el mes me lo estaba regresando como abril
	var a = f.getFullYear(); // año actual
	var d = f.getDate(); // dia actual	

	 if(ano == a && mes == m && dia_form < d){
	 	Lungo.Notification.error(
				"Error",
				"El dia ingreado no puede ser menor al dia actual!",
				"warning-sign",
				3);
	 	//volvemos a llenar los dias
	 	// Obtenemos los dias del mes y el año
		$$("#dia_fecha_inicion_nuevo_medicamento").val("");
	 	return;
	 }
}

function update_cita_dia(mes){
	document.getElementById("dia_modificar_cita").options.length = 0;
	//Variables de mi seccion
	ano = $$("#ano_modificar_cita").val();
	mes = mes;
	dia = $$("#dia_modificar_cita");

	//Obtengo fechas actuales
	var f = new Date();
	var m = f.getMonth();// mes actual
	var m = m+1; // este lo puse por que el mes me lo estaba regresando como abril
	var a = f.getFullYear(); // año actual
	var d = f.getDate(); // dia actual

	dia.append('<option value ="">Día</option>');

	if(!ano){
		Lungo.Notification.error(
				"Error",
				"Ingresa el año!",
				"warning-sign",
				3);
		$$("#mes_fecha_inicion_nuevo_medicamento").val("");
		return;
	}else if(mes < m && ano == a){
		Lungo.Notification.error(
				"Error",
				"El mes ingreado no puede ser menor al mes actual!",
				"warning-sign",
				3);
		$$("#mes_fecha_inicion_nuevo_medicamento").val("");
		return;
	}else{
		// Obtenemos los dias del mes y el año
		if((mes == 01)||(mes == 03)||(mes == 05)||(mes == 07)||(mes == 08)||(mes == 10)||(mes == 12)){
       		dias=31;
    	}
   		else if((mes == 04)||(mes == 06)||(mes == 09)||(mes == 11)){
       		dias=30;
    	}
    	else if(mes == 02)
    	{
        	if((ano % 4 == 0)&&(ano % 100 != 0)||(ano % 400 == 0)){
           		 dias=29;
        	}
        	else{
            	dias=28;
        	}
    	}
	}

	for (var i=1; i<=dias; i++) {
		if(i < 10){
		dia.append('<option value = "0'+ i + '">0'+ i + '</option>');
		}else{
    	dia.append('<option value = "'+ i + '">'+ i + '</option>');
		}
	}
}

function update_fecha_med(mes){
	document.getElementById("diaInicio_modificar_medicamento").options.length = 0;
	//Variables de mi seccion
	ano = $$("#anoInicia_modificar_medicamento").val();
	mes = mes;
	dia = $$("#diaInicio_modificar_medicamento");

	//Obtengo fechas actuales
	var f = new Date();
	var m = f.getMonth();// mes actual
	var m = m+1; // este lo puse por que el mes me lo estaba regresando como abril
	var a = f.getFullYear(); // año actual
	var d = f.getDate(); // dia actual

	dia.append('<option value ="">Día</option>');

	if(!ano){
		Lungo.Notification.error(
				"Error",
				"Ingresa el año!",
				"warning-sign",
				3);
		$$("#mes_fecha_inicion_nuevo_medicamento").val("");
		return;
	}else if(mes < m && ano == a){
		Lungo.Notification.error(
				"Error",
				"El mes ingreado no puede ser menor al mes actual!",
				"warning-sign",
				3);
		$$("#mes_fecha_inicion_nuevo_medicamento").val("");
		return;
	}else{
		// Obtenemos los dias del mes y el año
		if((mes == 01)||(mes == 03)||(mes == 05)||(mes == 07)||(mes == 08)||(mes == 10)||(mes == 12)){
       		dias=31;
    	}
   		else if((mes == 04)||(mes == 06)||(mes == 09)||(mes == 11)){
       		dias=30;
    	}
    	else if(mes == 02)
    	{
        	if((ano % 4 == 0)&&(ano % 100 != 0)||(ano % 400 == 0)){
           		 dias=29;
        	}
        	else{
            	dias=28;
        	}
    	}
	}

	for (var i=1; i<=dias; i++) {
		if(i < 10){
		dia.append('<option value = "0'+ i + '">0'+ i + '</option>');
		}else{
    	dia.append('<option value = "'+ i + '">'+ i + '</option>');
		}
	}
}

function update_dia_med(dia){
	var dia_form = dia;
	//document.getElementById("dia_form_nueva_cita").options.length = 0;
	var dias = 0;
	var mes = $$("#mesInicia_modificar_medicamento").val();
	var ano = $$("#anoInicia_modificar_medicamento").val();
	var dia = $$("#diaInicio_modificar_medicamento");

	// obtenemos el mes actual y comparamos con mes y día ingresado
	var f = new Date();
	var m = f.getMonth();// mes actual
	var m = m+1; // este lo puse por que el mes me lo estaba regresando como abril
	var a = f.getFullYear(); // año actual
	var d = f.getDate(); // dia actual

	 if(ano == a && mes == m && dia_form < d){
	 	Lungo.Notification.error(
				"Error",
				"El dia ingreado no puede ser menor al dia actual!",
				"warning-sign",
				3);
	 	//volvemos a llenar los dias
	 	// Obtenemos los dias del mes y el año
		$$("#diaInicio_modificar_medicamento").val("");
	 	return;
	 }
}

window.onload = function(){
		var año = $$("#ano_fecha");
		var anoCita = $$("#ano_form_nueva_cita");
	    var fecha = new Date();
        var ano = fecha.getFullYear();
        var anoAnt = ano-1;
        var all = 2;
        var ano_nuevo_med = $$("#ano_fecha_inicion_nuevo_medicamento");
        var ano_mod_cita = $$("#ano_modificar_cita");
        

        //CITAS
        // -- AÑO --
        for(i = 1; i<=2; i++){
        	ano_mod_cita.append('<option value="'+ano+'">'+ano+'</option>');
        	ano++;
        }

        // Cargamos los años
		var mod_año_med = $$("#anoInicia_modificar_medicamento");
		var g = new Date();
		var b = g.getFullYear(); // año actual
		var ano_max = 2;

        for(i=1; i<=ano_max; i++){
        	mod_año_med.append('<option value ="'+b+'">'+b+'</option>');
        	b++;
        }


        //MEDICAMENTOS
        var ano_max = 2;
        var ano_med = fecha.getFullYear();
        for(i=1; i<=ano_max; i++){
        	ano_nuevo_med.append('<option value="'+ ano_med +'">'+ ano_med +'</option>');
        	ano_med++;
        }

        //CONFIGURACION 
        // Cargamos los años
		var h = new Date();
		var c = h.getFullYear(); // año actual
		var ano_max = 2;
        var ano_conf = $$("#ano_fecha_conf");
        var ano_ant_conf = c-1;

        for(i=1;i<=ano_max;i++){
        	ano_conf.append('<option value="'+ ano_ant_conf +'">'+ ano_ant_conf +'</option>');
        	ano_ant_conf++;
        }

        // ciclo para llenar datos de configuracion
        for(var i = 1; i<=all; i++){
        	año.append('<option value = "'+ anoAnt +'">'+ anoAnt +'</option>');
        	anoAnt++;
        }
        // ciclo para las citas
        var ano_cita = fecha.getFullYear();
        for(var i = 1; i<=all; i++){
        	anoCita.append('<option value = "'+ ano_cita +'">'+ano_cita+'</option>');
        	ano_cita++;
        }

        // Seccion de Hora
        var hora = $$("#hora_form_nueva_cita");
        var hora_medicamentos = $$("#hora_nuevo_medicamento");
        var min = $$("#min_form_nueva_cita");
        var min_medicamentos = $$("#min_nuevo_medicamento");
        var hora_max = 12;
        var min_max = 60;
        //ciclo para llenar datos de la hora
        for(var i = 1; i<=hora_max; i++){
        	if(i<10){
        	hora.append('<option value = "0'+ i +'">0'+i+'</option>');
        	hora_medicamentos.append('<option value = "0'+ i +'">0'+i+'</option>');
        	}else{
        	hora.append('<option value = "'+ i +'">'+i+'</option>');
        	hora_medicamentos.append('<option value = "'+ i +'">'+i+'</option>');
        	}
        }

        // ciclo llena minutos
        for(var m = 0; m <= min_max; m++){
        	if(m < 10){
        		min.append('<option value = "0'+ m +'">0'+m+'</option>');
        		min_medicamentos.append('<option value = "0'+ m +'">0'+m+'</option>');
        	}else{
        		min.append('<option value = "'+ m +'">'+m+'</option>');
        		min_medicamentos.append('<option value = "'+ m +'">'+m+'</option>');
        	}
        }
}