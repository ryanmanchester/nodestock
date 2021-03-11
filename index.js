//Stock Market Portfolio App
const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');
const path = require('path');
const request = require('request');

//API key = pk_73008ed623f14d1691b1072e091055be

//callApi function

const callApi = (finishedApi) => {
  request('https://cloud.iexapis.com/stable/stock/aapl/quote?token=pk_73008ed623f14d1691b1072e091055be', {json: true}, (err, resp, body) => {
    if (err) {
      return err
    };
    if (resp.statusCode === 200) {
      finishedApi(body);
    };
  });
}

//Test API request


//Set listening port to deployed env or local host
const PORT = process.env.PORT || 3000;

//Set Handlebars middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//Set Handlebars routes
app.get('/', function (req, res) {
  callApi( function(doneApi) {
    res.render('home', {
      stock: doneApi
    });
  });
});

app.get('/about.html', function(req, res) {
  res.render('about')
})

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Start node server on port with a console message
app.listen(PORT, () => console.log("Nodestock server running"))
