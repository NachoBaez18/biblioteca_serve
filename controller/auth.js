const bcryptjs = require('bcryptjs');
const {response} = require('express');
const { generarJWT } = require('../helpers/jwt');
const Usuario = require('../models/Usuario');

const crearusuario = async(req , res = response) => {
    const {email , password} = req.body;

    try {

        const existeEmail = await Usuario.findOne({email});

        if(existeEmail){
            return res.status(400).json({
                ok:false,
                msg:'El correo ya esta registrado'
            });
        }

        const usuario = new Usuario(req.body);

        //encriptar contraseña

        const salt = bcryptjs.genSaltSync();
        usuario.password = bcryptjs.hashSync(password ,salt);

        await usuario.save();

        // Generar mi JWT

        const token = await generarJWT(usuario.id);
     
         res.json({
             ok:true,
             usuario,
             token
         })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Hable con el admimistrador'
        });
        
    }
}

const login = async(req , res = response) => {

    const {email , password,divice} = req.body;

    try {
        const usuarioDB = await Usuario.findOne({email});
        if(!usuarioDB){
            return res.status(404).json({
                ok:false,
                msg:'Email no encontrado'
            });
        }

        //validar password

        const validarPassword = bcryptjs.compareSync(password , usuarioDB.password);

        if(!validarPassword) {

            return res.status(404).json({
                ok:false,
                msg:'Contraseña no valida'
            });
        }
        //verificamos si el divice es el mismo y si no le asignamos uno nuevo
        if(usuarioDB.dispositivo == null || usuarioDB.dispositivo != divice ){
            usuarioDB.dispositivo = divice;
        }
        //Generar token
        const token = await generarJWT(usuarioDB.id);
        usuarioDB.save();
        res.json({
            ok:true,
            usuario:usuarioDB,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Hable con el admimistrador'
        });
        
    }
}

const renewToken = async(req, res = response) =>{

    const uid = req.uid;

    const token = await generarJWT(uid);

    const usuario = await Usuario.findById(uid);

    res.json({
        ok:true,
        usuario,
        token
    });

}

const cambioContrasena = async(req,res = response) => {

    const uid = req.body.uid;
    const password = req.body.password;
    const passwordNew = req.body.passwordNew;

    try {
        const usuarioDB = await Usuario.findOne({_id:uid});
        if(!usuarioDB){
            return res.status(200).json({
                error:true,
                mensaje:'Usuario no encontrado'
            });
        }
        //validar password
        const validarPassword = bcryptjs.compareSync(password , usuarioDB.password);

        if(!validarPassword) {
            return res.json({
                error:true,
                mensaje:'Contraseña no valida'
            });
        }
        const salt = bcryptjs.genSaltSync();
        usuarioDB.password =  bcryptjs.hashSync(passwordNew ,salt);
        usuarioDB.save();
        const token = await generarJWT(usuarioDB.id);

        res.json({
            error:false,
            mensaje:'Contraseña actualizada existosamente',
            usuario:usuarioDB,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            error:false,
            mensaje: 'Hable con el admimistrador'
        });
        
    }
}

const UpdateUser = async(req,res = response) => {


    const {uid,nombre,telefono,email} = req.body;

    try {
        const usuarioDB = await Usuario.findOne({uid});
        if(!usuarioDB){
            return res.json({
                error:true,
                mensaje:'Usuario no encontrado'
            });
        }

        usuarioDB.nombre = nombre;
        usuarioDB.telefono = telefono;
        usuarioDB.email = email;

        await usuarioDB.save();

        res.json({
            error:false,
            usuario:usuarioDB,
            mensaje:'Usuario actualizado exitosamente'
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            error:true,
            mensaje: 'Hable con el admimistrador'
        });
        
    }

}

module.exports = {
    crearusuario,
    login,
    renewToken,
    cambioContrasena,
    UpdateUser
}