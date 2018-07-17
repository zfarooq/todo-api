const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((result)=>{
//     console.log(result);
// });
// Todo.findOneAndRemove({}).then((result)=>{
//     console.log(result);
// });
Todo.findByIdAndRemove('5b4dd2b96cf4de10408356c3').then((result)=>{
    console.log(result);
})