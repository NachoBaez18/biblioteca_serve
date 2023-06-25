const {Router} = require('express');
const { registrarCarrera,getCarreras,editar ,eliminar} = require('../controller/carrera');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post('/registrar',validarJWT,registrarCarrera);
router.get('/listar',validarJWT,getCarreras);
router.post('/editar',validarJWT,editar);
router.post('/eliminar',validarJWT,eliminar);

module.exports = router;