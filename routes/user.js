const {Router} = require('express');
const User= require('../models/user')
const router= Router();



router.get('/signin',(req,res)=>{
    res.render('signin')
});


router.get('/signup',(req,res)=>{
    res.render('signup')
});

router.post('/signin', async(req,res)=>{
  const {email,password}= req.body;
  try{
  const token= await User.matchPasswordAndGeneratetoken(email,password);

//cookie mei dete h  yha pr token ka naam h cookie
return res.cookie('Cookie',token).redirect('/');
  }
  catch(error){
        return res.render('signin',{error: "Incorrect pass or email"});
  }

});

router.post('/signup',async(req,res)=>{
    const {fullName,email,password}= req.body;
    await User.create({
        fullName,
        email,password
    });
    return res.redirect('/');
});

router.get("/logout",(req,res)=>{
res.clearCookie('Cookie').redirect('/');
});




module.exports=router;