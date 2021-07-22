<?php
$permissions = array( //0 - admin
    "getEmployees" => array(0),
    "getTypes" => array(0),
    "updateUserInfo" => array(0)
);
function getkey($key) {
    switch ($key){
        case "id":
            return 0;
        case "token":
            return 1;
        case "name":
            return 2;
        case "fio":
            return 3;
        case "login":
            return 4;
        case "password":
            return 5;
        case "type":
            return 6;
        case "bdate":
            return 7;
        case "photo":
            return 8;
        default:
            return false;
    }
}
?>