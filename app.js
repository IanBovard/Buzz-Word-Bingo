/* jshint esversion:6*/
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let buzzArr = [];
let score = 0;
app.use(express.static('public'));


app.get('/buzzwords', (req, res) => {
  let buzzwords = buzzArr.map( (obj) => {
    return obj.buzzword;
  });
  let buzzObj = {buzzwords};
  res.send(buzzObj);
});

app.post('/buzzword', (req, res) =>{
  let matches = req.body.buzzword.match(/\d+/g);
  if (isNaN(req.body.points) || matches != null){
    res.json({'success': false});
  }else{
    let num = parseInt(req.body.points);
    req.body.points = num;
    buzzArr.push(req.body);
    res.json({'success' : true});
  }
});

app.post('/reset', (req, res) => {
  if (req.body.reset === 'true'){
   buzzArr = [];
   score = 0;
   res.json({'success': true});
 }else{
  res.json({'success' : false});
}
});

app.listen(4958, () => {
  process.stdout.write('listening on port 4958\n');
});