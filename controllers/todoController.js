var bodyParser = require('body-parser');
var mongoose =  require('mongoose');

// Connect to database
mongoose.connect('mongodb://test:test@ds155699.mlab.com:55699/todo');
// Database link https://mlab.com/databases/todo

// Create a schema - this is like a blueprint
var todoSchema = new mongoose.Schema({
  item: String
});

var Todo = mongoose.model('Todo', todoSchema)


module.exports = function(app) {

var urlencodedParser = bodyParser.urlencoded({extended: false});

app.get('/todo', function (req, res) {
  // Get data from mongodb and pass it to the view
  Todo.find({}, function(err, data){
    if (err) throw err;
    res.render("todo", {todos: data});
  }); 
});

app.post('/todo', urlencodedParser,  function (req, res) {
  // Get data from the view and pass it to mongodb
  var newTodo = Todo(req.body).save(function(err,data){
    if (err) throw err;
    res.json(data);
  })
});

app.delete('/todo/:item', function (req, res) {
  //Delete the requested data from mongodb
  Todo.find({item: req.params.item.replace(/\-/g," ")}).remove(function(err,data){
    if (err) throw err;
    res.json(data);
  });
});

}