var crypto = require("crypto");
const { log } = require("console");

function validarPassword(password, hash){
    var hashNuevo = crypto.scryptSync(password, 100000, 64, 'sha512').toString("hex")
    return hashNuevo === hash;
}



function generarPassword(password){
    var salt = crypto.randomBytes(32).toString("hex")
    var hash = crypto.scryptSync(password, salt, 100000, 64, 'sha512').toString("hex")
    return {
        salt,
        hash
    }
}
module.exports = {
    generarPassword,
    validarPassword

}