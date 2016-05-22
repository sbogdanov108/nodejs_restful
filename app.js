var express = require( 'express' ),
    mongoose = require( 'mongoose' ),
    bodyParser = require( 'body-parser' );

// подключаемся к бд
var db = mongoose.connect( 'mongodb://localhost/booksAPI' );

// подключаем модель бд
var Book = require( './models/bookModel' );

var app = express();
var port = process.env.PORT || 3000;

// парсим запросы
app.use( bodyParser.urlencoded({ extended: true }) );
app.use( bodyParser.json() );

// подключаем роуты
var bookRouter = require( './routes/booksRoutes' )( Book );

// используем созданные роуты
app.use( '/api/books', bookRouter );

/*
* app.use( '/api/authors', authorRouter );
* И т.д.
* */

app.get( '/', function( req, res )
{
  res.send( 'Велком!' );
});

// слушаем порт
app.listen( port, function()
{
  console.log( 'Running on', port, 'port' );
});