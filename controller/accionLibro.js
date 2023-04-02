const AccionLibro = require("../models/accionLibro");
const {response} = require('express');

const registrar = async (req ,res = response) =>{
    try {

        console.log(validateReserva);
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
    const tipoFiltro = req.body.tipoFiltro;
    try {
        if(tipoFiltro == 'accionXusuario'){
            filtro = {
                accion:req.body.accion,
                usuario:req.body.usuario,
                deleted_at:'N'
            }
        }else if(tipoFiltro == 'accion'){
            filtro = {
                accion:req.body.accion,
                deleted_at:'N'
            }
        }
        const accionLibro = await AccionLibro.find(filtro)
        .populate({ path: 'usuario', model: 'Usuario', select: '-password', options: { strictPopulate: false } })
        .populate({ path: 'libro', model: 'Libro', options: { strictPopulate: false } })
        .exec();

        res.json({
            error:false,
            accionesDeLibros:accionLibro
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
        const today = new Date().toISOString();
        await AccionLibro.updateOne({_id:req.body.uid},{
            $set:{
                fecha:today,
                deleted_at:'S',
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

const elimiarOrEditar = async (req ,res = response) =>{
    try {
        const accionLibro = await AccionLibro.find({_id:req.body.uid})

        if(accionLibro[0].libro.length == 1){
            //Si era solamente un libro eliminamos la reserva
            const today = new Date().toISOString();
            await AccionLibro.updateOne({_id:req.body.uid},{
                $set:{
                    fecha:today,
                    deleted_at:'S',
                }
            });
        }else{
            nuevoArray = accionLibro[0].libro.filter(item => item !== req.body.libro)
            const today = new Date().toISOString();
            await AccionLibro.updateOne({_id:req.body.uid},{
                $set:{
                    fecha:today,
                    libro:nuevoArray,
                }
            });
        }
        res.json({
            error:false,
            mensaje:'Libro eliminado de la reserva'
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

module.exports = {
    registrar,
    gets,
    get,
    editar,
    eliminar,
    elimiarOrEditar
}