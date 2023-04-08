const AccionLibro = require("../models/accionLibro");
const moment = require('moment-timezone');


const librosNoEntregadosFecha = async () =>{
    try {
        const fechaActual = moment().tz('America/Asuncion');
        const fechaLimite = fechaActual.subtract(1, 'minute').toISOString();
        const accionesDeLibros = await AccionLibro.find({ accion:'reservado',deleted_at:'N' , fecha: { $lt: fechaLimite } })
        .populate({ path: 'usuario', model: 'Usuario', select: '-password', options: { strictPopulate: false } })
        .populate({ path: 'libro', model: 'Libro', options: { strictPopulate: false } })
        .exec();

        respuesta = {
            error:false,
            accionesDeLibros
        } 
        return respuesta;
      
    } catch (error) {
        
        respuesta = {
            error:true,
            mensaje_error:error,
            mensaje:'No se pudo listar las acciones'
        }
        return respuesta;
    }
}
module.exports = {
    librosNoEntregadosFecha  
}