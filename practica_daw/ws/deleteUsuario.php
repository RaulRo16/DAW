<?php

require_once __DIR__ . '/models/Conexion.php';
require_once __DIR__ . '/models/User.php';


$id_user = isset($_GET['id']) ? $_GET['id'] : null;

$bdSingleton = Conexion::getInstance();
$conexion = $bdSingleton->getConnection();

if (!$id_user) {
    $user = new User(null, null, null, null, null, null, null, null);
    $message = 'ERROR No se ha pasado un ID correcto';
    $json_result = $user->resultado_json(null, $message, null);
    echo $json_result;
    return;
}

$sql_select = "SELECT * FROM alumno where id =" . $id_user;
$result = $conexion->prepare($sql_select);
$result->execute();
$datos = $result->fetch(PDO::FETCH_ASSOC);


$user = new User($datos['id'], $datos['nombre'], $datos['apellidos'], $datos['password'], $datos['telefono'], $datos['email'], $datos['sexo'], $datos['fecha_nacimiento']);
$json_usuarios = $user->toJSON();

$texto_usuario = 'Usuario con ID: ' . $id_user;
if (isset($datos['id'])) {
    $sql_delete = "DELETE FROM alumno where id=" . $id_user;
    $result = $conexion->prepare($sql_delete);
    $result->execute();
    $message = $texto_usuario . ' Eliminado Correctamente';
} else {
    $message = $texto_usuario . ' No encontrado';
}

$json_result = $user->resultado_json($json_usuarios, $message, null);

echo $json_result;
