<?php

/**
*
* Plugin Name: Emailing Form @ Home
* Plugin URI: http://mistermoz.cl
* Description: Get a email for send future information of the page
* Version: 1.0
* Author: Claudio Donoso C.
* Author URI: http://mistermoz.cl
* License: GPL2
*
**/

add_action( 'init' , 'wp_emailing_db' );
add_action( 'wp_print_scripts', 'enqueue_my_scripts' );

function wp_emailing_db () {
	global $table_prefix;
	$table = $table_prefix.'emailing';

	$sql = "CREATE TABLE $table (
	  id mediumint(9) NOT NULL AUTO_INCREMENT,
	  time datetime DEFAULT '0000-00-00 00:00:00' NOT NULL,
	  email VARCHAR(100) NOT NULL,
	  UNIQUE KEY id (id)
	);";

	require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
	dbDelta( $sql );
}

function enqueue_my_scripts(){
	$file = "js/emailing.js";
	wp_enqueue_script( 'emailing', plugins_url( $file, __FILE__ ), array( 'jquery' ));
}

