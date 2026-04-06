const jwt=require('jsonwebtoken');

const authenticationToken= (req,res,next)=>{
    try{

        const token=req.headers.authorization.split(' ')[1];
        const decoded=jwt.verify(token,process.env.JWT_SECRET);

        req.user=decoded;
        next();
    }
    catch(err){
        const error=new Error("Unauthorised");
        error.statusCode=401;
        return next(error);
    }
}

const authorizeRoles=(...roles)=>{
    return (req,res,next)=>{
        console.log("User role:", req.user.role)
        console.log("Allowed roles:", roles)
        if(!roles.includes(req.user.role)){
            return res.status(403).json("Access Denied");
        }
        next();
    }
};

module.exports={authenticationToken,authorizeRoles};