
var db = null; 

try{
	if(window.openDatabase){
		db = openDatabase('embapp','1,0','BD EmbApp', 2*1024*1024);
		if (db){
			db.transaction(function(tx){
				tx.executeSql("CREATE TABLE IF NOT EXISTS usuario (nombre VARCHAR(50) NOT NULL, fecha VARCHAR(10) NOT NULL);");
				tx.executeSql("CREATE TABLE IF NOT EXISTS cita (id INTEGER UNIQUE NOT NULL, etiqueta VARCHAR(50) NOT NULL, fecha VARCHAR(10) NOT NULL, hora VARCHAR(8) NOT NULL, descripcion VARCHAR(100) NOT NULL, alarma VARCHAR(5) NOT NULL);");
				tx.executeSql("CREATE TABLE IF NOT EXISTS medicamento (id INTEGER UNIQUE NOT NULL, medicamento VARCHAR(50) NOT NULL, fecha_inicio VARCHAR(10) NOT NULL, fecha_final VARCHAR(10) NOT NULL, hora_ingesta VARCHAR(8) NOT NULL, frecuencia INTEGER NOT NULL, docificacion INTEGER NOT NULL, alarma VARCHAR(5) NOT NULL);");
				tx.executeSql("CREATE TABLE IF NOT EXISTS alimento (id INTEGER UNIQUE NOT NULL, nombre VARCHAR(50) NOT NULL, categoria INTEGER NOT NULL, descripcion TEXT(100) NOT NULL);");
				tx.executeSql("CREATE TABLE IF NOT EXISTS ejercicio (id INTEGER UNIQUE NOT NULL, nombre VARCHAR(50) NOT NULL, descripcion TEXT(200) NOT NULL);");
			}, error_log);
		} else{
			console.log("error occured when opening database");
		}
	} else{
		console.log("Web database are not supported");
	}
} catch(e){
	console.log("error occuered during db initialization")
}
function error_log(error){
	console.log(error.message);
}