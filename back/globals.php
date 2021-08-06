<?php
$permissions = array( //0 - admin
    "getEmployees" => array(0),
    "getTypes" => array(0),
    "updateUserInfo" => array(0),
    "createUser" => array(0),
);
$categories = array(
    'clients',
    'contracts',
    'payments',
    'users',
    'usertypes',
    'branches',
);
function getkey($key) {
    switch ($key) {
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
        case 'branch':
            return 8;
        case "photo":
            return 9;
        default:
            return false;
    }
}
function getkeyClients($key) {
    switch ($key) {
        case "id":
            return 0;
        case "fio":
            return 1;
        case "name":
            return 2;
        case "passport_series":
            return 3;
        case "passport_number":
            return 4;
        case "issue_date":
            return 5;
        case "issuing_authority":
            return 6;
        case "status":
            return 7;
        default:
            return false;
    }
}
function getkeyContracts($key) {
    switch ($key) {
        case "id":
            return 0;
        case "date":
            return 1;
        case "contract":
            return 2;
        case "organization":
            return 3;
        case "executor":
            return 4;
        case "client":
            return 5;
        case "start_of_trip":
            return 6;
        case "end_of_trip":
            return 7;
        case "participants":
            return 8;
        case "route":
            return 9;
        default:
            return false;
    }
}
function getkeyPayments($key) {
    switch ($key) {
        case "id":
            return 0;
        case "date":
            return 1;
        case "organization":
            return 2;
        case "contract":
            return 3;
        case "amount":
            return 4;
        default:
            return false;
    }
}
function tableName($key) {
    switch ($key) {
        case 'clients':
            return 'Клиенты';
        case 'contracts':
            return 'Договоры';
        case 'payments':
            return 'Платежи';
        case 'users':
            return 'Пользователи';
        case 'usertypes':
            return 'Типы пользователей';
        default:
            return false;
    }
}
$clientTypes = array(
    0 => "Обычный",
    1 => "Привелигированный",
    2 => "VIP"
);
function transliterate($st) {
    $gost = array(
        "а"=>"a","б"=>"b","в"=>"v","г"=>"g","д"=>"d",
        "е"=>"e", "ё"=>"yo","ж"=>"j","з"=>"z","и"=>"i",
        "й"=>"i","к"=>"k","л"=>"l", "м"=>"m","н"=>"n",
        "о"=>"o","п"=>"p","р"=>"r","с"=>"s","т"=>"t",
        "у"=>"y","ф"=>"f","х"=>"h","ц"=>"c","ч"=>"ch",
        "ш"=>"sh","щ"=>"sh","ы"=>"i","э"=>"e","ю"=>"u",
        "я"=>"ya",
        "А"=>"A","Б"=>"B","В"=>"V","Г"=>"G","Д"=>"D",
        "Е"=>"E","Ё"=>"Yo","Ж"=>"J","З"=>"Z","И"=>"I",
        "Й"=>"I","К"=>"K","Л"=>"L","М"=>"M","Н"=>"N",
        "О"=>"O","П"=>"P","Р"=>"R","С"=>"S","Т"=>"T",
        "У"=>"Y","Ф"=>"F","Х"=>"H","Ц"=>"C","Ч"=>"Ch",
        "Ш"=>"Sh","Щ"=>"Sh","Ы"=>"I","Э"=>"E","Ю"=>"U",
        "Я"=>"Ya",
        "ь"=>"","Ь"=>"","ъ"=>"","Ъ"=>"",
        "ї"=>"j","і"=>"i","ґ"=>"g","є"=>"ye",
        "Ї"=>"J","І"=>"I","Ґ"=>"G","Є"=>"YE"
        );
    return strtr($st, $gost);
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