<?php
function getEmployees($conn) {
    $__data = array(
        "success" => false,
        "users" => array()
    );
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
        array_push($__data["users"], array(
            "id" => $user[getkey("id")],
            "name" => $user[getkey("name")],
            "type" => $__types[$user[getkey("type")] - 1]["type"]
        ));
    }
    return $__data;
}
?>