var ruta=require("express").Router();
var {mostrarServicio, nuevoServicio, buscarPorId, modificarServicio, borrarServicio}=require("../bd/servicioBD");
const Servicio = require("../modelos/Servicio");

ruta.get("/api/Servicio",async(req,res)=>{
  var services=await mostrarServicio();
  if(services.length>0){
    res.status(200).json(services);

  }
  else{
    res.status(400).json("Servicios no encontrados")
  }
  
 
    

});


ruta.post("/api/nuevoservicio",async(req,res)=>{
  var error=await nuevoServicio(req.body);
  if(error==0){
    res.status(200).json("Servicios registrado correctamente");

  }
  else{
    res.status(400).json("error al registrar Servicios");
  }


});


ruta.get("/api/buscarServicioPorId/:id",async(req,res)=>{
  var product=await buscarPorId(req.params.id);
  //res.end();
  if(product!=undefined){
    res.status(200).json(product);
  }

  else{
    res.status(400).json("servicio no encontrado");
  }
});


ruta.post("/api/editarServicio",async (req,res)=>{
  var error=await modificarServicio(req.body);
  if(error==0){
    res.status(200).json("Servicio  actualizado correctamente")

  }
 
  else{
   res.status(400).json("Error al actualizar el servicio")
  }

})

ruta.get("/api/borrarServicio/:id",async(req,res)=>{
  var error=await borrarServicio(req.params.id);
   if(error==0){
    res.status(200).json("servicio borrado");


  }
  else{
    res.status(400).json("error al borrar servicio");
  }
})


module.exports=ruta;