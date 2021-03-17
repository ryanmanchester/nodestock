//Stock Market Portfolio App
const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser')
const request = require('request');

//API key = pk_73008ed623f14d1691b1072e091055be

//callApi function

const callApi = (finishedApi, ticker) => {
  request('https://cloud.iexapis.com/stable/stock/' + ticker + '/quote?token=pk_73008ed623f14d1691b1072e091055be', {json: true}, (err, resp, body) => {
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

//Set body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));

//Set Handlebars middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//Set Handlebars index GET route
app.get('/', function (req, res) {
  callApi( function(doneApi) {
    res.render('home', {
      stock: doneApi
    });
  });
});

//Set Handlebars POST route
app.post('/', function (req, res) {
  const ticker = req.body.stockTicker;
  callApi( function(doneApi) {
    res.render('home', {
      stock: doneApi
    });
  },ticker );
});

app.get('/about.html', function(req, res) {
  res.render('about')
})

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Start node server on port with a console message
app.listen(PORT, () => console.log("Nodestock server running"))
