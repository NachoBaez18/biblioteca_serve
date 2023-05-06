const { response } = require('express');
const Usuario = require('../models/Usuario');

const getUsuarios = async (req, res = response) => {
    try {
        const desde = Number(req.query.desde) || 0;

        const usuarios = await Usuario
            .find({ _id: { $ne: req.uid } })
            .sort('-online')
            .skip(desde)
            .limit(20);

        res.json({
            ok: true,
            usuarios,
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el admimistrador'
        });

    }
}
const getsUsuario = async (req, res = response) => {
    try {

        const usuarios = await Usuario.find({ online: true });


        res.json({
            error: false,
            usuarios,
        })


    } catch (error) {
        console.log(error);
        res.status(200).json({
            error: true,
            usuarios: [],
            message: 'Error al listar los usuarios'
        });
    }



}

module.exports = {
    getUsuarios,
    getsUsuario
}