<?php
require_once 'connect.php';
require_once 'users.php';
require_once 'features.php';
require_once 'globals.php';

$res = array(
    "method" => array_key_exists("method", $_POST) ? $_POST["method"] : false,
    "data" => array_key_exists("data", $_POST) ? json_decode($_POST["data"], true) : array(),
    "files" => $_FILES ? $_FILES : array()
);

function sortingHat($conn, $r) {
    switch ($r["method"]) {
        case "login":
            return login($conn, $r["data"]);
        case "register":
            return register($conn, $r["data"]);
        case "getUser":
            return getUser($conn, $r["data"]);
        case "getUsers":
            return getUsers($conn, $r["data"]);
        case "isUser":
            return isUser($conn, $r["data"]);
        case "getUserName":
            return getUserName($conn, $r["data"]);
        case "getUserType":
            return getUserType($conn, $r["data"]);
        case "getUserInfo":
            return getUserInfo($conn, $r["data"]);
        case "getEmployees":
            return getEmployees($conn, $r["data"]);
        case "getTypes":
            return getTypes($conn, $r["data"]);
        case "updateUserInfo":
            return updateUserInfo($conn, $r["data"], $r["files"]);
        case "createUser":
            return createUser($conn, $r["data"], $r["files"]);
        case "isNewUserByFio":
            return isNewUserByFio($conn, $r["data"]);
        default:
            return array(
                "success" => false,
                "error" => "Wrong method"
            );
    }
}

echo json_encode(sortingHat($connect, $res));
?>