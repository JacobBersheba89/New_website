<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST["name"]);
    $email = htmlspecialchars($_POST["email"]);
    $message = htmlspecialchars($_POST["message"]);

    $to = "info@jakubpawlas.cz";
    $subject = "Nová zpráva z rezervačního formuláře";
    $headers = "From: " . $email . "\r\n" .
               "Reply-To: " . $email . "\r\n" .
               "Content-Type: text/plain; charset=UTF-8";

    $body = "Jméno: $name\nEmail: $email\n\nZpráva:\n$message";

    if (mail($to, $subject, $body, $headers)) {
        echo "Zpráva byla úspěšně odeslána.";
    } else {
        echo "Chyba při odesílání zprávy.";
    }
} else {
    echo "Neplatný požadavek.";
}
?>
