const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

const port = process.env.PORT || 3300;

hbs.registerPartials(__dirname+'/views/partials')
app.set('view engine','hbs');
app.use(express.static(__dirname+'/public'));

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method}::${req.url} `;
fs.appendFile('server.log',log+'\n',(err)=>{
  if(err){
    console.lof('Unable to connect');
  }
});
  console.log(`${now}: ${req.method}::${req.url} `);
next();
});

// app.use((req, res, next) => {
//   res.render('maintaince.hbs', {
//     pageTitle:'Maintaince Page',
//     welcome:'Welcome message'
//   });
// });
hbs.registerHelper('getCurrentYear', ()=>{
  return new Date().getFullYear()
});
hbs.registerHelper('screamIt', (text)=>{
  return text.toUpperCase()
});

app.get('/',(req, res)=>{
  res.render('home.hbs', {
    pageTitle:'Home Page',
    welcome:'Welcome message'
  });
});
app.get('/about',(req, res)=>{
  res.render('about.hbs', {
    pageTitle:'About Page'
  });
});
// });

app.listen(port);
