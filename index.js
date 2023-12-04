var express=require("express");
var cors=require("cors");
var path=require("path");
require("dotenv").config();
var rutasUsuarios=require("./rutas/usuariosRutas");
var rutasServicios=require("./rutas/serviciosRutas");
var rutasUsuariosApis=require("./rutas/usuariosRutasApis");
var rutasServiciosApis=require("./rutas/serviciosRutasApis")
//var session = require("cookie-session");

var app=express();
app.set("view engine","ejs");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/",express.static(path.join(__dirname,"/web")));
app.use("/",rutasUsuarios);
app.use("/",rutasServicios)
app.use("/",rutasUsuariosApis);
app.use("/",rutasServiciosApis);


var port=process.env.PORT || 3000;
app.listen(port,()=>{
    console.log("servidor en http://localhost:"+port)
});

