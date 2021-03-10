const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');
const path = require('path');

//Set listening port to deployed env or local host
const PORT = process.env.PORT || 3000;

//Set Handlebars middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//Set Handlebars routes
app.get('/', function (req, res) {
    res.render('home', {
      stuff: "This is some stuff"
    });

});

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Start node server on port with a console message
app.listen(PORT, () => console.log("Nodestock server running"))
