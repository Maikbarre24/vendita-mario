<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $phone = $_POST["phone"];
    $delivery_method = $_POST["delivery_method"];
    $address = $_POST["address"];
    $zip = $_POST["zip"];
    $payment_method = $_POST["payment_method"];

    $to = "maikbarre24@gmail.com";
    $subject = "Nuovo ordine da $name";
    $message = "
    Nome: $name\n
    Email: $email\n
    Telefono: $phone\n
    Metodo di Consegna: $delivery_method\n
    Indirizzo: $address\n
    CAP: $zip\n
    Metodo di Pagamento: $payment_method
    ";
    $headers = "From: $email";

    mail($to, $subject, $message, $headers);
    echo "Ordine inviato correttamente!";
}
?>
