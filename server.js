// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`)
  console.log(new Date(1450137600))
  next()
})

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/timestamp/:date_string", function (req, res) {
  let date = ''
  
  // if (req.params.date_string === '')
  //   date = new Date()
  // else
  //   date = new Date(req.params.date_string)
  
  if (Date.parse(req.params.date_string))
    res.json({unix: Date.parse(req.params.date_string), utc: new Date(req.params.date_string).toUTCString()})
  else if (req.params.date_string === '')
    res.json({unix: new Date().getTime(), utc: new Date().toUTCString()})
  else if (+req.params.date_string > 0)
    res.json({unix: new Date(req.params.date_string).getTime(), utc: new Date(req.params.date_string).toUTCString()})
  else 
    res.json({unix: null, utc: 'Invalid Date'})
  
  // res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});