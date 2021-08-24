<?php

require "vendor/autoload.php";
use PHPMailer\PHPMailer\PHPMailer;

$_POST = json_decode(file_get_contents("php://input"), true);
$fields = $_POST['contactFormData'];

if ($fields['lastname'] == '' || $fields['firstname'] == '' || $fields['email'] == '' || $fields['recipient'] == '' || $fields['message'] == '') {
    echo json_encode("empty-fields");
}

else {
    // SET YOUR GMAIL CREDENTIALS
    $my_name = "name";
    $my_email = "example@gmail.com";
    $my_password = "secr3tp4ssw0rd";

    $mail = new PHPMailer(true);
    $mail->CharSet = 'UTF-8';

    // Disable this part if you don't wanna use your Gmail account or it doesn't work
    // $mail->IsSMTP();
    // $mail->SMTPAuth = true;
    // $mail->SMTPSecure = "ssl";
    // $mail->Host = "smtp.gmail.com";
    // $mail->Port = 465;
    // $mail->Username = $my_email;
    // $mail->Password = $my_password;

    // Essential part to make it work
    $mail->SetFrom($fields['email'], $fields["firstname"].' '.$fields["lastname"]);
    $mail->AddAddress($my_email, $my_name);
    $mail->addReplyTo($fields['email'], $fields["firstname"].' '.$fields["lastname"]);
    $mail->Subject = 'Les avocats de France pour: '.$fields['recipient'];
    $mail->Body = 'À destination de: '.$fields['recipient'].PHP_EOL.PHP_EOL.$fields['message'];

    try{
        $mail->Send();
        echo json_encode("success");
    } catch(Exception $e){
        echo json_encode($mail->ErrorInfo);
    }
}
