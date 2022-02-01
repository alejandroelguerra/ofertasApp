document.addEventListener("DOMContentLoaded",function(){

var mostrar = document.getElementsByName('mostrar_info');
for (let f of mostrar){
    f.addEventListener("click",function(){
      var mymodal = document.getElementById("modal");
      $(modal).modal();
    });
}

var cerrarmodal = document.getElementById("cerrar-modal");
cerrarmodal.addEventListener("click",function(){
    $('#modal').modal('toggle');
})

});