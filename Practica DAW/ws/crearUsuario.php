<?php
include __DIR__ ."/models/User.php";

$nombre = (isset($_POST['nombre'])? $_POST['nombre'] : NULL);
$apellidos = (isset($_POST['apellidos'])? $_POST['apellidos'] : NULL);
$password = (isset($_POST['password'])? $_POST['password'] : NULL);
$telefono = (isset($_POST['telefono'])? $_POST['telefono'] : NULL);
$email = (isset($_POST['email'])? $_POST['email'] : NULL);
$sexo = (isset($_POST['sexo'])? $_POST['sexo'] : NULL);

$user= new User($nombre, $apellidos, $password, $telefono, $email, $sexo);

$file = fopen("User.txt","a+") or die ("Error al crear");
fwrite($file,"Nombre: " . $nombre);
fwrite($file," Apellidos: " . $apellidos);
fwrite($file," Password: " . $password);
fwrite($file," Telefono: " . $telefono);
fwrite($file," Email: " . $email);
fwrite($file," Sexo: " . $sexo);
fclose($file);

echo "Se creo correctamente el archivo";
echo $user->toJson();

?>