<?php
//access control headears
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");
//creating constants which are parametric access to the database
DEFINE ('DB_USER', 'root');
DEFINE ('DB_PASSWORD','123');
DEFINE ('DB_HOST', 'localhost');
DEFINE ('DB_NAME', 'breastcancerapp');
//define variables for the submitted parameters
$operation=null;
$firstname=null;
$lastname=null;
$email=null;
$gender=null;
$password=null;
$emaillogin=null;
$passwordlogin=null;





if(!empty($_GET['operation'])){
	$operation=$_GET['operation'];
}

if(!empty($_GET['firstname'])){
	$firstname=$_GET['firstname'];
}

if(!empty($_GET['lastname'])){
	$lastname=$_GET['lastname'];
}
if(!empty($_GET['email'])){
	$email=$_GET['email'];
}
if(!empty($_GET['gender'])){
	$gender=$_GET['gender'];
}
if(!empty($_GET['password'])){
	$password=$_GET['password'];
}

if(!empty($_GET['emaillogin'])){
	$emaillogin=$_GET['emaillogin'];
}
if(!empty($_GET['passwordlogin'])){
	$emaillogin=$_GET['passwordlogin'];
}

if($operation==1){
	loginUser($emaillogin,$passwordlogin);
}
elseif($operation == 2){
	if($firstname !=null && $lastname!=null && $email!=null && $gender!=null && $password!=null){
		insertRecord($firstname, $lastname ,$email ,$gender,$password);
	}
}else{
	echo ("operation not defined. Specify value 1 or 2");
}
//register new user function===========================================================================//
function insertRecord($firstname_, $lastname_, $email_, $gender_, $password_){
	//the connection string object
	$conn = mysqli_connect (DB_HOST, DB_USER, DB_PASSWORD, DB_NAME) OR die ('Could not connect to MySQL: '.mysqli_connect_error() );

	//define insert query
	$query = "INSERT INTO user (firstname, lastname,email,gender,password)VALUES ('".$firstname_."', '".$lastname_."','".$email_."','".$gender_."','".md5($password_)."')";

	//execute query on connection object (conn) and echo result
	if (mysqli_query($conn, $query)) {
		echo "New record created successfully";
	 } else {
		echo "Error: " . $query . "" . mysqli_error($conn);
	 }
	 $conn->close();
}

function loginUser($emaillogin_,$passwordlogin_){
	$conn = mysqli_connect (DB_HOST, DB_USER, DB_PASSWORD, DB_NAME) OR die ('Could not connect to MySQL: '.mysqli_connect_error() );

	$sql="SELECT * FROM user";
	$result=mysqli_query($conn,$sql);


	

	if($emaillogin_='email' && $passwordlogin_='password'){
		echo "logged in successful";
	} else{
		echo 'wrong email/password!';
	}

}
?>
