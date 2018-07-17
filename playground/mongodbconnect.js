const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'TodoApp';
MongoClient.connect(url,{ useNewUrlParser:true },(err,db)=>{
    if(err){
        return console.log('Unable to connect to MongoDB server');
    }
   const userCollection = db.db(dbName).collection('Users');
   userCollection.insertOne({
    name: 'Zahid',
    age: 25,
    location: 'Philadelphia'
   },(err,result)=>{
       if(err){
           return console.log('Error occured', err);
        }
        console.log(result.ops);
   })
    db.close();
})