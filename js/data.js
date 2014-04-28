
var db = null; 

try{
	if(window.openDatabase){
		db = openDatabase('embapp','1,0','BD EmbApp', 2*1024*1024);
		if (db){
			db.transaction(function(tx){
				tx.executeSql("CREATE TABLE IF NOT EXISTS cita (id INTEGER UNIQUE NOT NULL, etiqueta VARCHAR(50) NOT NULL, fecha VARCHAR(10) NOT NULL, hora VARCHAR(8) NOT NULL, descripcion VARCHAR(100) NOT NULL, alarma VARCHAR(3) NOT NULL);");
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