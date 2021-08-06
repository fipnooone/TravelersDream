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
function isAllowedT($conn, $token, $method) {
    $type = getUser($conn, $token)[getkey("type")];
    $_perms = mysqli_fetch_all(mysqli_query($conn, "SELECT * FROM `usertypes`"))[$type - 1];
    $perms = json_decode($_perms[2], true)["permissions"];
    if (in_array("all", $perms) or in_array($method, $perms)) {
        return true;
    } else {
        return false;
    }
}

function getCategories($conn, $data) {
    global $categories;
    $__data = array(
        "success" => false,
        "data" => array(
            "categories" => array()
        )
    );
    $usertype = getUser($conn, $data['token'])[getkey("type")];
    $type = mysqli_fetch_all(mysqli_query($conn, "SELECT * FROM `usertypes` WHERE `usertypes`.`id` = {$usertype}"))[0];
    $typeperms = json_decode($type[2], true)["permissions"];
    if (in_array("all", $typeperms)) {
        $__data['data']['categories'] = $categories;
    } else {
        foreach ($categories as $category) {
            if (in_array($category, $typeperms)) array_push($__data['data']['categories'], $category);
        }
    }
    $__data['success'] = true;
    return $__data;
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

function getListOf($conn, $data) {
    global $permissions;
    $__data = array(
        "success" => false,
        "data" => array()
    );

    $usertype = getUser($conn, $data['token'])[getkey("type")];
    $type = mysqli_fetch_all(mysqli_query($conn, "SELECT * FROM `usertypes` WHERE `usertypes`.`id` = {$usertype}"))[0];
    $typeperms = json_decode($type[2], true)["permissions"];
    if (in_array("all", $typeperms) or in_array($data['list'], $typeperms)) {
        $__data['data']['list'] = array();
        $__data["success"] = true;
        switch ($data['list']){
            case 'users':
                $users = mysqli_fetch_all(mysqli_query($conn, "SELECT * FROM `users`"));
                $types = mysqli_fetch_all(mysqli_query($conn, "SELECT * FROM `usertypes`"));
                $__types = array();
                foreach ($types as $type) {
                    array_push($__types, array(
                        "type" => $type[1]
                    ));
                }
                foreach ($users as $user) {
                    array_push($__data["data"]['list'], array(
                        "id" => $user[getkey("id")],
                        "name" => $user[getkey("name")],
                        "fio" => $user[getkey("fio")],
                        "typeid" => $user[getkey("type")],
                        "type" => $__types[$user[getkey("type")] - 1]["type"],
                        "bdate" => $user[getkey("bdate")],
                        "photo" => "http://dream/profilepictures/{$user[getkey("photo")]}"
                    ));
                }
                return $__data;
            case 'clients':
                $clients = mysqli_fetch_all(mysqli_query($conn, "SELECT * FROM `clients`"));
                foreach ($clients as $client) {
                    array_push($__data["data"]['list'], array(
                        "id" => $client[getkeyClients("id")],
                        "name" => $client[getkeyClients("name")],
                        "fio" => $client[getkeyClients("fio")],
                        "passport_series" => $client[getkeyClients("passport_series")],
                        "passport_number" => $client[getkeyClients("passport_number")],
                        "issue_date" => $client[getkeyClients("issue_date")],
                        "expiration_date" => $client[getkeyClients("expiration_date")],
                        "issuing_authority" => $client[getkeyClients("issuing_authority")],
                        "status" => $client[getkeyClients("status")]
                    ));
                }
                return $__data;
            case 'contracts':
                $contracts = mysqli_fetch_all(mysqli_query($conn, "SELECT * FROM `contracts`"));
                foreach ($contracts as $contract) {
                    array_push($__data["data"]['list'], array(
                        "id" => $contract[getkeyContracts("id")],
                        "date" => $contract[getkeyContracts("date")],
                        "contract" => $contract[getkeyContracts("contract")],
                        "organization" => $contract[getkeyContracts("organization")],
                        "executor" => $contract[getkeyContracts("executor")],
                        "client" => $contract[getkeyContracts("client")],
                        "start_of_trip" => $contract[getkeyContracts("start_of_trip")],
                        "end_of_trip" => $contract[getkeyContracts("end_of_trip")],
                        "participants" => $contract[getkeyContracts("participants")],
                        "route" => $contract[getkeyContracts("route")]
                    ));
                }
                return $__data;
            case 'payments':
                $payments = mysqli_fetch_all(mysqli_query($conn, "SELECT * FROM `payments`"));
                foreach ($payments as $payment) {
                    array_push($__data["data"]['list'], array(
                        "id" => $payment[getkeyPayments("id")],
                        "date" => $payment[getkeyPayments("date")],
                        "organization" => $payment[getkeyPayments("organization")],
                        "contract" => $payment[getkeyPayments("contract")],
                        "amount" => $payment[getkeyPayments("amount")]
                    ));
                }
                return $__data;
            case 'usertypes':
                $usertypes = mysqli_fetch_all(mysqli_query($conn, "SELECT * FROM `usertypes`"));
                foreach ($usertypes as $utype) {
                    array_push($__data["data"]['list'], array(
                        "id" => $utype[0],
                        "type" => $utype[1],
                        "permissions" => $utype[2]
                    ));
                }
            case 'branches':
                $branches = mysqli_fetch_all(mysqli_query($conn, "SELECT * FROM `branches`"));
                foreach ($branches as $branch) {
                    array_push($__data["data"]['list'], array(
                        "id" => $branch[0],
                        "name" => $branch[1]
                    ));
                }
                return $__data;
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

function createClient($conn, $data) {
    $__data = array(
        'success' => false
    );
    function __create($conn, $__client) {
        $__query = array(
            'fio' => array_key_exists('fio', $__client) ? $__client['fio'] : NULL,
            'name' => array_key_exists('name', $__client) ? $__client['name'] : NULL,
            'passport_series' => array_key_exists('passport_series', $__client) ? $__client['passport_series'] : NULL,
            'passport_number' => array_key_exists('passport_number', $__client) ? $__client['passport_number'] : NULL,
            'issue_date' => array_key_exists('issue_date', $__client) ? $__client['issue_date'] : NULL,
            'issuing_authority' => array_key_exists('issuing_authority', $__client) ? $__client['issuing_authority'] : NULL,
            'status' => array_key_exists('status', $__client) ? $__client['status'] : NULL,
            'bdate' => array_key_exists('bdate', $__client) ? $__client['bdate'] : NULL
        );
        $__qString = "INSERT INTO `clients`(`fio`, `name`, `passport_series`, `passport_number`, `issue_date`, `issuing_authority`, `status`, `bdate`) VALUES (\"{$__query['fio']}\", \"{$__query['name']}\", \"{$__query['passport_series']}\", \"{$__query['passport_number']}\", \"{$__query['issue_date']}\", \"{$__query['issuing_authority']}\", \"{$__query['status']}\", \"{$__query['bdate']}\")";
        echo $__qString;
        if (mysqli_query($conn, $__qString))
                    return true;
        else return false;
    }
    if (isAllowedT($conn, $data['token'], 'clients')) {
        var_dump($data);
        if (array_key_exists('client', $data)) {
            echo 'client';
            $__data['success'] = __create($conn, $data['client']);
        } elseif (array_key_exists('clients', $data)) {
            foreach ($data['clients'] as $client) {
                $__data['success'] = __create($conn, $client);
            }
        }
    }
    return $__data;
}
?>