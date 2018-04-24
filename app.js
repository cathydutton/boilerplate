var express = require('express');
var nunjucks = require('nunjucks');
var todoController = require('./controllers/todoController');

var app = express();

// Set view engine
nunjucks.configure('views', {
  autoescape: true,
  express: app
})
app.set('view engine', 'njk')

//Static files
app.use(express.static('./public'));
//app.use('/public', express.static(path.join(__dirname, '/govuk_modules/govuk_template/assets')))


//Fire controllers
todoController(app);

// Listen to port
app.listen(3000);

console.log("you are listening too port 3000")