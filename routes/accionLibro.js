const {Router} = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { registrar,gets,get,editar,eliminar,elimiarOrEditar,registrarOrEditar} = require('../controller/accionLibro');


const router = Router();

router.post('/',validarJWT,gets);
router.post('/listar',validarJWT,get);
router.post('/editar',validarJWT,editar);
router.post('/eliminar',validarJWT,eliminar);
router.post('/registrar',validarJWT,registrar);
router.post('/elimiarOrEditar',validarJWT,elimiarOrEditar);
router.post('/registrarOrEditar',validarJWT,registrarOrEditar)


module.exports = router;