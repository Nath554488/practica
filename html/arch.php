<?php
    $servername = "db"; //nombre del servicio en docker
    $username = "usuario";
    $password = "Mjn202424";
    $dbname = "usuario";

    // crear la conexion
    $conn = new mysqli($servername, $username, $password, $dbname);

    //check connection
    if($conn->connect_error){
        die("Connection failed: " . $conn->connection_error);
        echo "connection succesfully to mySQL";
    }
    
    $result = mysqli_query($conn, "SELECT * FROM compra;");
    while($row = mysqli_fetch_array($result)){ // variable donde recibimos el query
        
        echo $row['id'] . " " . $row['idModelo'] . " " . $row[idUsuario] . " " . $row[folio];
        echo "<br>";
    }

    mysql_close($conn);

?>