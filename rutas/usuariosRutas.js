var ruta=require("express").Router();
var subirArchivo=require("../middlewares/middlewares").subirArchivo
var {mostrarUsuarios, nuevoUsuario, buscarPorId, modificarUsuario, borrarUsuario,loginUsuario}=require("../bd/usuariosBD");
var {admin} = require("../middlewares/funcionesPassword");
var fs = require("fs");
var path = require("path");
const { log } = require("console");

ruta.get("/", (req,res)=>{
    
  res.render("usuario/login");
});

ruta.post("/loginUsuario", async(req,res)=>{
  var user = await loginUsuario(req.body);
  if(user === 1){
      res.redirect("/mostrarUsuario");
  }else if(user === 0){
      res.status(400).send({ error: "Contraseña no valida" });
  }else if(user === undefined){
      res.status(400).send({ error: "El usuario no existe" });
  }
});

ruta.get("/logout", (req,res)=>{
  res.render("usuario/logout");
});

ruta.get("/mostrarUsuario",async(req,res)=>{
  var users = await mostrarUsuarios();
  res.render("usuario/mostrar",{users})
});

ruta.get("/nuevoUsuario",(req,res)=>{
  res.render("usuario/nuevo");
})

ruta.post("/nuevoUsuario",subirArchivo(),async(req,res)=>{
  req.body.foto=req.file.originalname;
  var error=await nuevoUsuario(req.body);
  res.redirect("/mostrarUsuario");
});

ruta.get("/editarUsuario/:id",async(req,res)=>{
  var user=await buscarPorId(req.params.id);
  res.render("usuario/modificar",{user});
  
})

ruta.post("/editarUsuario", subirArchivo(), async(req,res)=>{
  req.body.foto = req.file.originalname;
  var error = await modificarUsuario(req.body);
  res.redirect("/mostrarUsuario");
});

ruta.get("/borrarUsuario/:id",async(req,res)=>{
  await borrarUsuario(req.params.id);
  res.redirect("/mostrarUsuario");
})





module.exports=ruta;

