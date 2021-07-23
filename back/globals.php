<?php
$permissions = array( //0 - admin
    "getEmployees" => array(0),
    "getTypes" => array(0),
    "updateUserInfo" => array(0),
    "createUser" => array(0)
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
function transliterate($st) {
    $st = strtr($st,
      "абвгдежзийклмнопрстуфыэАБВГДЕЖЗИЙКЛМНОПРСТУФЫЭ",
      "abvgdegziyklmnoprstufieABVGDEGZIYKLMNOPRSTUFIE"
    );
    $st = strtr($st, array(
      'ё'=>"yo",    'х'=>"h",  'ц'=>"ts",  'ч'=>"ch", 'ш'=>"sh",
      'щ'=>"shch",  'ъ'=>'',   'ь'=>'',    'ю'=>"yu", 'я'=>"ya",
      'Ё'=>"Yo",    'Х'=>"H",  'Ц'=>"Ts",  'Ч'=>"Ch", 'Ш'=>"Sh",
      'Щ'=>"Shch",  'Ъ'=>'',   'Ь'=>'',    'Ю'=>"Yu", 'Я'=>"Ya",
    ));
    return $st;
}
function generateRandomString($length = 10) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}
?>