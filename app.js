/* jshint esversion:6*/
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const handles = require('./handles.js');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let buzzArr = [];
let score = 0;
app.use(express.static('public'));

function getHandle (req, res){
  let buzzwords = buzzArr.map( (obj) => {
    return obj.buzzword;
  });
  let buzzObj = {buzzwords};
  res.send(buzzObj);
}

function postHandle (req, res){
  let matches = req.body.buzzword.match(/\d+/g);
  if (isNaN(req.body.points) || matches != null){
    res.json({'success': false});
  }else{
    let num = parseInt(req.body.points);
    req.body.points = num;
    buzzArr.push(req.body);
    res.json({'success' : true});
  }
}

function postReset (req, res){
  if (req.body.reset === 'true'){
   buzzArr = [];
   score = 0;
   res.json({'success': true});
 }else{
  res.json({'success' : false});
}
}

function putHandle (req, res){
  let wordPut = buzzArr.reduce( (obj) => {
    if (req.body.buzzword === obj);
    return obj;
  });
  if (wordPut.buzzword === req.body.buzzword){
    wordPut.heard = true;
    score += wordPut.points;
    res.json({'success' : true, 'newScore' : score});
  }else{
    res.json({'success' : false});
  }
}

function deleteHandle (req, res) {
  let wordDelete = buzzArr.map( (obj) => {
    return obj.buzzword;
  });
  let wordIndex = wordDelete.indexOf(req.body.buzzword);
  if (wordIndex > -1){
    buzzArr.splice(wordIndex, 1);
    res.json({'success' : true});
  }else{
    res.json({'success' : false});
  }
}

app.get('/buzzwords', getHandle);
app.post('/buzzword',postHandle);
app.post('/reset', postReset);
app.put('/buzzword',  putHandle);
app.delete('/buzzword', deleteHandle);

app.listen(4958, () => {
  process.stdout.write('listening on port 4958\n');
});