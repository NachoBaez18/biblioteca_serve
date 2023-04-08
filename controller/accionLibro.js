const AccionLibro = require("../models/accionLibro");
const {response} = require('express');
const mongoose = require('mongoose');
const moment = require('moment-timezone');


const fechaActual = moment().tz('America/Asuncion');
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
        const accionLibro = await AccionLibro.findOne({usuario:req.body.usuario,deleted_at:'N',accion:'reservado'});

        if(accionLibro.libro.length == 1){
            console.log(fechaActual);
            //Si era solamente un libro eliminamos la reserva
            accionLibro.fecha = fechaActual.format();
            accionLibro.deleted_at = 'S';
            await accionLibro.save();
        }else{
        const  elementoBuscar = mongoose.Types.ObjectId(req.body.libro);
        //!aqui vemos el indice para despues eliminar ese objeto del array
        const i = accionLibro.libro.findIndex(objeto => objeto.toString() === elementoBuscar.toString());
          if(i >= 0){
            console.log(fechaActual);
            accionLibro.fecha = fechaActual.format();
            accionLibro.libro.splice(i,1);
            await accionLibro.save();
          }else{
            res.json({
                error:true,
                mensaje:'Error al tratar de eliminar la reserva'
            });
          }
        }
        res.json({
            error:false,
            mensaje:'Libro eliminado exitosamente de la reserva'
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
const registrarOrEditar = async (req ,res = response) =>{
    try {
        const accionLibro = await AccionLibro.findOne({usuario:req.body.usuario,deleted_at:'N',accion:'reservado'});
        if(accionLibro == null){
            console.log(fechaActual);
            //!vamos a registrar un reserva
        const accion = new AccionLibro({
            accion:'reservado',
            usuario:req.body.usuario,
            libro:req.body.libro,
            fecha:fechaActual.format(),
            deleted_at:'N',
        });
        await accion.save();
        res.json({
            error:false,
            mensaje:'Reserva generada exitosamente'
        }); 
        }else{
             //!vamos agregar un libro mas a la reserva   
             const nuevoLibroIdStr = req.body.libro.toString();
             const nuevoLibroId = mongoose.Types.ObjectId(nuevoLibroIdStr);
             const contieneLibro = accionLibro.libro.includes(nuevoLibroId)
             if(contieneLibro){
                res.json({
                    error:true,
                    mensaje:'Error al reservar ya contiene en su reserva el libro seleccionado'
                });
             }else{
                console.log(fechaActual);
                accionLibro.fecha = fechaActual.format();
                accionLibro.libro.push(nuevoLibroId)
                await accionLibro.save();
                res.json({
                    error:false,
                    mensaje:'Reserva generada exitosamente'
                }); 
             }
             
        }   
        
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
    elimiarOrEditar,
    registrarOrEditar   
}