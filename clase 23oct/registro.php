<?php
    $serve = "db";
    $username = "usuario";
    $password = "mjn202424";
    $dbname = "sistema";

    $conn = mysqli_connect($server, $username, $password, $dbname);
    //verificar conexión
    if(!$conn){
        die("falló la conexión a la base de datos". mysqli_connect_error());
    }
    }

?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta charset="vierport" content="width=device-width>
        <tittle> Registro </title>
</head>
<body>
    <h1> Registro de usuarios </h1>
    <Form method="post">
        <label for="nombre">Nombre: </label>
        <input type="text" name="nombre" id="nombre"> <br>
        <label for="password"> contraseña: </label>
        <input type="text" name="contrasena" id="contrasena"> <br>
        <label for="edad> Edad: </label>
        <input type="number" name="edad" id="edad" min='0' max='120'>
        <input type="submit" value="Registro">
</form>
    <?php
        if($_SERVER["REQUEST_METHOD"] == "POST")
            $nombre = $_POST['nombre'];
            $contrasena = $_POST['contrasena'];
            $edad = $_POST['edad'];

            //cifrar contraseña con password_hash
            $contrasena_cifrada = password_hash($contrasena, PASSWORD_DEFAULT);

            //insert  en la BD
            $sql = "INSERT INTO registro (nombre, contraseña, edad) VALUES ('$nombre', '$contrasena_cifrada', $edad);";

            if(mysqli_query($conn, $sql)){
                echo "<h3>REGISTRO EXITOSO </h3>";
            
            }else {
                echo "<h3> Error: " . mysli_error($conn) . "</h3>"

            }
        }    
        
    ?>
</body>
</hmtl>
