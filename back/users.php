<?php
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
            if ($key == "photo") $__data["data"][$key] = "http://dream/profilepictures/{$user[getkey("photo")]}";
            elseif (getKey($key)) $__data["data"][$key] = $user[getkey($key)];
        }
    }
    return $__data;
}

//

function updateUserInfo($conn, $data) {
    global $permissions;
    $__data = array(
        "success" => false
    );
    $query = "";
    if (isAllowed($conn, $data["token"], $permissions["updateUserInfo"])) {
        $counter = 1;
        $total = count($data["keys"]);
        foreach ($data["keys"] as $key => $value) {
            if ($key == "photo") {
                $filenameIn  = $value;
                $filenameOut = __DIR__ . './profilepictures/' . basename($value);

                $contentOrFalseOnFailure = file_get_contents("{$filenameIn}");
                $byteCountOrFalseOnFailure = file_put_contents("./profilepictures/test.png", $contentOrFalseOnFailure);
            } else {
                $query = $query."`{$key}` = '{$value}'".(($counter < $total) ? ", " : "");
                $counter += 1;
            }
        }
    }
    //$__data["query"] = "UPDATE `users` SET {$query} WHERE `users`.`id` = {$data["id"]}";
    if (mysqli_query($conn, "UPDATE `users` SET {$query} WHERE `users`.`id` = {$data["id"]}"))
        $__data["success"] = true;
    
    return $__data;
}
?>