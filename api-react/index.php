<?php
header("Access-Control-Allow-Origin: *");
include 'db.php';
$dbhost = "localhost";
$dbuser = 'root';
$dbpass = '';
$dbname = 'sprint_retrospective';

$db = new db($dbhost, $dbuser, $dbpass, $dbname);
$data = $_GET['action'];

/**
 * get boards
 */
if($_GET['action']=='get_boards'){
    $data = $db->query("select * from boards")->fetchAll();
}

/**
 * get users
 */
if ($_GET['action']=='get_users'){
    $data = $db->query("select * from users")->fetchAll();
}

/**
 * post user
 */
if ($_GET['action']=='post_user'){
    $pass = md5(base64_decode($_GET['password']));
    $db->query("insert into users(username,hash_pass, email, first_name, last_name) 
                        values ('{$_GET['username']}','{$pass}','{$_GET['email']}','{$_GET['first_name']}', '{$_GET['last_name']}') ");
}


ob_clean();
echo json_encode($data);
exit;
