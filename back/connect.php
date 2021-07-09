<?php
header("Access-Control-Allow-Origin: *");
header('Content-type: application/json');
$connect = mysqli_connect("localhost", "root", "", "dream");
if (!$connect) die('An error occurred while connecting to the database.');
