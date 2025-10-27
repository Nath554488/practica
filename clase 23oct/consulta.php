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
        <tittle>Consulta </title>
        <link rel="stylesheet" href="estilo.css">
</head>
<body>
    <h1>Consulta de usuarios</h1>
    <table>
        <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Edad</th>
        </tr>

        <?php
        //consulta a la BD
        $sql = "SELECT * FROM registro;";
        $resultado = mysqli_query($conn, $sql);

        while($row = mysqli_fetch_array($resultado)){
            echo "<tr>";
            echo "<td>" . $row[id] . $row["nombre"] . "<td><td>" . $row[]"edad] l. </td>;
            echo "</tr>";
        }
            mysqli_close($conn);
        ?>
        </table>
    </body>
    </html>