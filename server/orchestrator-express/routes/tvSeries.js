const TVSeriesController = require('../controllers/TVSeriesController')
const router = require('express').Router()

router.get('/',TVSeriesController.getAll)
router.get('/:id',TVSeriesController.getOne)
router.post('/',TVSeriesController.create)
router.put('/:id',TVSeriesController.update)
router.delete('/:id',TVSeriesController.delete)

module.exports = router