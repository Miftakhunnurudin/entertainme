const MovieController = require('../controllers/MovieController')
const router = require('express').Router()
const errHandler = require('../middlewares/errHandler')

router.get('/',MovieController.getAll)
router.get('/:id',MovieController.getOne)
router.post('/',MovieController.create)
router.put('/:id',MovieController.update)
router.delete('/:id',MovieController.delete)

router.use(errHandler)

module.exports = router