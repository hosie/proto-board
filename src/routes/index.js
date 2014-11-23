var express = require('express');
var router = express.Router();
var fs= require('fs');

var inputData="[1,2,3,4,5]";
fs.exists("sampleData.json",function(exists){
  if(exists)
  {
    fs.readFile("sampleData.json",function(err,data){
      if (err) throw err;
      console.log("loaded sampleData.json");
      inputData=data;
    });
  }
});

function saveInputData(inputDataBuffer,callback){
  inputData=inputDataBuffer;
  fs.writeFile("sampleData.json",inputData,function (err) {
    if (err) throw err;
      console.log('It\'s saved!');
      callback();
  });
}

var inputCode="console.log('hello');";
//load from files
fs.exists("preview.js",function(exists){
  if(exists)
  {
    fs.readFile("preview.js",function(err,data){
      if (err) throw err;
      console.log("loaded preview.js");
      inputCode=data;
    });
  }
});

function saveInputCode(inputCodeBuffer,callback){
  inputCode=inputCodeBuffer;
  fs.writeFile("preview.js",inputCode,function (err) {
    if (err) throw err;
      console.log('It\'s saved!');
      callback();
  });
}

var defs="";
fs.exists("defs.xml",function(exists){
  if(exists)
  {
    fs.readFile("defs.xml",function(err,data){
      if (err) throw err;
      console.log("loaded defs.xml");
      defs=data;
    });
  }
});

function saveInputDefs(defsBuffer,callback){
  defs=defsBuffer;
  fs.writeFile("defs.xml",defs,function (err) {
    if (err) throw err;
      console.log('It\'s saved!');
      callback();
  });
}

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Protoboard', inputData: inputData, inputCode: inputCode , defs:defs});
  res.end();
});

router.get('/preview', function(req, res) {
  res.render('preview', { inputData: inputData, inputCode: inputCode, defs:defs });
  res.end();
});

var n=1;
router.post('/code',function(req,res){
  var inputCodeBuffer="";

  console.log("js post handler: " + req.url);
  req.on('data',function(chunk){
    console.log("chunk " + n + ":" + chunk);
    n=n+1;
    inputCodeBuffer=inputCodeBuffer+chunk; 
  });  
  req.on('end',function(){
    console.log("end");
    saveInputCode(inputCodeBuffer,function(){
        res.end();
        inputCodeBuffer="";
        n=0;
    });
    
  });
});


router.post('/data',function(req,res){
  var inputDataBuffer="";

  console.log("js post handler: " + req.url);
  req.on('data',function(chunk){
    console.log("chunk " + n + ":" + chunk);
    n=n+1;
    inputDataBuffer=inputDataBuffer+chunk; 
  });  
  req.on('end',function(){
    console.log("end");
    saveInputData(inputDataBuffer,function(){
      inputDataBuffer="";
      n=0;

    });    
  });
  res.end();
});

router.post('/defs',function(req,res){
  var inputDefsBuffer="";

  console.log("js post handler: " + req.url);
  req.on('data',function(chunk){
    console.log("chunk " + n + ":" + chunk);
    n=n+1;
    inputDefsBuffer=inputDefsBuffer+chunk; 
  });  
  req.on('end',function(){
    console.log("end");
    saveInputDefs(inputDefsBuffer,function(){
      inputDefsBuffer="";
      n=0;

    });    
  });
  res.end();
});
module.exports = router;
