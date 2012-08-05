<?php

header("Content-type: text/css");

$system_path = 'system/codeigniter';

define('BASEPATH', str_replace("\\", "/", $system_path));

define('PYRO_DEVELOPMENT', 'development');
define('PYRO_STAGING', 'staging');
define('PYRO_PRODUCTION', 'production');
define('ENVIRONMENT', (isset($_SERVER['PYRO_ENV']) ? $_SERVER['PYRO_ENV'] : PYRO_DEVELOPMENT));

require '../../../../../system/cms/config/database.php';

$db = $db[ENVIRONMENT];

$mysqli = new mysqli($db['hostname'], $db['username'], $db['password'], $db['database']);
$result = $mysqli->query("SELECT `value` FROM `default_theme_options` WHERE `slug` = 'colors'");
$row = $result->fetch_assoc();

echo file_get_contents('./color-schemes/bootstrap-'.$row['value'].'.css');

$mysqli->close();