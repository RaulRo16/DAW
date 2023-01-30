let user = [];
let users = [];

window.onload =
    function () {
        const getUsuario = () => {
            fetch('http://localhost:8888/practica_daw/ws/getUsuario.php', {
                method: 'GET',
            }).then(function (body) {
                user = body.json();
                return user;
            }).then(function (data) {
                users = data;
                
                let tvalue = "";
                tvalue += "<thead>";
                tvalue += "<tr>";
                tvalue += "<th>Nombre</th>";
                tvalue += "<th>Apellidos</th>";
				tvalue += "<th>Telefono</th>";
				tvalue += "<th>Email</th>";
				tvalue += "<th>Sexo</th>";
				tvalue += "<th>Fecha Nacimiento</th>";
                tvalue += "<th>Eliminar</th>";
                tvalue += "<th>Modificar</th>";
                tvalue += "</tr>";
                tvalue += "</thead>";

                let id_accion = "id_accion";

                for (let i = 0; i < users.length; i++) {
                    tvalue += "<tr>";
                    tvalue += "<td>" + users[i].nombre + "</td>";
                    tvalue += "<td>" + users[i].apellidos + "</td>";
					tvalue += "<td>" + users[i].telefono + "</td>";
                    tvalue += "<td>" + users[i].email + "</td>";
					tvalue += "<td>" + users[i].sexo + "</td>";
                    tvalue += "<td>" + users[i].fecha_nacimiento + "</td>";
                    tvalue += "<td onclick='eliminar(" + i + ")' " + "id = '" + id_accion + "' ><img src='icons/delete.png'</td>";
                    tvalue += "<td><button onclick='modificar(" + i + ")' " + "id = '" + i + "' type='button' class='modificar' data-open='modal1'><img src='icons/modificar.png'</button><button onclick='guardar(" + i + ")' " + " type='button' class='guardar' data-open='modal1'>Guardar</button></td>";
                    tvalue += "</tr>";
                }
                document.getElementById('tabla').innerHTML = tvalue;
                Array.from(document.getElementsByClassName("guardar")).forEach(elem => elem.style.display = "none");
            }).catch(function (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Ocurrió algún error y no se puede cargar la tabla!'
                });
            });
        }
        getUsuario();
    }

function buscar(b) {
    let filtro = b.value.trim(b.value).toLowerCase();
    let tabla = document.getElementById("tabla");
    let tr = tabla.getElementsByTagName("tr");
    for (let i = 1; i < tr.length; i++) {
        tr[i].style.display = "none";
        td = tr[i].getElementsByTagName("td");
        for (let l = 0; l < td.length; l++) {
            let celda = tr[l].getElementsByTagName("td")[l];
            if (celda) {
                if (filtro.length < 3) {
                    tr[l].style.display = "";
                } else {
                    if (celda.innerHTML.toLowerCase().indexOf(filtro) !== -1) {
                        tr[l].style.display = "";
                    }
                }
            }
        }
    }
}

function eliminar(p) {
    Swal.fire({
        title: '¿?',
        text: "Seguro que quieres eliminar este usuario.",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si'
    }).then((result) => {
        if (result.isConfirmed) {
            let id;
            let table = document.getElementById('tabla');
            for (let r = 0, n = table.rows.length; r < n; r++) {
                for (let c = 0, m = table.rows[p + 1].cells.length; c < m; c++) {
                    id = table.rows[p + 1].cells[0].innerHTML;
                }
            }
            fetch('http://localhost:8888/practica_daw/ws/deleteUsuario.php' + '?id=' + id, {
                method: 'GET',
            }).then(function (res) {
                Swal.fire({
                    title: 'Perfecto!',
                    text: 'El usuario se ha eliminado correctamente',
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Acceptar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.reload();
                    }
                }).catch(function (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Ocurrió algún fallo y no se ha podido eliminar!'
                    });
                });
            });
        }
    });
}


function modificar(p) {
    Swal.fire({
        title: '¿?',
        text: "Seguro que quieres modificar este usuario.",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si'
    }).then((result) => {
        if (result.isConfirmed) {
            document.getElementsByClassName("guardar")[p].style.display = "block";
            document.getElementsByClassName("modificar")[p].style.display = "none";
            let tabla = document.getElementById('tabla');
            for (i = 0; i < 6; i++) {
                let celdaTmp = tabla.rows[p + 1].cells[i];
                txt = celdaTmp.innerText;
                celdaTmp.innerText = "";
                let input = document.createElement('input');
                input.setAttribute("value", txt);
                celdaTmp.appendChild(input);
            }
        }
    }).catch(function (error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ocurrió algún fallo y no se ha podido modificar!'
        });
    });
}


function guardar(row) {
    let valores = [];
    const formData = new FormData();
    let tabla = document.getElementById('tabla');
    let tabla_rows = tabla.rows[row + 1]
    for (let i = 1; i < tabla_rows.cells.length - 2; i++) {
        let label = document.createElement("label");
        let celdaTmp = tabla.rows[row + 1].cells[i];
        txt = celdaTmp.childNodes[0].value;
        valores.push(txt);
        label.innerText = txt;
        celdaTmp.innerHTML = "";
        celdaTmp.appendChild(label);
    }

    formData.append('nombre', valores[0]);
    formData.append('apellidos', valores[1]);
	formData.append('telefono', valores[2]);
    formData.append('email', valores[3]);
	formData.append('sexo', valores[4]);
    formData.append('fecha_nacimiento', valores[5]);

    document.getElementsByClassName("guardar")[row].style.display = "none";
    document.getElementsByClassName("modificar")[row].style.display = "block";

    let id;
    let table = document.getElementById('tabla');
    for (let r = 0, n = table.rows.length; r < n; r++) {
        for (let c = 0, m = table.rows[row + 1].cells.length; c < m; c++) {
            id = table.rows[row + 1].cells[0].innerHTML;
        }
    }

    fetch('http://localhost:8888/practica_daw/ws/modificarUsuario.php' + '?id=' + id, {
        method: 'POST',
        body: formData,
    }).then(function (res) {
        Swal.fire({
            title: 'Perfecto!',
            text: 'El usuario se ha modificado correctamente',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Acceptar'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.reload();
            }
        }).catch(function (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ocurrió algún fallo y no se ha podido modificar!'
            });
        });
    });
}

