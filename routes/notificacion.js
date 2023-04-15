const {Router} = require('express');
const { gets,editar } = require('../controller/notification');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post('/listar',validarJWT,gets);
router.post('/editar',validarJWT,editar);

module.exports = router;