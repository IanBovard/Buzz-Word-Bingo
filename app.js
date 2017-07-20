/* jshint esversion:6*/
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const handles = require('./handles.js');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public'));

app.get('/buzzwords', handles.getHandle);
app.post('/buzzword', handles.postHandle);
app.post('/reset', handles.postReset);
app.put('/buzzword',  handles.putHandle);
app.delete('/buzzword', handles.deleteHandle);

app.listen(4958, () => {
  process.stdout.write('listening on port 4958\n');
});