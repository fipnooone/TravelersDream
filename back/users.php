<?php
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
    if (isAllowed($conn, $data["token"], $permissions["updateUserInfo"])) {
        $counter = 1;
        $total = count($data["keys"]);
        foreach ($data["keys"] as $key => $value) {
            $query = $query."`{$key}` = '{$value}'".(($counter < $total) ? ", " : "");
            $counter += 1;
        }
        if ($files) {
            $ext = preg_replace("/(.*)\/(?:)/", '', $files['files']['type'][0]);
            $query = $query . ($counter > 1 ? ", " : "") . "`photo` = '{$randname}.{$ext}'".(($counter < $total) ? ", " : "");
            move_uploaded_file(
                $files["files"]['tmp_name'][0], 
                $_SERVER['DOCUMENT_ROOT'] . "/profilepictures/{$randname}.{$ext}"
            );
            if ($photo != '0.png') unlink( $_SERVER['DOCUMENT_ROOT'] . "/profilepictures/{$photo}");
            $counter += 1;
        }
        if ($query != "" and mysqli_query($conn, "UPDATE `users` SET {$query} WHERE `users`.`id` = {$data["id"]}"))
            $__data["success"] = true;
    }
    return $__data;
}

function createUser($conn, $data, $files) {
    $__data = array(
        "success" => false
    );
    function __create($conn, $__user, $__files) {
        $__query = array(
            'fio' => array_key_exists('fio', $__user) ? $__user['fio'] : NULL,
            'name' => array_key_exists('name', $__user) ? $__user['name'] : NULL,
            'type' => array_key_exists('type', $__user) ? $__user['type'] : NULL,
            'bdate' => array_key_exists('bdate', $__user) ? $__user['bdate'] : NULL,
            'branch' => array_key_exists('branch', $__user) ? $__user['branch'] : NULL,
            'photo' => array_key_exists('photo', $__user) ? $__user['photo'] : NULL
        );
        $randname = transliterate(str_replace(' ', '-', $__user["fio"])).'-'.generateRandomString(5);
        if (array_key_exists("files", $__files)) {
            $ext = preg_replace("/(.*)\/(?:)/", '', $__files['files']['type'][0]);
            $__query['photo'] = "{$randname}.{$ext}";
            move_uploaded_file(
                $files["files"]['tmp_name'][0], 
                $_SERVER['DOCUMENT_ROOT'] . "/profilepictures/{$randname}.{$ext}"
            );
        } else {
            $__query['photo'] = '0.png';
        }

        $__qString = "INSERT INTO `users`(`name`, `fio`, `type`, `bdate`, `branch`, `photo`) VALUES (\"{$__query['name']}\", \"{$__query['fio']}\", \"{$__query['type']}\", \"{$__query['bdate']}\", \"{$__query['branch']}\", \"{$__query['photo']}\")";
        if (mysqli_query($conn, $__qString))
            return true;
        else return false;
    }
    if (isAllowedT($conn, $data['token'], 'users')) {
        if (array_key_exists('keys', $data)) {
            $__data['success'] = __create($conn, $data['keys'], $files);
        } elseif (array_key_exists('users', $data)) {
            foreach ($data['users'] as $user) {
                $__fioArr = explode(' ', $user['fio']);
                $__data['success'] = __create($conn, array(
                    'fio' => $__fioArr[0].' '.substr($__fioArr[1], 0, 2).'. '.substr($__fioArr[2], 0, 2).'.',
                    'name' => $user['fio'],
                    'type' => array_key_exists('type', $user) ? $user['type'] : NULL,
                    'branch' => array_key_exists('branch', $user) ? $user['branch'] : NULL,
                    'bdate' => array_key_exists('bdate', $user) ? $user['bdate'] : NULL
                ), array());
            }
        }
    }

    return $__data;
}
?>