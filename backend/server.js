const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const cors = require('cors');
server.use(cors()); // need to install cors

server.use(bodyParser.json());
server.use(express.static('client/build'));
server.use(bodyParser.urlencoded({extended: true}));

MongoClient.connect('mongodb://localhost:27017', function(err, client){

  if(err){
    console.log(err);
    return;
  }

  const db = client.db('bucket_list'); // create database

  server.get('/api/bucket_list', function(req, res){
    db.collection('bucket_list').find().toArray(function(err, result){
      res.status(200);
      res.json(result);
    });
  });

  server.post('/api/bucket_list', function(req, res){
    db.collection('bucket_list').save(req.body, function(err, result){
      if(err){
        console.log(err);
        res.status(500);
      };
      res.status(201);
      res.json(result.ops[0]);
      console.log('saved to database');
    });
  });


server.put('/api/bucket_list/:id', function(req, res){
    db.collection('bucket_list').update({_id: ObjectID(req.params.id)}, req.body, function(err, results){
      if(err){
        console.log(err);
        res.status(500);//sends back if the api fails
      }
      res.status(204);
      res.send();
    });
  });

  server.delete('/api/bucket_list', function(req, res){
    db.collection('bucket_list').remove({}, function(err, result){
      if(err){
        console.log(err);
        res.status(500); //sends back if the api fails
      }
      res.status(204);
      res.send();
    });
  });


  server.listen(5000, function(){
    console.log("Happy days! on port 5000");
  });

});
