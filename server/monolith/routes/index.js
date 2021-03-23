const TvSeriesRoute = require('./tvSeries')
const MovieRoute = require('./movie')
const router = require('express').Router()

router.get('/',(req,res)=>{
  res.status(200).json({message: 'this is entertainme server monolith'})
})
router.use('/tvseries',TvSeriesRoute)
router.use('/movies',MovieRoute)

module.exports = router