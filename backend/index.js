const express=require("express")
const cors=require('cors')
const app=express();
const mongoose =require("mongoose")
const morgan=require('morgan')
const bodyParser= require("body-parser")
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/error");
require("dotenv").config();
const PORT=process.env.PORT||7000


app.get('/',(req,res)=>{
    res.json('Hello to my App')
})
//db connection
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false 
}).then(() => console.log("DB connected"))
.catch((err) => console.log(err));
//MIDDLEWARE
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({
    limit: "5mb",
    extended: true
}));
app.use(cookieParser());
app.use(cors());

// error middleware
app.use(errorHandler)
//APP connection
app.listen(PORT,()=>{
    console.log(`server running on PORT ${PORT}`)
});