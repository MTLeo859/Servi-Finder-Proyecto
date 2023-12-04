var ruta1=require("express").Router();
var subirArchivo1=require("../middlewares/middlewares").subirArchivo1
var {mostrarServicio, nuevoServicio, buscarPorId, modificarServicio, borrarServicio}=require("../bd/servicioBD");
const Servicio = require("./serviciosRutasApis");




ruta1.get("/",async(req,res)=>{
  var service=await mostrarServicio();
  console.log(service);
  //res.end();
  res.render("servicios/mostrar",{service});
    

});

ruta1.get("/servicios/mostrar",async (req,res)=>{
  var services = await mostrarServicio();
  res.render("servicios/mostrar", {services});
})

ruta1.get("/servicios/nuevo",(req,res)=>{
  res.render("servicios/nuevo");
})

ruta1.post("/servicio/nuevoServicio", subirArchivo1(), async(req,res)=>{
  req.body.foto = req.file.originalname;
  var error = await nuevoServicio(req.body);
  res.redirect("/servicios/mostrar");
});

ruta1.get("/servicio/editarServicio/:id",async(req,res)=>{
  var service=await buscarPorId(req.params.id);
  res.render("servicios/modificar",{service});
  
})

ruta1.post("/servicio/editarServicio",subirArchivo1(),async (req,res)=>{
  req.body.foto=req.file.originalname;
  var error=await modificarServicio(req.body);
  res.redirect("/servicios/mostrar");

})

ruta1.get("/servicio/borrarServicio/:id",async(req,res)=>{
  await borrarServicio(req.params.id);
  res.redirect("/servicios/mostrar");
})

module.exports=ruta1;