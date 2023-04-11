const jwt = require("jsonwebtoken");

const auth = (req,res,next)=>{
    const token= req.headers.authorization;

    if(token){
        jwt.verify(token,"masai",(err,decoded)=>{
            console.log(decoded);
            if(decoded){
                
                req.body.userID=decoded.UserId;
                next();
            }else{
                res.send({"msg":"Token didn't match, Please Login First!"})
            }
        })
    }else{
        res.send({"msg":"Please Login First!"})
    }
}

module.exports={auth}