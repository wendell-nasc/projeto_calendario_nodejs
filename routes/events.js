/*
    Event Routes
    /api/events
*/
const { Router } = require('express');
const { check } = require('express-validator');

const { isDate } = require('../helpers/isDate');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');

const router = Router();

// Todas tienes que pasar por la validación del JWT
router.use( validarJWT );


// Obtener eventos 
router.get('/', getEventos );

// Crear un nuevo evento
router.post(
    '/',
    [
        check('title','O titulo é obrigatório').not().isEmpty(),
        check('start','Data de inicio é obrigatória').custom( isDate ),
        check('end','Data de finalização é obrigatória').custom( isDate ),
        validarCampos
    ],
    crearEvento 
);

// Actualizar Evento
router.put(
    '/:id', 
    [
        check('title','O titulo é obrigatório').not().isEmpty(),
        check('start','Data de inicio é obrigatória').custom( isDate ),
        check('end','Data de finalização é obrigatória').custom( isDate ),
        validarCampos
    ],
    actualizarEvento 
);

// Borrar evento
router.delete('/:id', eliminarEvento );

module.exports = router;