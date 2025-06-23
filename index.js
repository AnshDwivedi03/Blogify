const express =require('express');
const path=require('path');
const app= express();
const userRoutes = require('./routes/user')
const mongoose= require('mongoose')
// set the view engine to ejs
app.set("view engine" ,"ejs");
//ejs file kha padi h
app.set("views",path.resolve("./views"));

//hame nahi pata form data kis formate mei aa rha
app.use(express.urlencoded({extended:false}));

//connecting mongodb
mongoose.connect('mongodb://localhost:27017/blogify').then(e=> console.log('Mongodb connected'));





//api-> get
app.get('/',(req,res)=>{
res.render('home');
});


//agar koi bhi req user se start hoti h to aap userroutes use kro
app.use('/user',userRoutes);




PORT=3000;
app.listen(PORT,()=>{
 console.log(` Server is running at port, ${PORT}`);
});