<?php
function getkey($key) {
    switch ($key){
        case "id":
            return 0;
        case "token":
            return 1;
        case "name":
            return 2;
        case "login":
            return 3;
        case "password":
            return 4;
        case "type":
            return 5;
        default:
            return false;
    }
}

function getUsers($conn, $v) {
    $users = mysqli_fetch_all(mysqli_query($conn, "SELECT * FROM `users` WHERE `login` = \"{$v}\""));
    if (count($users) == 0) return false;
    else return $users;
}

function getUser($conn, $v) {
    $users = mysqli_fetch_all(mysqli_query($conn, "SELECT * FROM `users` WHERE `token` = \"{$v}\""));
    if (count($users) == 0) return false;
    else return $users[0];
}

function login($conn, $data) { // login and password
    $__data = array( "success" => false );
    $login = $data["login"];
    $password = $data["password"];
    if ($data["login"] != "" and $data["password"] != "") {
        if ($login != str_replace(" ", "", $login) or $password != str_replace(" ", "", $password)) {
            $__data["message"] = "Логин и пароль не должны содержать пробелы";
        } else {
            $users = getUsers($conn, $login);
            if ($users) {
                foreach ($users as $user) {
                    if (password_verify($password, $user[getkey("password")])) {
                        $__data["success"] = true;
                        $__data["token"] = $user[getkey("token")];
                    }
                }
            }
        }
    }
    if (!$__data["success"]) $__data["message"] = "Логин или пароль введены неверно";
    return $__data;
}

function isUser($conn, $data) { // token
    $__data = array( "success" => false );
    $user = getUser($conn, $data["token"]);
    if ($user) $__data["success"] = true;
    return $__data;
}

function getUserName($conn, $data) { // token
    $__data = array( "success" => false );
    $user = getUser($conn, $data["token"]);
    if ($user) {
        $__data["success"] = true;
        $__data["username"] = $user[getkey("name")];
    }
    return $__data;
}

function getUserType($conn, $data) {
    $__data = array( "success" => false );
    $user = getUser($conn, $data["token"]);
    if ($user) {
        $__data["success"] = true;
        $__data["type"] = $user[getkey("type")];
    }
    return $__data;
}

function getUserInfo($conn, $data) {
    $__data = array(
        "success" => false,
        "data" => array()
    );
    $user = getUser($conn, $data["token"]);
    if ($user) {
        $__data["success"] = true;
        foreach ($data["keys"] as $key) {
            if (getKey($key)) $__data["data"][$key] = $user[getKey($key)];
        }
    }
    return $__data;
}
?>