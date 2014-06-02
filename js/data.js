
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
						tx.executeSql("INSERT INTO alimento (id, nombre, categoria, descripcion) VALUES (?,?,?,?)",[1, "Frutas", 1, "Debes tomar entre 2 y 3 piezas de fruta del tiempo, si puede ser con piel, pero lávalas primero. En el caso que tengas digestión lenta o gases, es mejor que tomes la fruta 2 horas antes o 2 horas después de la comida. La fruta es uno de alimentos con más vitaminas hidrosolubles (que se disuelven en agua) necesarias para tí y tu bebé."]);
						tx.executeSql("INSERT INTO alimento (id, nombre, categoria, descripcion) VALUES (?,?,?,?)",[2, "Verduras", 1, "Las verduras junto a la fruta, son alimentos que se recomiendan comer al menos 2 veces al día, contienen todos los micronutrientes necesarios y ayuda a regular tu intestino por su gran contenido en fibra. Al comer las verduras cocidas éstas pueden perder gran cantidad de sales minerales y vitaminas, así que es conveniente que al menos una de las raciones diarias se tome cruda."]);
						tx.executeSql("INSERT INTO alimento (id, nombre, categoria, descripcion) VALUES (?,?,?,?)",[3, "Carne y pescado", 2, "La carne y el pescado es una fuente ideal para la obtención de proteína, vitaminas y minerales."]);
					}
				});
				tx.executeSql("SELECT * FROM ejercicio;", [], function(tx, result){
					if(result.rows.length == 0){
						tx.executeSql("INSERT INTO ejercicio (id, nombre, descripcion) VALUES (?,?,?)",[1, "Refuerzo del pecho", "Siéntate en el suelo con las piernas cruzadas, extiende los brazos hacia delante a la altura de los hombros, ábrelos y levántalos luego por encima de tu cabeza y luego vuelve a tu posición original."]);
						tx.executeSql("INSERT INTO ejercicio (id, nombre, descripcion) VALUES (?,?,?)",[2, "Relajación general", "Túmbate en el suelo con las rodillas dobladas y los pies apoyados en el suelo, aspira aire y al exhalarlo acerca la rodilla al pecho todo lo que te permita tu barriga."]);
						tx.executeSql("INSERT INTO ejercicio (id, nombre, descripcion) VALUES (?,?,?)",[3, "Basculación pélvica", "Ponte de cunclillas y apóyate en las cuatro extremidades: los brazos separados a la anchura de los hombros y las rodillas a la anchura de la cadera, la columna vertebral en posición normal. Mientras inhales aire inclina la pelvis hacia delante bajando las caderas hacia el suelo y al exhalar el aire contrae los abdominales mientras inclinas la pelvis hacia atras."]);
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