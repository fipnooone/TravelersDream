<?php
require_once 'connect.php';
require_once 'users.php';
require_once 'features.php';
require_once 'globals.php';

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
        case "getListOf":
            return getListOf($conn, $r["data"]);
        case "getTypes":
            return getTypes($conn, $r["data"]);
        case "updateUserInfo":
            return updateUserInfo($conn, $r["data"], $r["files"]);
        case "createUser":
            return createUser($conn, $r["data"], $r["files"]);
        case "isNewUserByFio":
            return isNewUserByFio($conn, $r["data"]);
        case "getCategories":
            return getCategories($conn, $data);
        default:
            return array(
                "success" => false,
                "error" => "Wrong method"
            );
    }
}

function sorter($conn, $method, $data, $files=array()) {
    switch ($method) {
        case "login":
            return login($conn, $data);
        case "register":
            return register($conn, $data);
        case "getUser":
            return getUser($conn, $data);
        case "getUsers":
            return getUsers($conn, $data);
        case "isUser":
            return isUser($conn, $data);
        case "getUserName":
            return getUserName($conn, $data);
        case "getUserType":
            return getUserType($conn, $data);
        case "getUserInfo":
            return getUserInfo($conn, $data);
        case "getEmployees":
            return getEmployees($conn, $data);
        case "getListOf":
            return getListOf($conn, $data);
        case "getTypes":
            return getTypes($conn, $data);
        case "updateUserInfo":
            return updateUserInfo($conn, $data, $files);
        case "createUser":
            return createUser($conn, $data, $files);
        case "isNewUserByFio":
            return isNewUserByFio($conn, $data);
        case "getCategories":
            return getCategories($conn, $data);
        default:
            return array(
                "success" => false,
                "error" => "Wrong method"
            );
    }
}

if (array_key_exists('multi', $_POST) and $_POST['multi'] == true) { // methods must be unique
    $__data = array(
        'success' => false,
        'result' => array()
    );
    $Gdata = array_key_exists("data", $_POST) ? json_decode($_POST["data"], true) : false;
    $MAD = array_key_exists("MAD", $_POST) ? json_decode($_POST["MAD"], true) : false;
    if (!$MAD) {
        $__data['message'] = 'No MAD';
        return $__data;
    }
    foreach ($MAD as $method => $data) {
        $__data['result'][$method] = sorter($connect, $method, array_merge($data, $Gdata));
    }
    $__data['success'] = true;
    echo json_encode($__data);
} else {
    $res = array(
        "method" => array_key_exists("method", $_POST) ? $_POST["method"] : false,
        "data" => array_key_exists("data", $_POST) ? json_decode($_POST["data"], true) : array(),
        "files" => $_FILES ? $_FILES : array()
    );
    echo json_encode(sortingHat($connect, $res));
}
?>