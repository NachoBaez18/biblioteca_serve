
const { comprobarJWT } = require('../helpers/jwt');
const {io} = require('../index');
const {usuarioConectado, usuarioDesconectado, grabarMensaje} = require('../controller/sokect');



// const bands = new Bands();

// bands.addBand(new Band('Quenn'));
// bands.addBand(new Band('Bon Jovi'));
// bands.addBand(new Band('Héroes del silencio'));
// bands.addBand(new Band('Metalica'));


io.on('connection', (client) => {


    const [valido, uid] = comprobarJWT(client.handshake.headers['x-token']);

    ///*verificar autenticacion
    if(!valido){return client.discononnect();}
    console.log('Cliente autenticado');
     usuarioConectado(uid)

     //* Ingresar al usuario a una sala en particular
     //* Sala global
     client.join(uid);

     //! Escuchar del cliente el mensaje-personal
     client.on('mensaje-personal',async(payload)=>{
     //?grabar mensaje

      data =  await grabarMensaje(payload);
      console.log(data);

      io.to(payload.para).emit('mensaje-personal',payload);
     });

    //client.emit('active-bands',bands.getBands());
    client.on('disconnect', () => {
      
      usuarioDesconectado(uid);
      console.log('Cliente desconectado'); });


    // client.on('mensaje',(payload) => {
    //     console.log('Mensaje',payload)
    
    //     io.emit('mensaje',{admin:'Nuevo mensaje'})
    // });

    // client.on('emitir-mensaje', (payload) =>{
    //    // io.emit('nuevo-mensaje',payload); emite todos
    //    client.broadcast.emit('nuevo-mensaje',payload); // emite a todos menos al que esta emitiendoi
    // });

    // client.on('vote-band',(data)=>{
    //     bands.voteBand(data.id);
    //     io.emit('active-bands',bands.getBands());
    // });

    // client.on('add-band',(data)=>{
    //     const newBand = new Band(data.name);
    //     bands.addBand(newBand);
    //     io.emit('active-bands',bands.getBands());
    // });
   

    // client.on('delete-band',(data)=>{
    //     bands.deleteBand(data.id);
    //     io.emit('active-bands',bands.getBands());
    // });
  });