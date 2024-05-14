import express from 'express'
import mongoose from 'mongoose'

var cookieParser = require('cookie-parser');
var bluebird = require('bluebird');
var cors = require('cors');
const mainRouter = require('./routes/main.router')

const app = express()
app.use(express.json())
app.disable('x-powered-by')

require('dotenv').config()

app.use(express.urlencoded({
  extended: false
}))

//aplico cors
app.use(cors());
app.use(cookieParser());
app.use(function (_req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});


const dbURL = process.env.DATABASE

mongoose.Promise = bluebird;
let url = dbURL
console.log("\n\nBD",url,'\n\n');
let opts = {
  useNewUrlParser : true, 
  connectTimeoutMS:20000, 
  useUnifiedTopology: true
  };
if(url){
mongoose.connect(url,opts)
  .then(() => {
    console.log(`Conexión establecida con la BD.`)
  })
  .catch((e) => {
    console.log(`Error Connecting to the Mongodb Database...`),
    console.log(e)
  })
}

const PORT = process.env.PORT ?? 8000

app.get('/',(_req,res) => {
    console.log("Home movie finder")
    res.send('Movie-Finder Home')
    
    })

app.use(mainRouter)

app.listen(PORT, () =>{
    console.log('server running on port ',PORT)
    console.log('DATABASE URL ',process.env.DATABASE)
    console.log('DATABASE NAME ',process.env.DATABASE_NAME)
})