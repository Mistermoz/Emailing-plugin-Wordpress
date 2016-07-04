<?php
require_once("../../../wp-config.php");

global $wpdb;

$email = $_GET['email'];
$table = $table_prefix.'emailing';

if($wpdb->insert( $table, array( 'time' => current_time('mysql'), 'email' => $email) )) {
	echo ('200');
}else {
	echo ('-1');
}
