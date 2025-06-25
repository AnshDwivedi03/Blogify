require('dotenv').config();
const express =require('express');
const path=require('path');
const app= express();
const userRoutes = require('./routes/user')
const blogRoutes = require('./routes/blog')
const mongoose= require('mongoose')
const cookieParser= require('cookie-parser');
const { checkforauthcookie } = require('./middlewares/authentication');
const Blog=require('./models/blogs')



// set the view engine to ejs
app.set("view engine" ,"ejs");
//ejs file kha padi h
app.set("views",path.resolve("./views"));

//hame nahi pata form data kis formate mei aa rha
app.use(express.urlencoded({extended:false}));
//middleware it is used to parse one form of data into js object
app.use(cookieParser());

// it helps in checking valid cookie..
app.use(checkforauthcookie('Cookie'));

app.use(express.static(path.resolve('./public')));


//connecting mongodb static
//mongoose.connect('mongodb://localhost:27017/blogify').then(e=> console.log('Mongodb connected'));

//connecting mongodb dynamic
mongoose.connect(process.env.MONGO_URL).then(e=> console.log('Mongodb connected'));




//api-> get
app.get('/', async(req, res) => {
//  console.log('Cookies:', req.cookies);    // Check cookie-parser
//  console.log('User:', req.user);          // Check auth middleware
const allBlogs=await Blog.find({});
  res.render('home', { user: req.user,blogs:allBlogs });
});



//agar koi bhi req user se start hoti h to aap userroutes use kro
app.use('/user',userRoutes);
app.use('/blog',blogRoutes);




const PORT= process.env.PORT || 3000;
app.listen(PORT,()=>{
 console.log(` Server is running at port, ${PORT}`);
});