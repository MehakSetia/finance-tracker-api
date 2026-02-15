const jwt=require('jsonwebtoken');

const authenticationToken= (req,res,next)=>{
    const authHeader=req.headers['authorization'];

    const token=authHeader && authHeader.split(' ')[1];

    if(!token){
        console.log("⚠️ No token found in header");
        return res.status(401).json({error:"Access denied"});
    }
    try{
        const decoded=jwt.verify(token,"SUPER_SECRET_KEY");

        req.user=decoded;
        console.log("✅ Token verified for User ID:", req.user.userId);
        next();
    }
    catch(error){
        res.status(403).json({error:"Invalid token"});
    }
}
module.exports=authenticationToken;