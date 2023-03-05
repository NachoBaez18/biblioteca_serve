const Libro = require("../models/libro");
const {response} = require('express');

const registrar = async (req ,res = response) =>{

    try {
        const carrera = new Libro({
            nombre:req.body.nombre,
            creador:req.body.creador,
            descripcion:req.body.descripcion,
            imagen:req.body.imagen,
            vistos:req.body.vistos,
            like:req.body.like,
            cantidad:req.body.cantidad
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
        const libros = await Libro.find();

        res.json({
            error:false,
            libros
        });  
    } catch (error) {
        console.log(error);
        res.json({
            error:true,
            mensaje_error:error,
            mensaje:'No se pudo listar las carreras'
        });
    }
}

const get = async (req ,res = response) =>{

    const uid = req.body.uid;

    try {
        const libro = await Libro.findById(uid);

        res.json({
            error:false,
            libro
        });  
    } catch (error) {
        console.log(error);
        res.json({
            error:true,
            mensaje_error:error,
            mensaje:'No se pudo listar las carreras'
        });
    }
}
const editar = async (req ,res = response) =>{

    try {
        await Libro.updateOne({_id:req.body.uid},{
            $set:{
                nombre:req.body.nombre,
                creador:req.body.creador,
                descripcion:req.body.descripcion,
                imagen:req.body.imagen,
                vistos:req.body.vistos,
                like:req.body.like,
                cantidad:req.body.cantidad
            }
        });
        res.json({
            error:false,
            mensaje:'Libro actualizado correctamente',
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

const eliminar = async (req ,res = response) =>{

    try {
        
        await Libro.findByIdAndDelete({_id:req.body.uid})

        res.json({
            error:false,
            mensaje:'Libro eliminado correctamente',
        });
    } catch (error) {
        console.log(error);
        res.json({
            error:true,
            mensaje_error:error,
            mensaje:'No pudo hacerce la eliminacion del Libro'
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