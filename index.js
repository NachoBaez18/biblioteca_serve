const express = require('express');

require('dotenv').config();
//todo: DB config

const {dbConnection} = require('./database/config');
dbConnection();

// todo: Lectura y parceo del body
const app = express();
app.use(express.json());

const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');

const path = require('path');
const { Socket } = require('socket.io');


const publicPath = path.resolve(__dirname,'public');
app.use(express.static(publicPath));

// todo: Mis rutas
app.use('/api/login',require('./routes/auth'));
app.use('/api/usuarios',require('./routes/usuarios'));
app.use('/api/mensajes',require('./routes/mensajes'));
app.use('/api/carreras',require('./routes/carreras.js'));
app.use('/api/libros',require('./routes/libros.js'));


server.listen(process.env.PORT || 3000, (err) => {
if(err) throw new Error(err);

console.log('Servidor corriendo en puerto', process.env.PORT);
});

