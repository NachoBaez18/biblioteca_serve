const  { Schema, model} = require('mongoose');

const UsuarioSchema = Schema({
    nombre:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    tipo:{
        type:String,
        required:true
    },
    telefono:{
        type:String,
        required:false
    },
    carrera:{
        type:String,
        required:true
    },
    dispositivo:{
        type:String,
        required:false
    },
    semestre:{
        type:String,
        required:false
    },
    online:{
        type:Boolean,
        default:true
    },
});

UsuarioSchema.method('toJSON',function(){
    const {__v,_id,password, ...object} = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model('Usuario', UsuarioSchema);