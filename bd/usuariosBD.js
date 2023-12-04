var conexion=require("./conexion").conexionUsuarios;
var Usuario=require("../modelos/Usuario");
var fs = require("fs").promises;
var path = require("path");
const { log } = require("console");

var {generarPassword, validarPassword} = require("../middlewares/funcionesPassword");

async function loginUsuario(datos){
    var user;
    var usuarioBd = await conexion.where("usuario","==",datos.usuario).get();
    console.log(usuarioBd);
    if(usuarioBd.empty){
        console.log("usuario no existe");
        return user;
    }
    return user;
}

async function mostrarUsuarios(){
    var users = [];
    try{
        var usuarios = await conexion.get();
        usuarios.forEach(usuario =>{ 
            var usuario1 = new Usuario(usuario.id, usuario.data())
            if (usuario1.bandera == 0){
                users.push(usuario1.obtenerUsuario);
            }
        })
    }
    catch(err){
        console.log("Error al Recuperar Usuarios: " + err); 
    }
    return users;
}

async function nuevoUsuario(datos){
    var error=1;
    var {salt,hash} = generarPassword(datos.password);
    datos.salt=salt;
    datos.password=hash;
    try{
        var usuario1 = new Usuario(null,datos);
        if(usuario1.bandera==0){
            conexion.doc().set(usuario1.obtenerUsuario);
            error=0;
        }else{
            console.log("datos de usuario incorrectos");
        }
    }catch(err){
        console.log("Error al crear nuevo usuario "+err);
    }
    return error;
}

async function buscarPorId(id){
    var user;
    try{
        var usuarioBD = await conexion.doc(id).get();
        var usuarioObjeto = new Usuario(usuarioBD.id, usuarioBD.data());
        if(usuarioObjeto.bandera == 0){
            user = usuarioObjeto.obtenerUsuario;
        }
    }
    catch(err){
        console.log("Error al Recuperar El Usuario " + err);
    }
    return  user;
 }


async function borrarUsuario(id){
    var error = 1;
    var user = await buscarPorId(id);
    if(user !=undefined){
        try{
            await conexion.doc(id).delete();
            console.log("El Usuario se Borró Correctamente");
            error = 0;
        }
        catch(err){
            console.log("Error Al Borrar Usuario");
        }
    }return error;
 }

 async function modificarUsuario(datos){
    var error = 1;
    var user = await buscarPorId(datos.id);
    if(user != undefined){
        var user = new Usuario(datos.id, datos);
    
        if(user.bandera == 0){
            try{
                await conexion.doc(user.id).set(user.obtenerUsuario);
                console.log("Los Datos se Modificaron Correctamente");
                error = 0;
            }
            catch(error){
                console.log("Error Al Modificar Usuario " + error);      
            }
        }else{
            console.log("Error, Los Datos Son Inválidos");
        }
    }
    return error;
}

  


module.exports={
    mostrarUsuarios,
    nuevoUsuario,
    buscarPorId,
    modificarUsuario,
    borrarUsuario,
    loginUsuario
}