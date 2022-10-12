const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")

require('dotenv').config();

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
     extended:true
}))

const connectionString = process.env.DB_URL;

mongoose.connect( connectionString );

const db = mongoose.connection;

db.on('error',()=>console.log('Error in Connecting to Database'));
db.once('open', ()=>console.log('Connected to Database'))

app.post("/signup",(req,res)=>{
     const firstName = req.body.firstName;
     const lastName = req.body.lastName;
     const email = req.body.email;
     const password = req.body.password;

     const formData = {
           "firstName": firstName,
           "lastName": lastName,
           "email": email,
           "password": password,

     }

db.collection('users').insertOne(formData,(err,collection) => {
      if(err){
        throw err;
      }
       console.log("Record Inserted Successfully");

     });

     return res.redirect('signup_success.html')
})


app.get("/",(req,res)=>{
     res.set({"Allow-access-Allow-Origin": '*'})
     return req.redirect('index.html');

}).listen(3000);

console.log("Listening on PORT 3000");

