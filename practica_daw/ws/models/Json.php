<?php

require_once __DIR__ . '/models/User.php';

class Json extends User
{

    //clase que crea un json 
    /**
     * Success:true, ->false sin error
     * Message: “User obtenido OK”,
     * Data: Usuario en JSON. Si no hay o da errror poner null.

     */


    public function jsonString($json)
    {
        $usuario_recogido = new User('pepe', 'garcia', 'martinez');
        $data = array(
            "Success" => "true",
            "Message" => "User obtenido OK",
            "Data" => $json, //$usuario_recogido->toJSON(),
        );
        return json_encode($data);
    }
}
