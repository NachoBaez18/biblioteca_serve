const {Router} = require('express');
const { registrarCarrera,getCarreras } = require('../controller/carrera');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post('/registrar',validarJWT,registrarCarrera);
router.get('/listar',validarJWT,getCarreras);

module.exports = router;