const {io} = require('../index');

function sendNotification1(uid, data) {
  io.to(uid).emit('notificacion1', data);
}
  
function sendNotification2(uid, data) {
  io.to(uid).emit('notificacion2', data);
}

io.on('connection', (socket) => {
  console.log(`Un cliente se ha conectado: ${socket.id}`);
  
  socket.on('disconnect', () => {
    console.log(`El cliente ${socket.id} se ha desconectado`);
  });
});

module.exports = { sendNotification1, sendNotification2 };

