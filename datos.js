function consecutivo(){
//accede a los radio buttons
var rac = document.formulario.gender;
var ref;
//Valida el valor del que esta seleccionado
for (var i = 0; i < rac.length; i++) {
    if(rac[i].checked)
    {
      ref = rac[i].value;
    }
  }
// esto codigo se ejecuta si no existe nuigun consecutivo de la referencia correspondiente
//accede a la fecha actual
var d = new Date();
//mes
var month = d.getMonth()+1;
//año
var year = d.getFullYear();
//parsea el año para obtener los ultimos dos dijitos
var año= year.toString().substr(-2);
//parcea el mes para agregar un 0 si solo tiene un digito
month = month.toString();
if (month.length === 1)
    {
        month = "0" + month;
    }
var serial = "001";
//se crea el serial teniendo encuenta los datos obtenidos
var consecutivo = ref+serial+month+año;
//ajax que envia los datos a php para montarlos en la base de datos
$.ajax({
   url:'datos.php',
   type: 'POST',
   data:{consecutivo:consecutivo , ref:ref},
   success: function(res){
    
     var js= JSON.parse(res);
     //Aca se busca en la base de datos y teniendo encuenta el ultimo consecutivo de una referencia se crea el siguiente
     var jsl = js.length;
     //Este es el ultimo cosecutivo encontrado
     var num= js[jsl-1].cons;
     //substraemos el numero en el que va
     var numero = num.toString().substr(2,3);
     //le sumamos 1 para montar el siguiente
     var result = parseInt(numero)+1;
     //mes actual
     var mes = d.getMonth()+1;
     mes = mes.toString();
     if (mes.length === 1)
         {
             mes = "0" + mes;
         }
     //Valida el numero del consecutivo para montarle los 0 que van antes
     if (result < 10){
       result = "00"+result.toString();
      }
     else  if (result >=10 && result < 100){
        result = "0"+result.toString();
       }
      //añobd
      var año= year.toString().substr(-2);
      var añobd = num.toString().substr(7,2);
      //compara el año del ultimo consecutivo regostrado y si no coinciden reinicia los consecutivos
      if(año != añobd){
          var consecutivo1 = ref+"001"+mes+año;
      }
      else{
        var consecutivo1 = ref+result+mes+año;
      }
      //Ajax que envia el cosecutivo
      $.ajax({
        url:'InsertarCons.php',
         type: 'POST',
         data:{consecutivo1:consecutivo1},
         success: function(res){
           console.log(res);
           window.alert("se ha creado el consecutivo No:"+consecutivo1);
         }
      })
   }
})
}
