module.exports = function (err,req,res,next) {
  console.log(err);
  let statusCode = 500
  let message = 'Internal Server Error'

  if (err.response){
    statusCode = err.response.status
    message = err.response.data.message
  }
  
  switch (err.name) {
    case 'NotFound':
      statusCode = 404
      message = 'Not Found'
      break;
    default:
      break;
  }

  res.status(statusCode).json({message})
}