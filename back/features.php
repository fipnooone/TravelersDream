<?php
function isAllowed($conn, $token, $allowed) {
    $type = getUser($conn, $token)[getkey("type")];
    $_perms = mysqli_fetch_all(mysqli_query($conn, "SELECT * FROM `usertypes`"))[$type - 1];
    $perms = json_decode($_perms[2], true)["permissions"];
    if (in_array("all", $perms) or in_array($type, $allowed)) {
        return true;
    } else {
        return false;
    }
}

function getEmployees($conn, $data) {
    global $permissions;
    $__data = array(
        "success" => false,
        "data" => array(
            "users" => array()
        )
    );
    if (isAllowed($conn, $data["token"], $permissions["getEmployees"])) {
        $users = mysqli_fetch_all(mysqli_query($conn, "SELECT * FROM `users`"));
        $types = mysqli_fetch_all(mysqli_query($conn, "SELECT * FROM `usertypes`"));
        $__types = array();
        foreach ($types as $type) {
            array_push($__types, array(
                "type" => $type[1]
            ));
        }
        $__data["success"] = true;
        foreach ($users as $user) {
            array_push($__data["data"]["users"], array(
                "id" => $user[getkey("id")],
                "name" => $user[getkey("name")],
                "fio" => $user[getkey("fio")],
                "typeid" => $user[getkey("type")],
                "type" => $__types[$user[getkey("type")] - 1]["type"],
                "bdate" => $user[getkey("bdate")],
                "photo" => "http://dream/profilepictures/{$user[getkey("photo")]}"
            ));
        }
    }
    return $__data;
}
function getTypes($conn, $data) {
    global $permissions;
    $__data = array(
        "success" => false,
        "data" => array(
            "types" => array()
        )
    );
    if (isAllowed($conn, $data["token"], $permissions["getTypes"])) {
        $types = mysqli_fetch_all(mysqli_query($conn, "SELECT * FROM `usertypes`"));
        $__data["success"] = true;
        foreach ($types as $type) { array_push($__data["data"]["types"], $type[1]); }
    }
    return $__data;
}
?>