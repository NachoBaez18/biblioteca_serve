const {Router} = require('express');
const { gets, get, registrar, editar, eliminar,editarLibroCorazon,vistoLibro } = require('../controller/libro');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post('/',validarJWT,gets);
router.post('/listar',validarJWT,get);
router.post('/registrar',validarJWT,registrar);
router.post('/editar',validarJWT,editar);
router.post('/eliminar',validarJWT,eliminar);
router.post('/editarLibroCorazon',validarJWT,editarLibroCorazon);
router.post('/vistoLibro',validarJWT,vistoLibro)

module.exports = router;