const  { Schema, model} = require('mongoose');

const CarreraSchema = Schema({
    nombre:{
        type:String,
        required:true
    },
    activo:{
        type:String,
        default:'S'
    }
});

CarreraSchema.method('toJSON',function(){
    const {__v,_id,password, ...object} = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model('Carrera', CarreraSchema);