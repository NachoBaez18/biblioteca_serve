const { Schema, model} = require('mongoose');

const AccionLibroSchema = Schema({
    accion:{
        type:String,
        required:true
    },
    usuario:{
        type:Schema.Types.ObjectId, 
        ref:'Usuario',
        required:true
    },
    libro:{
        type:[Schema.Types.ObjectId], 
        ref:'Libro',
        required:true
    },
    fecha:{
        type:String,
        required:true,
    },
    deleted_at:{
        type:String,
        required:true
    }
    
});
AccionLibroSchema.method('toJSON',function(){
    const {__v,_id, ...object} = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model('AccionLibro', AccionLibroSchema);