const {Router} = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { registrar,gets,get,editar,eliminar} = require('../controller/accionLibro');


const router = Router();

 router.post('/',validarJWT,gets);
 router.post('/listar',validarJWT,get);
 router.post('/editar',validarJWT,editar);
router.post('/eliminar',validarJWT,eliminar);
router.post('/registrar',validarJWT,registrar);

module.exports = router;