const cron = require('node-cron');
const { reservasExpirados } = require('../services/dataNotifications')
const { createNotifications } = require('../services/generatedNotifications');

//?Cron para realizar la notificacion de expiracion de reserva por no retiro
cron.schedule('*/1 * * * *', async () => {
    const response = await reservasExpirados();

    if (!response['error']) {
        response['accionesDeLibros'].forEach(data => {
            // console.log(data['usuario']['_id'].toString());
            createNotifications(data['usuario']['dispositivo'].toString(), 'Reserva Expirada', 'Lamentamos informarte que la reserva que habías generado con nosotros ha sido cancelada debido a la falta de retiro en el plazo establecido');
        });
    } else {
        console.log('Ocurrio un error en la consulta del cron');
    }

});