const {Router} = require('express');
const { check } = require('express-validator');
const { crearusuario, login, renewToken,UpdateUser,cambioContrasena,eliminar } = require('../controller/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();

router.post('/new',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','La contraseña es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').not().isEmpty().isEmail(),
    validarCampos
]
,crearusuario);

router.post('/',[
    check('password','La contraseña es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').not().isEmpty().isEmail(),
    validarCampos
],login);

router.get('/renew',validarJWT,renewToken);
router.post('/editar',validarJWT,UpdateUser);
router.post('/passwordNew',validarJWT,cambioContrasena);
router.post('/eliminar',validarJWT,eliminar);

module.exports = router;