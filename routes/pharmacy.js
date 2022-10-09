const router = require('express').Router();
const pharmacyController = require('../controllers/pharmacy');
const jwtMiddleware = require('../middlewares/jwt_middleware');

router.get('/:city',jwtMiddleware,pharmacyController.get);

module.exports = router;
