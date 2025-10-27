<?php
    $servername = "db";
    $username = "usuario";
    $password = "Mjn202424";
    $dbname = "usuario";

    $conn = mysqli_connect($servername, $username, $password, $dbname);

    //check connection
    if(mysqli_connect_errno()){
        echo "failed to connect to MySQL: " . mysqli_connect_error();


    }

    ?>