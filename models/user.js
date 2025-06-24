const { Schema,model } = require('mongoose')
const {createToken,validateToken}= require('../services/authentication')

const {createHmac, randomBytes}= require('crypto')

const userSchema= new Schema({
    fullName :{
        type: String,
        require:true
    },
    email :{
        type: String,
        require:true,
        unique: true
    },
    salt :{
        type: String,
      // require:true,
      //  unique: true
    },
    
    password :{
        type: String,
        require:true,
       // unique: true
    },
    profileImageURL:{
        type: String

    },
    role:{
        type:String,
        enum: ['USER','ADMIN'],
        default: 'USER'
    }
    // creation and updation will automaticallly get recorded using timestamps
},{timestamps: true});

//hash the pass and add salt in it

userSchema.pre('save',function(next){
const user=this;
if(!user.isModified('password'))return;
//salt generate nahi ho paa rha tech issue ke karan
//const salt= randomBytes(16).toString();
// hardcore salt
const salt= 'random';
const hashPass= createHmac('sha256',salt).update(user.password).digest('hex');
this.salt=salt;
this.password=hashPass;
next();
});

// to create a virtual function for matching password bcoz pass is a hash pass
userSchema.static('matchPasswordAndGeneratetoken', async function(email,password){
    const user= await this.findOne({email});
    if(!user)  throw new Error('user not found');

    const salt= user.salt;
    const hashedPass = user.password;
  
   // user ne jo pass diya h ussko same salt se hash kr lo to pata chl jaiyaga ki hashed pass same h ya nahi

   const userProvidedPass = createHmac('sha256',salt).update(password).digest('hex');
   if(hashedPass !== userProvidedPass) throw new Error('Incorrect pass');
   
   
   //return user tb ho rha tha jb hume token nahi dena tha
   //return user;

   // here i have created token and returned the encoded string to client
   const token= createToken(user);
   return token;

});






//   ✅ Create a Mongoose model named 'user'
//   ✅ Associate it with the userSchema you previously defined
//   ✅ Store the model in a variable called User
const User= model('user',userSchema);




module.exports= User;