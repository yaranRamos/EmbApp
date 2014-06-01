
var db = null; 

try{
	if(window.openDatabase){
		db = openDatabase('embapp','1,0','BD EmbApp', 2*1024*1024);
		if (db){
			db.transaction(function(tx){
				tx.executeSql("CREATE TABLE IF NOT EXISTS usuario (nombre VARCHAR(50) NOT NULL, fecha VARCHAR(10) NOT NULL, pin VARCHAR(4) NOT NULL);");
				tx.executeSql("CREATE TABLE IF NOT EXISTS cita (id INTEGER UNIQUE NOT NULL, etiqueta VARCHAR(50) NOT NULL, fecha VARCHAR(10) NOT NULL, hora VARCHAR(8) NOT NULL, descripcion VARCHAR(100) NOT NULL, alarma VARCHAR(5) NOT NULL, hora_alarma VARCHAR(8) NOT NULL);");
				tx.executeSql("CREATE TABLE IF NOT EXISTS medicamento (id INTEGER UNIQUE NOT NULL, medicamento VARCHAR(50) NOT NULL, fecha_inicio VARCHAR(10) NOT NULL, hora_ingesta VARCHAR(8) NOT NULL, frecuencia INTEGER NOT NULL, docificacion INTEGER NOT NULL, alarma VARCHAR(5) NOT NULL);");
				tx.executeSql("CREATE TABLE IF NOT EXISTS alimento (id INTEGER UNIQUE NOT NULL, nombre VARCHAR(50) NOT NULL, categoria INTEGER NOT NULL, descripcion TEXT(100) NOT NULL);");
				tx.executeSql("CREATE TABLE IF NOT EXISTS ejercicio (id INTEGER UNIQUE NOT NULL, nombre VARCHAR(50) NOT NULL, descripcion TEXT(200) NOT NULL);");
				tx.executeSql("SELECT * FROM alimento;", [], function(tx, result){
					if(result.rows.length == 0){
						tx.executeSql("INSERT INTO alimento (id, nombre, categoria, descripcion) VALUES (?,?,?,?)",[1, "nombre1", 1, "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"]);
						tx.executeSql("INSERT INTO alimento (id, nombre, categoria, descripcion) VALUES (?,?,?,?)",[2, "nombre2", 1, "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"]);
						tx.executeSql("INSERT INTO alimento (id, nombre, categoria, descripcion) VALUES (?,?,?,?)",[3, "nombre3", 2, "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"]);
					}
				});
				tx.executeSql("SELECT * FROM ejercicio;", [], function(tx, result){
					if(result.rows.length == 0){
						tx.executeSql("INSERT INTO ejercicio (id, nombre, descripcion) VALUES (?,?,?)",[1, "nombre1", "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"]);
						tx.executeSql("INSERT INTO ejercicio (id, nombre, descripcion) VALUES (?,?,?)",[2, "nombre2", "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"]);
						tx.executeSql("INSERT INTO ejercicio (id, nombre, descripcion) VALUES (?,?,?)",[3, "nombre3", "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"]);
					}
				});
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