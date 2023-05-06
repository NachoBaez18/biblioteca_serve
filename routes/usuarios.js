const {Router} = require('express');
const { getUsuarios,getsUsuario } = require('../controller/usuarios');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/',validarJWT,getUsuarios);
router.post('/listar',validarJWT,getsUsuario)

module.exports = router;