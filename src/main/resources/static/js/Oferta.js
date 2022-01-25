function Oferta(){
    this.id=0;
    this.nombre="";
    this.prioridad="";
    this.precio=0;
    this.hiperenlace="";
    this.descripcion="";
}
function Oferta(id,nombre,prioridad,precio,hiperenlace,descripcion){
    this.id=id;
    this.nombre=nombre;
    this.prioridad=prioridad;
    this.precio=precio;
    this.hiperenlace=hiperenlace;
    this.descripcion=descripcion;
}
function Oferta(nombre,prioridad,precio,hiperenlace,descripcion){
    this.id=0;
    this.nombre=nombre;
    this.prioridad=prioridad;
    this.precio=precio;
    this.hiperenlace=hiperenlace;
    this.descripcion=descripcion;
}