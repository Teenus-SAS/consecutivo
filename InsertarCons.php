<?php
//Inserta los consecutivos
$conexion = mysqli_connect("localhost","root","","consecutivo" );
$consecutivo1 = $_POST['consecutivo1'];
$insert= mysqli_query($conexion,"insert into numero values('$consecutivo1')");
 ?>
