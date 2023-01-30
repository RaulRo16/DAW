<?php

require_once __DIR__ . '/models/Conexion.php';
require_once __DIR__ . '/models/User.php';

$id_user = isset($_GET['id']) ? $_GET['id'] : null;

$bdSingleton = Conexion::getInstance();
$conexion = $bdSingleton->getConnection();

if (!$id_user) {
    $sql = "SELECT * FROM alumno";
    $result = $conexion->prepare($sql);
    $result->execute();
    $datos = $result->fetchAll();
    $json_usuarios = [];
    foreach ($datos as $dat) {
        // $user = new User($dat['id'], $dat['nombre'], $dat['apellidos'], $dat['password'], $dat['telefono'], $dat['email'], $dat['sexo'], $dat['fecha_nacimiento']);
        $user = new User($dat['id'], $dat['nombre'], $dat['apellidos'], $dat['password'], $dat['telefono'], $dat['email'], $dat['sexo'], $dat['fecha_nacimiento']);
        $json_usuarios[] = $user->toJSON();
        // $arrayJson = json_decode($json_usuarios, true);
        //$objeto = (object) $json_usuarios;
        //echo $objeto->nombre;
    }
    echo '[' . implode(',', $json_usuarios). ']';
    return;
    // $user = new User(null, null, null, null, null, null, null, null);
    // $message = 'ERROR No se ha pasado un ID correcto';
    // $json_result = $user->resultado_json(null, $message, null);
    // echo $json_result;
    // return;
}

$sql = "SELECT * FROM alumno where id =" . $id_user;
$result = $conexion->prepare($sql);
$result->execute();
$datos = $result->fetch(PDO::FETCH_ASSOC);

$user = new User($datos['id'], $datos['nombre'], $datos['apellidos'], $datos['password'], $datos['telefono'], $datos['email'], $datos['sexo'], $datos['fecha_nacimiento']);
$json_usuarios = $user->toJSON();

$texto_usuario = 'Usuario con ID: ' . $id_user;

(isset($datos['id'])) ? $message = $texto_usuario . ' Obtenido Correctamente' : $message = $texto_usuario . ' No encontrado';

$json_result = $user->resultado_json($json_usuarios, $message, null);

echo json_encode($json_result);
