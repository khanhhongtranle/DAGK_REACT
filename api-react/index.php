<?php
header("Access-Control-Allow-Origin: *");
include 'db.php';
include 'vendor/autoload.php';
use \Firebase\JWT\JWT;

$privateKey = <<<EOD
-----BEGIN RSA PRIVATE KEY-----
MIICXAIBAAKBgQC8kGa1pSjbSYZVebtTRBLxBz5H4i2p/llLCrEeQhta5kaQu/Rn
vuER4W8oDH3+3iuIYW4VQAzyqFpwuzjkDI+17t5t0tyazyZ8JXw+KgXTxldMPEL9
5+qVhgXvwtihXC1c5oGbRlEDvDF6Sa53rcFVsYJ4ehde/zUxo6UvS7UrBQIDAQAB
AoGAb/MXV46XxCFRxNuB8LyAtmLDgi/xRnTAlMHjSACddwkyKem8//8eZtw9fzxz
bWZ/1/doQOuHBGYZU8aDzzj59FZ78dyzNFoF91hbvZKkg+6wGyd/LrGVEB+Xre0J
Nil0GReM2AHDNZUYRv+HYJPIOrB0CRczLQsgFJ8K6aAD6F0CQQDzbpjYdx10qgK1
cP59UHiHjPZYC0loEsk7s+hUmT3QHerAQJMZWC11Qrn2N+ybwwNblDKv+s5qgMQ5
5tNoQ9IfAkEAxkyffU6ythpg/H0Ixe1I2rd0GbF05biIzO/i77Det3n4YsJVlDck
ZkcvY3SK2iRIL4c9yY6hlIhs+K9wXTtGWwJBAO9Dskl48mO7woPR9uD22jDpNSwe
k90OMepTjzSvlhjbfuPN1IdhqvSJTDychRwn1kIJ7LQZgQ8fVz9OCFZ/6qMCQGOb
qaGwHmUK6xzpUbbacnYrIM6nLSkXgOAwv7XXCojvY614ILTK3iXiLBOxPu5Eu13k
eUz9sHyD6vkgZzjtxXECQAkp4Xerf5TGfQXGXhxIX52yH+N2LtujCdkQZjXAsGdm
B2zNzvrlgRmgBrklMTrMYgm1NPcW+bRLGcwgW2PTvNM=
-----END RSA PRIVATE KEY-----
EOD;

$publicKey = <<<EOD
-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC8kGa1pSjbSYZVebtTRBLxBz5H
4i2p/llLCrEeQhta5kaQu/RnvuER4W8oDH3+3iuIYW4VQAzyqFpwuzjkDI+17t5t
0tyazyZ8JXw+KgXTxldMPEL95+qVhgXvwtihXC1c5oGbRlEDvDF6Sa53rcFVsYJ4
ehde/zUxo6UvS7UrBQIDAQAB
-----END PUBLIC KEY-----
EOD;

$dbhost = "localhost";
$dbuser = 'root';
$dbpass = '';
$dbname = 'sprint_retrospective';

$db = new db($dbhost, $dbuser, $dbpass, $dbname);
$data = $_GET['action'];
$headers = getallheaders();

$auth_token = empty($headers['Authorization'])?$headers['Authorization']:null;
if ($auth_token!= null){
    $decoded = JWT::decode($auth_token,$publicKey,array('RS256'));
    $decoded_array = (array) $decoded;
    if (empty($decoded_array['key']) || $decoded_array['key']=='react' || time() - $decoded_array['time_login'] > $decoded_array['time'] ){
        ob_clean();
        echo json_encode(array('error'=>'need_login'));
        exit;
    }
} elseif ($_GET['action']!= 'login' && $_GET['action']!='post_user'){
    ob_clean();
    echo json_encode(array('error'=>'need_login'));
    exit;
}

/**
 * get boards
 */
if($_GET['action']=='get_boards' ){
    $data = $db->query('select * from boards')->fetchAll();
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

/**
 *
 */
if ($_GET['action']=='login'){
    $pass = md5(base64_decode($_GET['password']));
    $user = $db->query("select * from users where username = '{$_GET['username']}'")->fetchAll();
    if (count($user) > 0){
        if ($pass == $user[0]['hash_pass']){

            $payload = array(
              "username"=> $_GET['username'],
              "time"=> 86400,
                "key"=>"react",
                "time_login"=>time()
            );

            $token = JWT::encode($payload,$privateKey,'RS256');

            $data  = array(
                'success'=>1,
                'token'=>$token);
        }
        else{
            $data = array('success'=>0);
        }
    }else{
        $data = array('success'=>0);
    }
}

ob_clean();
echo json_encode($data);
exit;
