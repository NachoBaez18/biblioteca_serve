const  { Schema, model} = require('mongoose');

const AccionLibroSchema = Schema({
    accion:{
        type:String,
        required:true
    },
    usuario:{
        type:mongoose.Schema.Types.ObjectId, ref: 'Usuario',
        required:true
    },
    libro:{
        type:mongoose.Schema.Types.ObjectId, ref: 'Libro',
        required:true
    },
    fecha:{
        type:String,
        required:true,
    },
});

AccionLibroSchema.method('toJSON',function(){
    const {__v,_id, ...object} = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model('AccionLibro', AccionLibroSchema);