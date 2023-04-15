const { Schema, model} = require('mongoose');

const NotificationSchema = Schema({
    titulo:{
        type:String,
        required:true
    },
    usuario:{
        type:Schema.Types.ObjectId, 
        ref:'Usuario',
        required:true
    },
    accion:{
        type:Schema.Types.ObjectId, 
        ref:'AccionLibro',
        required:true
    },
    fecha:{
        type:String,
        required:true,
    },
    mensaje:{
        type:String,
        required:true
    },
    visto:{
        type:String,
        required:true
    }
});
NotificationSchema.method('toJSON',function(){
    const {__v,_id, ...object} = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model('Notification', NotificationSchema);