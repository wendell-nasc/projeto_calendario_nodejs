/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();



router.post(
    '/new', 
    [ // middlewares
        check('name', 'O nome é obrigatório').not().isEmpty(),
        check('email', 'O email é obrigatório').isEmail(),
        check('password', 'O password deve conter 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ],
    crearUsuario 
);

router.post(
    '/',
    [
        check('email', 'O email é obrigatório').isEmail(),
        check('password', 'O password deve conter 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ],
    loginUsuario 
);


router.get('/renew', validarJWT ,revalidarToken );




module.exports = router;