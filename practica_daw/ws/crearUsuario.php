<?php

require_once __DIR__ . '/models/User.php';

$id = $_POST['id'];
$nombre = $_POST['nombre'];
$apellidos = $_POST['apellidos'];
$contrasena = $_POST['contrasena'];
$telefono = $_POST['telefono'];
$email = $_POST['email'];
$sexo = $_POST['sexo'];


$usuario_recogido = new User($nombre, $apellidos, $contrasena, $telefono, $email, $sexo);

$json = $usuario_recogido->tojson();

echo $json;

$file = fopen("User.txt", "a+");
fwrite($file, $json . PHP_EOL);

fclose($file);
