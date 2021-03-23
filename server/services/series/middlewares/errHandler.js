module.exports = function (err,req,res,next) {
  console.log(err.name);
  let statusCode = 500
  let message = 'Internal Server Error'

  switch (err.name) {
    case 'NotFound':
      statusCode = 404
      message = 'Series Not Found'
      break;  
    case 'Error':
      if (err.message === 'Argument passed in must be a single String of 12 bytes or a string of 24 hex characters'){
        statusCode = 404
        message = 'Series Not Found'
      }
    default:
      break;
  }
  res.status(statusCode).json({message})
}