<?php

require_once __DIR__ .  "/../inc/conf.inc.php";


// define("nombredb", "mysql:host=localhost;dbname=hospital");
// define("usuario", "root");
// define("password", "root");


try {
	class Conexion
	{
		//@todo parasarle los parametros del archivo de conf.inf
		private static $dns = nombredb;
		private static $user = usuario;
		private static $pass = password;
		private static $instance;

		public function __construct()
		{
			ini_set('display_errors', 1);
			ini_set('display_startup_errors', 1);
			error_reporting(E_ALL);
		
			$this->con = new PDO(self::$dns, self::$user, self::$pass);
			$this->con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		}

		public static function getInstance()
		{
			if (!isset(self::$instance)) {
				$object = __CLASS__;
				self::$instance = new $object;
			}
			return self::$instance;
		}

		public function getConnection()
		{
			return $this->con;
		}
	}
} catch (PDOException $e) {
	echo 'Error conectando con la base de datos: ' . $e->getMessage();
}

$con = null; // Conexión
