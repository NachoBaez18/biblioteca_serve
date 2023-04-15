const Notification = require("../models/notifications");
const {response} = require('express');

const gets = async (req ,res = response) =>{

    try {
        const notificacion  = await Notification.find({usuario:req.body.usuario}).sort({ fecha: -1, hora: -1 });;
        res.json({
            error:false,
            notificacion 
        });  
    } catch (error) {
        console.log(error);
        res.json({
            error:true,
            mensaje_error:error,
            mensaje:'No se pudo listar las notificaciones'
        });
    }
}
const editar = async (req ,res = response) =>{

    try {
        const filtro = { uid: req.body.usuario,visto:'N' }; // Filtro para seleccionar los registros a actualizar
        const update = { visto:'S'};
        const notificacion  = await Notification.updateMany(filtro, update);
        res.json({
            error:false,
            mensaje:'Notificacion actualizada correctamente',
        });
    } catch (error) {
        console.log(error);
        res.json({
            error:true,
            mensaje_error:error,
            mensaje:'No pudo hacerce el edicion de la Accion'
        });
    }
}


module.exports = {
    gets,
    editar
}
