var gulp = require( 'gulp' ),
    nodemon = require( 'gulp-nodemon' );

gulp.task( 'default', function()
{
  // рестарт сервера при изменении кода
  nodemon({
    script: 'app.js',
    ext: 'js',
    env: {
      PORT: 8000
    },
    ignore: [ './node_modules/**' ]
  })
    .on( 'restart', function()
    {
      console.log( 'Restarting' );
    });
});
