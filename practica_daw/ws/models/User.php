<?php

require_once __DIR__ . '/../interfaces/Itojson.php';

class User implements Itojson
{

    private $id;
    private $nombre;
    private $apellidos;
    private $contrasena;
    private $telefono;
    private $email;
    private $sexo;
    private $fecha_nacimiento;

    public function __construct($id, $nombre, $apellidos, $contrasena, $telefono, $email, $sexo, $fecha_nacimiento)
    {
        $this->setId($id);
        $this->setNombre($nombre);
        $this->setApellidos($apellidos);
        $this->setContrasena($contrasena);
        $this->setTelefono($telefono);
        $this->setEmail($email);
        $this->setSexo($sexo);
        $this->setFecha_nacimiento($fecha_nacimiento);
    }

    public function getId()
    {
        return $this->id;
    }

    public function setId($id)
    {
        return $this->id = $id;
    }

    public function getNombre()
    {
        return $this->nombre;
    }

    public function setNombre($nombre)
    {
        $this->nombre = $nombre;
    }

    public function getApellidos()
    {
        return $this->apellidos;
    }

    public function setApellidos($apellidos)
    {
        $this->apellidos = $apellidos;
    }

    public function getContrasena()
    {
        return $this->contrasena;
    }

    public function setContrasena($contrasena)
    {
        $this->contrasena = $contrasena;
    }

    public function getTelefono()
    {
        return $this->telefono;
    }

    public function setTelefono($telefono)
    {
        $this->telefono = $telefono;
    }

    public function getEmail()
    {
        return $this->email;
    }

    public function setEmail($email)
    {
        $this->email = $email;
    }

    public function getSexo()
    {
        return $this->sexo;
    }

    public function setSexo($sexo)
    {
        $this->sexo = $sexo;
    }

    public function getFecha_nacimiento()
    {
        return $this->fecha_nacimiento;
    }

    public function setFecha_nacimiento($fecha_nacimiento)
    {
        $this->fecha_nacimiento = $fecha_nacimiento;
    }

    public function toJSON()
    {
        return json_encode([
            'id' => $this->getId(),
            'nombre' => $this->getNombre(),
            'apellidos' => $this->getApellidos(),
            'contrasena' => $this->getContrasena(),
            'telefono' => $this->getTelefono(),
            'email' => $this->getEmail(),
            'sexo' => $this->getSexo(),
            'fecha_nacimiento' => $this->getFecha_nacimiento()
        ]);
    }

    public function resultado_json($usuarios, $mensaje, $ejecucion)
    {
        $jsondata = array();
        $usuario_decode =  json_decode($usuarios);

        if (isset($usuario_decode->id) || $ejecucion == 1) {
            $jsondata['success'] = true;
            $jsondata['message'] = $mensaje;
            $jsondata['data'] = json_decode($usuarios);
            return json_encode($jsondata);
        } else {
            $jsondata['success'] = false;
            $jsondata['message'] = $mensaje;
            $jsondata['data'] = null;
            return json_encode($jsondata);
        }
    }
}
