const cron = require('node-cron');
const { reservasExpirados, changeStatusAccion,generarNotificacion,devolucionExpirados } = require('../services/dataNotifications')
const { createNotifications } = require('../services/generatedNotifications');

//?Cron para realizar la notificacion de expiracion de reserva por no retiro
cron.schedule('*/1 * * * *', async () => {
    console.log('Inicio cron que chequea las reservas que no se retiraron a su tiempo');
    const response = await reservasExpirados();
    const titulo = 'Reserva Expirada';
    const mensaje = 'Lamentamos informarte que la reserva que habías generado con nosotros ha sido cancelada debido a la falta de retiro en el plazo establecido';
    if (!response['error']) {
        if (response['accionesDeLibros'].length != 0) {
            for (const data of response['accionesDeLibros']) {
               // await createNotifications(data['usuario']['dispositivo'].toString(), titulo, mensaje);
               // await changeStatusAccion(data['_id'], titulo, mensaje);
            };
        } else {
            console.log('No se encontro ningun registro para notificar');
        }
        console.log('Cron fonalizado');
    } else {
        console.log('Ocurrio un error en la consulta del cron');
    }

});
//?Cron para realizar la notificacion de que se debe de entregar el libro
cron.schedule('*/1 * * * *', async () => {
    console.log('Inicio cron que chequea las devoluciones de los libros en  tiempo');
    const response = await devolucionExpirados();
    const titulo = '¡Devolución pendiente!';
    const mensaje = 'Tu fecha de entrega de libro ha pasado. Por favor, regresa el libro a la biblioteca para que otros puedan utilizarlo. ¡Gracias!';
    if (!response['error']) {
        if (response['accionesDeLibros'].length != 0) {
            for (const data of response['accionesDeLibros']) {
              //  await createNotifications(data['usuario']['dispositivo'].toString(), titulo, mensaje);
              //  await generarNotificacion(data['_id'], titulo, mensaje,data['usuario']['_id']);
            };
        } else {
            console.log('No se encontro ningun registro para notificar');
        }
        console.log('Cron fonalizado');
    } else {
        console.log('Ocurrio un error en la consulta del cron');
    }

});

