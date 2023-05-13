const dotenv= require("dotenv");
const mongoose= require('mongoose');
const express= require('express');
const app= express();
dotenv.config({path:'./config.env'});
const PORT= process.env.PORT;
require('./db/conn');
app.use(express.json());
//const User=require('./model/userSchema');
app.use(require('./router/auth'));

/*const database = (module.exports=()=>{
    const connectionParams={
        useNewUrlParsere: true,
        useUnifiedTopology:true,
        
    }
    try{
        mongoose.connect(/*'mongodb+srv://Vanshika_22:Vanshika33@cluster0.sdm1q9h.mongodb.net/mernstack1?retryWrites=true&w=majority'DB,
        connectionParams );
        console.log("database connected");
    } catch(error){
      console.log(error);
      console.log("Database connection failed");
    }
});
database();*/
/*const DB='mongodb+srv://Vanshika_22:Vanshika33@cluster0.sdm1q9h.mongodb.net/mernstack1?retryWrites=true&w=majority';

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology:true,
    useFindAndModify: false


}).then(()=>{
    console.log(`connection successful`);
}).catch((err)=> console.log(`no connection`));*/

//middleware
const middleware = (req, res, next)=>{
console.log("hello to middleware");
next();
}




app.get('/',(req, res)=>{ 
res.send(`hello world from the server app,js`);
});
app.get('/about',middleware,(req,res)=>{
    res.send(`About section`);
    
});
app.get('/contact',(req,res)=>{
    res.send(`contact section`);
});
app.get('/signin',(req,res)=>{
    res.send(`signin section`);
});
app.get('/signout',(req,res)=>{
    res.send(`signout section`);
});


app.listen(PORT,()=>{
    console.log(`server is running at port no ${PORT}`);
})
