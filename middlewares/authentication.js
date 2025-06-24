const { validateToken } = require("../services/authentication");


// custom made cookie validator.. so that i can easily check whether my cookie contains ryt data or not
function checkforauthcookie(cookieName){

    return (req,res,next)=>{
        //cookie ka naam kuxh bhi ho skta and wo key value pair mei h to dot use naa kro
   const tokenCookieValue= req.cookies[cookieName];

   if(!tokenCookieValue){

      return next();
   }
try {
    
    const payload=validateToken(tokenCookieValue);
    req.user=payload;
   // next();
} catch (error) {}
return next();
    };

}

module.exports={checkforauthcookie}