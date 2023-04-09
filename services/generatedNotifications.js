const axios = require('axios');

// Define los datos a enviar
const data = {
  username: 'usuario',
  password: 'contraseña'
};

// Configura las opciones de la petición POST
const options = {
  method: 'POST',
  url: 'https://fcm.googleapis.com/fcm/send',
  headers: {
    'Content-Type': 'application/json',
    'Authorization':''
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
