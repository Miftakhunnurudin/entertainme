const TvSeriesRoute = require('./tvSeries')
const MovieRoute = require('./movie')
const router = require('express').Router()
const errHandler = require('../middlewares/errHandler')
const EntertainmeController = require('../controllers/EntertainmeController')

router.get('/',(req,res)=>{
  res.status(200).json({message: 'this is entertainme server monolith'})
})

router.get('/entertainme',EntertainmeController.get)
router.use('/series',TvSeriesRoute)
router.use('/movies',MovieRoute)
router.use(errHandler)

module.exports = router