var express = require( 'express' );

var routes = function( Book )
{
  var bookRouter = express.Router();

  var bookController = require( '../controllers/bookController' )( Book );

  // создаем роут для /books
  bookRouter.route( '/' )
    .post( bookController.post )
    .get( bookController.get );

  // создаем свое middleware для этого роута
  bookRouter.use( '/:bookId', function( req, res, next )
  {
    // ищем запись в бд по ид
    Book.findById( req.params.bookId, function( err, book )
    {
      if( err )
      {
        res.status( 500 ).send( err );
        console.log( err );
      }
      else if( book )
      {
        req.book = book; // делаем доступным для дальнейшей обработки
        next(); // переходим к следующему middleware
      }
      else
        res.status( 404 ).send( 'Nothing found' );
    } );
  });

  // роут с передаваемым параметром
  bookRouter.route( '/:bookId' )
    .get( bookController.getById )
    .put( bookController.put )
    .patch( bookController.patch )
    .delete( bookController.deleteBook );

  return bookRouter;
};

module.exports = routes;