const AccionLibro = require("../models/accionLibro");
const {response} = require('express');

const registrar = async (req ,res = response) =>{
    try {
        const carrera = new AccionLibro({
            accion:req.body.accion,
            usuario:req.body.usuario,
            libro:req.body.libro,
            fecha:req.body.fecha,
            deleted_at:'N',
        });

        await carrera.save();
        res.json({
            error:false,
            mensaje:'Libro registrado correctamente',
        });
    } catch (error) {
        console.log(error);
        res.json({
            error:true,
            mensaje_error:error,
            mensaje:'No pudo hacerce el registro del Libro'
        });
    }
}

const gets = async (req ,res = response) =>{

    try {
        const accionesDeLibros  = await AccionLibro.find({deleted_at:'N'})
        .populate({ path: 'usuario', model: 'Usuario', select: '-password', options: { strictPopulate: false } })
        .populate({ path: 'libro', model: 'Libro', options: { strictPopulate: false } })
        .exec();


        res.json({
            error:false,
            accionesDeLibros 
        });  
    } catch (error) {
        console.log(error);
        res.json({
            error:true,
            mensaje_error:error,
            mensaje:'No se pudo listar las acciones'
        });
    }
}

const get = async (req ,res = response) =>{

    const accion = req.body.accion;
    const usuario = req.body.usuario;
    try {
        const accionLibro = await AccionLibro.find({accion:accion,usuario:usuario,deleted_at:'N'})
        .populate({ path: 'usuario', model: 'Usuario', select: '-password', options: { strictPopulate: false } })
        .populate({ path: 'libro', model: 'Libro', options: { strictPopulate: false } })
        .exec();

        res.json({
            error:false,
            libros:accionLibro
        });  
    } catch (error) {
        console.log(error);
        res.json({
            error:true,
            mensaje_error:error,
            mensaje:'No se pudo listar las acciones'
        });
    }
}
const editar = async (req ,res = response) =>{

    try {
        await AccionLibro.updateOne({_id:req.body.uid},{
            $set:{
                accion:req.body.accion,
                usuario:req.body.usuario,
                libro:req.body.libro,
                fecha:req.body.fecha,
            }
        });
        res.json({
            error:false,
            mensaje:'Accion actualizada correctamente',
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

const eliminar = async (req ,res = response) =>{

    try {
        
        await AccionLibro.updateOne({_id:req.body.uid},{
            $set:{
                fecha:req.body.fecha,
                deleted_at:req.body.deleted_at,
            }
        });

        res.json({
            error:false,
            mensaje:'Accion eliminada correctamente',
        });
    } catch (error) {
        console.log(error);
        res.json({
            error:true,
            mensaje_error:error,
            mensaje:'No pudo hacerce la eliminacion de la Accion'
        });
    }
}


module.exports = {
    registrar,
    gets,
    get,
    editar,
    eliminar
}