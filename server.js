const calendar = require('./calendar.js');
const path = require('path');

// init project
const express = require('express');
const app = express();

app.use(express.static('public'));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

function checkHttps(req, res, next){
  // protocol check, if http, redirect to https
  
  if(req.get('X-Forwarded-Proto').indexOf("https")!=-1){
    return next()
  } else {
    res.redirect('https://' + req.hostname + req.url);
  }
}

app.all('*', checkHttps)

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.render('index');
});

// this lets us get an individual holiday from the calendar api
app.get('/get_holiday', function(request, response) {
  // we take in the date + month from the query params
  const date = request.query.day;
  const month = request.query.month;
  console.log(date, month);
  // we send those to the calendar api
  const data = calendar.getHoliday({month: parseInt(month), day: parseInt(date), isToday: true});
  console.log(data);
  // we return the holiday we got back
  response.send({ holiday: data.holiday, date: data.date });
})

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
