var busqueda = document.getElementById('buscador');
const user = [
	{
		"id": 1, 
		"nombre": "Raúl",
		"apellidos": "Rodriguez",
		"password": "1234",
		"telefono": "653282910",
		"email": "raul@gmail.com",
		"sexo": "hombre",

	},
	{
		"id": 2, 
		"nombre": "Jose",
		"apellidos": "Gomez",
		"password": "awsd",
		"telefono": "689390213",
		"email": "jose@gmail.com",
		"sexo": "hombre",

	},
	{
		"id": 3, 
		"nombre": "María",
		"apellidos": "Gemez",
		"password": "201gfd1111",
		"telefono": "610920312",
		"email": "maria@gmail.com",
		"sexo": "mujer",

	},
	{
		"id": 4, 
		"nombre": "Luis",
		"apellidos": "Gimenez",
		"password": "2dds1111",
		"telefono": "632550312",
		"email": "luis@gmail.com",
		"sexo": "hombre",

	},
	{
		"id": 5, 
		"nombre": "Luis",
		"apellidos": "Gimenez",
		"password": "2dds1111",
		"telefono": "632550312",
		"email": "luis@gmail.com",
		"sexo": "hombre",

	}

];

function agregarFila() {
	let Tbl = document.getElementById('tabla');
	let tbody = document.createElement('tbody');
	tbody.id = 'tbody';
	Tbl.appendChild(tbody);

		for(i=0;i<user.length;i++){
			let row = document.createElement('tr');
			row.id = 'fila'+i;
			tbody.appendChild(row);

			column = document.createElement('td');
			column.innerText = user[i].nombre; 
			row.appendChild(column);

			column = document.createElement('td');
			column.innerText = user[i].apellidos; 
			row.appendChild(column);

			column = document.createElement('td');
			column.innerText = user[i].telefono; 
			row.appendChild(column);

			column = document.createElement('td');
			column.innerText = user[i].email; 
			row.appendChild(column);

			column = document.createElement('td');
			column.innerText = user[i].sexo; 
			row.appendChild(column);

			column = document.createElement('td');
			column.innerHTML = '<img src="icons/delete.png" onclick="eliminarFila('+i+')"><img src="icons/modificar.png" onclick="modificarFila('+i+')">'; 
			row.appendChild(column);
	}
}

function eliminarFila(id) {
  let tr = document.querySelector('#fila'+id);
  if (confirm("¿Deseas eliminar este registro?")) {
  	tr.remove();
  }
}

function buscaTabla(){
	let table = document.getElementById('tbody');
  let texto = busqueda.value.toLowerCase();
  let tr = tabla.getElementsByTagName("tr");

  for (let i = 1; i < tr.length; i++) {
      tr[i].style.display = "none";
      td = tr[i].getElementsByTagName("td");
        for (let l = 0; l < td.length; l++) {
          let celda = tr[l].getElementsByTagName("td")[l];
          if (celda) {
              if (texto.length < 3) {
                  tr[l].style.display = "";
              } else {
                  if (tr[l].innerText.toLowerCase().indexOf(texto) !== -1) {
                      tr[l].style.display = "";
                  }
              }
          }
      }
  }	
}

function modificarFila(id){
  let tabla = document.getElementById('tbody');
  for (i = 0; i < 5; i++) {
    let celdaTmp = tabla.rows[id].cells[i];
    txt = celdaTmp.innerText;
    celdaTmp.innerText = "";
    let input = document.createElement('input');
    input.setAttribute("value", txt);
    celdaTmp.appendChild(input);
  } 
}

busqueda.addEventListener('keyup', buscaTabla);
window.onload = agregarFila();




