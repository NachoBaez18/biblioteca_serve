const AccionLibro = require("../models/accionLibro");
const Libro = require("../models/Libro");
const { response } = require('express');
const mongoose = require('mongoose');
const moment = require('moment-timezone');


const fechaActual = moment().tz('America/Asuncion');
const registrar = async (req, res = response) => {
    try {

        const carrera = new AccionLibro({
            accion: req.body.accion,
            usuario: req.body.usuario,
            libro: req.body.libro,
            fecha: req.body.fecha,
            deleted_at: 'N',
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
            mensaje: 'No pudo hacerce el registro del Libro'
        });
    }
}
const gets = async (req, res = response) => {

    try {
        const fechaActual = moment().tz('America/Asuncion');
        const fechaLimite = fechaActual.subtract(3, 'days').toISOString();

        const accionesDeLibros = await AccionLibro.find({ deleted_at: 'N', fecha: { $lt: fechaLimite }, accion: "entregado" })
            .populate({ path: 'usuario', model: 'Usuario', select: '-password', options: { strictPopulate: false } })
            .populate({ path: 'libro', model: 'Libro', options: { strictPopulate: false } })
            .exec();


        res.json({
            error: false,
            accionesDeLibros
        });
    } catch (error) {
        console.log(error);
        res.json({
            error: true,
            mensaje_error: error,
            mensaje: 'No se pudo listar las acciones'
        });
    }
}

const get = async (req, res = response) => {
    const tipoFiltro = req.body.tipoFiltro;
    const accion = req.body.accion;
    //const fechaActual = moment().tz('America/Asuncion');
    //const fechaLimite = fechaActual.subtract(3, 'days').toISOString();
    try {
        if (tipoFiltro == 'accionXusuario') {
            if (accion == 'entregado') {
                filtro = {
                    accion: req.body.accion,
                    usuario: req.body.usuario,
                    // fecha:{ $lt: fechaLimite },

                    deleted_at: 'N'
                }
            } else {
                filtro = {
                    accion: req.body.accion,
                    usuario: req.body.usuario,
                    deleted_at: 'N'
                }
            }

        } else if (tipoFiltro == 'accion') {
            filtro = {
                accion: req.body.accion,
                deleted_at: 'N'
            }
        }
        const accionLibro = await AccionLibro.find(filtro)
            .populate({ path: 'usuario', model: 'Usuario', select: '-password', options: { strictPopulate: false } })
            .populate({ path: 'libro', model: 'Libro', options: { strictPopulate: false } })
            .exec();

        res.json({
            error: false,
            accionesDeLibros: accionLibro
        });
    } catch (error) {
        console.log(error);
        res.json({
            error: true,
            mensaje_error: error,
            mensaje: 'No se pudo listar las acciones'
        });
    }
}
const editar = async (req, res = response) => {

    try {
        const fechaActual = moment().tz('America/Asuncion').toISOString();
        const accionLibro = await AccionLibro.findOneAndUpdate({ _id: req.body.uid }, { accion: req.body.accion, fecha: fechaActual }, { new: true });
        res.json({
            error: false,
            mensaje: "Accion realizada existosamente accion: " + req.body.accion
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


const eliminar = async (req, res = response) => {

    try {
        const fechaActual = moment().tz('America/Asuncion').toISOString();
        await AccionLibro.updateOne({ _id: req.body.uid }, {
            $set: {
                fecha: fechaActual,
                deleted_at: 'S',
            }
        });

        res.json({
            error: false,
            mensaje: 'Accion eliminada correctamente',
        });
    } catch (error) {
        console.log(error);
        res.json({
            error: true,
            mensaje_error: error,
            mensaje: 'No pudo hacerce la eliminacion de la Accion'
        });
    }
}

const elimiarOrEditar = async (req, res = response) => {
    try {
        const accionLibro = await AccionLibro.findOne({ usuario: req.body.usuario, deleted_at: 'N', accion: 'reservado' });

        if (accionLibro.libro.length == 1) {
            console.log(fechaActual);
            //Si era solamente un libro eliminamos la reserva
            accionLibro.fecha = fechaActual.format();
            accionLibro.deleted_at = 'S';
            await accionLibro.save();
        } else {
            const elementoBuscar = mongoose.Types.ObjectId(req.body.libro);
            //!aqui vemos el indice para despues eliminar ese objeto del array
            const i = accionLibro.libro.findIndex(objeto => objeto.toString() === elementoBuscar.toString());
            if (i >= 0) {
                console.log(fechaActual);
                accionLibro.fecha = fechaActual.format();
                accionLibro.libro.splice(i, 1);
                await accionLibro.save();
            } else {
                res.json({
                    error: true,
                    mensaje: 'Error al tratar de eliminar la reserva'
                });
            }
        }
        res.json({
            error: false,
            mensaje: 'Libro eliminado exitosamente de la reserva'
        });
    } catch (error) {
        console.log(error);
        res.json({
            error: true,
            mensaje_error: error,
            mensaje: 'No se pudo listar las acciones'
        });
    }
}
const registrarOrEditar = async (req, res = response) => {
    try {
        const accionLibro = await AccionLibro.findOne({ usuario: req.body.usuario, deleted_at: 'N' }).sort({ fecha: -1 });
        if (accionLibro == null || accionLibro.accion == 'devuelto') {
            console.log(fechaActual);
            //!vamos a registrar un reserva
            const accion = new AccionLibro({
                accion: 'reservado',
                usuario: req.body.usuario,
                libro: req.body.libro,
                fecha: fechaActual.format(),
                deleted_at: 'N',
            });
            await accion.save();
            res.json({
                error: false,
                mensaje: 'Reserva generada exitosamente'
            });
        } else if (accionLibro.accion == 'reservado') {
            //!vamos agregar un libro mas a la reserva   
            const nuevoLibroIdStr = req.body.libro.toString();
            const nuevoLibroId = mongoose.Types.ObjectId(nuevoLibroIdStr);
            const contieneLibro = accionLibro.libro.includes(nuevoLibroId)
            if (contieneLibro) {
                res.json({
                    error: true,
                    mensaje: 'Error al reservar ya contiene en su reserva el libro seleccionado'
                });
            } else {
                console.log(fechaActual);
                accionLibro.fecha = fechaActual.format();
                accionLibro.libro.push(nuevoLibroId)
                await accionLibro.save();
                res.json({
                    error: false,
                    mensaje: 'Reserva generada exitosamente'
                });
            }

        } else if (accionLibro.accion == 'entregado') {
            res.json({
                error: true,
                mensaje: 'Lamentablemente, no es posible realizar una reserva en este momento debido a que aún tiene una entrega pendiente. Una vez que se haya completado, podrá hacer una reserva sin problema.'
            });
        }

    } catch (error) {
        console.log(error);
        res.json({
            error: true,
            mensaje_error: error,
            mensaje: 'No se pudo listar las acciones'
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
    registrarOrEditar,
}