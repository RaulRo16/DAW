function cargar() {
    fetch('./nav.html').then(data => data.text().then(response => {
        document.getElementById('navbar').innerHTML = response;

        let arreglo_datos = document.URL.split('/');
        let valor_ruta = arreglo_datos[arreglo_datos.length - 1];
        switch (valor_ruta) {
            case 'index.html':
                document.getElementById('active_index').className += " nav-menu-link_active";
                break;
            case 'formulario.html':
                document.getElementById('active_formulario').className += " nav-menu-link_active";
                break;
            case 'tabla.html':
                document.getElementById('active_tabla').className += " nav-menu-link_active";
                break;
            case 'contacto.html':
                document.getElementById('active_contacto').className += " nav-menu-link_active";
                break;
            default:
                document.getElementById('active_index').className += " nav-menu-link_active";
        }
    }));
}

cargar();