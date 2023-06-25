const Libro = require("../models/Libro");
const { response } = require('express');
const moment = require('moment-timezone');

const registrar = async (req, res = response) => {

    try {
        const carrera = new Libro({
            nombre: req.body.nombre,
            creador: req.body.creador,
            carrera: req.body.carrera,
            descripcion: req.body.descripcion,
            imagen: req.body.imagen,
            vistos: req.body.vistos,
            like: req.body.like,
            cantidad: req.body.cantidad
        });

        await carrera.save();
        res.json({
            error: false,
            mensaje: 'Libro registrado correctamente',
        });
    } catch (error) {
        console.log(error);
        res.json({
            error: true,
            mensaje_error: error,
            mensaje: 'No pudo hacerse el registro del Libro'
        });
    }
}

const gets = async (req, res = response) => {

    try {
        const libros = await Libro.find();

        res.json({
            error: false,
            libros
        });
    } catch (error) {
        console.log(error);
        res.json({
            error: true,
            mensaje_error: error,
            mensaje: 'No se pudo listar las carreras'
        });
    }
}

const get = async (req, res = response) => {

    const carrera = req.body.nombre;
    try {
        const libro = await Libro.find({ carrera: carrera });

        res.json({
            error: false,
            libros: libro
        });
    } catch (error) {
        console.log(error);
        res.json({
            error: true,
            mensaje_error: error,
            mensaje: 'No se pudo listar las carreras'
        });
    }
}
const editar = async (req, res = response) => {

    try {
        await Libro.updateOne({ _id: req.body.uid }, {
            $set: {
                nombre: req.body.nombre,
                creador: req.body.creador,
                carrera: req.body.carrera,
                descripcion: req.body.descripcion,
                imagen: req.body.imagen,
                vistos: req.body.vistos,
                like: req.body.like,
                cantidad: req.body.cantidad
            }
        });
        res.json({
            error: false,
            mensaje: 'Libro actualizado correctamente',
        });
    } catch (error) {
        console.log(error);
        res.json({
            error: true,
            mensaje_error: error,
            mensaje: 'No pudo hacerce el registro del Libro'
        });
    }
}

const eliminar = async (req, res = response) => {

    try {

        await Libro.findByIdAndDelete({ _id: req.body.uid })

        res.json({
            error: false,
            mensaje: 'Libro eliminado correctamente',
        });
    } catch (error) {
        console.log(error);
        res.json({
            error: true,
            mensaje_error: error,
            mensaje: 'No pudo hacerce la eliminacion del Libro'
        });
    }
}
const editarLibroCorazon = async (req, res = response) => {

    try {
        const fechaActual = moment().tz('America/Asuncion').toISOString();
        const id = req.body.uid;
        const usuario = req.body.usuario;
        const libro = await Libro.findById(id);

        console.log(libro);

        if (libro.like.includes(usuario)) {
            await Libro.findByIdAndUpdate(id, { $pull: { like: usuario }, fecha: fechaActual });
        } else {
            await Libro.findByIdAndUpdate(id, { $push: { like: usuario }, fecha: fechaActual });
        }
        res.json({
            error: false,
        });

    } catch (error) {
        console.log(error);
        res.json({
            error: true,
            mensaje_error: error,
            mensaje: 'No pudo hacerce la Accion'
        });
    }
}

const vistoLibro = async (req, res = response) => {
    try {
        const fechaActual = moment().tz('America/Asuncion').toISOString();
        const id = req.body.uid;
        const usuario = req.body.usuario;
        const libro = await Libro.findById(id);

        if (libro.vistos.includes(usuario)) {
        } else {
            await Libro.findByIdAndUpdate(id, { $push: { vistos: usuario }, fecha: fechaActual });
        }
        res.json({
            error: false,
        });

    } catch (error) {
        console.log(error);
        res.json({
            error: true,
            mensaje_error: error,
            mensaje: 'No pudo hacerce la Accion'
        });
    }
}


module.exports = {
    registrar,
    gets,
    get,
    editar,
    eliminar,
    editarLibroCorazon,
    vistoLibro
}