var bodyParser = require('body-parser');

// Connect to database
// https://www.thenetninja.co.uk/courses/node-js-tutorial-for-beginners
// var mongoose =  require('mongoose');
// mongoose.connect('mongodb://test:test@ds155699.mlab.com:55699/todo');

// // Create a schema - this is like a blueprint
// var todoSchema = new mongoose.Schema({
//   item: String
// });

// var Todo = mongoose.model('Todo', todoSchema)
// var itemOne = Todo({item: 'buy flowers'}).save(function(err){
//   if (err) throw err;
//   console.log("item saved");
// });

module.exports = function(app) {

var data = [ {item: "Get milk"}, {item: "walk cat"}, {item: "clean fridge"}];
var urlencodedParser = bodyParser.urlencoded({extended: false});

app.get('/todo', function (req, res) {
  res.render("todo", {todos: data});
});

app.post('/todo', urlencodedParser,  function (req, res) {
  data.push(req.body)
  res.json(data);
});

app.delete('/todo/:item', function (req, res) {
  data = data.filter(function(todo) {
    return todo.item.replace(/ /g, '-') !== req.params.item;
  });
  res.json(data);
});

};