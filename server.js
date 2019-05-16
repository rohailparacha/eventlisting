const express  = require('express');
const mongoose =  require('mongoose');
const bodyParser  =require('body-parser');
var morgan = require('morgan');


//const Exception  = require('./models/exception');

const miscAPI = require('./routes/api/misc.route');

const db = require('./config/keys').mongoURI;

const app = express();

app.locals.moment = require('moment');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );

app.use('/api',miscAPI);

app.use(ignoreFavicon);
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

// Middleware for error handling
app.use((error,req,res,next)=>{

     const errMessage = error.message||error.name;

    res.status(error.status||500).json({error:errMessage}).end();
    
})

app.get("*",(req,res)=>{

    res.redirect('/api/events');
});

mongoose.connect(db).then(()=>{
    console.log('Connected');
}).catch(()=>{
    console.log('Error while connecting to DB');
})


const port  = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log('Server is running');
})

function ignoreFavicon(req, res, next) {
    if (req.originalUrl === '/favicon.ico') {
      res.status(204).json({nope: true});
    } else {
      next();
    }
  }