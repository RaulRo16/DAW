<?php

require_once __DIR__ . '/../models/User.php';

class UserJson implements User
{
    private $usuarios;

    public function __construct($usuarios)
    {
        $this->setUsuarios($usuarios);
    }
 
    public function getUsuarios()
    {
        return $this->usuarios;
    }

    public function setUsuarios($usuarios)
    {
        return $this->usuarios = $usuarios;
    }

} 