const  { Schema, model} = require('mongoose');

const LibroSchema = Schema({
    nombre:{
        type:String,
        required:true
    },
    creador:{
        type:String,
        required:true
    },
    descripcion:{
        type:String,
        required:true,
    },
    imagen:{
        type:String,
        required:true,
    },
    vistos:{
        type:int,
    },
    like:{
        type:int,
    },
    cantidad:{
        type:int
    }
});

LibroSchema.method('toJSON',function(){
    const {__v,_id, ...object} = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model('Libro', UsuarioSchema);