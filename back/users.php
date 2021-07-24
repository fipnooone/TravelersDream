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

function __getUserById($conn, $id) {
    $users = mysqli_fetch_all(mysqli_query($conn, "SELECT * FROM `users` WHERE `id` = \"{$id}\""));
    if (count($users) == 0) return false;
    else return $users[0];
}
function __getUserByFio($conn, $fio) {
    $users = mysqli_fetch_all(mysqli_query($conn, "SELECT * FROM `users` WHERE `fio` = \"{$fio}\""));
    if (count($users) == 0) return false;
    else return $users[0];
}

function isNewUserByFio($conn, $data) {
    $__data = array( "success" => false );
    $user = __getUserByFio($conn, $data["fio"]);
    if ($user) $__data["success"] = true;
    return $__data;
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

function register($conn, $data) { // fio, login and password
    $__data = array( "success" => false );
    $login = $data["login"];
    $password = $data["password"];
    if ($data["login"] != "" and $data["password"] != "") {
        if ($login != str_replace(" ", "", $login) or $password != str_replace(" ", "", $password)) {
            $__data["message"] = "Логин и пароль не должны содержать пробелы";
        } else {
            $user = __getUserByFio($conn, $data["fio"]);
            $newpassword = password_hash($password, PASSWORD_BCRYPT);
            $token = password_hash($login, PASSWORD_BCRYPT);
            if ($user) {
                if ($user[(getkey('token'))] == NULL){
                    if (mysqli_query($conn, "UPDATE `users` SET `token` = \"{$token}\", `login` = \"{$login}\", `password` = \"{$newpassword}\" WHERE `users`.`id` = \"{$user[getkey("id")]}\""))
                        {$__data["success"] = true;
                        $__data["token"] = $token;}
                    else
                        $__data["message"] = "Произошла ошибка";
                } else $__data["message"] = "Пользователь уже существует";
            } else {
                $__data["message"] = "Такого пользователя не существует";
            }
        }
    }
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

function __getUserInfoById($conn, $id, $keys) {
    $__data = array();
    $user = __getUserById($conn, $id);
    if ($user) {
        $__data["success"] = true;
        foreach ($keys as $key) {
            if (getKey($key)) $__data[$key] = $user[getkey($key)];
        }
    }
    return $__data;
}

//

function updateUserInfo($conn, $data, $files) {
    global $permissions;
    $__data = array(
        "success" => false
    );
    if ($data["id"] == 0) return $__data;
    $query = "";
    $udata = __getUserInfoById($conn, $data["id"], array('fio', 'photo'));
    $fio = $udata['fio'];
    $photo = $udata['photo'];
    $randname = transliterate(str_replace(' ', '-', $fio)).'-'.generateRandomString(5);
    $ext = preg_replace("/(.*)\/(?:)/", '', $files['files']['type'][0]);
    if (isAllowed($conn, $data["token"], $permissions["updateUserInfo"])) {
        $counter = 1;
        $total = count($data["keys"]);
        foreach ($data["keys"] as $key => $value) {
            $query = $query."`{$key}` = '{$value}'".(($counter < $total) ? ", " : "");
            $counter += 1;
        }
        if ($files) {
            $query = $query . ($counter > 1 ? ", " : "") . "`photo` = '{$randname}.{$ext}'".(($counter < $total) ? ", " : "");
            move_uploaded_file(
                $files["files"]['tmp_name'][0], 
                $_SERVER['DOCUMENT_ROOT'] . "/profilepictures/{$randname}.{$ext}"
            );
            unlink( $_SERVER['DOCUMENT_ROOT'] . "/profilepictures/{$photo}");
            $counter += 1;
        }
        if ($query != "" and mysqli_query($conn, "UPDATE `users` SET {$query} WHERE `users`.`id` = {$data["id"]}"))
            $__data["success"] = true;
    }
    
    return $__data;
}

function createUser($conn, $data, $files) {
    global $permissions;
    $__data = array(
        "success" => false
    );
    $query = array(
        'name' => NULL,
        'fio' => NULL,
        'type' => NULL,
        'bdate' => NULL,
        'photo' => NULL
    );
    $keys = $data["keys"];
    $randname = transliterate(str_replace(' ', '-', $keys["fio"])).'-'.generateRandomString(5);
    $ext = preg_replace("/(.*)\/(?:)/", '', $files['files']['type'][0]);
    if (isAllowed($conn, $data["token"], $permissions["createUser"])) {
        $counter = 1;
        $total = count($keys);
        foreach ($keys as $key => $value) {
            $query[$key] = $value;
        }
        if (array_key_exists("files", $files)) {
            $query['photo'] = "{$randname}.{$ext}";
            move_uploaded_file(
                $files["files"]['tmp_name'][0], 
                $_SERVER['DOCUMENT_ROOT'] . "/profilepictures/{$randname}.{$ext}"
            );
        } else {
            $query['photo'] = '0.png';
        }
        //$query["token"] = password_hash($query["login"], PASSWORD_BCRYPT); 
        if ($query != "" and mysqli_query($conn, "INSERT INTO `users`(`name`, `fio`, `type`, `bdate`, `photo`) VALUES (\"{$query['name']}\", \"{$query['fio']}\", \"{$query['type']}\", \"{$query['bdate']}\", \"{$query['photo']}\")"))
            $__data["success"] = true;
    }
    
    return $__data;
}
?>