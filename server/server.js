const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');
var app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());

app.post('/todos',(req, resp)=>{
    var todo = new Todo({
        text: req.body.text,
        completed: req.body.completed,
        completedAt: req.body.completedAt
    });
    todo.save().then((doc)=>{
        resp.send(doc);
    },(err)=>{
        resp.status(400).send(err);
    });
});
app.get('/todos',(req, resp)=>{
    Todo.find().then((data)=>{
        debugger;
        resp.send({data});
    },(err)=>{
        resp.status(400).send(err);
    });
});
app.get('/todos/:id',(req, resp)=>{
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        return resp.status(400).send();
    }
    Todo.findById(id).then((todo)=>{
        if(!todo){
            return resp.status(400).send();
        }
        resp.send({todo});
    }).catch((e)=>{
        res.status(400).send();
    });
},(err)=>{
    resp.status(400).send(err);
});
app.delete('/todos/:id',(req,resp)=>{
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        return resp.status(400).send();
    }
    Todo.findByIdAndRemove(id).then((todo)=>{
        resp.send({todo});
    }).catch((e)=>{
        resp.status(400).send();
    })
});

app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);
  
    if (!ObjectID.isValid(id)) {
      return res.status(404).send();
    }
    if (_.isBoolean(body.completed) && body.completed) {
      body.completedAt = new Date().getTime();
    } else {
      body.completed = false;
      body.completedAt = null;
    }
  
    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
      if (!todo) {
        return res.status(404).send();
      }
  
      res.send({todo});
    }).catch((e) => {
      res.status(400).send();
    })
  });


  app.post('/user', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);
    user.save().then(() => {
      return user.generateAuthToken();
    }).then((token) => {
      res.header('x-auth', token).send(user);
    }).catch((e) => {
      res.status(400).send(e);
    })
  });
 
  app.get('/user/me', authenticate, (req, res) => {
    res.send(req.user);
  });

  app.post('/user/login', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
  
    User.findByCredentials(body.email, body.password).then((user) => {
      return user.generateAuthToken().then((token) => {
        res.header('x-auth', token).send(user);
      });
    }).catch((e) => {
      res.status(400).send(e);
    });
  });

app.listen(port,()=>{
    console.log(`Started at ${port}`);
});

module.exports = {app};




