const user = {};

window.onload = () => {
    (function () {
        'use strict'
        let forms = document.querySelectorAll('form')

        Array.prototype.slice.call(forms)
            .forEach(function (form) {
                form.addEventListener('submit', function (event) {
                    if (!form.checkValidity()) {
                        event.preventDefault()
                        event.stopPropagation()
                    }
                    form.classList.add('was-validated')
                }, false)
            })
        enviar();
    })()

    function enviar() {
        const myForm = document.getElementById('formularioUsuarios');
        myForm.addEventListener('submit', function (e) {
            e.preventDefault();
            Swal.fire({
                title: '¿?',
                text: "Seguro que quieres insertar ese usuario.",
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si'
            }).then((result) => {
                if (result.isConfirmed) {

                    const formData = new FormData();
                    formData.append('nombres', document.getElementById('nombres').value);
                    formData.append('apellidos', document.getElementById('apellidos').value);
                    formData.append('password', document.getElementById('password').value);
                    formData.append('telefono', document.getElementById('telefono').value);
                    formData.append('email', document.getElementById('email').value);
                    formData.append('sexo', document.getElementsByTagName('sexo').value);
                    formData.append('fecha_nacimiento', document.getElementById('fecha_nacimiento').value);
                    
                    fetch('http://localhost:8888/practica_daw/ws/crearUsuario2.php', {
                        method: 'POST',
                        body: formData,
                    }).then(function (res) {
                        Swal.fire({
                            title: 'Perfecto!',
                            text: 'El usuario se ha insertado correctamente',
                            icon: 'success',
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Acceptar'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                myForm.reset();
                            }
                        }).catch(function (error) {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Ocurrió algún fallo y no se ha podido insertar!'
                            });
                        });
                    });
                }
            });
        });
    }
}