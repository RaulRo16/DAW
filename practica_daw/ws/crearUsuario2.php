<?php

require_once __DIR__ . '/models/Conexion.php';
require_once __DIR__ . '/models/User.php';

$bdSingleton = Conexion::getInstance();
$conexion = $bdSingleton->getConnection();


$params[':nombre'] = isset($_POST['nombre']) ? $_POST['nombre'] : '';
$params[':apellidos'] = isset($_POST['apellidos']) ? $_POST['apellidos'] : '';
$params[':password'] = isset($_POST['password']) ? $_POST['password'] : '';
$params[':telefono'] = isset($_POST['telefono']) ? $_POST['telefono'] : '';
$params[':email'] = isset($_POST['email']) ? $_POST['email'] : '';
$params[':sexo'] = isset($_POST['sexo']) ? $_POST['sexo'] : '';
$params[':fecha_nacimiento'] = isset($_POST['fecha_nacimiento']) ? $_POST['fecha_nacimiento'] : '1993-01-31';

$sql = "INSERT INTO alumno(nombre, apellidos, password, telefono, email, sexo, fecha_nacimiento) 
        VALUES(:nombre, :apellidos, :password, :telefono, :email, :sexo, :fecha_nacimiento)";

$insercion = $conexion->prepare($sql);
$ejecucion = $insercion->execute($params);

$json_usuarios = json_encode($params);

if ($ejecucion == 1) {
    $message = 'Usuario creado correctamente';
} else {
    $message = 'ERROR: Ocurrio algun fallo, por favor intentelo de nuevo o mas tarde.';
}

$user = new User(null, null, null, null, null, null, null, null);

$json_result = $user->resultado_json($json_usuarios, $message, $ejecucion);

echo $json_result;
