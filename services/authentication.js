const JWT= require('jsonwebtoken');
const secret="anshisgg";
// yha pr tumhra jo model h wo pass hua h  (model ka name jo db mei store hua h)
function createToken(user){
    const payload={
    _id:user.id,
    email : user.email,
    profileImageURL:user.profileImageURL,
    role:user.role
    };

    //helps in assigning the tokenyha token create hua h
    const token=JWT.sign(payload,secret);
    return token;
}

function validateToken(token){
    const payload=JWT.verify(token,secret);
    return payload;
}

module.exports= {createToken,validateToken};