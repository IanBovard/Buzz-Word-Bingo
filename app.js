/* jshint esversion:6*/
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public'));

app.get('/', (req, res) => {
  app.render('index');
});


app.post('/:buzzword/:points', (req, res, next) =>{
  console.log(req.body);
  next();
});

app.listen(4958, () => {
  process.stdout.write('listening on port 4958');
});