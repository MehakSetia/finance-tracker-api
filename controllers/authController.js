const jwt=require('jsonwebtoken');
const { PrismaClient }=require('@prisma/client');
const bcrypt=require('bcryptjs');
const prisma=new PrismaClient();
const {registerSchema,loginSchema}=require('../validators/authSchema');


const register=async (req,res,next)=>{
    try{
        const{ name,email,password }=req.body;
        registerSchema.parse(req.body);
        const existingUser=await prisma.user.findUnique({
            where:{ email }
        });
        if(existingUser){
            const error=new Error("Email already exists");
            error.statusCode=400;
            return next(error);
        }
        const hashedPass=await bcrypt.hash(password,10);

        const newUser=await prisma.user.create({
            data:{
                name,
                email,
                password:hashedPass
            }
        });
        return res.status(201).json({message:"User created",user:newUser});
    }
    catch(err){
        return next(err);
    }
};

const login=async (req,res,next)=>{
   try{
    const{ email,password }=req.body;
    loginSchema.parse(req.body);
    const user=await prisma.user.findUnique({
        where:{ email }
    });
    if(!user){
        const error=new Error("Invalid email or password");
        error.statusCode=400;
        return next(error);
    }
    const isPassValid=await bcrypt.compare(password,user.password);

    if(!isPassValid){
        const error=new Error("Invalid email or password");
        error.statusCode=400;
        return next(error);
    }

    const token=jwt.sign(
        {userId:user.id,role:user.role},
        process.env.JWT_SECRET,
        {expiresIn:"1h"}
    );
    res.json({message:"Login successful",token});
   }
   catch(err){
    return nexr(err);
   }
};

module.exports={register,login};