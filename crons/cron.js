const cron = require('node-cron');
const { librosNoEntregadosFecha } = require('../services/dataNotifications')
const { avisoEntregaLibro } = require('../sockets/socketNotification');


cron.schedule('*/10 * * * * *', async () => {
    const response = await librosNoEntregadosFecha();

    if (!response['error']) {
        response['accionesDeLibros'].forEach(data => {
           // console.log(data['usuario']['_id'].toString());
            avisoEntregaLibro(data['usuario']['_id'].toString())
        });
    } else {
        console.log('Ocurrio un error en la consulta del cron');
    }

});