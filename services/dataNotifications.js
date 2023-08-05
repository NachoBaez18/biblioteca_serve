const AccionLibro = require("../models/accionLibro");
const Notification = require("../models/notifications");
const moment = require('moment-timezone');


const reservasExpirados = async () => {
    try {
        const fechaActual = moment().tz('America/Asuncion');
        const fechaLimite = fechaActual.subtract(1, 'minute').toISOString();
        const accionesDeLibros = await AccionLibro.findOne({ accion: 'reservado', deleted_at: 'N', fecha: { $lt: fechaLimite } })
            .populate({ path: 'usuario', model: 'Usuario', select: '-password', options: { strictPopulate: false } })
            .populate({ path: 'libro', model: 'Libro', options: { strictPopulate: false } })
            .exec();
        console.log('reservasExpirados');
        console.log(accionesDeLibros);
        if (accionesDeLibros != null) {
            await AccionLibro.updateOne({ uid: accionesDeLibros._id }, {
                $set: {
                    accion: 'cancelado',
                }
            });
        }


        respuesta = {
            error: false,
            accionesDeLibros
        }
        return respuesta;

    } catch (error) {
        console.log(error);
        respuesta = {
            error: true,
            mensaje_error: error,
            mensaje: 'No se pudo listar las acciones'
        }
        return respuesta;
    }
}
const changeStatusAccion = async (uid, titulo, mensaje) => {
    try {
        const accionesDeLibros = await AccionLibro.findOne({ uid: uid })

        accionesDeLibros.deleted_at = 'S';
        accionesDeLibros.save();
        const fechaActual = moment().tz('America/Asuncion');
        const notification = new Notification({
            accion: uid,
            usuario: accionesDeLibros.usuario,
            titulo: titulo,
            mensaje: mensaje,
            fecha: moment(fechaActual).locale('es').format('ddd DD MMM YYYY HH:mm:ss'),
            visto: 'N'
        });
        await notification.save();
        respuesta = {
            'error': false
        };
        return respuesta;

    } catch (error) {
        console.log(error);
        respuesta = {
            'error': true
        };

        return respuesta
    }
}
const devolucionExpirados = async () => {
    try {
        const fechaActual = moment().tz('America/Asuncion');
        const fechaLimite = fechaActual.subtract(1, 'minute').toISOString();
        const accionesDeLibros = await AccionLibro.find({ accion: 'entregado', deleted_at: 'N', fecha: { $lt: fechaLimite } })
            .populate({ path: 'usuario', model: 'Usuario', select: '-password', options: { strictPopulate: false } })
            .populate({ path: 'libro', model: 'Libro', options: { strictPopulate: false } })
            .exec();
        console.log('devolucionExpirados');
        console.log(accionesDeLibros);

        respuesta = {
            error: false,
            accionesDeLibros
        }
        return respuesta;

    } catch (error) {
        console.log(error);
        respuesta = {
            error: true,
            mensaje_error: error,
            mensaje: 'No se pudo listar las acciones'
        }
        return respuesta;
    }
}
const generarNotificacion = async (uid, titulo, mensaje, usuario) => {
    try {
        console.log('estamos para crear la notificacion');
        const fechaActual = moment().tz('America/Asuncion');
        const notification = new Notification({
            accion: uid,
            usuario: usuario,
            titulo: titulo,
            mensaje: mensaje,
            fecha: moment(fechaActual).locale('es').format('ddd DD MMM YYYY HH:mm:ss'),
            visto: 'N'
        });
        await notification.save();
        console.log(notification);
        respuesta = {
            'error': false
        };
        console.log(respuesta);
        return respuesta;

    } catch (error) {
        console.log(error);
        respuesta = {
            'error': true
        };

        return respuesta
    }
}
module.exports = {
    reservasExpirados,
    changeStatusAccion,
    devolucionExpirados,
    generarNotificacion,
}