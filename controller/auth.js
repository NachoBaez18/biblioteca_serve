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

    const {email , password} = req.body;

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

        //Generar token
        const token = await generarJWT(usuarioDB.id);

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

module.exports = {
    crearusuario,
    login,
    renewToken
}