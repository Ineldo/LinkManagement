const dotenv= require('dotenv');
const express = require('express');
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

const connectDB=require('./server/database/connection');
const { urlencoded } = require('body-parser');
dotenv.config({ path:'.env'})
const PORT= process.env.PORT||8080;

//log requests
app.use(morgan("common"));

//mongoDb connection
connectDB();

//parse request to body-parser
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.json())
app.use(express.urlencoded({extended:false}))


//set view engine
app.set("view engine", "ejs")
//app.set["views", path.resolve(__dirname, "views/ejs")]

//load assets
app.use('/css', express.static(path.resolve(__dirname,"assets/css")))
app.use('/js', express.static(path.resolve(__dirname,"assets/js")))
app.use('/img', express.static(path.resolve(__dirname,"assets/img")))

//load routes
app.use('/',require('./server/routes/router'))

app.listen(PORT,()=>{console.log(`Servidor rodando no http://localhost:${PORT}`)} )



