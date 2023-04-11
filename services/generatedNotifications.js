const axios = require('axios');



const createNotifications = async (id_dispositivo, titulo, mensaje) => {

  // Define los datos a enviar
  const data = {
    "notification": {
      "body": mensaje,
      "title": titulo
    },
    "to": id_dispositivo
  }

  // Configura las opciones de la petición POST
  const options = {
    method: 'POST',
    url: 'https://fcm.googleapis.com/fcm/send',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'key=AAAA5F8R6dc:APA91bF56OVT301ZNCTPwy8BiSoKlS1ByGjn9kR3ZKIy-ohNdI2U33nUyBGWX9sWu_fuyIDK7b6IGgAkyCUN_7HHfK8BL2XMLMJMLq4RcXa3UJ_Py3PSKK4Caychi7O3mI6v_6imkRxR'
    },
    data: data
  };

  // Hace la petición POST usando Axios
  axios(options)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });

}

module.exports = {
  createNotifications
}

