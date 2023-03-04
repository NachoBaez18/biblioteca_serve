const Carrera = require("../models/carrera");
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

const getCarreras = async (req ,res = response) =>{

    try {
        const carreras = await Carrera.find();

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
    getCarreras
}