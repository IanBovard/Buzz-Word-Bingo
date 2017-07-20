/* jshint esversion:6*/
const handles = function () {
  return {
    getHandle : getHandle,
    postHandle : postHandle,
    postReset : postReset,
    putHandle : putHandle,
    deleteHandle : deleteHandle
  };
};
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
module.exports = new handles();