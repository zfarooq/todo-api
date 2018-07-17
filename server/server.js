const express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

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
})
app.listen(port,()=>{
    console.log(`Started at ${port}`);

});

module.exports = {app};




