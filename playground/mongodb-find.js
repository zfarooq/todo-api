const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'TodoApp';
MongoClient.connect(url,{ useNewUrlParser:true },(err,db)=>{
    if(err){
        return console.log('Unable to connect to MongoDB server');
    }
   const userCollection = db.db(dbName).collection('Users');
   userCollection.find({
       name:'Andrew'
   },{sort: 'age'}).toArray().then((data)=>{
       console.log(JSON.stringify(data, undefined,2));

   },(err)=>{

   });
    db.close();
})