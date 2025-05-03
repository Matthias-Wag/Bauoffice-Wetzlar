<?php
// filepath: c:\Users\akemp\Desktop\Websites\architect-website\contact.php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $subject = htmlspecialchars($_POST['subject']);
    $message = htmlspecialchars($_POST['message']);

    // Ihre E-Mail-Adresse
    $to = "philipp-kempf@gmx.de";
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // E-Mail-Inhalt
    $email_body = "Name: $name\n";
    $email_body .= "Email: $email\n";
    $email_body .= "Betreff: $subject\n\n";
    $email_body .= "Nachricht:\n$message\n";

    // E-Mail senden
    if (mail($to, $subject, $email_body, $headers)) {
        echo "success";
    } else {
        echo "error";
    }
} else {
    echo "invalid";
}
?>