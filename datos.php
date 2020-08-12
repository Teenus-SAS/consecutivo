<?php
// se encarga de hacer la consulta de los consecutivos y si no hay ninguno hace el insert
$ref = $_POST['ref'];

$conexion = mysqli_connect("localhost","root","","consecutivo" );
$select=mysqli_num_rows(mysqli_query($conexion,"select * from numero  WHERE (cons LIKE '$ref%')"));
$consecutivo = $_POST['consecutivo'];
if($select==0){
  echo $consecutivo;
  echo $ref;
  $insert= mysqli_query($conexion,"insert into numero values('$consecutivo')");
}else{
  $consulta= mysqli_query($conexion,"select * from numero  WHERE (cons LIKE '$ref%')");
  while($aaa=mysqli_fetch_assoc($consulta)){
        $arr[]=$aaa;
  }
  echo json_encode($arr);
}
 ?>
