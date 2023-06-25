const Carrera = require("../models/Carrera");
const {response} = require('express');

const registrarCarrera = async (req ,res = response) =>{

    try {
        const carrera = new Carrera({
            nombre:req.body.nombre
        });

        await carrera.save();
        res.json({
            error:false,
            mensaje:'Carrera registrada correctamente',
        });
    } catch (error) {
        console.log(error);
        res.json({
            error:true,
            mensaje_error:error,
            mensaje:'No pudo hacerce el registro de la carrera'
        });
    }
}

const editar = async (req, res = response) => {

    try {
        await Carrera.updateOne({ _id: req.body.uid }, {
            $set: {
                nombre: req.body.nombre,
            }
        });
        res.json({
            error: false,
            mensaje: 'Carrera actualizada correctamente',
        });
    } catch (error) {
        console.log(error);
        res.json({
            error: true,
            mensaje_error: error,
            mensaje: 'No pudo hacerce la actualizacion de la carrera'
        });
    }
}

const eliminar = async (req, res = response) => {

    try {
        await Carrera.updateOne({ _id: req.body.uid }, {
            $set: {
                activo: 'N',
            }
        });
        res.json({
            error: false,
            mensaje: 'Carrera eliminada correctamente',
        });
    } catch (error) {
        console.log(error);
        res.json({
            error: true,
            mensaje_error: error,
            mensaje: 'No pudo hacerce la elimacion de la carrera'
        });
    }
}

const getCarreras = async (req ,res = response) =>{

    try {
        const carreras = await Carrera.find({activo:'S'});

        res.json({
            error:false,
            carreras
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


module.exports = {
    registrarCarrera,
    getCarreras,
    editar,
    eliminar

}