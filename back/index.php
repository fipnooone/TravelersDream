<?php
require_once 'connect.php';
require_once 'users.php';

$res = array(
    "method" => $_POST["method"],
    "data" => json_decode($_POST["data"], true)
);

function sortingHat($conn, $r) {
    switch ($r["method"]) {
        case "login":
            return login($conn, $r["data"]);
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
        default:
            return array(
                "success" => false,
                "error" => "Wrong method"
            );
    }
}

echo json_encode(sortingHat($connect, $res));

/*$data = array(
    "login" => $_POST['login'],
    "password" => $_POST['password']
);
$returnData = array(
    "success" => false
);
$users = mysqli_fetch_all(mysqli_query($connect, "SELECT * FROM `users` WHERE `login` = \"{$data["login"]}\""));
if (count($users) == 0) {
    $returnData["success"] = false;
    $returnData["message"] = "Логин или пароль введены неверно";
}
else {
    foreach($users as $user){
        if ($user[3] == $data["password"]) {
            $returnData["success"] = true;
        }
        else {
            $returnData["success"] = false;
            $returnData["message"] = "Логин или пароль введены неверно";
        }
    };
}
echo json_encode($returnData);*/
?>