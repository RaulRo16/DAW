<?php
include __DIR__ ."/../interfaces/IToJson.php";

class User implements IToJson {
	public $nombre;
	public $apellidos;
	public $password;
	public $telefono;
	public $email;
	public $sexo;

	public function __construct($nombre, $apellidos, $password, $telefono, $email, $sexo)
	{
		$this->setNombre($nombre);
		$this->setApellidos($apellidos);
		$this->setPassword($password);
		$this->setTelefono($telefono);
		$this->setEmail($email);
		$this->setSexo($sexo);
	}

	public function getNombre(){
        return $this->nombre;
    }

    public function setNombre($nombre){
        $this->nombre = $nombre;
    }

    public function getApellidos(){
        return $this->apellidos;
    }
    
    public function setApellidos($apellidos){
        $this->apellidos = $apellidos;
    }

    public function getPassword(){
        return $this->password;
    }
    
    public function setPassword($password){
        $this->password = $password;
    }

    public function getTelefono(){
        return $this->telefono;
    }
    
    public function setTelefono($telefono){
        $this->telefono = $telefono;
    }

    public function getEmail(){
        return $this->email;
    }
    
    public function setEmail($email){
        $this->email = $email;
    }

    public function getSexo(){
        return $this->sexo;
    }
    
    public function setSexo($sexo){
        $this->sexo = $sexo;
    }
    
    public function toJson(){
    	return json_encode($this);
    }


}

?>