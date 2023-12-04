var conexion=require("./conexion").conexionServicios;
var Servicio=require("../modelos/Servicio");
var fs = require("fs").promises;
var path = require("path");
var subirArchivo1=require("../middlewares/middlewares");


async function mostrarServicio(){
    var servics = [];
    try{
        var servicios = await conexion.get();
        servicios.forEach(servicio =>{ 
            var servicio1 = new Servicio(servicio.id, servicio.data())
            if (servicio1.bandera == 0){
                servics.push(servicio1.obtenerServicio);
            }
        })
    }
    catch(err){
        console.log("Error al Recuperar Servicios: " + err); 
    }
    return servics;
}

async function nuevoServicio(newService){
    var error = 0;
    try{
        var servicio1 = new Servicio(null, newService);
        if(servicio1.bandera == 0){
            conexion.doc().set(servicio1.obtenerServicio);
            error = 0;
        }
        else{
            console.log("Datos Incorrectos");
        }
    }
    catch(err){
        console.log("Error al Crear Servicio " + err);
    }
    return error;
 }


 async function buscarPorId(id){
    var serv;
    try{
        var servicioBD = await conexion.doc(id).get();
        var servicioObjeto = new Servicio(servicioBD.id, servicioBD.data());
        if(servicioObjeto.bandera == 0){
            serv = servicioObjeto.obtenerServicio;
        }
    }
    catch(err){
        console.log("Error al Recuperar El Servicio " + err);
    }
    return serv;
 }

 async function modificarServicio(datos){
    var error = 1;
    var serv = await buscarPorId(datos.id);
    if(serv != undefined){
        var serv = new Servicio(datos.id, datos);
    
        if(serv.bandera == 0){
            try{
                await conexion.doc(serv.id).set(serv.obtenerServicio);
                console.log("Los Datos se Modificaron Correctamente");
                error = 0;
            }
            catch(error){
                console.log("Error Al Modificar Servicio " + error);      
            }
        }else{
            console.log("Error, Los Datos Son Inválidos");
        }
    }
    return error;
}

async function borrarServicio(id){
    var error = 1;
    var serv = await buscarPorId(id);
    if(serv !=undefined){
        try{
            await conexion.doc(id).delete();
            console.log("El Servicio se Borró Correctamente");
            error = 0;
    
        }
        catch(err){
            console.log("Error Al Borrar Servicio");
        }
    }return error;
 }

module.exports={
    mostrarServicio,
    nuevoServicio,
    buscarPorId,
    modificarServicio,
    borrarServicio
}