var bookController = function( Book )
{
  var post = function( req, res )
  {
    var book = new Book( req.body ); // создаем новую запись для бд

    if( !req.body.title )
    {
      res.status( 400 );
      res.send( 'Title is required' );
    }
    else
    {
      book.save();
      res.status( 201 ); // статус 201 - создано
      res.send( book );
    }
  };

  var get = function( req, res )
  {
    // поисковый запрос /api/books?genre=fantasy
    var query = {};

    if( req.query.genre )
      query.genre = req.query.genre;

    Book.find( query, function( err, books )
    {
      if( err )
      {
        res.status( 500 ).send( err );
        console.log( err );
      }
      else
      {
        // создаем новый массив объектов, чтобы избежать конфликтов с Mongo моделью
        var returnBooks = [];

        books.forEach( function( element, index, array )
        {
          var newBook = element.toJSON();

          // создаем hypermedia ссылки для нашего api
          newBook.links = {};
          newBook.links.self = 'http://' + req.headers.host + '/api/books/' + newBook._id;

          returnBooks.push( newBook );
        });

        res.json( returnBooks );
      }
    } );
  };

  var getById = function( req, res )
  {
    var returnBook = req.book.toJSON();

    // создаем hypermedia ссылки для нашего api
    returnBook.links                   = {};
    returnBook.links.filterByThisGenre = encodeURI( 'http://' + req.headers.host + '/api/books?genre=' + returnBook.genre );

    res.json( returnBook );
  };

  var put = function( req, res )
  {
    // полностью обновляем данные найденной книги
    req.book.title  = req.body.title;
    req.book.author = req.body.author;
    req.book.genre  = req.body.genre;
    req.book.read   = req.body.read;

    req.book.save( function( err )
    {
      if( err )
      {
        res.status( 500 ).send( err );
        console.log( err );
      }
      else
        res.json( req.book );
    } );
  };
  
  var patch = function( req, res )
  {
    // удаляем ид, чтобы не смущать монгу
    if( req.body._id )
      delete req.body._id;

    // обновляем только измененные данные
    for( var part in req.body )
    {
      if( req.body.hasOwnProperty( part ) )
        req.book[ part ] = req.body[ part ];
    }

    req.book.save( function( err )
    {
      if( err )
      {
        res.status( 500 ).send( err );
        console.log( err );
      }
      else
        res.json( req.book );
    } );
  };
  
  var deleteBook = function( req, res )
  {
    // удаляем найденную книгу
    req.book.remove( function( err )
    {
      if( err )
      {
        res.status( 500 ).send( err );
        console.log( err );
      }
      else
        res.status( 204 ).send( 'Removed' ); // 204 - нет содержимого
    } );
  };

  return {
    post: post,
    get: get,
    getById: getById,
    put: put,
    patch: patch,
    deleteBook: deleteBook
  }
};

module.exports = bookController;