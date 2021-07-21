<?php
$permissions = array( //0 - admin
    "getEmployees" => array(0),
    "getTypes" => array(0)
);
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
?>