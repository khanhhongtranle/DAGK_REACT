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
}elseif($_GET['action']=='test'){
    $data = 'test';
}

ob_clean();
echo json_encode($data);
exit;
